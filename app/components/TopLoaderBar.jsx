// components/TopLoadingBar.jsx
'use client';

import LoadingBar from 'react-top-loading-bar';
import { useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';

const TopLoaderBar = () => {
  const ref = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    ref.current?.continuousStart();
    const timeout = setTimeout(() => {
      ref.current?.complete();
    }, 800); 

    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <LoadingBar
      color="#3b82f6" 
      ref={ref}
      height={3}
      shadow={true}
    />
  );
}

export default TopLoaderBar;