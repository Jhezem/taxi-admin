"use client";

import React from "react";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { useFormStore } from "@/store/form";

const Footer = () => {
  const { openForm } = useFormStore();

  return (
    <div className="fixed bottom-6 inset-x-0 flex justify-center md:hidden">
      <Button
        onClick={() => openForm()}
        size="lg"
        className="w-14 h-14 rounded-full bg-black hover:bg-gray-800 shadow-lg"
      >
        <Plus className="w-6 h-6" />
      </Button>
    </div>
  );
};

export default Footer;
