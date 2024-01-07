// Line below will protect with authentication whole application
export { default } from 'next-auth/middleware'

// Line below and line above will protect with authentication only specific routes
export const config = { matcher: ['/dashboard/:path*'] }
