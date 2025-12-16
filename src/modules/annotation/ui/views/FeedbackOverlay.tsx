import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { createAnnotation } from "@/sanity/lib/annotations/createAnnotation";

interface Position {
  x: number;
  y: number;
  viewport: {
    width: number;
    height: number;
  };
}

interface FeedbackData {
  content: string;
  author: {
    name: string;
    email?: string;
  };
  priority: "low" | "medium" | "high" | "critical";
  tags: string[];
}

interface ActiveFeedback extends Position {
  id: string;
}

interface FeedbackOverlayProps {
  pageUrl: string;
  isEnabled: boolean;
  onToggle: () => void;
}

const FeedbackOverlay: React.FC<FeedbackOverlayProps> = ({
  pageUrl,
  isEnabled,
  onToggle,
}) => {
  const [activeFeedback, setActiveFeedback] = useState<ActiveFeedback | null>(
    null,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (!isEnabled || e.target !== overlayRef.current) return;

    const rect = overlayRef.current!.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newFeedback: ActiveFeedback = {
      id: Date.now().toString(),
      x,
      y,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
    };

    setActiveFeedback(newFeedback);
  };

  const handleSubmitFeedback = async (feedbackData: FeedbackData) => {
    if (!activeFeedback) return;

    setIsSubmitting(true);
    try {
      await createAnnotation({
        pageUrl,
        content: feedbackData.content,
        author: feedbackData.author,
        position: {
          x: activeFeedback.x,
          y: activeFeedback.y,
          viewport: activeFeedback.viewport,
        },
        priority: feedbackData.priority,
        tags: feedbackData.tags,
        status: "open",
      });

      setActiveFeedback(null);
      // Optional: Show success notification
    } catch (error) {
      console.error("Failed to submit feedback:", error);
      // Optional: Show error notification
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    setActiveFeedback(null);
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (activeFeedback) {
          handleCancel();
        } else if (isEnabled) {
          onToggle();
        }
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [activeFeedback, isEnabled, onToggle]);

  if (!isEnabled) return null;

  return (
    <>
      {/* Overlay for capturing clicks */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-50 cursor-crosshair bg-blue-500/5"
        onClick={handleOverlayClick}
        style={{ pointerEvents: isEnabled ? "auto" : "none" }}
      />

      {/* Feedback pin and form */}
      {activeFeedback && (
        <FeedbackPin
          position={activeFeedback}
          onSubmit={handleSubmitFeedback}
          onCancel={handleCancel}
          isSubmitting={isSubmitting}
        />
      )}

      {/* Instructions */}
      <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white shadow-lg rounded-lg px-4 py-2 border">
        <p className="text-sm text-gray-700 flex items-center gap-2">
          <MessageCircle className="w-4 h-4" />
          Click anywhere to add feedback • Press ESC to exit
        </p>
      </div>
    </>
  );
};

interface FeedbackPinProps {
  position: Position;
  onSubmit: (data: FeedbackData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

const FeedbackPin: React.FC<FeedbackPinProps> = ({
  position,
  onSubmit,
  onCancel,
  isSubmitting,
}) => {
  const [formData, setFormData] = useState<FeedbackData>({
    content: "",
    author: { name: "", email: "" },
    priority: "medium",
    tags: [],
  });

  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    // Show form after a brief delay for better UX
    const timer = setTimeout(() => setIsFormVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.content.trim() || !formData.author.name.trim()) return;
    await onSubmit(formData);
  };

  const handleTagInput = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const tagValue = e.currentTarget.value.trim();
      if (tagValue && !formData.tags.includes(tagValue)) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, tagValue],
        }));
        e.currentTarget.value = "";
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  return (
    <>
      {/* Pin indicator */}
      <div
        className="fixed w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2 z-50"
        style={{ left: position.x, top: position.y }}
      />

      {/* Feedback form */}
      {isFormVisible && (
        <div
          className="fixed z-50 bg-white rounded-lg shadow-xl border w-80 p-4"
          style={{
            left: Math.min(position.x + 20, window.innerWidth - 320 - 20),
            top: Math.min(position.y + 20, window.innerHeight - 400 - 20),
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-gray-900">Add Feedback</h3>
            <button
              onClick={onCancel}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Author info */}
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                placeholder="Your name"
                value={formData.author.name}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    author: { ...prev.author, name: e.target.value },
                  }))
                }
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
              <input
                type="email"
                placeholder="Email (optional)"
                value={formData.author.email || ""}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    author: { ...prev.author, email: e.target.value },
                  }))
                }
                className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Content */}
            <textarea
              placeholder="Describe your feedback..."
              value={formData.content}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, content: e.target.value }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              rows={3}
              maxLength={500}
              required
            />

            {/* Priority */}
            <select
              value={formData.priority}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  priority: e.target.value as FeedbackData["priority"],
                }))
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High Priority</option>
              <option value="critical">Critical</option>
            </select>

            {/* Tags */}
            <div>
              <input
                type="text"
                placeholder="Add tags (press Enter)"
                onKeyDown={handleTagInput}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs flex items-center gap-1"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={
                  isSubmitting ||
                  !formData.content.trim() ||
                  !formData.author.name.trim()
                }
                className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-1"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default FeedbackOverlay;
