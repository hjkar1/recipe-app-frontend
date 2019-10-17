// Get token from local storage and add to authorization header.

export const getAuthHeaderConfig = () => {
  const user = window.localStorage.getItem('loggedInUser');

  if (user) {
    const { token } = JSON.parse(user);

    const config = {
      headers: { Authorization: `bearer ${token}` }
    };

    return config;
  }

  return null;
};
