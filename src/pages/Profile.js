import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Box, Container } from '@mui/material';
import { useHistory } from 'react-router-dom';

const Profile = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);
  const history = useHistory();

  useEffect(() => {
    if (!authState || !authState.isAuthenticated) {
      setUserInfo(null);
      history.push('/login');
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

  if (!userInfo) {
    return <div>Fetching user profile...</div>;
  }

  return (
    <Box>
      <Container>
        <h1>Profile Page</h1>
        {userInfo.name}
      </Container>
    </Box>
  );
};

export default Profile;
