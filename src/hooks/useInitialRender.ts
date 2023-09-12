import { useRef, useEffect } from "react";

const useInitialRender = () => {
  const ref = useRef(true);

  useEffect(() => {
    ref.current = false;
  }, []);

  return ref.current;
};

export default useInitialRender;
