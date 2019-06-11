// Get auth token from local storage and add to header

export const getAuthHeaderConfig = () => {
  const user = window.localStorage.getItem('loggedInUser');
  if (user) {
    const userObject = JSON.parse(user);
    const token = userObject.token;
    const config = {
      headers: { Authorization: `bearer ${token}` }
    };
    return config;
  }

  return null;
};
