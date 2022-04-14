import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useHistory } from 'react-router-dom';
import { Box, Container, Button } from '@mui/material';

const Home = () => {
  const history = useHistory();
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      setUserInfo(null);
    } else {
      oktaAuth
        .getUser()
        .then((info) => {
          setUserInfo(info);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [authState, userInfo, oktaAuth]);

  if (!authState) {
    return <div>Loading...</div>;
  }

  const login = async () => {
    history.push('/login');
  };

  return (
    <Box>
      <Container>
        <h1>Home Page</h1>
        {authState.isAuthenticated && !userInfo && (
          <div>Loading user, please wait...</div>
        )}
        {authState.isAuthenticated && userInfo && (
          <div>
            <p>Welcome, {userInfo.name}</p>
          </div>
        )}

        {!authState.isAuthenticated && (
          <div>
            <p>
              If you are seeing this message you are not authenticated to see
              the protected pages. Please login in to authenticate your user
              account and get access to profile
            </p>
            <Button variant="contained" color="primary" onClick={login}>
              Login
            </Button>
          </div>
        )}
      </Container>
    </Box>
  );
};

export default Home;
