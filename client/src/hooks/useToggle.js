import { useState } from 'react';

export default function useToggle() {
  const [toggle, setToggle] = useState(true);

  const toggleClick = () => {
    setToggle((prev) => !prev);
  };
  return [toggle, toggleClick];
}
