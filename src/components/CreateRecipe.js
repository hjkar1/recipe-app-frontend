import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createRecipe } from '../store/actions/recipes';
import TopNavBar from './ui/TopNavBar';
import RecipeForm from './RecipeForm';
import Spinner from './ui/Spinner';

const CreateRecipe = ({ error, loading, createRecipe }) => {
  const [recipeSubmitted, setRecipeSubmitted] = useState(false);

  const handleSaveRecipe = (event, recipe) => {
    event.preventDefault();
    createRecipe(recipe);
    setRecipeSubmitted(true);
  };

  if (recipeSubmitted && !loading && !error) {
    return <Redirect to="/myrecipes" />;
  }

  let pageContent = null;

  if (loading) {
    pageContent = <Spinner />;
  } else if (error) {
    pageContent = <div>{error}</div>;
  } else {
    pageContent = <RecipeForm handleSubmit={handleSaveRecipe} />;
  }

  return (
    <Fragment>
      <TopNavBar />
      {pageContent}
    </Fragment>
  );
};

const mapStateToProps = ({ recipes: { error, loading } }) => {
  return {
    error,
    loading
  };
};

export default connect(
  mapStateToProps,
  { createRecipe }
)(CreateRecipe);
