import React, { Fragment, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getRecipes } from '../../store/actions/recipes';
import { getOwnRecipes } from '../../store/actions/users';
import TopNavBar from '../ui/TopNavBar/TopNavBar';
import Spinner from '../ui/Spinner';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(2)
  },
  recipeLink: {
    display: 'block',
    margin: theme.spacing(1)
  }
}));

export const OwnRecipes = ({
  recipesError,
  userError,
  loading,
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

  if (loading) {
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
          .filter(recipe => ownRecipes.indexOf(recipe.id) > -1)
          .map(recipe => (
            <Link
              className={classes.recipeLink}
              key={recipe.id}
              component={RouterLink}
              to={`/myrecipes/${recipe.id}`}
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
  userError: PropTypes.string,
  loading: PropTypes.bool,
  recipes: PropTypes.array,
  ownRecipes: PropTypes.array,
  getRecipes: PropTypes.func.isRequired,
  getOwnRecipes: PropTypes.func.isRequired
};

const mapStateToProps = ({ recipes, user }) => {
  return {
    recipesError: recipes.error,
    recipes: recipes.recipes,
    userError: user.error,
    ownRecipes: user.ownRecipes,
    loading: user.loading || recipes.loading
  };
};

export default connect(
  mapStateToProps,
  { getRecipes, getOwnRecipes }
)(OwnRecipes);
