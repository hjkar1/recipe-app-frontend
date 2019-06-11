import React, { Fragment, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getRecipe } from '../store/actions/recipes';
import TopNavBar from './ui/TopNavBar';
import Spinner from './ui/Spinner';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(2)
  },
  recipeContent: {
    whiteSpace: 'pre-wrap'
  }
}));

const Recipe = ({
  error,
  loading,
  recipe,
  getRecipe,
  children,
  match: {
    params: { recipeId }
  }
}) => {
  useEffect(() => {
    getRecipe(recipeId);
  }, [getRecipe, recipeId]);

  const classes = useStyles();

  let pageContent = null;

  if (loading) {
    pageContent = <Spinner />;
  } else if (error) {
    pageContent = <div>{error}</div>;
  } else if (!recipe) {
    pageContent = <div>Recipe not found.</div>;
  } else {
    pageContent = (
      <Fragment>
        <div className={classes.container}>
          <h1>{recipe.title}</h1>
          <p className={classes.recipeContent}>{recipe.ingredients}</p>
          <p className={classes.recipeContent}>{recipe.instructions}</p>
        </div>
        {children}
      </Fragment>
    );
  }

  return (
    <Fragment>
      <TopNavBar />
      {pageContent}
    </Fragment>
  );
};

const mapStateToProps = ({ recipes: { error, loading, recipe } }) => {
  return {
    error,
    loading,
    recipe
  };
};

export default connect(
  mapStateToProps,
  { getRecipe }
)(Recipe);
