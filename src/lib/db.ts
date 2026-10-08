import { Pool } from "pg";

declare global {
  // eslint-disable-next-line no-var
  var __sjPool: Pool | undefined;
  // eslint-disable-next-line no-var
  var __sjSchemaReady: Promise<void> | undefined;
}

function createPool(): Pool {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }
  return new Pool({
    connectionString,
    ssl: connectionString.includes("localhost")
      ? undefined
      : { rejectUnauthorized: false },
    max: 3,
  });
}

export function getPool(): Pool {
  if (!global.__sjPool) {
    global.__sjPool = createPool();
  }
  return global.__sjPool;
}

const SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS rsvps (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    guests INTEGER NOT NULL DEFAULT 1,
    notes TEXT,
    checked_in BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    phone TEXT,
    party_size INTEGER NOT NULL DEFAULT 1,
    booking_type TEXT NOT NULL DEFAULT 'vip_table',
    message TEXT,
    status TEXT NOT NULL DEFAULT 'pending',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );

  CREATE TABLE IF NOT EXISTS messages (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT,
    subject TEXT,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
  );
`;

export async function ensureSchema(): Promise<void> {
  if (!global.__sjSchemaReady) {
    global.__sjSchemaReady = getPool()
      .query(SCHEMA_SQL)
      .then(() => undefined);
  }
  return global.__sjSchemaReady;
}

export type RsvpRow = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  guests: number;
  notes: string | null;
  checked_in: boolean;
  created_at: string;
};

export type BookingRow = {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  party_size: number;
  booking_type: string;
  message: string | null;
  status: string;
  created_at: string;
};

export type MessageRow = {
  id: number;
  name: string;
  email: string | null;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};
