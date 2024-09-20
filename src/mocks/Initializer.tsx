"use client";

import { useEffect, useRef } from "react";

const Initializer = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    async function setupWorker() {
      if (typeof window === "undefined") {
        console.log("window is undefined");
        return;
      }
      const { worker } = await import("./browser");
      await worker.start();
      console.log("worker started");
    }
    setupWorker();
  }, []);

  return <div ref={ref} />;
};

export default Initializer;
