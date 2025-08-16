"use client";

import { usePageView } from "@/hooks/useAnalytics";
import { Suspense } from "react";

function AnalyticsContent() {
  usePageView();
  return null;
}

export function AnalyticsProvider() {
  return (
    <Suspense fallback={null}>
      <AnalyticsContent />
    </Suspense>
  );
}
