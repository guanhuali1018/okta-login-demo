import React from 'react';
import { AppBar, Box, Toolbar, Button, Typography } from '@mui/material';
import { useOktaAuth } from '@okta/okta-react';
import { useHistory } from 'react-router-dom';

const Header = () => {
  const history = useHistory();
  const { authState, oktaAuth } = useOktaAuth();

  const logout = async () => {
    const basename =
      window.location.origin + history.createHref({ pathname: '/' });
    try {
      await oktaAuth.signOut({ postLogoutRedirectUri: basename });
    } catch (err) {
      console.log(err);
    }
  };

  const login = async () => {
    history.push('/login');
  };

  if (!authState) {
    return null;
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            OKTA-DEMO-APP
          </Typography>

          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: 20 }}
            onClick={() => history.push('/')}
          >
            Home Page
          </Button>

          <Button
            variant="contained"
            color="primary"
            style={{ marginRight: 20 }}
            onClick={() => history.push('/profile')}
          >
            Profile Page
          </Button>

          {authState.isAuthenticated && (
            <Button variant="contained" color="error" onClick={logout}>
              Logout
            </Button>
          )}

          {!authState.isPending && !authState.isAuthenticated && (
            <Button variant="contained" color="primary" onClick={login}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
