import { useEffect, useRef } from "react";

//https://blog.logrocket.com/how-to-get-previous-props-state-with-react-hooks/
const usePrevious = (value) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export default usePrevious;
