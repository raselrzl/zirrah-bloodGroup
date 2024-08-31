export const BASE_API_URL: string =
  process.env.NEXT_PUBLIC_ENV === 'production'
    ? process.env.NEXT_PUBLIC_BASE_API_URL!
    : process.env.NEXT_PUBLIC_DEV_BASE_API_URL || 'http://localhost:3000';