import { useRef, useEffect, type MutableRefObject } from "react";

export function useObserver(
  observerCallback: (entries: IntersectionObserverEntry[], observer: any) => void,
  observerTarget: MutableRefObject<any>,
  isLoading: boolean = false
) {
  const observer = useRef<IntersectionObserver>(null);

  useEffect(() => {
    if (isLoading) return;
    if (observer == null) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(observerCallback);
    observer.current.observe(observerTarget.current);
  }, [observerCallback, observer, observerTarget, isLoading]);
}
