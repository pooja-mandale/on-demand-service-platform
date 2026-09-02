/**
 * Helper to dynamically determine the backend API base URL.
 * Strictly routes production builds to live Vercel backend and dev builds to localhost.
 */
export const getBaseUrl = () => {
    // Check if running in production build (Vite sets import.meta.env.PROD to true during vite build)
    const isProduction =
        (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.PROD) ||
        (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.MODE === "production") ||
        (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_ENV === "production") ||
        (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_ENV === "production");

    if (isProduction) {
        const customBackend = typeof import.meta !== "undefined" && import.meta.env ? import.meta.env.VITE_BACKEND_URL : undefined;
        if (customBackend && !customBackend.includes("localhost") && !customBackend.includes("127.0.0.1")) {
            return customBackend.replace(/\/+$/, "");
        }

        const liveUrl =
            (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_LIVE) ||
            (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_URL) ||
            (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_API_URL) ||
            "https://on-demand-service-platform-server.vercel.app";

        return liveUrl.replace(/\/+$/, "");
    }

    // Local Development Mode
    const localUrl =
        (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_BACKEND_URL) ||
        (typeof import.meta !== "undefined" && import.meta.env && import.meta.env.VITE_API_LOCAL) ||
        "http://localhost:5000";

    return localUrl.replace(/\/+$/, "");
};
