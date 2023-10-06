export const environment = {
  production: false,
  tenantMetricDaysToGoBack: 1,
  iridiumTrackerBaseUrl: 'http://localhost:8382/',
  iridium: {
    domain: 'http://localhost:8381/',
    redirectUri: 'http://localhost:4200/callback',
    successfulAuthDestination: '/dashboard',
    clientId: 'localRunIdChangeForProduction',
    errorPath: '/error',
  },
};
