import React, { lazy, Suspense } from 'react';

const LazyPageNotFound = lazy(() => import('./PageNotFound'));

const PageNotFound = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode }) => (
  <Suspense fallback={''}>
    <LazyPageNotFound {...props} />
  </Suspense>
);

export default PageNotFound;
