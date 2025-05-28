import { int, bigint, text, singlestoreTable, date, boolean } from "drizzle-orm/singlestore-core";

export const users = singlestoreTable("users_table", {
  id: bigint("id", { mode: "bigint" }).primaryKey().autoincrement(),
  name: text("name"),
  age: int("age"),
});

export const fileItems = singlestoreTable("fileItems_table", {
  id: int("id").primaryKey().autoincrement(),
  name: text("name"),
  type: text("type"),
  size: int("size"),
  modified: date("modified"),
  starred: boolean("starred"),
  fileType: text("fileType"),
  url: text("url"),
})