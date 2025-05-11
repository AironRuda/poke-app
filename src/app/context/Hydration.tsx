"use client";

import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from "@tanstack/react-query";

export default function Hydration({
  children,
  dehydratedState,
}: {
  children: React.ReactNode;
  dehydratedState: any;
}) {
  return (
    <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
  );
}
