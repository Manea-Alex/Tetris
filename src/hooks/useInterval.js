import { useEffect, useRef } from "react";

//Hook by Dan Abramov

export const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  //remember the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  //set up the interval
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => {
        clearInterval(id);
      };
    }
  }, [delay]);
};
