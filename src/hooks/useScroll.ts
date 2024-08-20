import { MutableRefObject, useEffect, useRef, useState } from "react";
import { useReduxStore } from "./useReduxStore";

export const useScroll = <T extends HTMLElement>(): [
  boolean,
  MutableRefObject<T | null>
] => {
  const { cave } = useReduxStore();
  const [scrolling, setScrolling] = useState(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (ref.current) {
        const height = ref.current.offsetHeight;
        const windowHeight = window.innerHeight;

        if (height > windowHeight) {
          setScrolling(true);
        } else {
          setScrolling(false);
        }
      }
    };

    handleScroll();

    const observer = new MutationObserver(handleScroll);

    if (ref.current) {
      observer.observe(ref.current, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
    };
  }, [cave.data.length]);

  return [scrolling, ref];
};
