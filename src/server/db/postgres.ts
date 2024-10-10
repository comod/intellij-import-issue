import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import { env } from "@/env";

import * as schema from "./schema";

const client = new Client({
    host: env.POSTGRES_HOST,
    port: env.POSTGRES_PORT,
    user: env.POSTGRES_USER,
    password: env.POSTGRES_PASSWORD,
    database: env.POSTGRES_DB,
});

await client.connect();
export const db = drizzle(client, { schema });
