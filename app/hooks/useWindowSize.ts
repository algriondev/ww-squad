// app/hooks/useWindowSize.ts

"use client";
import { useState, useEffect } from "react";

export function useWindowSize() {
  const [size, setSize] = useState({ w: 1200 });
  
  useEffect(() => {
    const handleResize = () => setSize({ w: window.innerWidth });
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  
  return size;
}