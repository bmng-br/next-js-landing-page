import type { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from '@/models/Schema';
import { Env } from './Env';
import { logger } from './Logger';

/**
 * Closes a connection without making the caller wait for the server's acknowledgement.
 * On Workers the socket is torn down with the request anyway, and some servers (like local
 * PGlite) never close their side, which would otherwise hang the response.
 * @param client The connected client to close.
 */
const closeInBackground = async (client: Client) => {
  try {
    await client.end();
  } catch (error) {
    logger.warn(`Database connection did not close cleanly: ${String(error)}`);
  }
};

/**
 * Runs database work on a short-lived connection.
 * Cloudflare Workers can't reuse a socket across requests, so each call opens and closes its own.
 * @param work The work to run with the Drizzle client.
 * @returns The work's result.
 */
export const withDb = async <T>(work: (db: NodePgDatabase<typeof schema>) => Promise<T>) => {
  const client = new Client({ connectionString: Env.DATABASE_URL });
  await client.connect();

  try {
    return await work(drizzle({ client, schema }));
  } finally {
    void closeInBackground(client);
  }
};
