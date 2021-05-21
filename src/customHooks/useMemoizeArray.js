import { useRef } from "react";

const useMemoizeArray = () => {
  const lastArrayItemId = useRef(null);
  const fistArrayItemId = useRef(null);

  const isArrayDifferentByFirstAndLastItemId = (array) => {
    if (array.length > 0) {
      const currentLastArrayItemId = array[array.length - 1].id;
      const currentFirstArrayItemId = array[0].id;
      if (
        lastArrayItemId.current !== currentLastArrayItemId ||
        fistArrayItemId.current !== currentFirstArrayItemId ||
        currentLastArrayItemId === currentFirstArrayItemId
      ) {
        lastArrayItemId.current = currentLastArrayItemId;
        fistArrayItemId.current = currentFirstArrayItemId;
        return true;
      } else {
        return false;
      }
    }
  };

  return isArrayDifferentByFirstAndLastItemId;
};

export default useMemoizeArray;
