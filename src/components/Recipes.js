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
  const recipesPerPage = 20;

  const [searchTerms, setSearchTerms] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  useEffect(() => {
    // The displayed recipe list is updated whenever this component receives
    // a new list of recipes.
    setSearchResults(recipes.slice(0, recipesPerPage));
  }, [recipes]);

  const classes = useStyles();

  const handleSearchTextChange = searchTerms => {
    setSearchTerms(searchTerms);

    // Filter the recipes (title or ingredients) that match the user's search terms.
    const filteredRecipes = recipes.filter(
      recipe =>
        recipe.title.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1 ||
        recipe.ingredients.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1
    );

    const lastRecipeIndex = currentPage * recipesPerPage;
    const firstRecipeIndex = lastRecipeIndex - recipesPerPage;

    const currentRecipes = filteredRecipes.slice(
      firstRecipeIndex,
      lastRecipeIndex
    );
    setSearchResults(currentRecipes);
  };

  let pageContent = null;

  if (loading) {
    pageContent = <Spinner />;
  } else if (error) {
    pageContent = <div>{error}</div>;
  } else {
    pageContent = (
      <div className={classes.container}>
        {searchResults.map(recipe => (
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
