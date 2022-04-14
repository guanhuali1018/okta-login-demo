export const oktaConfig = {
  oidc: {
    issuer: `https://${process.env.REACT_APP_OKTA_DOMAIN}/oauth2/default`,
    clientId: `${process.env.REACT_APP_OKTA_CLIENT_ID}`,
    scopes: ['openid', 'profile', 'email'],
    redirectUri: `${window.location.origin}/login/callback`,
    useInteractionCode: false,
    disableHttpsCheck: false,
    pkce: true,
  },
};
