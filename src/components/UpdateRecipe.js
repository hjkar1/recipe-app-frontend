import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getRecipe, updateRecipe } from '../store/actions/recipes';
import { getOwnRecipes } from '../store/actions/users';
import TopNavBar from './ui/TopNavBar';
import RecipeForm from './RecipeForm';
import Spinner from './ui/Spinner';

const UpdateRecipe = ({
  recipesError,
  recipesLoading,
  userError,
  userLoading,
  recipe,
  ownRecipes,
  getRecipe,
  updateRecipe,
  getOwnRecipes,
  match: {
    params: { recipeId }
  }
}) => {
  const [recipeSubmitted, setRecipeSubmitted] = useState(false);

  useEffect(() => {
    getRecipe(recipeId);
    getOwnRecipes();
  }, [getRecipe, getOwnRecipes, recipeId]);

  const handleSaveRecipe = (event, recipe) => {
    event.preventDefault();
    updateRecipe(recipe, recipeId);
    setRecipeSubmitted(true);
  };

  if (
    recipeSubmitted &&
    !recipesError &&
    !recipesLoading &&
    !userError &&
    !userLoading
  ) {
    return <Redirect to="/myrecipes" />;
  }

  let pageContent = null;

  if (recipesLoading || userLoading) {
    pageContent = <Spinner />;
  } else if (!recipe || !ownRecipes.find(id => id === recipeId)) {
    pageContent = <div>Recipe not found.</div>;
  } else {
    pageContent = (
      <RecipeForm handleSubmit={handleSaveRecipe} recipe={recipe} />
    );
  }

  return (
    <Fragment>
      <TopNavBar />
      {pageContent}
      <Fragment>
        <div>{recipesError}</div>
        <div>{userError === recipesError ? null : userError}</div>
      </Fragment>
    </Fragment>
  );
};

const mapStateToProps = ({ recipes, user }) => {
  return {
    recipesError: recipes.error,
    recipesLoading: recipes.loading,
    recipe: recipes.recipe,
    userError: user.error,
    userLoading: user.loading,
    ownRecipes: user.ownRecipes
  };
};

export default connect(
  mapStateToProps,
  { getRecipe, getOwnRecipes, updateRecipe }
)(UpdateRecipe);
