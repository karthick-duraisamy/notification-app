import React, { lazy, type JSX } from 'react';

const LazySettings = lazy(() => import('./Settings'));

const Settings = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
//   <Suspense fallback={<Loader fallback={true} />}>
    <LazySettings {...props} />
// </Suspense>
);

export default Settings;
