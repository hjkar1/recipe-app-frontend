import React, { Fragment, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getRecipes } from '../store/actions/recipes';
import TopNavBar from './ui/TopNavBar';
import SearchBar from './ui/SearchBar';
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

const Recipes = ({ error, loading, recipes, getRecipes }) => {
  const [searchTerms, setSearchTerms] = useState('');

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  const classes = useStyles();

  const handleSearchTextChange = searchTerms => {
    setSearchTerms(searchTerms);
  };

  let pageContent = null;

  if (loading) {
    pageContent = <Spinner />;
  } else if (error) {
    pageContent = <div>{error}</div>;
  } else {
    pageContent = (
      <div className={classes.container}>
        {recipes
          .filter(
            recipe =>
              recipe.title.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1
          )
          .map(recipe => (
            <Link
              className={classes.recipeLink}
              key={recipe._id}
              component={RouterLink}
              to={`/recipes/${recipe._id}`}
            >
              {recipe.title}
            </Link>
          ))}
      </div>
    );
  }

  return (
    <Fragment>
      <TopNavBar>
        <SearchBar
          searchTerms={searchTerms}
          handleChange={handleSearchTextChange}
        />
      </TopNavBar>
      {pageContent}
    </Fragment>
  );
};

const mapStateToProps = ({ recipes: { error, loading, recipes } }) => {
  return {
    error,
    loading,
    recipes
  };
};

export default connect(
  mapStateToProps,
  { getRecipes }
)(Recipes);
