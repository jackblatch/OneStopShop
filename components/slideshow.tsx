"use client";

import { cn } from "@/lib/utils";
import { Pause } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
];

export const SlideShow = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasInteracted, setHasInteracted] = useState(false);

  // useEffect(() => {
  //   if (hasInteracted) return;
  //   const timer = setTimeout(
  //     () => setCurrentImageIndex((i) => (i === images.length - 1 ? 0 : i + 1)),
  //     5000
  //   );

  //   return () => clearInterval(timer);
  // }, [currentImageIndex]);

  return (
    <div>
      <div
        key={currentImageIndex}
        className="relative w-full h-[600px] animate-fade-in"
      >
        <Image
          src={images[currentImageIndex]}
          alt="hero"
          fill
          className="object-cover"
        />
      </div>
      <div className="flex items-center justify-center gap-2 mt-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setCurrentImageIndex(i);
              setHasInteracted(true);
            }}
          >
            <SlideShow.Indicator
              filled={currentImageIndex === i ? true : false}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

const Indicator = ({ filled }: { filled: boolean }) => {
  return (
    <div
      className={cn(
        "w-3 h-3 rounded-full border-primary border-2",
        filled && "bg-primary"
      )}
    />
  );
};

SlideShow.Indicator = Indicator;
