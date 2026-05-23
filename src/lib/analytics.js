// src/lib/analytics.js

export const GA_MEASUREMENT_ID = process.env.GA_MEASUREMENT_ID;

export function loadGoogleAnalytics() {
  if (typeof window === "undefined") return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }

  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_MEASUREMENT_ID);
}

export function trackPageView(url) {
  if (typeof window.gtag !== "function") return;

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

export function trackEvent(action, params = {}) {
  if (typeof window.gtag !== "function") return;

  window.gtag("event", action, params);
}