"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  createAnnotation,
  getAnnotationsForPage,
  updateAnnotationStatus,
} from "@/sanity/lib/annotations/createAnnotation";

interface FeedbackOverlayProps {
  pageUrl: string;
  isEnabled: boolean;
  onToggle: () => void;
}

interface Annotation {
  _id: string;
  content: string;
  author: {
    name: string;
    email?: string;
    avatar?: string;
  };
  position: {
    x: number;
    y: number;
    viewport: {
      width: number;
      height: number;
      scrollY: number;
    };
  };
  priority: "low" | "medium" | "high" | "critical";
  tags: string[];
  status: "open" | "in-progress" | "resolved" | "rejected";
  createdAt: string;
  replies?: any[];
}

const FeedbackOverlay: React.FC<FeedbackOverlayProps> = ({
  pageUrl,
  isEnabled,
  onToggle,
}) => {
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

  // Fetch existing annotations
  useEffect(() => {
    if (isEnabled) {
      loadAnnotations();
    }
  }, [isEnabled, pageUrl]);

  const loadAnnotations = async () => {
    try {
      const fetchedAnnotations = await getAnnotationsForPage(pageUrl);
      setAnnotations(fetchedAnnotations);
    } catch (error) {
      console.error("Failed to load annotations:", error);
    }
  };

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
    priority: "low" | "medium" | "high" | "critical" = "medium",
  ) => {
    if (!newAnnotation) return;

    try {
      const currentScrollY =
        window.pageYOffset || document.documentElement.scrollTop;

      const annotationData = {
        pageUrl,
        content,
        author: {
          name: "Current User", // Replace with actual user data
          email: "user@example.com",
        },
        position: {
          x: newAnnotation.x,
          y: newAnnotation.y, // Store document position
          viewport: {
            width: window.innerWidth,
            height: window.innerHeight,
            scrollY: currentScrollY,
          },
        },
        priority,
        tags: [],
        status: "open" as const,
      };

      await createAnnotation(annotationData);
      await loadAnnotations(); // Refresh annotations
      setIsCreating(false);
      setNewAnnotation(null);
    } catch (error) {
      console.error("Failed to create annotation:", error);
    }
  };

  if (!isEnabled) return null;

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
          x={annotation.position.x}
          y={annotation.position.y}
          isSelected={selectedAnnotation?._id === annotation._id}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedAnnotation(annotation);
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

      {/* Selected annotation details */}
      {selectedAnnotation && !isCreating && (
        <AnnotationDetails
          annotation={selectedAnnotation}
          x={selectedAnnotation.position.x}
          y={selectedAnnotation.position.y}
          onClose={() => setSelectedAnnotation(null)}
          onStatusChange={async (status) => {
            try {
              await updateAnnotationStatus(selectedAnnotation._id, status);
              await loadAnnotations();
              setSelectedAnnotation(null);
            } catch (error) {
              console.error("Failed to update status:", error);
            }
          }}
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
  const priorityColors = {
    low: "bg-green-500 hover:bg-green-600",
    medium: "bg-yellow-500 hover:bg-yellow-600",
    high: "bg-orange-500 hover:bg-orange-600",
    critical: "bg-red-500 hover:bg-red-600",
  };

  const statusColors = {
    open: "border-white",
    "in-progress": "border-blue-300",
    resolved: "border-green-300",
    rejected: "border-red-300",
  };

  return (
    <div
      className={`absolute w-8 h-8 rounded-full border-4 shadow-lg cursor-pointer flex items-center justify-center transition-all ${
        priorityColors[annotation.priority]
      } ${statusColors[annotation.status]} ${
        isSelected ? "scale-110 ring-4 ring-blue-300" : ""
      }`}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -50%)",
      }}
      onClick={onClick}
      title={`${annotation.content.substring(0, 100)}...`}
    >
      <span className="text-white text-xs font-bold">
        {annotation.priority === "critical"
          ? "!"
          : annotation.priority.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};

// Annotation creator component
const AnnotationCreator: React.FC<{
  x: number;
  y: number;
  onSave: (
    content: string,
    priority: "low" | "medium" | "high" | "critical",
  ) => void;
  onCancel: () => void;
}> = ({ x, y, onSave, onCancel }) => {
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState<
    "low" | "medium" | "high" | "critical"
  >("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      onSave(content, priority);
    }
  };

  return (
    <div
      className="absolute bg-white border border-gray-300 rounded-lg shadow-xl p-4 min-w-80 z-60"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -100%)",
      }}
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as any)}
            className="w-full p-2 border border-gray-300 rounded text-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>
        <textarea
          autoFocus
          className="w-full p-3 border border-gray-300 rounded resize-none text-sm"
          rows={4}
          placeholder="Add your feedback..."
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
            Save Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

// Annotation details component
const AnnotationDetails: React.FC<{
  annotation: Annotation;
  x: number;
  y: number;
  onClose: () => void;
  onStatusChange: (
    status: "open" | "in-progress" | "resolved" | "rejected",
  ) => void;
}> = ({ annotation, x, y, onClose, onStatusChange }) => {
  return (
    <div
      className="absolute bg-white border border-gray-300 rounded-lg shadow-xl p-4 min-w-80 max-w-96 z-60"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -100%)",
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-1 text-xs rounded ${
              annotation.priority === "critical"
                ? "bg-red-100 text-red-800"
                : annotation.priority === "high"
                  ? "bg-orange-100 text-orange-800"
                  : annotation.priority === "medium"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-green-100 text-green-800"
            }`}
          >
            {annotation.priority}
          </span>
          <span
            className={`px-2 py-1 text-xs rounded ${
              annotation.status === "resolved"
                ? "bg-green-100 text-green-800"
                : annotation.status === "in-progress"
                  ? "bg-blue-100 text-blue-800"
                  : annotation.status === "rejected"
                    ? "bg-red-100 text-red-800"
                    : "bg-gray-100 text-gray-800"
            }`}
          >
            {annotation.status.replace("-", " ")}
          </span>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="text-gray-400 hover:text-gray-600"
        >
          ×
        </button>
      </div>

      <p className="text-sm text-gray-800 mb-3">{annotation.content}</p>

      <div className="text-xs text-gray-500 mb-3">
        By {annotation.author.name} •{" "}
        {new Date(annotation.createdAt).toLocaleDateString()}
      </div>

      <div className="flex gap-2">
        <select
          value={annotation.status}
          onChange={(e) => onStatusChange(e.target.value as any)}
          className="flex-1 p-2 border border-gray-300 rounded text-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <option value="open">Open</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
    </div>
  );
};

export default FeedbackOverlay;
