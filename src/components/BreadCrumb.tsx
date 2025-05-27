import { ChevronRight, Home } from "lucide-react";

export default function BreadCrumb({
  currentPath,
  handleBreadcrumbClick,
}: {
  currentPath: string[];
  handleBreadcrumbClick: (index: number) => void;
}) {
  return (
    <div className="mb-6 flex items-center gap-2 text-sm">
      <Home className="h-4 w-4 text-gray-400" />
      {currentPath.map((path, index) => (
        <div key={index} className="flex items-center gap-2">
          <button
            onClick={() => handleBreadcrumbClick(index)}
            className="cursor-pointer text-gray-300 transition-colors hover:text-white hover:underline"
          >
            {path}
          </button>
          {index < currentPath.length - 1 && (
            <ChevronRight className="h-4 w-4 text-gray-500" />
          )}
        </div>
      ))}
    </div>
  );
}
