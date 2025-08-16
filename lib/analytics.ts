// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "consent",
      targetId: string | Date,
      config?: Record<string, any>
    ) => void;
  }
}

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-6ZKXLP1TX5";

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({
  action,
  category,
  label,
  value,
}: {
  action: string;
  category: string;
  label?: string;
  value?: number;
}) => {
  if (typeof window !== "undefined" && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track specific events for the landing page
export const trackDownload = (packageName: string) => {
  event({
    action: "download",
    category: "engagement",
    label: packageName,
  });
};

export const trackExternalLink = (url: string) => {
  event({
    action: "click",
    category: "external_link",
    label: url,
  });
};

export const trackFeatureView = (featureName: string) => {
  event({
    action: "view",
    category: "feature",
    label: featureName,
  });
};

export const trackDemo = (demoType: string) => {
  event({
    action: "interact",
    category: "demo",
    label: demoType,
  });
};

export const trackCTA = (ctaName: string) => {
  event({
    action: "click",
    category: "cta",
    label: ctaName,
  });
};
