import { useEffect } from "react";

// type PropsType = {
//   ref: React.MutableRefObject<null>;
//   cb:React.Dispatch<React.SetStateAction<boolean>>;
// }

// type Contains = {
//   contains: () => boolean;
// };

export function useOutsideClick(
  ref: React.RefObject<HTMLDivElement>,
  cb: () => void
) {
  // type MouseEvent = "mousedown" | "touchstart";
  // let mouseEvent: MouseEvent;
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

// export function useOutsideClick<T extends HTMLElement = HTMLElement>(
//   ref: RefObject<T>,
//   handler: (e: MouseEvent) => void,
//   mouseEvent: "mousedown" | "touchstart"
// ): void {
//   useEffect(() => {
//     function outsideClick(): void {
//       if (!ref.current || ref.current.contains(e.target as Node)) {
//         return;
//       }
//       handler(e);
//     }
//     document.addEventListener(mouseEvent, outsideClick);
//   });
// }
