"use client";

import React from "react";
import { MessageCircle, X } from "lucide-react";

interface FeedbackToggleProps {
  isEnabled: boolean;
  onToggle: () => void;
}

const FeedbackToggle = ({ isEnabled, onToggle }: FeedbackToggleProps) => {
  return (
    <button
      onClick={onToggle}
      className={`fixed bottom-6 right-6 z-999 w-14 h-14 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center ${
        isEnabled
          ? "bg-red-500 hover:bg-red-600 text-white"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      }`}
      title={isEnabled ? "Exit feedback mode" : "Enable feedback mode"}
    >
      {isEnabled ? <X size={24} /> : <MessageCircle size={24} />}
    </button>
  );
};

export default FeedbackToggle;
