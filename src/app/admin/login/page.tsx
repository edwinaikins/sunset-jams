"use client";

import { FormEvent, Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError("");
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: data.get("password") }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Could not log in.");
      }
      const next = params.get("next") || "/admin/rsvps";
      router.push(next);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not log in.");
      setPending(false);
    }
  }

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <h1>Sunset Jams admin</h1>
        <p className="sub">Enter the admin password to manage RSVPs, bookings and messages.</p>
        <form onSubmit={onSubmit}>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input id="password" name="password" type="password" required autoFocus />
          </div>
          <div className="form-foot">
            <button className="btn btn-primary" type="submit" disabled={pending} style={{ width: "100%", justifyContent: "center" }}>
              {pending ? "Checking…" : "Log in"}
            </button>
          </div>
          {error && <p className="admin-field-error">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
