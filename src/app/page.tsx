import { db } from "~/server/db";
import {
  files as filesSchema,
  folders as foldersSchema,
} from "~/server/db/schema";
import DriveContent from "./drive-contents";

export default async function MyDrive() {
  const files = await db.select().from(filesSchema);
  const folders = await db.select().from(foldersSchema);

  return (
    <main className="p-6">
      <DriveContent files={files} folders={folders} />
    </main>
  );
}
