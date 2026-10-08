import AdminTopbar from "@/components/admin/AdminTopbar";
import ContentEditor from "@/components/admin/ContentEditor";
import { getSiteContent } from "@/lib/content-store";

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  const content = await getSiteContent();
  return (
    <>
      <AdminTopbar />
      <div className="admin-main">
        <ContentEditor initial={content} />
      </div>
    </>
  );
}
