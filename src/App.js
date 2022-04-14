import React from 'react';
import { Route, useHistory, Switch } from 'react-router-dom';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, SecureRoute, LoginCallback } from '@okta/okta-react';
import { oktaConfig } from './config';
import Home from './pages/Home';
import CustomLogin from './pages/CustomLogin';
import Profile from './pages/Profile';
import Header from './components/Header';
import { Box, Container } from '@mui/material';

const oktaAuth = new OktaAuth(oktaConfig.oidc);

function App() {
  const history = useHistory();

  const onAuthRequired = () => {
    history.push('/login');
  };
  const onRestoreOriginalUri = (_oktaAuth, originalUri) => {
    console.log(originalUri);
    history.replace(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <Security
      oktaAuth={oktaAuth}
      restoreOriginalUri={onRestoreOriginalUri}
      onAuthRequired={onAuthRequired}
    >
      <Header />
      <Box sx={{ mt: 5 }}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={CustomLogin} />
          <Route path="/login/callback" exact component={LoginCallback} />
          <SecureRoute path="/profile" component={Profile} />
        </Switch>
      </Box>
    </Security>
  );
}

export default App;
