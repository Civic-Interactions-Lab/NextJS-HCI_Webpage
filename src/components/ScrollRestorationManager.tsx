"use client";

import { useEffect } from "react";

// Browsers restore the scroll offset recorded in session history on a hard
// reload by default, which can land you mid-page even if you'd scrolled
// back to the top right before refreshing. Opting out keeps reloads
// starting at the top, matching a fresh navigation.
const ScrollRestorationManager = () => {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  return null;
};

export default ScrollRestorationManager;
