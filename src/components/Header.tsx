import { Search, Upload, Folder } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

export default function Header({
  searchQuery,
  setSearchQuery,
}: {
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}) {
  return (
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
  );
}
