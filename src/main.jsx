import React from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

// If the site fails to start, show the error on screen instead of a blank page.
const root = document.getElementById("root");
const show = (e) => {
  const pre = document.createElement("pre");
  pre.style.cssText = "color:#ff8a9b;background:#000;padding:24px;margin:0;white-space:pre-wrap;font:14px/1.5 monospace";
  pre.textContent = "The site could not start:\n\n" + String((e && (e.stack || e.message)) || e);
  root.replaceChildren(pre);
};
window.addEventListener("error", (ev) => setTimeout(() => { if (!root.children.length) show(ev.error || ev.message); }, 50));

import("./App")
  .then(({ default: App }) => createRoot(root).render(<App />))
  .catch(show);