import { useState } from 'react';

const useToggle = () => {
  const [toggle, setToggle] = useState(false);

  function handleToggle() {
    setToggle(!toggle);
  }

  return [toggle, handleToggle];
};

export default useToggle;
