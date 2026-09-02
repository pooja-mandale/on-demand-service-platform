/**
 * Helper to dynamically determine the backend API base URL
 * based on environment variables (supporting both Vite VITE_* and Next.js NEXT_PUBLIC_* variables).
 */
export const getBaseUrl = () => {
    // 1. Direct Backend URL variable check
    const directUrl =
        (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_BACKEND_URL) ||
        (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL) ||
        (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_URL);

    if (directUrl) {
        return directUrl.replace(/\/+$/, "");
    }

    // 2. Environment check (production vs development)
    const env = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_ENV) ||
                (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_ENV) ||
                "development";

    const isProduction = env === "production";

    let targetUrl;
    if (isProduction) {
        targetUrl = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_LIVE) ||
                    (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_LIVE) ||
                    "https://on-demand-service-platform-server.vercel.app";
    } else {
        targetUrl = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_LOCAL) ||
                    (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_LOCAL) ||
                    "http://localhost:5000";
    }

    return targetUrl.replace(/\/+$/, "");
};
