import { useState } from 'react';

export default function useDebouncedFunc(func, delay) {

  const [timer, setTimer] = useState();
  return (...args) => {
    clearTimeout(timer);

    setTimer(setTimeout(() => func(...args), delay));
  };
}