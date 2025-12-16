import React from "react";
import { MessageCircle, X } from "lucide-react";

interface FeedbackToggleProps {
  isEnabled: boolean;
  onToggle: () => void;
}

const FeedbackToggle: React.FC<FeedbackToggleProps> = ({
  isEnabled,
  onToggle,
}) => {
  return (
    <button
      onClick={onToggle}
      className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full shadow-lg transition-all duration-200 flex items-center justify-center ${
        isEnabled
          ? "bg-red-500 hover:bg-red-600 text-white"
          : "bg-blue-500 hover:bg-blue-600 text-white"
      }`}
      title={isEnabled ? "Exit feedback mode" : "Give feedback"}
    >
      {isEnabled ? (
        <X className="w-6 h-6" />
      ) : (
        <MessageCircle className="w-6 h-6" />
      )}
    </button>
  );
};

export default FeedbackToggle;
