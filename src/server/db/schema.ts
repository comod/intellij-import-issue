import {
    pgTable,
    serial,
    varchar,
    timestamp,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { type z } from "zod";

export const dbSchema = pgTable("app_dbSchema", {
    id: serial("id").primaryKey(),
    name: varchar("name"),
    createdAt: timestamp("created_at").defaultNow(),
});


export const fooCreateZod = createInsertSchema(dbSchema);

export const barZod = fooCreateZod;

export type FooSchema = z.infer<typeof barZod>;