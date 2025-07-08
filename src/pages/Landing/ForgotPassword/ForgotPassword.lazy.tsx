import React, { lazy, Suspense } from 'react';

// Define props type manually
type ForgotPasswordProps = {
  userId: string;
};

// Lazy load with type cast
const LazyForgotPassword = lazy(
  () =>
    import('./ForgotPassword').then((module) => ({
      default: module.ForgotPassword,
    })) as Promise<{ default: React.ComponentType<ForgotPasswordProps> }>
);

const ForgotPassword = (props: ForgotPasswordProps) => (
  <Suspense fallback={null}>
    <LazyForgotPassword {...props} />
  </Suspense>
);

export default ForgotPassword;


