import React, { Fragment, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRecipes } from '../store/actions/recipes';
import { getOwnRecipes } from '../store/actions/users';
import TopNavBar from './ui/TopNavBar';
import Spinner from './ui/Spinner';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(2)
  },
  recipeLink: {
    display: 'block',
    margin: theme.spacing(1)
  }
}));

const OwnRecipes = ({
  recipesError,
  recipesLoading,
  userError,
  userLoading,
  recipes,
  ownRecipes,
  getRecipes,
  getOwnRecipes
}) => {
  useEffect(() => {
    getRecipes();
    getOwnRecipes();
  }, [getRecipes, getOwnRecipes]);

  const classes = useStyles();

  let pageContent = null;

  if (recipesLoading || userLoading) {
    pageContent = <Spinner />;
  } else if (recipesError || userError) {
    pageContent = (
      <Fragment>
        <div>{recipesError}</div>
        <div>{userError === recipesError ? null : userError}</div>
      </Fragment>
    );
  } else {
    pageContent = (
      <div className={classes.container}>
        {recipes
          .filter(recipe =>
            ownRecipes.find(ownRecipeId => recipe._id === ownRecipeId)
          )
          .map(recipe => (
            <Link
              className={classes.recipeLink}
              key={recipe._id}
              component={RouterLink}
              to={`/myrecipes/${recipe._id}`}
            >
              {recipe.title}
            </Link>
          ))}
      </div>
    );
  }

  return (
    <Fragment>
      <TopNavBar />
      {pageContent}
    </Fragment>
  );
};

OwnRecipes.propTypes = {
  recipesError: PropTypes.string,
  recipesLoading: PropTypes.bool,
  userError: PropTypes.string,
  userLoading: PropTypes.bool,
  recipes: PropTypes.array,
  ownRecipes: PropTypes.array,
  getRecipes: PropTypes.func,
  getOwnRecipes: PropTypes.func
};

const mapStateToProps = ({ recipes, user }) => {
  return {
    recipesError: recipes.error,
    recipesLoading: recipes.loading,
    recipes: recipes.recipes,
    userError: user.error,
    userLoading: user.loading,
    ownRecipes: user.ownRecipes
  };
};

export default connect(
  mapStateToProps,
  { getRecipes, getOwnRecipes }
)(OwnRecipes);
