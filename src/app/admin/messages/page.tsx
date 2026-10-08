import { ensureSchema, getPool } from "@/lib/db";
import AdminTopbar from "@/components/admin/AdminTopbar";
import MessagesTable, { MessageRowClient } from "@/components/admin/MessagesTable";

export const dynamic = "force-dynamic";

async function getData() {
  await ensureSchema();
  const { rows } = await getPool().query(
    `SELECT id, name, email, subject, message, is_read, created_at FROM messages ORDER BY created_at DESC`
  );
  return rows.map((r: any) => ({
    ...r,
    created_at: new Date(r.created_at).toISOString(),
  })) as MessageRowClient[];
}

export default async function AdminMessagesPage() {
  const rows = await getData();
  const unread = rows.filter((r) => !r.is_read).length;

  return (
    <>
      <AdminTopbar />
      <div className="admin-main">
        <div className="admin-stats">
          <div className="stat-tile">
            <div className="num">{rows.length}</div>
            <div className="lbl">Messages</div>
          </div>
          <div className="stat-tile">
            <div className="num">{unread}</div>
            <div className="lbl">Unread</div>
          </div>
        </div>
        <MessagesTable initialRows={rows} />
      </div>
    </>
  );
}
