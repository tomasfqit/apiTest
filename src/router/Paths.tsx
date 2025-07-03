export const ROUTES = {
	// Auth routes
	LOGIN: '/login',
	
	// Main routes
	DASHBOARD: '/home',
	PROFILE: '/profile',
	
	// Default routes
	HOME: '/home',
	NOT_FOUND: '*',
} as const;

export type RouteKey = keyof typeof ROUTES;
