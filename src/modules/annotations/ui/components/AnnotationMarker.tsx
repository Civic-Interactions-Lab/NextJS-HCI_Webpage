import React from "react";
import { CheckCircle } from "lucide-react";
import { Annotation } from "@/modules/annotations/hooks/useAnnotations";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import CommentModal from "./CommentModal";
import { categoryConfig } from "@/modules/annotations/config/categoryConfig";

interface AnnotationMarkerProps {
  annotation: Annotation;
  position: { x: number; y: number };
  isActive: boolean;
  onClick: () => void;
  onAddComment: (content: string) => void;
  onToggleResolved: () => void;
  onDelete: () => void;
}

const AnnotationMarker = ({
  annotation,
  position,
  isActive,
  onClick,
  onAddComment,
  onToggleResolved,
  onDelete,
}: AnnotationMarkerProps) => {
  const commentCount = annotation.comments.length;
  const hasComments = commentCount > 0;

  const categoryInfo = categoryConfig[annotation.category];
  const CategoryIcon = categoryInfo.icon;

  return (
    <div
      data-annotation
      className="absolute pointer-events-auto"
      style={{
        left: position.x,
        top: position.y,
        zIndex: 9999,
      }}
    >
      <Popover open={isActive} onOpenChange={(open) => !open && onClick()}>
        <PopoverTrigger asChild>
          {/* Main marker */}
          <Button
            onClick={onClick}
            className={`relative flex items-center justify-center size-12 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
              annotation.resolved
                ? "bg-green-100 border-green-500 text-green-700"
                : isActive
                  ? `bg-white ${categoryInfo.borderColor} ${categoryInfo.textColor} shadow-lg`
                  : `bg-white ${categoryInfo.borderColor} ${categoryInfo.textColor} shadow-lg hover:shadow-xl`
            }`}
          >
            {annotation.resolved ? (
              <CheckCircle className="size-6" />
            ) : (
              <CategoryIcon className="size-6" />
            )}

            {/* Comment count indicator */}
            {hasComments && !annotation.resolved && (
              <div
                className={`absolute -top-1 -right-1 ${categoryInfo.color} text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold`}
              >
                {commentCount > 9 ? "9+" : commentCount}
              </div>
            )}
          </Button>
        </PopoverTrigger>

        <PopoverContent
          className="w-80 p-0 border-0 shadow-none"
          side="top"
          sideOffset={10}
          align="start"
          collisionPadding={20}
        >
          <CommentModal
            annotation={annotation}
            onClose={onClick} // This will close the popover
            onAddComment={onAddComment}
            onToggleResolved={onToggleResolved}
            onDelete={onDelete}
            isPopover={true} // Indicates it's in a popover
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default AnnotationMarker;
