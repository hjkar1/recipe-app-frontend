import React from 'react';
import { render, fireEvent, wait } from 'utils/integration-test-utils';
import TopNavBar from './TopNavBar';

// Use routing to test redirect after logout.
import { Route, Switch } from 'react-router-dom';

/*
  An integration test for logging out.
*/

test('logs the user out and redirects after logout', async () => {
  // Mock logged in user.

  const user = {
    username: 'testUser',
    token: '000'
  };

  localStorage.setItem('loggedInUser', JSON.stringify(user));

  // Mock component for redirect page.
  const RedirectPage = () => <div>Redirected</div>;

  const { getByText } = render(
    <Switch>
      <Route exact path="/login" component={RedirectPage} />
      <Route render={() => <TopNavBar />} />
    </Switch>
  );

  fireEvent.click(getByText('Logout'));

  await wait(() => {
    // Check that the user is removed from localstorage.
    const user = localStorage.getItem('loggedInUser');
    expect(user).toBeNull;

    // Check that the redirect after logout works.
    const redirectPage = getByText('Redirected');
    expect(redirectPage).toBeDefined();
  });

  // Clear logged in user data from mock localstorage.
  localStorage.clear();
});
