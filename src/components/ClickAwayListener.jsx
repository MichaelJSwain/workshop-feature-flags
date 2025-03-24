import { useEffect, useRef } from "react";

export const ClickAwayListener = ({children, onClickAway}) => {
    const ref = useRef(null);

    useEffect(() => {
        function handleClick(event) {
            if (ref.current && !ref.current.contains(event.target)) {
              onClickAway();
            }
          }
          document.addEventListener("click", handleClick);
      
          return () => {
            document.removeEventListener("click", handleClick);
          };
    }, [onClickAway]);

    return <div ref={ref}>{children}</div>;
};