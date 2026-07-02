import { useEffect, useRef } from "react";
import { useSearchParams } from "react-router";

/**
 * Returns the current `hl` search param value and clears it from the URL
 * after a short delay so the highlight is transient.
 */
export function useHighlight() {
  const [searchParams, setSearchParams] = useSearchParams();
  const hlId = searchParams.get("hl") ?? undefined;
  const cleared = useRef(false);

  useEffect(() => {
    if (!hlId || cleared.current) return;
    cleared.current = true;
    const t = setTimeout(() => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);
        next.delete("hl");
        return next;
      }, { replace: true });
    }, 3000);
    return () => clearTimeout(t);
  }, [hlId, setSearchParams]);

  // Reset cleared flag when hlId changes
  useEffect(() => { cleared.current = false; }, [hlId]);

  return hlId;
}
