// schema.ts
import { InferModel } from "drizzle-orm";
import {
  decimal,
  int,
  json,
  mysqlTable,
  serial,
  text,
} from "drizzle-orm/mysql-core";

export const stores = mysqlTable("stores", {
  id: serial("id").primaryKey(),
  name: text("store_name"),
  industry: text("industry"),
  description: text("description"),
});

export type Store = InferModel<typeof stores>;

export const products = mysqlTable("products", {
  id: serial("id").primaryKey(),
  name: text("name"),
  price: decimal("price").default("0"),
  description: text("description"),
  inventory: decimal("inventory").default("0"),
  images: json("images").default([]),
  storeId: int("store_id"),
});
export type Product = InferModel<typeof products>;
