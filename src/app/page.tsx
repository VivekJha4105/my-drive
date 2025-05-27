"use client";

import { useState } from "react";
import { Folder, FileText, ImageIcon, Video, Music } from "lucide-react";
import Header from "~/components/Header";
import BreadCrumb from "~/components/BreadCrumb";
import FilesAndFoldersList from "~/components/FilesAndFoldersList";

export interface FileItem {
  id: string;
  name: string;
  type: "folder" | "file";
  size?: string;
  modified: string;
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
    children: [
      {
        id: "1-1",
        name: "Project Proposal.docx",
        type: "file",
        size: "2.4 MB",
        modified: "1 hour ago",
        fileType: "document",
        url: "https://example.com/proposal.docx",
      },
      {
        id: "1-2",
        name: "Budget Spreadsheet.xlsx",
        type: "file",
        size: "1.8 MB",
        modified: "3 hours ago",
        fileType: "document",
        url: "https://example.com/budget.xlsx",
      },
      {
        id: "1-3",
        name: "Client Feedback",
        type: "folder",
        modified: "1 day ago",
        children: [
          {
            id: "1-3-1",
            name: "feedback-notes.txt",
            type: "file",
            size: "45 KB",
            modified: "1 day ago",
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
    starred: true,
    children: [
      {
        id: "2-1",
        name: "vacation-2024.jpg",
        type: "file",
        size: "4.2 MB",
        modified: "1 week ago",
        fileType: "image",
        url: "https://example.com/vacation.jpg",
      },
      {
        id: "2-2",
        name: "family-dinner.jpg",
        type: "file",
        size: "3.8 MB",
        modified: "1 week ago",
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
    fileType: "video",
    url: "https://example.com/meeting.mp4",
  },
  {
    id: "4",
    name: "Presentation.pptx",
    type: "file",
    size: "8.7 MB",
    modified: "3 days ago",
    fileType: "document",
    starred: true,
    url: "https://example.com/presentation.pptx",
  },
  {
    id: "5",
    name: "Music Collection",
    type: "folder",
    modified: "2 weeks ago",
    children: [
      {
        id: "5-1",
        name: "favorite-song.mp3",
        type: "file",
        size: "5.2 MB",
        modified: "2 weeks ago",
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
    children: [
      {
        id: "6-1",
        name: "logo-design.png",
        type: "file",
        size: "2.1 MB",
        modified: "5 days ago",
        fileType: "image",
        url: "https://example.com/logo.png",
      },
      {
        id: "6-2",
        name: "brand-guidelines.pdf",
        type: "file",
        size: "12.3 MB",
        modified: "4 days ago",
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
    const folderName = path[path.length - 1];
    const folder = currentItems.find(
      (item) => item.name === folderName && item.type === "folder",
    );
    if (folder?.children) {
      currentItems = folder.children;
    } else {
      return [];
    }
    return currentItems;

    // let currentItems = items;
    // for (let i = 1; i < path.length; i++) {
    //   const folderName = path[i];
    //   const folder = currentItems.find(
    //     (item) => item.name === folderName && item.type === "folder",
    //   );
    //   if (folder?.children) {
    //     currentItems = folder.children;
    //   } else {
    //     return [];
    //   }
    // }
    // return currentItems;
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
      <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Main Content */}
      <main className="p-6 md:px-16">
        {/* Breadcrumb Navigation */}
        <BreadCrumb
          currentPath={currentPath}
          handleBreadcrumbClick={handleBreadcrumbClick}
        />

        {/* Files Count */}
        <div className="mb-4">
          <h2 className="text-lg font-medium text-white">
            {filteredItems.length}{" "}
            {filteredItems.length === 1 ? "item" : "items"}
          </h2>
        </div>

        {/* Files List */}
        <FilesAndFoldersList
          filteredItems={filteredItems}
          getFileIcon={getFileIcon}
          handleItemClick={handleItemClick}
        />

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
