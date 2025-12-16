import React, { useState, useEffect } from "react";
import {
  MessageCircle,
  Clock,
  User,
  Tag,
  CheckCircle,
  Circle,
  XCircle,
} from "lucide-react";
import { getAnnotationsForPage } from "@/sanity/lib/annotations/createAnnotation";

interface AnnotationData {
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
    };
  };
  priority: "low" | "medium" | "high" | "critical";
  status: "open" | "in-progress" | "resolved" | "rejected";
  tags: string[];
  createdAt: string;
  updatedAt: string;
  replies?: Array<{
    content: string;
    author: {
      name: string;
      email?: string;
      avatar?: string;
    };
    createdAt: string;
  }>;
}

interface AnnotationDisplayProps {
  pageUrl: string;
  isVisible: boolean;
  refreshTrigger?: number; // Used to trigger refresh when new annotations are added
}

const AnnotationDisplay: React.FC<AnnotationDisplayProps> = ({
  pageUrl,
  isVisible,
  refreshTrigger,
}) => {
  const [annotations, setAnnotations] = useState<AnnotationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedAnnotation, setSelectedAnnotation] = useState<string | null>(
    null,
  );

  const fetchAnnotations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAnnotationsForPage(pageUrl);
      setAnnotations(data || []);
    } catch (err) {
      console.error("Failed to fetch annotations:", err);
      setError("Failed to load feedback");
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch when visible
  useEffect(() => {
    if (isVisible) {
      fetchAnnotations();
    }
  }, [pageUrl, isVisible]);

  // Refresh when refreshTrigger changes
  useEffect(() => {
    if (isVisible && refreshTrigger !== undefined && refreshTrigger > 0) {
      fetchAnnotations();
    }
  }, [refreshTrigger, isVisible]);

  const getStatusIcon = (status: AnnotationData["status"]) => {
    switch (status) {
      case "open":
        return <Circle className="w-4 h-4 text-red-500" />;
      case "in-progress":
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case "resolved":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "rejected":
        return <XCircle className="w-4 h-4 text-gray-500" />;
      default:
        return <Circle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: AnnotationData["priority"]) => {
    switch (priority) {
      case "critical":
        return "bg-red-100 text-red-800 border-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 border-blue-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return (
      date.toLocaleDateString() +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  const calculateRelativePosition = (annotation: AnnotationData) => {
    const currentViewport = {
      width: window.innerWidth,
      height: window.innerHeight,
    };

    // Calculate relative position based on current vs original viewport
    const relativeX =
      (annotation.position.x / annotation.position.viewport.width) *
      currentViewport.width;
    const relativeY =
      (annotation.position.y / annotation.position.viewport.height) *
      currentViewport.height;

    return { x: relativeX, y: relativeY };
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Annotation Pins */}
      {annotations.map((annotation) => {
        const position = calculateRelativePosition(annotation);
        return (
          <div
            key={annotation._id}
            className="fixed z-40 cursor-pointer transform -translate-x-1/2 -translate-y-1/2"
            style={{ left: position.x, top: position.y }}
            onClick={() =>
              setSelectedAnnotation(
                selectedAnnotation === annotation._id ? null : annotation._id,
              )
            }
          >
            {/* Pin */}
            <div
              className={`w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center
              ${
                annotation.status === "resolved"
                  ? "bg-green-500"
                  : annotation.status === "in-progress"
                    ? "bg-yellow-500"
                    : annotation.priority === "critical"
                      ? "bg-red-500"
                      : annotation.priority === "high"
                        ? "bg-orange-500"
                        : "bg-blue-500"
              }`}
            >
              <MessageCircle className="w-3 h-3 text-white" />
            </div>

            {/* Annotation Details Popup */}
            {selectedAnnotation === annotation._id && (
              <div
                className="absolute top-8 left-0 w-80 bg-white rounded-lg shadow-xl border p-4 z-50"
                style={{
                  left: Math.min(0, window.innerWidth - position.x - 320 - 20),
                  maxHeight: "400px",
                  overflowY: "auto",
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {getStatusIcon(annotation.status)}
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(annotation.priority)}`}
                    >
                      {annotation.priority}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 capitalize">
                    {annotation.status.replace("-", " ")}
                  </span>
                </div>

                {/* Content */}
                <div className="mb-3">
                  <p className="text-sm text-gray-900 leading-relaxed">
                    {annotation.content}
                  </p>
                </div>

                {/* Author & Date */}
                <div className="flex items-center gap-2 mb-3 text-xs text-gray-600">
                  <User className="w-3 h-3" />
                  <span>{annotation.author.name}</span>
                  <span>•</span>
                  <span>{formatDate(annotation.createdAt)}</span>
                </div>

                {/* Tags */}
                {annotation.tags && annotation.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {annotation.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs flex items-center gap-1"
                      >
                        <Tag className="w-3 h-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Replies */}
                {annotation.replies && annotation.replies.length > 0 && (
                  <div className="border-t pt-3 mt-3">
                    <h4 className="text-xs font-medium text-gray-700 mb-2">
                      Replies ({annotation.replies.length})
                    </h4>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                      {annotation.replies.map((reply, index) => (
                        <div key={index} className="bg-gray-50 rounded p-2">
                          <p className="text-xs text-gray-900 mb-1">
                            {reply.content}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span>{reply.author.name}</span>
                            <span>•</span>
                            <span>{formatDate(reply.createdAt)}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Floating Summary Panel */}
      <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-lg border p-4 w-64">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900 flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Feedback ({annotations.length})
          </h3>
          <button
            onClick={fetchAnnotations}
            className="text-blue-600 hover:text-blue-800 text-sm"
          >
            Refresh
          </button>
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Loading feedback...</p>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : annotations.length === 0 ? (
          <p className="text-sm text-gray-500">No feedback yet</p>
        ) : (
          <div className="space-y-2">
            {/* Status Summary */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <Circle className="w-3 h-3 text-red-500" />
                <span>
                  Open: {annotations.filter((a) => a.status === "open").length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <CheckCircle className="w-3 h-3 text-green-500" />
                <span>
                  Resolved:{" "}
                  {annotations.filter((a) => a.status === "resolved").length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-yellow-500" />
                <span>
                  In Progress:{" "}
                  {annotations.filter((a) => a.status === "in-progress").length}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <XCircle className="w-3 h-3 text-gray-500" />
                <span>
                  Rejected:{" "}
                  {annotations.filter((a) => a.status === "rejected").length}
                </span>
              </div>
            </div>

            {/* Recent Feedback */}
            <div className="border-t pt-2">
              <h4 className="text-xs font-medium text-gray-700 mb-1">Recent</h4>
              <div className="space-y-1 max-h-32 overflow-y-auto">
                {annotations.slice(0, 3).map((annotation) => (
                  <div
                    key={annotation._id}
                    className="text-xs p-2 bg-gray-50 rounded cursor-pointer hover:bg-gray-100"
                    onClick={() =>
                      setSelectedAnnotation(
                        selectedAnnotation === annotation._id
                          ? null
                          : annotation._id,
                      )
                    }
                  >
                    <p className="text-gray-900 truncate">
                      {annotation.content}
                    </p>
                    <p className="text-gray-500 mt-1">
                      {annotation.author.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AnnotationDisplay;
