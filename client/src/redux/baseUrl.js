/**
 * Helper to dynamically determine the backend API base URL
 * based on environment variables (supporting both Vite VITE_* and Next.js NEXT_PUBLIC_* variables).
 */
export const getBaseUrl = () => {
    // 1. Direct Backend URL variable
    const viteBackendUrl = typeof import.meta !== "undefined" && import.meta.env ? import.meta.env.VITE_BACKEND_URL : undefined;
    if (viteBackendUrl) {
        return viteBackendUrl;
    }

    // 2. Environment check (production vs development)
    const env = (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_ENV) ||
                (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_ENV) ||
                "development";

    const isProduction = env === "production";

    if (isProduction) {
        return (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_LIVE) ||
               (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_LIVE) ||
               "https://on-demand-server.vercel.app";
    }

    return (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_LOCAL) ||
           (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_LOCAL) ||
           "http://localhost:5000";
};
