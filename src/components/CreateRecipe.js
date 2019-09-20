import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createRecipe } from '../store/actions/recipes';
import TopNavBar from './ui/TopNavBar';
import RecipeForm from './RecipeForm';
import Spinner from './ui/Spinner';

const CreateRecipe = ({ error, loading, createRecipe }) => {
  const [recipeSubmitted, setRecipeSubmitted] = useState(false);

  const [recipe, setRecipe] = useState({
    title: '',
    ingredients: '',
    instruction: ''
  });

  const handleChange = ({ target: { name, value } }) => {
    const updatedRecipe = { ...recipe };
    updatedRecipe[name] = value;
    setRecipe(updatedRecipe);
  };

  const handleSaveRecipe = event => {
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
    pageContent = (
      <RecipeForm
        recipe={recipe}
        handleSubmit={handleSaveRecipe}
        handleChange={handleChange}
      />
    );
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
