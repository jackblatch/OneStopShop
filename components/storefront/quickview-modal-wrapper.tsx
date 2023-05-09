"use client";
import { PropsWithChildren, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import { XIcon } from "lucide-react";

export const QuickViewModalWrapper = (props: PropsWithChildren) => {
  const router = useRouter();

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back();
      }
    },
    [router]
  );

  useEffect(() => {
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onKeyDown]);

  return (
    <div className="mb-2">
      <div className="flex items-center justify-end gap-2">
        <button onClick={() => router.back()}>
          <XIcon />
        </button>
      </div>
      {props.children}
    </div>
  );
};
