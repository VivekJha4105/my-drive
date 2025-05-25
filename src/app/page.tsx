"use client";

import { useState } from "react";
import {
  Search,
  Upload,
  MoreVertical,
  Folder,
  FileText,
  ImageIcon,
  Video,
  Music,
  Download,
  Share,
  Trash2,
  Star,
  ChevronRight,
  Home,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

interface FileItem {
  id: string;
  name: string;
  type: "folder" | "file";
  size?: string;
  modified: string;
  owner: string;
  shared?: boolean;
  starred?: boolean;
  fileType?: "document" | "image" | "video" | "audio" | "other";
  url?: string;
  children?: FileItem[];
}

const mockData: FileItem[] = [
  {
    id: "1",
    name: "Work Projects",
    type: "folder",
    modified: "2 days ago",
    owner: "You",
    children: [
      {
        id: "1-1",
        name: "Project Proposal.docx",
        type: "file",
        size: "2.4 MB",
        modified: "1 hour ago",
        owner: "You",
        fileType: "document",
        url: "https://example.com/proposal.docx",
      },
      {
        id: "1-2",
        name: "Budget Spreadsheet.xlsx",
        type: "file",
        size: "1.8 MB",
        modified: "3 hours ago",
        owner: "John Doe",
        fileType: "document",
        shared: true,
        url: "https://example.com/budget.xlsx",
      },
      {
        id: "1-3",
        name: "Client Feedback",
        type: "folder",
        modified: "1 day ago",
        owner: "You",
        children: [
          {
            id: "1-3-1",
            name: "feedback-notes.txt",
            type: "file",
            size: "45 KB",
            modified: "1 day ago",
            owner: "You",
            fileType: "document",
            url: "https://example.com/feedback.txt",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "Photos",
    type: "folder",
    modified: "1 week ago",
    owner: "You",
    starred: true,
    children: [
      {
        id: "2-1",
        name: "vacation-2024.jpg",
        type: "file",
        size: "4.2 MB",
        modified: "1 week ago",
        owner: "You",
        fileType: "image",
        url: "https://example.com/vacation.jpg",
      },
      {
        id: "2-2",
        name: "family-dinner.jpg",
        type: "file",
        size: "3.8 MB",
        modified: "1 week ago",
        owner: "You",
        fileType: "image",
        url: "https://example.com/family.jpg",
      },
    ],
  },
  {
    id: "3",
    name: "Meeting Recording.mp4",
    type: "file",
    size: "125 MB",
    modified: "Yesterday",
    owner: "Sarah Wilson",
    fileType: "video",
    shared: true,
    url: "https://example.com/meeting.mp4",
  },
  {
    id: "4",
    name: "Presentation.pptx",
    type: "file",
    size: "8.7 MB",
    modified: "3 days ago",
    owner: "You",
    fileType: "document",
    starred: true,
    url: "https://example.com/presentation.pptx",
  },
  {
    id: "5",
    name: "Music Collection",
    type: "folder",
    modified: "2 weeks ago",
    owner: "You",
    children: [
      {
        id: "5-1",
        name: "favorite-song.mp3",
        type: "file",
        size: "5.2 MB",
        modified: "2 weeks ago",
        owner: "You",
        fileType: "audio",
        url: "https://example.com/song.mp3",
      },
    ],
  },
  {
    id: "6",
    name: "Design Assets",
    type: "folder",
    modified: "5 days ago",
    owner: "You",
    children: [
      {
        id: "6-1",
        name: "logo-design.png",
        type: "file",
        size: "2.1 MB",
        modified: "5 days ago",
        owner: "You",
        fileType: "image",
        url: "https://example.com/logo.png",
      },
      {
        id: "6-2",
        name: "brand-guidelines.pdf",
        type: "file",
        size: "12.3 MB",
        modified: "4 days ago",
        owner: "You",
        fileType: "document",
        url: "https://example.com/guidelines.pdf",
      },
    ],
  },
];

export default function GoogleDriveClone() {
  const [currentPath, setCurrentPath] = useState<string[]>(["My Drive"]);
  const [currentItems, setCurrentItems] = useState<FileItem[]>(mockData);
  const [searchQuery, setSearchQuery] = useState("");

  const getFileIcon = (item: FileItem) => {
    if (item.type === "folder") {
      return <Folder className="h-5 w-5 text-blue-400" />;
    }

    switch (item.fileType) {
      case "document":
        return <FileText className="h-5 w-5 text-blue-400" />;
      case "image":
        return <ImageIcon className="h-5 w-5 text-green-400" />;
      case "video":
        return <Video className="h-5 w-5 text-red-400" />;
      case "audio":
        return <Music className="h-5 w-5 text-purple-400" />;
      default:
        return <FileText className="h-5 w-5 text-gray-400" />;
    }
  };

  const findItemByPath = (items: FileItem[], path: string[]): FileItem[] => {
    if (path.length <= 1) return items;

    let currentItems = items;
    for (let i = 1; i < path.length; i++) {
      const folderName = path[i];
      const folder = currentItems.find(
        (item) => item.name === folderName && item.type === "folder",
      );
      if (folder?.children) {
        currentItems = folder.children;
      } else {
        return [];
      }
    }
    return currentItems;
  };

  const handleItemClick = (item: FileItem) => {
    if (item.type === "folder") {
      const newPath = [...currentPath, item.name];
      setCurrentPath(newPath);
      setCurrentItems(item.children ?? []);
    } else if (item.url) {
      window.open(item.url, "_blank");
    }
  };

  const handleBreadcrumbClick = (index: number) => {
    const newPath = currentPath.slice(0, index + 1);
    setCurrentPath(newPath);
    const items = findItemByPath(mockData, newPath);
    setCurrentItems(items);
  };

  const filteredItems = currentItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700 px-6 py-4">
        <div className="flex items-center justify-center gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600">
              <Folder className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-medium text-white">Drive</span>
          </div>

          <div className="max-w-2xl flex-1">
            <div className="relative">
              <Search className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Search in Drive"
                className="border-gray-600 bg-gray-800 pl-10 text-white placeholder-gray-400"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Upload className="mr-2 h-4 w-4" />
                  New
                </Button>
              </DialogTrigger>
              <DialogContent className="border-gray-700 bg-gray-800">
                <DialogHeader>
                  <DialogTitle className="text-white">Upload Files</DialogTitle>
                  <DialogDescription className="text-gray-400">
                    Select files to upload to your Drive
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="rounded-lg border-2 border-dashed border-gray-600 p-8 text-center">
                    <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                    <p className="text-gray-300">
                      Drag files here or click to browse
                    </p>
                    <Button
                      variant="outline"
                      className="mt-4 border-gray-600 text-gray-300 hover:bg-gray-700"
                    >
                      Choose Files
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            <Avatar className="ml-auto h-8 w-8">
              <AvatarImage src="/placeholder-user.jpg" alt="User" />
              <AvatarFallback className="bg-gray-700 text-white">
                JD
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Breadcrumb Navigation */}
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Home className="h-4 w-4 text-gray-400" />
          {currentPath.map((path, index) => (
            <div key={index} className="flex items-center gap-2">
              <button
                onClick={() => handleBreadcrumbClick(index)}
                className="text-gray-300 transition-colors hover:text-white hover:underline"
              >
                {path}
              </button>
              {index < currentPath.length - 1 && (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </div>
          ))}
        </div>

        {/* Files Count */}
        <div className="mb-4">
          <h2 className="text-lg font-medium text-white">
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "item" : "items"}
          </h2>
        </div>

        {/* Files List */}
        <div className="space-y-1">
          {/* Header Row */}
          <div className="grid grid-cols-12 gap-4 border-b border-gray-700 px-4 py-2 text-sm text-gray-400">
            <div className="col-span-6">Name</div>
            <div className="col-span-2">Owner</div>
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
              <div className="col-span-6 flex min-w-0 items-center gap-3">
                {getFileIcon(item)}
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <span className="truncate font-medium text-white">
                    {item.name}
                  </span>
                  {item.shared && (
                    <Badge
                      variant="secondary"
                      className="bg-gray-700 text-xs text-gray-300"
                    >
                      Shared
                    </Badge>
                  )}
                  {item.starred && (
                    <Star className="h-4 w-4 fill-current text-yellow-400" />
                  )}
                </div>
              </div>
              <div className="col-span-2 truncate text-sm text-gray-400">
                {item.owner}
              </div>
              <div className="col-span-2 text-sm text-gray-400">
                {item.modified}
              </div>
              <div className="col-span-1 text-sm text-gray-400">
                {item.size ?? "-"}
              </div>
              <div className="col-span-1 flex justify-end">
                <DropdownMenu>
                  <DropdownMenuTrigger
                    asChild
                    onClick={(e) => e.stopPropagation()}
                  >
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

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="py-12 text-center">
            <Folder className="mx-auto mb-4 h-16 w-16 text-gray-600" />
            <p className="text-gray-400">No files found</p>
          </div>
        )}
      </main>
    </div>
  );
}
