import { pageview } from "@/lib/analytics";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

// Hook to automatically track page views
export const usePageView = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      try {
        const url =
          pathname +
          (searchParams?.toString() ? `?${searchParams.toString()}` : "");
        pageview(url);
      } catch (error) {
        // Fallback if searchParams is not available
        pageview(pathname);
      }
    }
  }, [pathname, searchParams]);
};

// Hook for manual event tracking
export const useAnalytics = () => {
  return {
    trackEvent: (eventData: {
      action: string;
      category: string;
      label?: string;
      value?: number;
    }) => {
      if (typeof window !== "undefined" && window.gtag) {
        window.gtag("event", eventData.action, {
          event_category: eventData.category,
          event_label: eventData.label,
          value: eventData.value,
        });
      }
    },
  };
};
