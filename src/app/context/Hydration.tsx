"use client";

import { HydrationBoundary } from "@tanstack/react-query";

export default function Hydration({
  children,
  dehydratedState,
}: {
  children: React.ReactNode;
  dehydratedState: unknown;
}) {
  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}
