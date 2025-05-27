import { drizzle } from "drizzle-orm/singlestore";
import { createPool, type Pool } from "mysql2/promise";
import { env } from "~/env";
import * as schema from "./schema";

//! Connection Pool to a SingleStore Database ===>> Using mysql2/promise driver
//! Then using drizzle ORM to bind this connection to our SingleStore database schema

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */

/**
 *
 * A connection pool:
 * - Is a cache of open database connections.
 * - Prevents the overhead of creating a new connection for every query.
 * - Handles multiple queries efficiently using a pool of reusable connections.
 *
 * Here, mysql2/promise handles the pool for you under the hood.
 *
*/

//! The Pool must be created within server/db as drizzle.config file doesnt work with Pool.

const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
};

const conn = globalForDb.conn ??
  createPool({
    host: env.SINGLESTORE_HOST,
    port: parseInt(env.SINGLESTORE_PORT),
    user: env.SINGLESTORE_USER,
    password: env.SINGLESTORE_PASSWORD,
    database: env.SINGLESTORE_DB_NAME,
    ssl: {},
    maxIdle: 0,
  });

if (env.NODE_ENV !== "production") globalForDb.conn = conn;

conn.addListener("error", (err) => {
  console.error("Database connection error: ", err)
});


export const db = drizzle(conn, { schema });
