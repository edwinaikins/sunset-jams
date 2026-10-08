"use client";

import { useMemo, useState } from "react";

export type MessageRowClient = {
  id: number;
  name: string;
  email: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function MessagesTable({ initialRows }: { initialRows: MessageRowClient[] }) {
  const [rows, setRows] = useState(initialRows);
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        (r.email || "").toLowerCase().includes(q) ||
        (r.subject || "").toLowerCase().includes(q)
    );
  }, [rows, query]);

  async function toggleRead(row: MessageRowClient) {
    setBusy(row.id);
    const next = !row.is_read;
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, is_read: next } : r)));
    try {
      const res = await fetch(`/api/admin/messages/${row.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_read: next }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, is_read: row.is_read } : r)));
    } finally {
      setBusy(null);
    }
  }

  async function removeRow(row: MessageRowClient) {
    if (!confirm(`Delete this message from ${row.name}? This can't be undone.`)) return;
    setBusy(row.id);
    const prevRows = rows;
    setRows((prev) => prev.filter((r) => r.id !== row.id));
    try {
      const res = await fetch(`/api/admin/messages/${row.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
    } catch {
      setRows(prevRows);
    } finally {
      setBusy(null);
    }
  }

  return (
    <div className="admin-panel">
      <div className="admin-panel-head">
        <h2>Inbox</h2>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            className="admin-search"
            placeholder="Search name, email, subject…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <a className="mini-btn" href="/api/admin/export?type=messages">
            Export CSV
          </a>
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="empty-state">{rows.length === 0 ? "No messages yet." : "No matches."}</div>
      ) : (
        <div className="table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>From</th>
                <th>Subject / message</th>
                <th>Received</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td>
                    {r.name}
                    <div className="muted">{r.email}</div>
                  </td>
                  <td style={{ maxWidth: 360 }}>
                    {r.subject ? <div style={{ fontWeight: 700 }}>{r.subject}</div> : null}
                    <div className="muted">
                      {expanded === r.id || r.message.length <= 140
                        ? r.message
                        : `${r.message.slice(0, 140)}…`}
                      {r.message.length > 140 && (
                        <button
                          className="mini-btn"
                          style={{ marginLeft: 8, padding: "2px 8px" }}
                          onClick={() => setExpanded(expanded === r.id ? null : r.id)}
                        >
                          {expanded === r.id ? "Less" : "More"}
                        </button>
                      )}
                    </div>
                  </td>
                  <td className="muted">{formatDate(r.created_at)}</td>
                  <td>
                    <span className={`badge ${r.is_read ? "approved" : "pending"}`}>
                      {r.is_read ? "Read" : "Unread"}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button className="mini-btn good" disabled={busy === r.id} onClick={() => toggleRead(r)}>
                        {r.is_read ? "Mark unread" : "Mark read"}
                      </button>
                      <button className="mini-btn bad" disabled={busy === r.id} onClick={() => removeRow(r)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
