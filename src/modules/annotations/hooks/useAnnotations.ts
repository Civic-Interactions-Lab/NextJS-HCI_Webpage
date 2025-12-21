import { useState, useCallback, useEffect } from "react";

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

export const useAnnotations = () => {
  const [annotations, setAnnotations] = useState<Annotation[]>([]);
  const [isAnnotationMode, setIsAnnotationMode] = useState(false);
  const [positionUpdateTrigger, setPositionUpdateTrigger] = useState(0);

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
      // Get element under cursor for more precise positioning
      const element = event.target as HTMLElement;
      const elementRect = element.getBoundingClientRect();

      console.group("📌 Capturing annotation position");
      console.log("Click event:", {
        clientX: event.clientX,
        clientY: event.clientY,
      });
      console.log("Target element:", element);
      console.log("Element rect:", elementRect);
      console.log("Current scroll:", { x: window.scrollX, y: window.scrollY });
      console.log("Current viewport:", {
        width: window.innerWidth,
        height: window.innerHeight,
      });

      // Calculate absolute position in document
      const absoluteX = event.clientX + window.scrollX;
      const absoluteY = event.clientY + window.scrollY;

      console.log("Calculated document position:", {
        x: absoluteX,
        y: absoluteY,
      });

      const position: AnnotationPosition = {
        // Document coordinates (the actual position in the full document)
        x: absoluteX,
        y: absoluteY,

        // Viewport coordinates at time of creation
        viewportX: event.clientX,
        viewportY: event.clientY,

        // Current scroll position
        scrollX: window.scrollX,
        scrollY: window.scrollY,

        // Element-relative position for more precise anchoring
        elementSelector: generateElementSelector(element),
        elementOffsetX: event.clientX - elementRect.left,
        elementOffsetY: event.clientY - elementRect.top,

        // Viewport dimensions for responsive calculations
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
      };

      console.log("Final position object:", position);
      console.groupEnd();

      return position;
    },
    [],
  );

  const calculateCurrentPosition = useCallback(
    (annotation: Annotation): { x: number; y: number; isVisible: boolean } => {
      const { position } = annotation;

      console.group(
        `📍 Calculating position for annotation ${annotation.id.slice(-6)}`,
      );
      console.log("Stored position data:", position);
      console.log("Current viewport:", {
        width: window.innerWidth,
        height: window.innerHeight,
      });
      console.log("Current scroll:", { x: window.scrollX, y: window.scrollY });

      // Try element-relative positioning first (most accurate)
      if (position.elementSelector) {
        console.log("🔍 Trying element selector:", position.elementSelector);
        try {
          const element = document.querySelector(position.elementSelector);
          if (element) {
            const rect = element.getBoundingClientRect();
            console.log("Element found! Rect:", rect);
            console.log("Stored offset:", {
              x: position.elementOffsetX,
              y: position.elementOffsetY,
            });

            // Use the stored offset from when annotation was created
            const annotationX = rect.left + (position.elementOffsetX || 0);
            const annotationY = rect.top + (position.elementOffsetY || 0);

            // Convert viewport coordinates to document coordinates
            const docX = annotationX + window.scrollX;
            const docY = annotationY + window.scrollY;

            console.log("Calculated viewport position:", {
              x: annotationX,
              y: annotationY,
            });
            console.log("Calculated document position:", { x: docX, y: docY });

            // Check if annotation is visible in current viewport
            const isVisible =
              annotationX >= -50 &&
              annotationX <= window.innerWidth + 50 &&
              annotationY >= -50 &&
              annotationY <= window.innerHeight + 50;

            console.log("Is visible:", isVisible);
            console.groupEnd();

            return {
              x: docX,
              y: docY,
              isVisible,
            };
          } else {
            console.warn(
              "❌ Element not found for selector:",
              position.elementSelector,
            );
          }
        } catch (error) {
          console.warn("❌ Error finding element:", error);
        }
      } else {
        console.log("ℹ️ No element selector available");
      }

      // Fallback to stored document coordinates with responsive scaling
      console.log("🔄 Using fallback positioning with scaling");

      const scaleX = window.innerWidth / position.viewportWidth;
      const scaleY = window.innerHeight / position.viewportHeight;

      console.log("Calculated scales:", { x: scaleX, y: scaleY });

      // Apply scaling if screen size changed significantly
      const scaledX =
        Math.abs(scaleX - 1) > 0.1 ? position.x * scaleX : position.x;
      const scaledY =
        Math.abs(scaleY - 1) > 0.1 ? position.y * scaleY : position.y;

      console.log("Scaled position:", { x: scaledX, y: scaledY });

      // Convert to viewport coordinates to check visibility
      const viewportX = scaledX - window.scrollX;
      const viewportY = scaledY - window.scrollY;

      console.log("Viewport position for visibility:", {
        x: viewportX,
        y: viewportY,
      });

      const isVisible =
        viewportX >= -50 &&
        viewportX <= window.innerWidth + 50 &&
        viewportY >= -50 &&
        viewportY <= window.innerHeight + 50;

      console.log("Is visible:", isVisible);
      console.groupEnd();

      return {
        x: scaledX,
        y: scaledY,
        isVisible,
      };
    },
    [],
  );

  const createAnnotation = useCallback(
    (event: MouseEvent, content: string, author: string) => {
      const position = capturePosition(event);
      const newAnnotation: Annotation = {
        id: `annotation-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        position,
        content,
        author,
        timestamp: new Date(),
        comments: [],
        resolved: false,
      };

      setAnnotations((prev) => [...prev, newAnnotation]);
      return newAnnotation;
    },
    [capturePosition],
  );

  const addComment = useCallback(
    (annotationId: string, content: string, author: string) => {
      const comment: Comment = {
        id: `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        content,
        author,
        timestamp: new Date(),
      };

      setAnnotations((prev) =>
        prev.map((annotation) =>
          annotation.id === annotationId
            ? { ...annotation, comments: [...annotation.comments, comment] }
            : annotation,
        ),
      );
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
    createAnnotation,
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
    // Return undefined for throttled calls - this maintains the function signature
    // but you might want to return the last result or handle this differently
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
  console.group("🎯 Generating selector for element:", element);
  console.log("Element details:", {
    tagName: element.tagName,
    id: element.id,
    className: element.className,
    attributes: Array.from(element.attributes).map((attr) => ({
      name: attr.name,
      value: attr.value,
    })),
    textContent: element.textContent?.slice(0, 50) || "No text",
    src: element.getAttribute("src"),
    alt: element.getAttribute("alt"),
  });

  // For images, try to use src or alt attributes for uniqueness
  if (element.tagName.toLowerCase() === "img") {
    const src = element.getAttribute("src");
    const alt = element.getAttribute("alt");

    if (src) {
      // Use the last part of the src path for more readable selector
      const srcParts = src.split("/");
      const filename = srcParts[srcParts.length - 1];
      const selector = `img[src*="${filename}"]`;
      console.log("🖼️ Image selector using src:", selector);

      const matches = document.querySelectorAll(selector);
      console.log("Matches found:", matches.length);

      if (matches.length === 1) {
        console.groupEnd();
        return selector;
      }
    }

    if (alt) {
      const selector = `img[alt="${alt}"]`;
      console.log("🖼️ Image selector using alt:", selector);

      const matches = document.querySelectorAll(selector);
      console.log("Matches found:", matches.length);

      if (matches.length === 1) {
        console.groupEnd();
        return selector;
      }
    }
  }

  // Try ID first
  if (element.id) {
    const selector = `#${element.id}`;
    console.log("✅ Using ID selector:", selector);
    console.groupEnd();
    return selector;
  }

  // Try unique data attributes
  const dataAttributes = Array.from(element.attributes).filter(
    (attr) => attr.name.startsWith("data-") && attr.value,
  );

  for (const dataAttr of dataAttributes) {
    // Escape special characters in attribute values
    const escapedValue = dataAttr.value.replace(/['"\\]/g, "\\$&");
    const selector = `[${dataAttr.name}="${escapedValue}"]`;

    if (isValidCSSSelector(selector)) {
      const matches = document.querySelectorAll(selector);
      console.log(
        `📊 Data attribute selector [${dataAttr.name}="${escapedValue}"]:`,
        matches.length,
        "matches",
      );

      if (matches.length === 1) {
        console.log("✅ Using unique data attribute selector:", selector);
        console.groupEnd();
        return selector;
      }
    } else {
      console.warn(`❌ Invalid data attribute selector: ${selector}`);
    }
  }

  // Try other unique attributes (href, title, etc.)
  const uniqueAttributes = ["href", "title", "name", "value", "placeholder"];
  for (const attrName of uniqueAttributes) {
    const attrValue = element.getAttribute(attrName);
    if (attrValue) {
      // Escape special characters in attribute values
      const escapedValue = attrValue.replace(/['"\\]/g, "\\$&");
      const selector = `${element.tagName.toLowerCase()}[${attrName}="${escapedValue}"]`;

      if (isValidCSSSelector(selector)) {
        const matches = document.querySelectorAll(selector);
        console.log(
          `📊 Attribute selector [${attrName}="${escapedValue}"]:`,
          matches.length,
          "matches",
        );

        if (matches.length === 1) {
          console.log("✅ Using unique attribute selector:", selector);
          console.groupEnd();
          return selector;
        }
      } else {
        console.warn(`❌ Invalid attribute selector: ${selector}`);
      }
    }
  }

  // Try class combinations (improved logic)
  if (element.className && typeof element.className === "string") {
    const classes = element.className.split(" ").filter(
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
        !cls.includes("[") && // Skip Tailwind arbitrary values like bg-[#028683]
        !cls.includes("/") && // Skip Tailwind opacity like bg-red-500/50
        !cls.endsWith("!") && // Skip classes ending with ! like font-bold!
        !cls.includes("\\") && // Skip escaped characters
        !cls.includes('"') && // Skip quotes
        !cls.includes("'") && // Skip single quotes
        cls.length < 20 && // Skip very long generated classes
        /^[a-zA-Z0-9_-]+$/.test(cls), // Only allow valid CSS identifier characters
    );

    console.log("Available classes (filtered):", classes);

    if (classes.length > 0) {
      // Try different combinations of classes
      for (let i = 1; i <= Math.min(classes.length, 4); i++) {
        const classSelector = classes.slice(0, i).join(".");
        const selector = `${element.tagName.toLowerCase()}.${classSelector}`;

        if (isValidCSSSelector(selector)) {
          try {
            const matches = document.querySelectorAll(selector);
            console.log(
              `📊 Class selector (${i} classes): ${selector}`,
              matches.length,
              "matches",
            );

            if (matches.length === 1) {
              console.log("✅ Using class selector:", selector);
              console.groupEnd();
              return selector;
            }

            // If we have few enough matches, this might be good enough
            if (matches.length <= 3 && i >= 2) {
              console.log(
                "✅ Using class selector with few matches:",
                selector,
              );
              console.groupEnd();
              return selector;
            }
          } catch (error) {
            console.warn(`❌ Error with selector "${selector}":`, error);
            // Continue to next combination
          }
        } else {
          console.warn(`❌ Invalid class selector: ${selector}`);
        }
      }
    }
  }

  // Build path from parent elements (improved)
  console.log("🔍 Building element path...");
  const path: string[] = [];
  let currentElement: HTMLElement | null = element;

  while (
    currentElement &&
    currentElement !== document.body &&
    path.length < 6
  ) {
    const tagName = currentElement.tagName.toLowerCase();
    console.log(`Processing element in path: ${tagName}`, {
      id: currentElement.id,
      className: currentElement.className,
    });

    if (currentElement.id && currentElement !== element) {
      path.unshift(`#${currentElement.id}`);
      console.log("Found parent with ID, stopping path building");
      break;
    }

    // Get position among siblings of same type
    const parent = currentElement.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter(
        (sibling) => sibling.tagName === currentElement!.tagName,
      );

      if (siblings.length > 1) {
        const index = siblings.indexOf(currentElement);
        const selector = `${tagName}:nth-of-type(${index + 1})`;
        path.unshift(selector);
        console.log(
          `Added nth-of-type: ${selector} (${index + 1} of ${siblings.length})`,
        );
      } else {
        path.unshift(tagName);
        console.log(`Added simple tag: ${tagName}`);
      }
    } else {
      path.unshift(tagName);
    }

    currentElement = currentElement.parentElement;
  }

  const finalSelector = path.join(" > ") || element.tagName.toLowerCase();
  console.log("📍 Final path selector:", finalSelector);

  // Test the final selector
  if (isValidCSSSelector(finalSelector)) {
    const finalMatches = document.querySelectorAll(finalSelector);
    console.log("Final selector matches:", finalMatches.length);

    if (finalMatches.length > 1) {
      console.warn(
        "⚠️ Selector is not unique! Found",
        finalMatches.length,
        "matches",
      );
      console.log("All matches:", Array.from(finalMatches));
    }

    console.groupEnd();
    return finalSelector;
  } else {
    console.warn("❌ Final selector is invalid, falling back to tag name");
    console.groupEnd();
    return element.tagName.toLowerCase();
  }
}
