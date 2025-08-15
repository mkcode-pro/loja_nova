import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Search } from "lucide-react";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchOverlay = ({ isOpen, onClose }: SearchOverlayProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col p-4">
      <div className="flex justify-end">
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-6 w-6" />
        </Button>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-md">
          <div className="relative">
            <Input
              placeholder="O que você está procurando?"
              className="h-12 text-lg pl-12 rounded-full"
              autoFocus
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>
  );
};