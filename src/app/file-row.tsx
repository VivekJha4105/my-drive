import { FileIcon } from "lucide-react";
import { Folder as FolderIcon } from "lucide-react";
import type { files, folders } from "~/server/db/schema";

export function FileRow(props: { file: typeof files.$inferSelect }) {
  const { file } = props;

  return (
    <li
      key={file.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          {/* Since we want the file to open outside our drive without updating our current URL, we want it to be Anchor(<a></a>) tag. */}
          <a
            href={file.url ?? "#"}
            className="flex cursor-pointer items-center text-gray-100 hover:text-blue-400"
            target="_blank"
          >
            <FileIcon className="mr-3" size={20} />
            {file.name}
          </a>
        </div>
        <div className="col-span-3 text-gray-400">{"File"}</div>
        <div className="col-span-3 text-gray-400">{file.size}</div>
      </div>
    </li>
  );
}

export function FolderRow(props: {
  folder: typeof folders.$inferSelect;
  handleFolderClick: () => void;
}) {
  const { folder, handleFolderClick } = props;

  return (
    <li
      key={folder.id}
      className="hover:bg-gray-750 border-b border-gray-700 px-6 py-4"
    >
      <div className="grid grid-cols-12 items-center gap-4">
        <div className="col-span-6 flex items-center">
          <button
            onClick={() => handleFolderClick()}
            className="flex cursor-pointer items-center text-gray-100 hover:text-blue-400"
          >
            <FolderIcon className="mr-3" size={20} />
            {folder.name}
          </button>
        </div>
        <div className="col-span-3 text-gray-400">{"Folder"}</div>
        <div className="col-span-3 text-gray-400">{"--"}</div>
      </div>
    </li>
  );
}
