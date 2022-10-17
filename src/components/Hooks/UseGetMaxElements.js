import { useState, useEffect } from 'react';

function getMaxElementsDimensions() {
  const { innerWidth: width } = window;
  if (width <= 500) {
    return 30;
  }
  if (width <= 768) {
    return 70;
  }
  else return 160
}

export default function useGetMaxElements() {
  const [maxElements, setMaxElements] = useState(getMaxElementsDimensions());

  useEffect(() => {
    function handleResize() {
      setMaxElements(getMaxElementsDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return maxElements;
}
