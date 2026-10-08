"use client";

import { useEffect, useMemo, useState } from "react";
import { DEFAULT_CONTENT, SECTIONS, SiteContent, TextField, ListField, SectionSpec } from "@/lib/content";
import ImageField from "./ImageField";

type Status = { kind: "idle" | "saving" | "saved" | "error"; message?: string };
type Row = Record<string, string>;

export default function ContentEditor({ initial }: { initial: SiteContent }) {
  const [content, setContent] = useState<SiteContent>(initial);
  const [savedJson, setSavedJson] = useState(() => JSON.stringify(initial));
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const dirty = useMemo(() => JSON.stringify(content) !== savedJson, [content, savedJson]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function setSection(key: keyof SiteContent, value: unknown) {
    setContent((prev) => ({ ...prev, [key]: value }) as SiteContent);
    if (status.kind !== "idle") setStatus({ kind: "idle" });
  }

  async function save() {
    setStatus({ kind: "saving" });
    try {
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });
      const body = await res.json().catch(() => ({}));
      if (res.status === 401) throw new Error("Your session expired. Log in again in another tab, then save.");
      if (!res.ok) throw new Error(body.error || "Could not save. Please try again.");
      setContent(body.content);
      setSavedJson(JSON.stringify(body.content));
      setStatus({ kind: "saved", message: "Saved. The live site now shows these changes." });
    } catch (err) {
      setStatus({ kind: "error", message: err instanceof Error ? err.message : "Could not save." });
    }
  }

  function discard() {
    if (!confirm("Discard all unsaved changes?")) return;
    setContent(JSON.parse(savedJson));
    setStatus({ kind: "idle" });
  }

  return (
    <div className="ce">
      <div className="ce-bar">
        <div>
          <h2>Site content</h2>
          <p className="ce-sub">
            Edit the wording, images and links on the public page. Changes go live as soon as you save.
          </p>
        </div>
        <div className="ce-actions">
          <a className="mini-btn" href="/" target="_blank" rel="noopener">
            View site ↗
          </a>
          {dirty && (
            <button className="mini-btn" type="button" onClick={discard}>
              Discard
            </button>
          )}
          <button className="btn btn-primary ce-save" type="button" onClick={save} disabled={!dirty || status.kind === "saving"}>
            {status.kind === "saving" ? "Saving…" : dirty ? "Save changes" : "All saved"}
          </button>
        </div>
      </div>
      {status.message && <p className={`ce-status ${status.kind}`}>{status.message}</p>}

      {SECTIONS.map((section, i) => (
        <SectionEditor
          key={section.key}
          spec={section}
          open={i === 0}
          value={content[section.key] as unknown as Record<string, unknown>}
          onChange={(v) => setSection(section.key, v)}
        />
      ))}
    </div>
  );
}

function SectionEditor({
  spec,
  value,
  onChange,
  open,
}: {
  spec: SectionSpec;
  value: Record<string, unknown>;
  onChange: (v: Record<string, unknown>) => void;
  open: boolean;
}) {
  const defaults = DEFAULT_CONTENT[spec.key] as unknown as Record<string, unknown>;
  const changedFromDefault = JSON.stringify(value) !== JSON.stringify(defaults);

  function restore() {
    if (!confirm(`Restore “${spec.title}” to the original wording? You can still discard before saving.`)) return;
    onChange(JSON.parse(JSON.stringify(defaults)));
  }

  return (
    <details className="ce-section" open={open}>
      <summary>
        <span className="ce-title">{spec.title}</span>
        <span className="ce-desc">{spec.description}</span>
      </summary>
      <div className="ce-body">
        {spec.fields.map((f) =>
          f.kind === "list" ? (
            <ListEditor
              key={f.key}
              spec={f}
              rows={(value[f.key] as Row[]) || []}
              onChange={(rows) => onChange({ ...value, [f.key]: rows })}
            />
          ) : (
            <FieldInput
              key={f.key}
              id={`${spec.key}-${f.key}`}
              spec={f}
              value={String(value[f.key] ?? "")}
              onChange={(v) => onChange({ ...value, [f.key]: v })}
            />
          )
        )}
        {changedFromDefault && (
          <button type="button" className="mini-btn ce-restore" onClick={restore}>
            Restore original wording
          </button>
        )}
      </div>
    </details>
  );
}

function FieldInput({
  id,
  spec,
  value,
  onChange,
}: {
  id: string;
  spec: TextField;
  value: string;
  onChange: (v: string) => void;
}) {
  if (spec.kind === "image") {
    return <ImageField id={id} label={spec.label} hint={spec.hint} value={value} onChange={onChange} />;
  }
  return (
    <div className="field ce-field">
      <label htmlFor={id}>{spec.label}</label>
      {spec.kind === "textarea" ? (
        <textarea id={id} value={value} onChange={(e) => onChange(e.target.value)} rows={Math.min(8, Math.max(3, Math.ceil(value.length / 90)))} />
      ) : (
        <input id={id} type="text" inputMode={spec.kind === "url" ? "url" : undefined} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
      {spec.hint && <span className="ce-hint">{spec.hint}</span>}
    </div>
  );
}

function ListEditor({ spec, rows, onChange }: { spec: ListField; rows: Row[]; onChange: (rows: Row[]) => void }) {
  function update(i: number, key: string, v: string) {
    onChange(rows.map((r, j) => (j === i ? { ...r, [key]: v } : r)));
  }
  function move(i: number, dir: -1 | 1) {
    const j = i + dir;
    if (j < 0 || j >= rows.length) return;
    const next = rows.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  }
  function remove(i: number) {
    if (!confirm(`Remove ${spec.itemLabel.toLowerCase()} ${i + 1}?`)) return;
    onChange(rows.filter((_, j) => j !== i));
  }
  function add() {
    const blank: Row = {};
    for (const f of spec.fields) blank[f.key] = "";
    onChange([...rows, blank]);
  }

  return (
    <div className="ce-list">
      <div className="ce-list-head">{spec.label}</div>
      {rows.map((row, i) => (
        <div className="ce-item" key={i}>
          <div className="ce-item-head">
            <strong>
              {spec.itemLabel} {i + 1}
            </strong>
            <div className="row-actions">
              <button type="button" className="mini-btn" onClick={() => move(i, -1)} disabled={i === 0} aria-label="Move up">
                ↑
              </button>
              <button type="button" className="mini-btn" onClick={() => move(i, 1)} disabled={i === rows.length - 1} aria-label="Move down">
                ↓
              </button>
              <button type="button" className="mini-btn bad" onClick={() => remove(i)}>
                Remove
              </button>
            </div>
          </div>
          <div className="ce-item-grid">
            {spec.fields.map((f) => (
              <FieldInput
                key={f.key}
                id={`${spec.key}-${i}-${f.key}`}
                spec={f}
                value={row[f.key] ?? ""}
                onChange={(v) => update(i, f.key, v)}
              />
            ))}
          </div>
        </div>
      ))}
      {rows.length < spec.max && (
        <button type="button" className="mini-btn" onClick={add}>
          + Add {spec.itemLabel.toLowerCase()}
        </button>
      )}
    </div>
  );
}
