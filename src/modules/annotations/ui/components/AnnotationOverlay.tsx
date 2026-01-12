"use client";

import React, { useEffect, useRef, useState } from "react";
import AnnotationMarker from "./AnnotationMarker";
import CommentModal from "./CommentModal";
import { useAnnotations } from "@/modules/annotations/hooks/useAnnotations";
import { Button } from "@/components/ui/button";
import { MessageCircle, XIcon } from "lucide-react";
import { useUser, RedirectToSignIn } from "@clerk/nextjs";
import { usePathname, useSearchParams } from "next/navigation";
import { Id } from "../../../../../convex/_generated/dataModel";
import { CategoryType } from "@/modules/annotations/config/categoryConfig";

interface AnnotationOverlayProps {
  children: React.ReactNode;
}

const AnnotationOverlay = ({ children }: AnnotationOverlayProps) => {
  const { user, isSignedIn } = useUser();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();
  const path = search ? `${pathname}?${search}` : pathname;

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
  } = useAnnotations(path);

  const [activeAnnotation, setActiveAnnotation] = useState<string | null>(null);
  const [pendingAnnotation, setPendingAnnotation] = useState<{
    event: MouseEvent;
  } | null>(null);
  const [showSignIn, setShowSignIn] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isSignedIn || !isAnnotationMode) return;

    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        target.closest("[data-annotation]") ||
        target.closest("[data-comment-modal]") ||
        target.closest("[data-annotation-toggle]") ||
        target.closest("[data-radix-popper-content-wrapper]")
      ) {
        return;
      }

      // Don't allow new annotations when viewing an existing annotation OR when pending annotation modal is open
      if (activeAnnotation || pendingAnnotation) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      setPendingAnnotation({
        event: event,
      });
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [isAnnotationMode, isSignedIn, activeAnnotation, pendingAnnotation]);

  useEffect(() => {
    if (!isSignedIn) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "a" || event.key === "A") {
        if (!event.ctrlKey && !event.metaKey && !event.altKey) {
          const target = event.target as HTMLElement;
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

      if (event.key === "Escape") {
        setIsAnnotationMode(false);
        setActiveAnnotation(null);
        setPendingAnnotation(null);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSignedIn, setIsAnnotationMode]);

  const handleCreateAnnotation = async (
    content: string,
    category: CategoryType,
  ) => {
    if (pendingAnnotation && user) {
      const authorName = user.firstName
        ? `${user.firstName} ${user.lastName || ""}`.trim()
        : user.emailAddresses[0]?.emailAddress || "Anonymous";

      await createAnnotation(
        pendingAnnotation.event,
        content,
        user.id,
        authorName,
        user.imageUrl,
        category,
      );
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

  const handleAddComment = async (
    annotationId: Id<"annotations">,
    content: string,
  ) => {
    if (user) {
      const authorName = user.firstName
        ? `${user.firstName} ${user.lastName || ""}`.trim()
        : user.emailAddresses[0]?.emailAddress || "Anonymous";

      await addComment(
        annotationId,
        content,
        user.id,
        authorName,
        user.imageUrl,
      );
    }
  };

  const handleToggleAnnotationMode = () => {
    if (!isSignedIn) {
      setShowSignIn(true);
      return;
    }

    setIsAnnotationMode(!isAnnotationMode);

    if (isAnnotationMode) {
      setPendingAnnotation(null);
      setActiveAnnotation(null);
    }
  };

  // Get the active annotation object
  const activeAnnotationObj = activeAnnotation
    ? annotations.find((a) => a.id === activeAnnotation)
    : null;

  if (showSignIn) {
    return <RedirectToSignIn />;
  }

  return (
    <div ref={overlayRef} className="relative">
      <Button
        data-annotation-toggle
        onClick={handleToggleAnnotationMode}
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

      <div
        className={`relative ${isAnnotationMode ? "cursor-crosshair" : "cursor-default"}`}
        style={{ position: "relative", minHeight: "100vh" }}
      >
        {children}

        {isSignedIn && isAnnotationMode && (
          <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-40">
            {annotations.map((annotation) => {
              const positionData = calculateCurrentPosition(annotation);

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
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Modal for creating new annotations */}
      {pendingAnnotation && isSignedIn && (
        <CommentModal
          onSubmit={handleCreateAnnotation}
          onCancel={handleCancelAnnotation}
          isNewAnnotation
        />
      )}

      {/* Modal for viewing/commenting on existing annotations */}
      {activeAnnotationObj && isSignedIn && (
        <CommentModal
          annotation={activeAnnotationObj}
          onClose={() => setActiveAnnotation(null)}
          onAddComment={(content) =>
            handleAddComment(activeAnnotationObj.id, content)
          }
          onToggleResolved={() =>
            toggleResolved(activeAnnotationObj.id, user?.id)
          }
          onDelete={async () => {
            await deleteAnnotation(activeAnnotationObj.id, user?.id);
            setActiveAnnotation(null);
          }}
        />
      )}
    </div>
  );
};

export default AnnotationOverlay;
