import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import ProtectedRoute from './ProtectedRoute';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Recipes from './components/Recipes';
import Recipe from './components/Recipe';
import CreateRecipe from './components/CreateRecipe';
import ModifyRecipe from './components/ModifyRecipe';
import OwnRecipes from './components/OwnRecipes';
import OwnRecipe from './components/OwnRecipe';
import PageNotFound from './components/ui/PageNotFound';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Recipes} />
        <Route exact path="/recipes" component={Recipes} />
        <ProtectedRoute exact path="/recipes/new" component={CreateRecipe} />
        <Route exact path="/recipes/:recipeId" component={Recipe} />
        <ProtectedRoute
          exact
          path="/recipes/:recipeId/modify"
          component={ModifyRecipe}
        />
        <ProtectedRoute exact path="/myrecipes" component={OwnRecipes} />
        <ProtectedRoute
          exact
          path="/myrecipes/:recipeId"
          component={OwnRecipe}
        />
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
};

export default App;
