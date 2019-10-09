import React, { Fragment, useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRecipe, updateRecipe } from '../../store/actions/recipes';
import { getOwnRecipes } from '../../store/actions/users';
import TopNavBar from '../ui/TopNavBar/TopNavBar';
import RecipeForm from '../RecipeForm/RecipeForm';
import Spinner from '../ui/Spinner';

export const ModifyRecipe = ({
  recipesError,
  userError,
  loading,
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

  const [modifiedRecipe, setModifiedRecipe] = useState(null);

  useEffect(() => {
    getRecipe(recipeId);
    getOwnRecipes();
  }, [getRecipe, getOwnRecipes, recipeId]);

  useEffect(() => {
    setModifiedRecipe(recipe);
  }, [recipe]);

  const handleChange = ({ target: { name, value } }) => {
    const updatedRecipe = { ...modifiedRecipe };
    updatedRecipe[name] = value;
    setModifiedRecipe(updatedRecipe);
  };

  const handleSaveRecipe = event => {
    event.preventDefault();
    updateRecipe(modifiedRecipe, recipeId);
    setRecipeSubmitted(true);
  };

  if (recipeSubmitted && !recipesError && !loading && !userError) {
    return <Redirect to="/myrecipes" />;
  }

  let pageContent = null;

  if (loading || !modifiedRecipe) {
    pageContent = <Spinner />;
  } else if (!recipe || !ownRecipes.find(id => id === recipeId)) {
    pageContent = <div>Recipe not found.</div>;
  } else {
    pageContent = (
      <RecipeForm
        handleSubmit={handleSaveRecipe}
        handleChange={handleChange}
        recipe={modifiedRecipe}
      />
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

ModifyRecipe.propTypes = {
  recipesError: PropTypes.string,
  userError: PropTypes.string,
  loading: PropTypes.bool,
  recipe: PropTypes.object,
  ownRecipes: PropTypes.array,
  getRecipe: PropTypes.func.isRequired,
  updateRecipe: PropTypes.func.isRequired,
  getOwnRecipes: PropTypes.func.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = ({ recipes, user }) => {
  return {
    recipesError: recipes.error,
    loading: recipes.loading || user.loading,
    recipe: recipes.recipe,
    userError: user.error,
    ownRecipes: user.ownRecipes
  };
};

export default connect(
  mapStateToProps,
  { getRecipe, getOwnRecipes, updateRecipe }
)(ModifyRecipe);
