const mapping: Record<string, string> = {
  investors: 'investor',
  paintings: 'painting',
  purchases: 'purchase',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
