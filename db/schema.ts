// schema.ts
import { decimal, int, mysqlTable, serial, text } from "drizzle-orm/mysql-core";

export const stores = mysqlTable("stores", {
  id: serial("id").primaryKey(),
  name: text("store_name"),
});

export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  name: text("name"),
  price: decimal("price"),
  description: text("description"),
  inventory: decimal("inventory"),
  storeId: int("store_id"),
});
