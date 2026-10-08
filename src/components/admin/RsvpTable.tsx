"use client";

import { useMemo, useState } from "react";

export type RsvpRowClient = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  guests: number;
  notes: string | null;
  checked_in: boolean;
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

export default function RsvpTable({ initialRows }: { initialRows: RsvpRowClient[] }) {
  const [rows, setRows] = useState(initialRows);
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        (r.email || "").toLowerCase().includes(q) ||
        (r.phone || "").toLowerCase().includes(q)
    );
  }, [rows, query]);

  async function toggleCheckedIn(row: RsvpRowClient) {
    setBusy(row.id);
    const next = !row.checked_in;
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, checked_in: next } : r)));
    try {
      const res = await fetch(`/api/admin/rsvps/${row.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checked_in: next }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, checked_in: row.checked_in } : r)));
    } finally {
      setBusy(null);
    }
  }

  async function removeRow(row: RsvpRowClient) {
    if (!confirm(`Remove ${row.name}'s RSVP? This can't be undone.`)) return;
    setBusy(row.id);
    const prevRows = rows;
    setRows((prev) => prev.filter((r) => r.id !== row.id));
    try {
      const res = await fetch(`/api/admin/rsvps/${row.id}`, { method: "DELETE" });
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
        <h2>Guest list</h2>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            className="admin-search"
            placeholder="Search name, email, phone…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <a className="mini-btn" href="/api/admin/export?type=rsvps">
            Export CSV
          </a>
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="empty-state">{rows.length === 0 ? "No RSVPs yet." : "No matches."}</div>
      ) : (
        <div className="table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Guests</th>
                <th>Notes</th>
                <th>Submitted</th>
                <th>Checked in</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((r) => (
                <tr key={r.id}>
                  <td>{r.name}</td>
                  <td>
                    {r.phone}
                    {r.email ? <div className="muted">{r.email}</div> : null}
                  </td>
                  <td>{r.guests}</td>
                  <td className="muted">{r.notes || "—"}</td>
                  <td className="muted">{formatDate(r.created_at)}</td>
                  <td>
                    <span className={`badge ${r.checked_in ? "yes" : "no"}`}>
                      {r.checked_in ? "Checked in" : "Not yet"}
                    </span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button className="mini-btn good" disabled={busy === r.id} onClick={() => toggleCheckedIn(r)}>
                        {r.checked_in ? "Undo check-in" : "Check in"}
                      </button>
                      <button className="mini-btn bad" disabled={busy === r.id} onClick={() => removeRow(r)}>
                        Remove
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
