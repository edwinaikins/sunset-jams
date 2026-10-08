import { ensureSchema, getPool } from "@/lib/db";
import AdminTopbar from "@/components/admin/AdminTopbar";
import BookingsTable, { BookingRowClient } from "@/components/admin/BookingsTable";

export const dynamic = "force-dynamic";

async function getData() {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT id, name, email, phone, party_size, booking_type, message, status, created_at FROM bookings ORDER BY created_at DESC`
  );
  return rows.map((r: any) => ({
    ...r,
    created_at: new Date(r.created_at).toISOString(),
  })) as BookingRowClient[];
}

export default async function AdminBookingsPage() {
  const rows = await getData();
  const pending = rows.filter((r) => r.status === "pending").length;
  const approved = rows.filter((r) => r.status === "approved").length;
  const vendors = rows.filter((r) => r.booking_type !== "vip_table").length;

  return (
    <>
      <AdminTopbar />
      <div className="admin-main">
        <div className="admin-stats">
          <div className="stat-tile">
            <div className="num">{rows.length}</div>
            <div className="lbl">Total requests</div>
          </div>
          <div className="stat-tile">
            <div className="num">{pending}</div>
            <div className="lbl">Pending</div>
          </div>
          <div className="stat-tile">
            <div className="num">{approved}</div>
            <div className="lbl">Approved</div>
          </div>
          <div className="stat-tile">
            <div className="num">{vendors}</div>
            <div className="lbl">Vendor / sponsor</div>
          </div>
        </div>
        <BookingsTable initialRows={rows} />
      </div>
    </>
  );
}
