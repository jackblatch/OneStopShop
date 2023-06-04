import { type ClassValue, clsx } from "clsx";
import React from "react";
import { twMerge } from "tailwind-merge";
import { orderNumberPrefix } from "./application-constants";
import { formatRelative } from "date-fns";

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

export function convertSecondsToDate(seconds: number) {
  const time = new Date(Date.UTC(1970, 0, 1)); // Epoch
  time.setUTCSeconds(seconds);
  return time;
}

export function convertDateToRelativeTime(date: Date) {
  const relativeDate = formatRelative(date, new Date());
  return relativeDate[0].toUpperCase() + relativeDate.slice(1);
}

export function formatOrderNumber(id: number) {
  return `#${orderNumberPrefix + id.toString()}`;
}

export function removeOrderNumberFormatting(id: number) {
  return Number(String(id).split(String(orderNumberPrefix))[1]);
}
