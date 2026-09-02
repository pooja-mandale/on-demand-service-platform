/**
 * Returns cookie options based on the current environment.
 * In production (e.g. Vercel), secure must be true and sameSite can be 'none' (for cross-origin requests) or 'strict'.
 * In development, secure is false and sameSite is 'strict' or 'lax'.
 */
const getCookieOptions = () => {
    const isProduction = process.env.NODE_ENV === "production";
    return {
        httpOnly: true,
        secure: isProduction, // false in development, true in production
        sameSite: isProduction ? "none" : "strict",
        maxAge: 3650 * 24 * 60 * 60 * 1000 // 10 years
    };
};

module.exports = getCookieOptions;
