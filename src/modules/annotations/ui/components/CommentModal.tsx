import React, { useState, useEffect, useRef } from "react";
import { X, Send, MoreHorizontal, Check, Trash2 } from "lucide-react";
import { Annotation } from "@/modules/annotations/hooks/useAnnotations";

interface CommentModalProps {
  annotation?: Annotation;
  position?: { x: number; y: number };
  isNewAnnotation?: boolean;
  isPopover?: boolean; // New prop to indicate if it's inside a popover
  onSubmit?: (content: string, author: string) => void;
  onCancel?: () => void;
  onClose?: () => void;
  onAddComment?: (content: string, author: string) => void;
  onToggleResolved?: () => void;
  onDelete?: () => void;
}

const CommentModal = ({
  annotation,
  position,
  isNewAnnotation = false,
  isPopover = false,
  onSubmit,
  onCancel,
  onClose,
  onAddComment,
  onToggleResolved,
  onDelete,
}: CommentModalProps) => {
  const [comment, setComment] = useState("");
  const [author, setAuthor] = useState("Anonymous");
  const [showMenu, setShowMenu] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const commentsScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (commentsScrollRef.current && annotation?.comments) {
      const scrollContainer = commentsScrollRef.current;
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [annotation?.comments.length]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    if (isNewAnnotation && onSubmit) {
      onSubmit(comment, author);
    } else if (onAddComment) {
      onAddComment(comment, author);
      // Small delay to ensure DOM update, then scroll and refocus
      setTimeout(() => {
        if (commentsScrollRef.current) {
          commentsScrollRef.current.scrollTo({
            top: commentsScrollRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
        if (textareaRef.current) {
          textareaRef.current.focus();
        }
      }, 50);
    }

    setComment("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Calculate modal position for new annotations (not in popover)
  const modalPosition =
    position && !isPopover
      ? {
          left: Math.min(position.x + 10, window.innerWidth - 350),
          top: Math.min(position.y + 10, window.innerHeight - 400),
        }
      : undefined;

  // For existing annotations not in popover, position relative to center
  const existingAnnotationStyle =
    annotation && !position && !isPopover
      ? {
          position: "fixed" as const,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 10000,
        }
      : {};

  // Base modal classes - don't include positioning when in popover
  const baseClasses =
    "bg-white rounded-lg shadow-xl border border-gray-200 w-80 max-h-96 overflow-hidden";
  const modalClasses = isPopover
    ? baseClasses
    : `fixed ${baseClasses} z-[10000]`;

  const modalStyle = isPopover
    ? {}
    : position
      ? modalPosition
      : existingAnnotationStyle;

  return (
    <div
      ref={modalRef}
      data-comment-modal
      className={modalClasses}
      style={modalStyle}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h3 className="font-medium text-gray-900">
          {isNewAnnotation ? "Add Comment" : "Comments"}
        </h3>
        <div className="flex items-center space-x-2">
          {annotation && !isNewAnnotation && (
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <MoreHorizontal className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={isNewAnnotation ? onCancel : onClose}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Menu dropdown */}
      {showMenu && annotation && (
        <div className="absolute right-4 top-12 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-32">
          <button
            onClick={() => {
              onToggleResolved?.();
              setShowMenu(false);
            }}
            className="flex items-center space-x-2 w-full px-3 py-2 text-sm hover:bg-gray-50 text-left"
          >
            <Check className="w-4 h-4" />
            <span>{annotation.resolved ? "Unresolve" : "Resolve"}</span>
          </button>
          <button
            onClick={() => {
              onDelete?.();
              setShowMenu(false);
            }}
            className="flex items-center space-x-2 w-full px-3 py-2 text-sm hover:bg-gray-50 text-red-600"
          >
            <Trash2 className="w-4 h-4" />
            <span>Delete</span>
          </button>
        </div>
      )}

      {/* Existing comments */}
      {annotation && !isNewAnnotation && (
        <div ref={commentsScrollRef} className="max-h-48 overflow-y-auto">
          {/* Original comment */}
          <div className="p-4 border-b border-gray-50">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-medium">
                {annotation.author.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-sm">
                    {annotation.author}
                  </span>
                  <span className="text-xs text-gray-500">
                    {annotation.timestamp.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-900 mt-1">
                  {annotation.content}
                </p>
              </div>
            </div>
          </div>

          {/* Additional comments */}
          {annotation.comments.map((comment, index) => (
            <div
              key={`${comment.id}-${index}`}
              className="p-4 border-b border-gray-50"
            >
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gray-400 text-white rounded-full flex items-center justify-center text-sm font-medium">
                  {comment.author.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm">
                      {comment.author}
                    </span>
                    <span className="text-xs text-gray-500">
                      {comment.timestamp.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-900 mt-1">
                    {comment.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Comment form */}
      {!annotation?.resolved && (
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100">
          <div className="space-y-3">
            {isNewAnnotation && (
              <input
                type="text"
                placeholder="Your name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            )}
            <div className="relative">
              <textarea
                ref={textareaRef}
                placeholder={
                  isNewAnnotation
                    ? "Add a comment..."
                    : "Add another comment..."
                }
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={3}
                className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                disabled={!comment.trim()}
                className="absolute bottom-2 right-2 p-1.5 bg-blue-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600"
              >
                <Send className="w-3 h-3" />
              </button>
            </div>
            {/*<p className="text-xs text-gray-500">Press Enter to submit</p>*/}
          </div>
        </form>
      )}

      {annotation?.resolved && (
        <div className="p-4 bg-green-50 text-center">
          <p className="text-sm text-green-700 font-medium">
            This comment has been resolved
          </p>
        </div>
      )}
    </div>
  );
};

export default CommentModal;
