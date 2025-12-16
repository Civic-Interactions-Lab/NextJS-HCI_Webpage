"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  createAnnotation,
  getAnnotationsForPage,
  addCommentToAnnotation,
} from "@/sanity/lib/annotations/createAnnotation";
import { RedirectToSignIn, useUser } from "@clerk/nextjs";
import { Annotation } from "../../../../../sanity.types";
import Image from "next/image";
import {
  FileText,
  Bug,
  Palette,
  Sparkles,
  Square,
  Zap,
  Accessibility,
  MessageCircle,
} from "lucide-react";

interface FeedbackOverlayProps {
  pageUrl: string;
  isEnabled: boolean;
}

const FeedbackOverlay = ({ pageUrl, isEnabled }: FeedbackOverlayProps) => {
  const { user, isSignedIn } = useUser();
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [selectedAnnotation, setSelectedAnnotation] =
    useState<Annotation | null>(null);
  const [newAnnotation, setNewAnnotation] = useState<{
    x: number;
    y: number;
    content: string;
  } | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const loadAnnotations = useCallback(async () => {
    try {
      const fetchedAnnotations = await getAnnotationsForPage(pageUrl);
      setAnnotations(fetchedAnnotations);
    } catch (error) {
      console.error("Failed to load annotations:", error);
    }
  }, [pageUrl]);

  // Fetch existing annotations
  useEffect(() => {
    if (isEnabled) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadAnnotations().then((r) => console.log(r));
    }
  }, [isEnabled, loadAnnotations]);

  // Handle click to create new annotation
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (!isCreating && e.target === overlayRef.current) {
      const currentScrollY =
        window.pageYOffset || document.documentElement.scrollTop;

      // Get position relative to the document
      const x = e.clientX;
      const y = e.clientY + currentScrollY;

      setNewAnnotation({
        x,
        y,
        content: "",
      });
      setIsCreating(true);
      setSelectedAnnotation(null);
    }
  };

  // Handle creating annotation
  const handleCreateAnnotation = async (
    content: string,
    category:
      | "content"
      | "bug"
      | "color"
      | "transition"
      | "layout"
      | "performance"
      | "accessibility"
      | "other",
  ) => {
    if (!newAnnotation) return;

    try {
      const currentScrollY =
        window.pageYOffset || document.documentElement.scrollTop;

      const annotationData = {
        pageUrl,
        content,
        author: {
          name: user?.fullName || user?.firstName || "Anonymous",
          email: user?.primaryEmailAddress?.emailAddress || "",
          avatar: user?.imageUrl || "",
        },
        position: {
          x: newAnnotation.x,
          y: newAnnotation.y,
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight,
            scrollY: currentScrollY,
          },
        },
        category,
      };

      await createAnnotation(annotationData);
      await loadAnnotations();
      setIsCreating(false);
      setNewAnnotation(null);
    } catch (error) {
      console.error("Failed to create annotation:", error);
    }
  };

  const handleAddComment = async (content: string) => {
    if (!selectedAnnotation || !user) return;

    try {
      const comment = {
        content,
        author: {
          name: user.fullName || user.firstName || "Anonymous",
          email: user.primaryEmailAddress?.emailAddress || "",
          avatar: user.imageUrl || "",
        },
      };

      await addCommentToAnnotation(selectedAnnotation._id, comment);
      await loadAnnotations();

      // Refresh the selected annotation to show new comment
      const updatedAnnotations = await getAnnotationsForPage(pageUrl);
      const updatedAnnotation = updatedAnnotations.find(
        (a: Annotation) => a._id === selectedAnnotation._id,
      );
      if (updatedAnnotation) {
        setSelectedAnnotation(updatedAnnotation);
      }
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  if (!isEnabled) return null;

  if (!isSignedIn) {
    return <RedirectToSignIn />;
  }

  return (
    <div
      ref={overlayRef}
      className="absolute inset-0 z-50 cursor-crosshair"
      style={{
        top: 0,
        left: 0,
        width: "100%",
        height: `${Math.max(document.documentElement.scrollHeight, document.body.scrollHeight)}px`,
        pointerEvents: "auto",
      }}
      onClick={handleOverlayClick}
    >
      {/* Existing annotations */}
      {annotations.map((annotation) => (
        <AnnotationMarker
          key={annotation._id}
          annotation={annotation}
          x={annotation.position?.x || 0}
          y={annotation.position?.y || 0}
          isSelected={selectedAnnotation?._id === annotation._id}
          onClick={(e) => {
            e.stopPropagation();
            // Toggle functionality - close if already selected, open if not selected
            if (selectedAnnotation?._id === annotation._id) {
              setSelectedAnnotation(null);
            } else {
              setSelectedAnnotation(annotation);
            }
            setIsCreating(false);
            setNewAnnotation(null);
          }}
        />
      ))}

      {/* New annotation being created */}
      {isCreating && newAnnotation && (
        <AnnotationCreator
          x={newAnnotation.x}
          y={newAnnotation.y}
          onSave={handleCreateAnnotation}
          onCancel={() => {
            setIsCreating(false);
            setNewAnnotation(null);
          }}
        />
      )}

      {/* Selected annotation conversation */}
      {selectedAnnotation && !isCreating && (
        <AnnotationConversation
          annotation={selectedAnnotation}
          x={selectedAnnotation.position?.x || 0}
          y={
            (selectedAnnotation.position?.y &&
              selectedAnnotation.position?.y - 32) ||
            0
          }
          onClose={() => setSelectedAnnotation(null)}
          onAddComment={handleAddComment}
        />
      )}
    </div>
  );
};

// Annotation marker component
const AnnotationMarker: React.FC<{
  annotation: Annotation;
  x: number;
  y: number;
  isSelected: boolean;
  onClick: (e: React.MouseEvent) => void;
}> = ({ annotation, x, y, isSelected, onClick }) => {
  const categoryColors = {
    content: "bg-blue-500 hover:bg-blue-600",
    bug: "bg-red-500 hover:bg-red-600",
    color: "bg-purple-500 hover:bg-purple-600",
    transition: "bg-pink-500 hover:bg-pink-600",
    layout: "bg-green-500 hover:bg-green-600",
    performance: "bg-orange-500 hover:bg-orange-600",
    accessibility: "bg-indigo-500 hover:bg-indigo-600",
    other: "bg-gray-500 hover:bg-gray-600",
  };

  const categoryIcons = {
    content: FileText,
    bug: Bug,
    color: Palette,
    transition: Sparkles,
    layout: Square,
    performance: Zap,
    accessibility: Accessibility,
    other: MessageCircle,
  };

  const commentCount = annotation.comments?.length || 0;
  const category = annotation.category || "other";
  const IconComponent = categoryIcons[category as keyof typeof categoryIcons];

  return (
    <div
      className={`absolute size-12 rounded-full border-2 border-white shadow-lg cursor-pointer flex items-center justify-center transition-all ${
        categoryColors[category as keyof typeof categoryColors]
      } ${isSelected ? "scale-110 ring-4 ring-blue-300" : ""}`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -50%)",
      }}
      onClick={onClick}
      title={`${category}: ${annotation.content?.substring(0, 100)}...`}
    >
      <IconComponent className="text-white size-6" />
      {commentCount > 0 && (
        <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {commentCount}
        </div>
      )}
    </div>
  );
};

// Annotation creator component
const AnnotationCreator: React.FC<{
  x: number;
  y: number;
  onSave: (
    content: string,
    category:
      | "content"
      | "bug"
      | "color"
      | "transition"
      | "layout"
      | "performance"
      | "accessibility"
      | "other",
  ) => void;
  onCancel: () => void;
}> = ({ x, y, onSave, onCancel }) => {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<
    | "content"
    | "bug"
    | "color"
    | "transition"
    | "layout"
    | "performance"
    | "accessibility"
    | "other"
  >("other");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (content.trim()) {
      onSave(content, category);
    }
  };

  const categoryOptions = [
    { value: "content", label: "📝 Content", icon: FileText },
    { value: "bug", label: "🐛 Bug", icon: Bug },
    { value: "color", label: "🎨 Color", icon: Palette },
    { value: "transition", label: "✨ Transition", icon: Sparkles },
    { value: "layout", label: "📐 Layout", icon: Square },
    { value: "performance", label: "⚡ Performance", icon: Zap },
    { value: "accessibility", label: "♿ Accessibility", icon: Accessibility },
    { value: "other", label: "💭 Other", icon: MessageCircle },
  ];

  return (
    <div
      className="absolute bg-white border border-gray-300 rounded-lg shadow-xl p-4 min-w-80 z-60"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -100%)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Issue Type
          </label>
          <select
            value={category}
            onChange={(e) =>
              setCategory(
                e.target.value as
                  | "content"
                  | "bug"
                  | "color"
                  | "transition"
                  | "layout"
                  | "performance"
                  | "accessibility"
                  | "other",
              )
            }
            className="w-full p-2 border border-gray-300 rounded text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            {categoryOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <textarea
          autoFocus
          className="w-full p-3 border border-gray-300 rounded resize-none text-sm"
          rows={4}
          placeholder="Describe the issue..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onClick={(e) => e.stopPropagation()}
        />
        <div className="flex justify-end gap-2 mt-3">
          <button
            type="button"
            className="px-4 py-2 text-sm bg-gray-200 rounded hover:bg-gray-300 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onCancel();
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            disabled={!content.trim()}
          >
            Start Conversation
          </button>
        </div>
      </form>
    </div>
  );
};

interface AnnotationConversationProps {
  annotation: Annotation;
  x: number;
  y: number;
  onClose: () => void;
  onAddComment: (content: string) => void;
}

const AnnotationConversation = ({
  annotation,
  x,
  y,
  onClose,
  onAddComment,
}: AnnotationConversationProps) => {
  const [newComment, setNewComment] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  };

  useEffect(() => {
    scrollToBottom();
  }, [annotation.comments]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  const categoryColors = {
    content: "bg-blue-100 text-blue-800 border-blue-200",
    bug: "bg-red-100 text-red-800 border-red-200",
    color: "bg-purple-100 text-purple-800 border-purple-200",
    transition: "bg-pink-100 text-pink-800 border-pink-200",
    layout: "bg-green-100 text-green-800 border-green-200",
    performance: "bg-orange-100 text-orange-800 border-orange-200",
    accessibility: "bg-indigo-100 text-indigo-800 border-indigo-200",
    other: "bg-gray-100 text-gray-800 border-gray-200",
  };

  const category = annotation.category || "other";

  const allMessages = [
    {
      content: annotation.content,
      author: annotation.author,
      createdAt: annotation.createdAt,
      isOriginal: true,
    },
    ...(annotation.comments || []).map((comment) => ({
      ...comment,
      isOriginal: false,
    })),
  ];

  return (
    <div
      className="absolute bg-white border border-gray-300 rounded-lg shadow-xl min-w-96 max-w-md z-60 max-h-96 flex flex-col"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -100%)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 shrink-0">
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 text-xs rounded border ${categoryColors[category as keyof typeof categoryColors]}`}
          >
            {category}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="text-gray-400 hover:text-gray-600 text-lg"
        >
          ×
        </button>
      </div>

      {/* Messages - Scrollable area */}
      <div className="flex-1 overflow-y-auto p-4 min-h-0">
        {allMessages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 ${message.isOriginal ? "pb-2 border-b border-gray-100" : ""}`}
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-300 shrink-0 flex items-center justify-center">
                {message.author?.avatar ? (
                  <Image
                    src={message.author.avatar}
                    alt={message.author.name || "User"}
                    width={32}
                    height={32}
                    className="w-8 h-8 rounded-full"
                  />
                ) : (
                  <span className="text-xs font-medium text-gray-600">
                    {(message.author?.name || "U").charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {message.author?.name || "Anonymous"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {message.createdAt
                      ? new Date(message.createdAt).toLocaleDateString()
                      : ""}
                  </span>
                </div>
                <p className="text-sm text-gray-800 wrap-break-word">
                  {message.content}
                </p>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Comment input - Fixed at bottom */}
      <div className="p-4 border-t border-gray-200 shrink-0">
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 border border-gray-300 rounded text-sm resize-none"
            rows={2}
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                handleSubmit(e);
              }
            }}
          />
          <div className="flex justify-end gap-2 mt-2">
            <button
              type="submit"
              className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              disabled={!newComment.trim()}
            >
              Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackOverlay;
