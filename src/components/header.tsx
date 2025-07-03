"use client";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormStore } from "@/store/form";

const Header = () => {
  const { openForm } = useFormStore();

  return (
    <header className="bg-white border-b border-gray-100 px-4 py-4 sticky top-0 z-40">
      <div className="flex items-center justify-between max-w-md mx-auto">
        <h1 className="text-xl font-semibold text-gray-900">Money Tracker</h1>
        <Button
          onClick={() => openForm()}
          size="sm"
          className="bg-black hover:bg-gray-800"
        >
          <Plus className="w-4 h-4 mr-1" />
          Nueva entrada
        </Button>
      </div>
    </header>
  );
};

export default Header;
