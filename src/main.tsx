import { createRoot } from "react-dom/client";
import { useState, useEffect } from "react";
import App from "./App.tsx";
import { LoadingScreen } from "./components/LoadingScreen";
import "./index.css";

function Root() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Preload critical assets
    const preloadImages = [
      "/src/assets/profile-hero.jpg",
      "/src/assets/project-mealmatch.jpg",
      "/src/assets/project-bookaro.jpg",
      "/src/assets/project-tts.jpg",
    ];

    Promise.all(
      preloadImages.map(
        (src) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = resolve;
            img.onerror = resolve;
          })
      )
    ).then(() => {
      // Minimum loading time for smooth experience
      setTimeout(() => setIsLoading(false), 2000);
    });
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return <App />;
}

createRoot(document.getElementById("root")!).render(<Root />);
