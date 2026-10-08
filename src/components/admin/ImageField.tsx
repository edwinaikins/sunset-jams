"use client";

import { ChangeEvent, useRef, useState } from "react";

type MediaItem = { id: string; url: string; filename: string; size: number; created_at: string };

const MAX_DIMENSION = 2400;
const MAX_BYTES = 4 * 1024 * 1024;

function formatSize(bytes: number) {
  return bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.round(bytes / 1024)} KB`;
}

// Shrinks big photos in the browser before upload: longest side capped at
// 2400px and re-encoded as WebP (keeps transparency). GIFs pass through untouched
// so animations survive. If re-encoding doesn't make it smaller, the original is used.
async function prepareImage(file: File): Promise<Blob> {
  if (file.type === "image/gif" || typeof createImageBitmap !== "function") return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
    const w = Math.round(bitmap.width * scale);
    const h = Math.round(bitmap.height * scale);
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, w, h);
    bitmap.close();
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.86));
    if (blob && blob.type === "image/webp" && (blob.size < file.size || scale < 1)) return blob;
  } catch {
    // Fall through and upload the original.
  }
  return file;
}

export default function ImageField({
  id,
  label,
  hint,
  value,
  onChange,
}: {
  id: string;
  label: string;
  hint?: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ kind: "ok" | "err"; text: string } | null>(null);
  const [library, setLibrary] = useState<MediaItem[] | null>(null);
  const [showLibrary, setShowLibrary] = useState(false);
  const [showLink, setShowLink] = useState(false);

  const preview = value.startsWith("/") || /^https?:\/\//.test(value) ? value : "";

  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!/^image\/(jpeg|png|webp|gif)$/.test(file.type)) {
      setMsg({ kind: "err", text: "Please choose a JPEG, PNG, WebP or GIF image." });
      return;
    }
    setBusy(true);
    setMsg(null);
    try {
      const blob = await prepareImage(file);
      if (blob.size > MAX_BYTES) throw new Error(`That image is ${formatSize(blob.size)} — the limit is 4 MB.`);
      const name = blob === file ? file.name : file.name.replace(/\.[^.]+$/, "") + ".webp";
      const fd = new FormData();
      fd.append("file", blob, name);
      const res = await fetch("/api/admin/media", { method: "POST", body: fd });
      const body = await res.json().catch(() => ({}));
      if (res.status === 401) throw new Error("Your session expired. Log in again in another tab, then retry.");
      if (!res.ok) throw new Error(body.error || "Upload failed.");
      onChange(body.url);
      setLibrary(null); // refresh next time it's opened
      setMsg({ kind: "ok", text: `Uploaded (${formatSize(body.size)}). Click “Save changes” to publish it.` });
    } catch (err) {
      setMsg({ kind: "err", text: err instanceof Error ? err.message : "Upload failed." });
    } finally {
      setBusy(false);
    }
  }

  async function openLibrary() {
    const next = !showLibrary;
    setShowLibrary(next);
    if (next && !library) {
      const res = await fetch("/api/admin/media");
      setLibrary(res.ok ? await res.json() : []);
    }
  }

  async function removeItem(item: MediaItem) {
    const inUse = item.url === value;
    const warning = inUse
      ? "This image is used in this field. Deleting it will leave a broken image on the site if you've saved it. Delete anyway?"
      : `Delete “${item.filename}” permanently? Any part of the site still using it will show a broken image.`;
    if (!confirm(warning)) return;
    const res = await fetch(`/api/admin/media/${item.id}`, { method: "DELETE" });
    if (res.ok) setLibrary((prev) => (prev || []).filter((m) => m.id !== item.id));
  }

  return (
    <div className="field ce-field">
      <label htmlFor={id}>{label}</label>
      <div className="img-field">
        <div className="img-thumb">
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="" />
          ) : (
            <span>No image</span>
          )}
        </div>
        <div className="img-controls">
          <div className="row-actions">
            <button type="button" className="mini-btn primary" onClick={() => fileRef.current?.click()} disabled={busy}>
              {busy ? "Uploading…" : "Upload image"}
            </button>
            <button type="button" className="mini-btn" onClick={openLibrary}>
              {showLibrary ? "Hide uploads" : "Choose from uploads"}
            </button>
            <button type="button" className="mini-btn" onClick={() => setShowLink((s) => !s)}>
              {showLink ? "Hide link" : "Use a link"}
            </button>
          </div>
          <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" hidden onChange={onFile} />
          {showLink && (
            <input id={id} type="text" inputMode="url" value={value} onChange={(e) => onChange(e.target.value)} placeholder="https://… or /logo.png" />
          )}
          {msg ? <span className={`ce-hint ${msg.kind === "err" ? "err" : "ok"}`}>{msg.text}</span> : hint && <span className="ce-hint">{hint}</span>}
        </div>
      </div>
      {showLibrary && (
        <div className="media-grid">
          {library === null && <span className="ce-hint">Loading…</span>}
          {library && library.length === 0 && <span className="ce-hint">No uploads yet.</span>}
          {library?.map((m) => (
            <div key={m.id} className={`media-tile${m.url === value ? " selected" : ""}`}>
              <button type="button" className="media-pick" onClick={() => onChange(m.url)} title={`Use ${m.filename}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={m.url} alt={m.filename} loading="lazy" />
              </button>
              <div className="media-meta">
                <span title={m.filename}>{m.filename}</span>
                <button type="button" className="media-del" onClick={() => removeItem(m)} aria-label={`Delete ${m.filename}`}>
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
