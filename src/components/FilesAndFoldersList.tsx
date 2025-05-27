import { MoreVertical, Download, Share, Trash2, Star } from "lucide-react";
import type { ReactElement } from "react";
import type { FileItem } from "~/app/page";
import { Button } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";

export default function FilesAndFoldersList({
  filteredItems,
  getFileIcon,
  handleItemClick,
}: {
  filteredItems: FileItem[];
  getFileIcon: (item: FileItem) => ReactElement;
  handleItemClick: (item: FileItem) => void;
}) {
  return (
    <div className="space-y-1">
      {/* Header Row */}
      <div className="grid grid-cols-12 gap-4 border-b border-gray-700 px-4 py-2 text-sm text-gray-400">
        <div className="col-span-8">Name</div>
        <div className="col-span-2">Last modified</div>
        <div className="col-span-1">Size</div>
        <div className="col-span-1"></div>
      </div>

      {/* File Rows */}
      {filteredItems.map((item) => (
        <div
          key={item.id}
          className="group grid cursor-pointer grid-cols-12 gap-4 rounded-lg px-4 py-3 transition-colors hover:bg-gray-800"
          onClick={() => handleItemClick(item)}
        >
          <div className="col-span-8 flex min-w-0 items-center gap-3">
            {getFileIcon(item)}
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <span className="truncate font-medium text-white">
                {item.name}
              </span>

              {item.starred && (
                <Star className="h-4 w-4 fill-current text-yellow-400" />
              )}
            </div>
          </div>
          <div className="col-span-2 text-sm text-gray-400">
            {item.modified}
          </div>
          <div className="col-span-1 text-sm text-gray-400">
            {item.size ?? "-"}
          </div>
          <div className="col-span-1 flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gray-400 opacity-0 group-hover:opacity-100 hover:bg-gray-700 hover:text-white"
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="border-gray-700 bg-gray-800"
              >
                <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                  <Share className="mr-2 h-4 w-4" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem className="text-gray-300 hover:bg-gray-700">
                  <Star className="mr-2 h-4 w-4" />
                  {item.starred ? "Remove from starred" : "Add to starred"}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-gray-700" />
                <DropdownMenuItem className="text-red-400 hover:bg-gray-700">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Move to trash
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      ))}
    </div>
  );
}
