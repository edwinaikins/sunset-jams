"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const TABS = [
  { href: "/admin/rsvps", label: "RSVPs" },
  { href: "/admin/bookings", label: "VIP & Bookings" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/content", label: "Site content" },
];

export default function AdminTopbar() {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="admin-topbar">
      <div className="brand">
        <span className="brand-mark">JG</span>
        <span>
          SUNSET JAMS
          <small>Admin</small>
        </span>
      </div>
      <div className="admin-tabs">
        {TABS.map((t) => (
          <Link key={t.href} href={t.href} className={`admin-tab${pathname === t.href ? " active" : ""}`}>
            {t.label}
          </Link>
        ))}
      </div>
      <button className="admin-logout" onClick={logout}>
        Log out
      </button>
    </div>
  );
}
