"use client";

import { createCursor, cursorWanted, watchCursorConditions, type Cursor } from "@sossiogll/gll-cursor";
import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useSyncExternalStore, type ReactNode } from "react";

type CursorState = {
  /** False on the server, on touch screens and with reduced motion: the page must then say what labels would. */
  active: boolean;
  /** Looks again at what is under the pointer, for when the page changed and the pointer did not. */
  refresh(): void;
};

const CursorContext = createContext<CursorState>({ active: false, refresh() {} });

export function useCursor(): CursorState {
  return useContext(CursorContext);
}

export function CursorProvider({ children }: { children: ReactNode }) {
  const active = useSyncExternalStore(watchCursorConditions, cursorWanted, () => false);
  const cursor = useRef<Cursor | null>(null);

  useEffect(() => {
    if (!active) return;
    cursor.current = createCursor();
    return () => {
      cursor.current?.destroy();
      cursor.current = null;
    };
  }, [active]);

  const refresh = useCallback(() => cursor.current?.refresh(), []);
  const state = useMemo(() => ({ active, refresh }), [active, refresh]);

  return <CursorContext.Provider value={state}>{children}</CursorContext.Provider>;
}
