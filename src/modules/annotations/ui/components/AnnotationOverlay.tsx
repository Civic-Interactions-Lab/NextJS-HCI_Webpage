"use client";

import React, { useEffect, useRef, useState } from "react";
import AnnotationMarker from "./AnnotationMarker";
import CommentModal from "./CommentModal";
import { useAnnotations } from "@/modules/annotations/hooks/useAnnotations";
import { Button } from "@/components/ui/button";
import { MessageCircle, XIcon } from "lucide-react";

interface AnnotationOverlayProps {
  children: React.ReactNode;
}

const AnnotationOverlay = ({ children }: AnnotationOverlayProps) => {
  const {
    annotations,
    isAnnotationMode,
    setIsAnnotationMode,
    createAnnotation,
    addComment,
    toggleResolved,
    deleteAnnotation,
    calculateCurrentPosition,
    positionUpdateTrigger,
  } = useAnnotations();

  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);
  const [pendingAnnotation, setPendingAnnotation] = useState<{
    x: number;
    y: number;
    event: MouseEvent;
  } | null>(null);

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      // Only handle clicks when in annotation mode
      if (!isAnnotationMode) return;

      // Don't create annotation if clicking on existing annotation or modal
      const target = event.target as HTMLElement;
      if (
        target.closest("[data-annotation]") ||
        target.closest("[data-comment-modal]") ||
        target.closest("[data-annotation-toggle]") ||
        target.closest("[data-radix-popper-content-wrapper]") // Exclude popover content
      ) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      // Store the click position and event for creating annotation
      setPendingAnnotation({
        x: event.clientX,
        y: event.clientY,
        event: event,
      });
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // Toggle annotation mode with 'A' key
      if (event.key === "a" || event.key === "A") {
        if (!event.ctrlKey && !event.metaKey && !event.altKey) {
          const target = event.target as HTMLElement;
          // Don't toggle if typing in an input or textarea
          if (
            target.tagName !== "INPUT" &&
            target.tagName !== "TEXTAREA" &&
            !target.isContentEditable
          ) {
            event.preventDefault();
            setIsAnnotationMode((prev) => !prev);
          }
        }
      }

      // Escape key to exit annotation mode or close modals
      if (event.key === "Escape") {
        setIsAnnotationMode(false);
        setActiveAnnotation(null);
        setPendingAnnotation(null);
      }
    };

    if (isAnnotationMode) {
      document.addEventListener("click", handleClick, true);
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isAnnotationMode]);

  const handleCreateAnnotation = (content: string, author: string) => {
    if (pendingAnnotation) {
      createAnnotation(pendingAnnotation.event, content, author);
      setPendingAnnotation(null);
    }
  };

  const handleCancelAnnotation = () => {
    setPendingAnnotation(null);
  };

  const handleMarkerClick = (annotationId: string) => {
    setActiveAnnotation(
      activeAnnotation === annotationId ? null : annotationId,
    );
  };

  return (
    <div ref={overlayRef} className="relative">
      {/* Toggle button */}
      <Button
        data-annotation-toggle
        onClick={() => setIsAnnotationMode(!isAnnotationMode)}
        className={`fixed bottom-4 right-4 z-999 size-14 rounded-full font-medium transition-colors ${
          isAnnotationMode
            ? "bg-red-500 hover:bg-red-600 text-white"
            : "bg-blue-500 hover:bg-blue-600 text-white"
        }`}
      >
        {isAnnotationMode ? (
          <XIcon className="size-6" />
        ) : (
          <MessageCircle className="size-6" />
        )}
      </Button>

      {/* Main content with click overlay */}
      <div
        className={`relative ${isAnnotationMode ? "cursor-crosshair" : "cursor-default"}`}
        style={{ position: "relative", minHeight: "100vh" }}
      >
        {children}

        {/* Annotation markers container - positioned relative to content */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-40">
          {annotations.map((annotation) => {
            const positionData = calculateCurrentPosition(annotation);

            // Only render if annotation is visible in or near viewport
            if (!positionData.isVisible) {
              return null;
            }

            return (
              <AnnotationMarker
                key={`${annotation.id}-${positionUpdateTrigger}`}
                annotation={annotation}
                position={{ x: positionData.x, y: positionData.y }}
                isActive={activeAnnotation === annotation.id}
                onClick={() => handleMarkerClick(annotation.id)}
                onAddComment={(content, author) =>
                  addComment(annotation.id, content, author)
                }
                onToggleResolved={() => toggleResolved(annotation.id)}
                onDelete={() => {
                  deleteAnnotation(annotation.id);
                  setActiveAnnotation(null);
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Comment modal for new annotations */}
      {pendingAnnotation && (
        <CommentModal
          position={pendingAnnotation}
          onSubmit={handleCreateAnnotation}
          onCancel={handleCancelAnnotation}
          isNewAnnotation
        />
      )}
    </div>
  );
};

export default AnnotationOverlay;
