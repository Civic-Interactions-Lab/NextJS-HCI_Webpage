import { useState, useCallback, useEffect } from "react";
import { getAnnotationsForPage } from "@/sanity/lib/annotations/getAnnotations";
import {
  addCommentToAnnotation,
  createAnnotation,
} from "@/sanity/lib/conference/createAnnotations";

export interface AnnotationPosition {
  x: number;
  y: number;
  viewportX: number;
  viewportY: number;
  scrollX: number;
  scrollY: number;
  elementSelector?: string;
  elementOffsetX?: number;
  elementOffsetY?: number;
  viewportWidth: number;
  viewportHeight: number;
}

export interface Annotation {
  id: string;
  position: AnnotationPosition;
  content: string;
  author: string;
  timestamp: Date;
  comments: Comment[];
  resolved: boolean;
}

export interface Comment {
  id: string;
  content: string;
  author: string;
  timestamp: Date;
}

export const useAnnotations = (path: string) => {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [isAnnotationMode, setIsAnnotationMode] = useState(false);
  const [positionUpdateTrigger, setPositionUpdateTrigger] = useState(0);

  // Load annotations for the current path
  useEffect(() => {
    const loadAnnotations = async () => {
      try {
        const data = await getAnnotationsForPage(path);
        if (data) {
          // Transform Sanity data to frontend format
          const transformedAnnotations: Annotation[] = data.map(
            (sanityAnnotation) => ({
              id: sanityAnnotation._id,
              position: {
                x: sanityAnnotation.position?.x || 0,
                y: sanityAnnotation.position?.y || 0,
                viewportX: sanityAnnotation.position?.viewportX || 0,
                viewportY: sanityAnnotation.position?.viewportY || 0,
                scrollX: sanityAnnotation.position?.scrollX || 0,
                scrollY: sanityAnnotation.position?.scrollY || 0,
                elementSelector: sanityAnnotation.position?.elementSelector,
                elementOffsetX: sanityAnnotation.position?.elementOffsetX,
                elementOffsetY: sanityAnnotation.position?.elementOffsetY,
                viewportWidth: sanityAnnotation.position?.viewportWidth || 0,
                viewportHeight: sanityAnnotation.position?.viewportHeight || 0,
              },
              content: sanityAnnotation.content || "",
              author: sanityAnnotation.author || "Anonymous",
              timestamp: sanityAnnotation.timestamp
                ? new Date(sanityAnnotation.timestamp)
                : new Date(),
              comments:
                sanityAnnotation.comments?.map((comment) => ({
                  id: comment._key,
                  content: comment.content || "",
                  author: comment.author || "Anonymous",
                  timestamp: comment.timestamp
                    ? new Date(comment.timestamp)
                    : new Date(),
                })) || [],
              resolved: sanityAnnotation.resolved || false,
            }),
          );
          setAnnotations(transformedAnnotations);
        }
      } catch (error) {
        // Handle error silently or show notification
      }
    };

    if (path) {
      loadAnnotations();
    }
  }, [path]);

  // Force re-calculation of positions on scroll and resize
  useEffect(() => {
    const handlePositionUpdate = () => {
      setPositionUpdateTrigger((prev) => prev + 1);
    };

    const throttledUpdate = throttle(handlePositionUpdate, 16); // ~60fps

    window.addEventListener("scroll", throttledUpdate, { passive: true });
    window.addEventListener("resize", throttledUpdate, { passive: true });

    return () => {
      window.removeEventListener("scroll", throttledUpdate);
      window.removeEventListener("resize", throttledUpdate);
    };
  }, []);

  const capturePosition = useCallback(
    (event: MouseEvent): AnnotationPosition => {
      const element = event.target as HTMLElement;
      const elementRect = element.getBoundingClientRect();

      const absoluteX = event.clientX + window.scrollX;
      const absoluteY = event.clientY + window.scrollY;

      const position: AnnotationPosition = {
        x: absoluteX,
        y: absoluteY,
        viewportX: event.clientX,
        viewportY: event.clientY,
        scrollX: window.scrollX,
        scrollY: window.scrollY,
        elementSelector: generateElementSelector(element),
        elementOffsetX: event.clientX - elementRect.left,
        elementOffsetY: event.clientY - elementRect.top,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
      };

      return position;
    },
    [],
  );

  const calculateCurrentPosition = useCallback(
    (annotation: Annotation): { x: number; y: number; isVisible: boolean } => {
      const { position } = annotation;

      // Try element-relative positioning first (most accurate)
      if (position.elementSelector) {
        try {
          const element = document.querySelector(position.elementSelector);
          if (element) {
            const rect = element.getBoundingClientRect();
            const annotationX = rect.left + (position.elementOffsetX || 0);
            const annotationY = rect.top + (position.elementOffsetY || 0);
            const docX = annotationX + window.scrollX;
            const docY = annotationY + window.scrollY;

            const isVisible =
              annotationX >= -50 &&
              annotationX <= window.innerWidth + 50 &&
              annotationY >= -50 &&
              annotationY <= window.innerHeight + 50;

            return {
              x: docX,
              y: docY,
              isVisible,
            };
          }
        } catch (error) {
          // Fallback to stored coordinates
        }
      }

      // Fallback to stored document coordinates with responsive scaling
      const scaleX = window.innerWidth / position.viewportWidth;
      const scaleY = window.innerHeight / position.viewportHeight;

      const scaledX =
        Math.abs(scaleX - 1) > 0.1 ? position.x * scaleX : position.x;
      const scaledY =
        Math.abs(scaleY - 1) > 0.1 ? position.y * scaleY : position.y;

      const viewportX = scaledX - window.scrollX;
      const viewportY = scaledY - window.scrollY;

      const isVisible =
        viewportX >= -50 &&
        viewportX <= window.innerWidth + 50 &&
        viewportY >= -50 &&
        viewportY <= window.innerHeight + 50;

      return {
        x: scaledX,
        y: scaledY,
        isVisible,
      };
    },
    [],
  );

  const createNewAnnotation = useCallback(
    async (event: MouseEvent, content: string, author: string) => {
      const position = capturePosition(event);
      const annotationData = {
        path,
        position,
        content,
        author,
        timestamp: new Date().toISOString(),
        comments: [],
        resolved: false,
      };

      try {
        const result = await createAnnotation(annotationData);
        const newAnnotation: Annotation = {
          id: result._id,
          position,
          content,
          author,
          timestamp: new Date(),
          comments: [],
          resolved: false,
        };
        setAnnotations((prev) => [...prev, newAnnotation]);
        return newAnnotation;
      } catch (error) {
        throw error;
      }
    },
    [capturePosition, path],
  );

  const addComment = useCallback(
    async (annotationId: string, content: string, author: string) => {
      const comment: Comment = {
        id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        content,
        author,
        timestamp: new Date(),
      };

      try {
        await addCommentToAnnotation(annotationId, {
          content,
          author,
          timestamp: new Date().toISOString(),
        });

        setAnnotations((prev) =>
          prev.map((annotation) =>
            annotation.id === annotationId
              ? { ...annotation, comments: [...annotation.comments, comment] }
              : annotation,
          ),
        );
      } catch (error) {
        throw error;
      }
    },
    [],
  );

  const toggleResolved = useCallback((annotationId: string) => {
    setAnnotations((prev) =>
      prev.map((annotation) =>
        annotation.id === annotationId
          ? { ...annotation, resolved: !annotation.resolved }
          : annotation,
      ),
    );
  }, []);

  const deleteAnnotation = useCallback((annotationId: string) => {
    setAnnotations((prev) =>
      prev.filter((annotation) => annotation.id !== annotationId),
    );
  }, []);

  return {
    annotations,
    isAnnotationMode,
    setIsAnnotationMode,
    createAnnotation: createNewAnnotation,
    addComment,
    toggleResolved,
    deleteAnnotation,
    calculateCurrentPosition,
    positionUpdateTrigger,
  };
};

function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number,
): T {
  let inThrottle: boolean;
  return ((...args: Parameters<T>): ReturnType<T> => {
    if (!inThrottle) {
      const result = func(...args) as ReturnType<T>;
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
      return result;
    }
    return undefined as ReturnType<T>;
  }) as T;
}

// Helper function to validate if a CSS selector is valid
function isValidCSSSelector(selector: string): boolean {
  try {
    document.querySelector(selector);
    return true;
  } catch {
    return false;
  }
}

// Helper function to generate a reliable CSS selector for an element
function generateElementSelector(element: HTMLElement): string {
  // For images, try to use src or alt attributes for uniqueness
  if (element.tagName.toLowerCase() === "img") {
    const src = element.getAttribute("src");
    const alt = element.getAttribute("alt");

    if (src) {
      const srcParts = src.split("/");
      const filename = srcParts[srcParts.length - 1];
      const selector = `img[src*="${filename}"]`;
      const matches = document.querySelectorAll(selector);
      if (matches.length === 1) {
        return selector;
      }
    }

    if (alt) {
      const selector = `img[alt="${alt}"]`;
      const matches = document.querySelectorAll(selector);
      if (matches.length === 1) {
        return selector;
      }
    }
  }

  // Try ID first
  if (element.id) {
    return `#${element.id}`;
  }

  // Try unique data attributes
  const dataAttributes = Array.from(element.attributes).filter(
    (attr) => attr.name.startsWith("data-") && attr.value,
  );

  for (const dataAttr of dataAttributes) {
    const escapedValue = dataAttr.value.replace(/['"\\]/g, "\\$&");
    const selector = `[${dataAttr.name}="${escapedValue}"]`;

    if (isValidCSSSelector(selector)) {
      const matches = document.querySelectorAll(selector);
      if (matches.length === 1) {
        return selector;
      }
    }
  }

  // Try other unique attributes (href, title, etc.)
  const uniqueAttributes = ["href", "title", "name", "value", "placeholder"];
  for (const attrName of uniqueAttributes) {
    const attrValue = element.getAttribute(attrName);
    if (attrValue) {
      const escapedValue = attrValue.replace(/['"\\]/g, "\\$&");
      const selector = `${element.tagName.toLowerCase()}[${attrName}="${escapedValue}"]`;

      if (isValidCSSSelector(selector)) {
        const matches = document.querySelectorAll(selector);
        if (matches.length === 1) {
          return selector;
        }
      }
    }
  }

  // Try class combinations
  if (element.className && typeof element.className === "string") {
    const classes = element.className
      .split(" ")
      .filter(
        (cls) =>
          cls.trim() &&
          !cls.includes("hover:") &&
          !cls.includes("focus:") &&
          !cls.includes("active:") &&
          !cls.includes("sm:") &&
          !cls.includes("md:") &&
          !cls.includes("lg:") &&
          !cls.includes("xl:") &&
          !cls.includes("2xl:") &&
          !cls.includes("[") &&
          !cls.includes("/") &&
          !cls.endsWith("!") &&
          !cls.includes("\\") &&
          !cls.includes('"') &&
          !cls.includes("'") &&
          cls.length < 20 &&
          /^[a-zA-Z0-9_-]+$/.test(cls),
      );

    if (classes.length > 0) {
      for (let i = 1; i <= Math.min(classes.length, 4); i++) {
        const classSelector = classes.slice(0, i).join(".");
        const selector = `${element.tagName.toLowerCase()}.${classSelector}`;

        if (isValidCSSSelector(selector)) {
          try {
            const matches = document.querySelectorAll(selector);
            if (matches.length === 1) {
              return selector;
            }
            if (matches.length <= 3 && i >= 2) {
              return selector;
            }
          } catch (error) {
            continue;
          }
        }
      }
    }
  }

  // Build path from parent elements
  const path: string[] = [];
  let currentElement: HTMLElement | null = element;

  while (
    currentElement &&
    currentElement !== document.body &&
    path.length < 6
  ) {
    const tagName = currentElement.tagName.toLowerCase();

    if (currentElement.id && currentElement !== element) {
      path.unshift(`#${currentElement.id}`);
      break;
    }

    const parent = currentElement.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter(
        (sibling) => sibling.tagName === currentElement!.tagName,
      );

      if (siblings.length > 1) {
        const index = siblings.indexOf(currentElement);
        const selector = `${tagName}:nth-of-type(${index + 1})`;
        path.unshift(selector);
      } else {
        path.unshift(tagName);
      }
    } else {
      path.unshift(tagName);
    }

    currentElement = currentElement.parentElement;
  }

  const finalSelector = path.join(" > ") || element.tagName.toLowerCase();

  if (isValidCSSSelector(finalSelector)) {
    return finalSelector;
  } else {
    return element.tagName.toLowerCase();
  }
}
