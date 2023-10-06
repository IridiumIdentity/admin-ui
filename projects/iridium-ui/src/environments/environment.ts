export const environment = {
  production: true,
  tenantMetricDaysToGoBack: 1,
  iridiumTrackerBaseUrl: 'TRACKER_DOMAIN_GOES_HERE',
  iridium: {
    domain: 'MANAGEMENT_DOMAIN_GOES_HERE',
    redirectUri: 'REDIRECT_URI_GOES_HERE',
    successfulAuthDestination: '/dashboard',
    clientId: 'CLIENT_ID_GOES_HERE',
    errorPath: '/error',
  },
};
