"use client";

import { useEffect, useLayoutEffect } from "react";

const KEY = "__scrollY";

export function ScrollRestoration() {
  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    try {
      const s = sessionStorage.getItem(KEY);
      if (s) {
        sessionStorage.removeItem(KEY);
        window.scrollTo(0, +s);
      }
    } catch (e) {}

    return () => {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  useEffect(() => {
    const save = () => {
      try { sessionStorage.setItem(KEY, String(window.scrollY)); } catch (e) {}
    };
    window.addEventListener("beforeunload", save);
    return () => window.removeEventListener("beforeunload", save);
  }, []);

  return null;
}
