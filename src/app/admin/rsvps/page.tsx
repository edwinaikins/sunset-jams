import { ensureSchema, getPool } from "@/lib/db";
import AdminTopbar from "@/components/admin/AdminTopbar";
import RsvpTable, { RsvpRowClient } from "@/components/admin/RsvpTable";

export const dynamic = "force-dynamic";

async function getData() {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT id, name, email, phone, guests, notes, checked_in, created_at FROM rsvps ORDER BY created_at DESC`
  );
  return rows.map((r: any) => ({
    ...r,
    created_at: new Date(r.created_at).toISOString(),
  })) as RsvpRowClient[];
}

export default async function AdminRsvpsPage() {
  const rows = await getData();
  const totalGuests = rows.reduce((sum, r) => sum + (r.guests || 0), 0);
  const checkedIn = rows.filter((r) => r.checked_in).length;

  return (
    <>
      <AdminTopbar />
      <div className="admin-main">
        <div className="admin-stats">
          <div className="stat-tile">
            <div className="num">{rows.length}</div>
            <div className="lbl">RSVPs</div>
          </div>
          <div className="stat-tile">
            <div className="num">{totalGuests}</div>
            <div className="lbl">Total guests</div>
          </div>
          <div className="stat-tile">
            <div className="num">{checkedIn}</div>
            <div className="lbl">Checked in</div>
          </div>
          <div className="stat-tile">
            <div className="num">{rows.length - checkedIn}</div>
            <div className="lbl">Not yet in</div>
          </div>
        </div>
        <RsvpTable initialRows={rows} />
      </div>
    </>
  );
}
