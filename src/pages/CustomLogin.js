import React, { useEffect, useRef } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Box, Container } from '@mui/material';
import * as OktaSignIn from '@okta/okta-signin-widget';
import { oktaConfig } from '../config';

import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css';

const CustomLogin = () => {
  const { oktaAuth } = useOktaAuth();
  const widgetRef = useRef();

  useEffect(() => {
    if (!widgetRef) {
      return false;
    }

    const { issuer, clientId, redirectUri, scopes, useInteractionCode } =
      oktaConfig.oidc;
    const widget = new OktaSignIn({
      baseUrl: issuer.split('/oauth2')[0],
      clientId,
      redirectUri,
      i18n: {
        en: {
          'primaryauth.title': 'Sign in to React & Company',
        },
      },
      authParams: {
        issuer,
        scopes,
      },
      useInteractionCodeFlow: useInteractionCode,
    });

    widget.renderEl(
      { el: widgetRef.current },
      (res) => {
        oktaAuth.handleLoginRedirect(res.tokens);
      },
      (err) => {
        throw err;
      }
    );

    return () => widget.remove();
  }, [oktaAuth]);

  return (
    <Box>
      <Container>
        <div ref={widgetRef} />
      </Container>
    </Box>
  );
};

export default CustomLogin;
