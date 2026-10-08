"use client";

import { useMemo, useState } from "react";

export type BookingRowClient = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  party_size: number;
  booking_type: string;
  package: string | null;
  message: string | null;
  status: "pending" | "approved" | "declined" | string;
  created_at: string;
};

const TYPE_LABEL: Record<string, string> = {
  vip_table: "VIP table",
  vendor: "Vendor",
  sponsor: "Sponsor",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function BookingsTable({ initialRows }: { initialRows: BookingRowClient[] }) {
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

  async function setStatus(row: BookingRowClient, status: string) {
    setBusy(row.id);
    const prevStatus = row.status;
    setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status } : r)));
    try {
      const res = await fetch(`/api/admin/bookings/${row.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) throw new Error();
    } catch {
      setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, status: prevStatus } : r)));
    } finally {
      setBusy(null);
    }
  }

  async function removeRow(row: BookingRowClient) {
    if (!confirm(`Remove ${row.name}'s request? This can't be undone.`)) return;
    setBusy(row.id);
    const prevRows = rows;
    setRows((prev) => prev.filter((r) => r.id !== row.id));
    try {
      const res = await fetch(`/api/admin/bookings/${row.id}`, { method: "DELETE" });
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
        <h2>VIP tables, vendors &amp; sponsors</h2>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <input
            className="admin-search"
            placeholder="Search name, email, phone…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <a className="mini-btn" href="/api/admin/export?type=bookings">
            Export CSV
          </a>
        </div>
      </div>
      {filtered.length === 0 ? (
        <div className="empty-state">{rows.length === 0 ? "No booking requests yet." : "No matches."}</div>
      ) : (
        <div className="table-scroll">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact</th>
                <th>Type</th>
                <th>Party</th>
                <th>Message</th>
                <th>Submitted</th>
                <th>Status</th>
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
                  <td>
                    {TYPE_LABEL[r.booking_type] || r.booking_type}
                    {r.package ? <div className="muted">{r.package}</div> : null}
                  </td>
                  <td>{r.party_size}</td>
                  <td className="muted" style={{ maxWidth: 240 }}>
                    {r.message || "—"}
                  </td>
                  <td className="muted">{formatDate(r.created_at)}</td>
                  <td>
                    <span className={`badge ${r.status}`}>{r.status}</span>
                  </td>
                  <td>
                    <div className="row-actions">
                      <button
                        className="mini-btn good"
                        disabled={busy === r.id || r.status === "approved"}
                        onClick={() => setStatus(r, "approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="mini-btn bad"
                        disabled={busy === r.id || r.status === "declined"}
                        onClick={() => setStatus(r, "declined")}
                      >
                        Decline
                      </button>
                      <button className="mini-btn" disabled={busy === r.id} onClick={() => removeRow(r)}>
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
