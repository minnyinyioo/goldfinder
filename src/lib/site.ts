const fallback = "https://goldfinder.vercel.app";
const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim() || fallback;

export const SITE_URL = new URL(configured).origin;
export const USING_TEMPORARY_HOST = SITE_URL === fallback;
