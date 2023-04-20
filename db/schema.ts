// schema.ts
import { mysqlTable, serial, text, varchar } from "drizzle-orm/mysql-core";

export const stores = mysqlTable("stores", {
  id: serial("id").primaryKey(),
  name: text("store_name"),
});
