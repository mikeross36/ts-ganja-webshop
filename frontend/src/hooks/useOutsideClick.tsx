import { useEffect } from "react";

export function useOutsideClick(
  ref: React.RefObject<HTMLDivElement>,
  cb: () => void
) {
  useEffect(() => {
    function outsideClick(e: React.MouseEvent) {
      if (!ref.current || ref.current.contains(e.target as Node)) {
        return;
      }
      cb();
    }
    document.addEventListener("mousedown", outsideClick as () => void);
    document.addEventListener("touchstart", outsideClick as () => void);

    return function () {
      document.removeEventListener("mousedown", outsideClick as () => void);
      document.removeEventListener("touchstart", outsideClick as () => void);
    };
  });
}
