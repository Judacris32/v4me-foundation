import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * Returns `false` during the server render and the first client render,
 * then `true` from then on. Use to gate client-only UI (e.g. anything
 * reading theme/localStorage) without mismatching server-rendered markup.
 *
 * Implemented with useSyncExternalStore instead of a `useEffect` +
 * `setState` pair so the value is resolved synchronously on the client
 * and never causes a cascading re-render.
 */
export function useHasMounted() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
