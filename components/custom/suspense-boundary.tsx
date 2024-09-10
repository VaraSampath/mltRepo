import React, { Suspense } from 'react';

const SuspenseBoundary = ({ children }: { children: React.ReactNode }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      {children}
    </Suspense>
  );
};

export default SuspenseBoundary;