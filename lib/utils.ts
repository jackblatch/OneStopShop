import { type ClassValue, clsx } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleInputQuantity(
  e: React.FocusEvent<HTMLInputElement, Element>,
  setQuantity: React.Dispatch<React.SetStateAction<string | number>>,
  defaultFallbackQuantity?: number
) {
  if (Number(e.target.value) < 1 || isNaN(Number(e.target.value))) {
    setQuantity(defaultFallbackQuantity ?? 1);
    return;
  }
  setQuantity(() => Number(e.target.value.split(".")[0]));
}
