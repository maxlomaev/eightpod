import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MotionConfig } from "motion/react";
import App from "./App";
import { NavProvider } from "./nav";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <NavProvider>
        <App />
      </NavProvider>
    </MotionConfig>
  </StrictMode>,
);
