import React, { Fragment, useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { getRecipes } from '../../store/actions/recipes';
import TopNavBar from '../ui/TopNavBar/TopNavBar';
import SearchBar from '../ui/SearchBar';
import Spinner from '../ui/Spinner';

const useStyles = makeStyles(theme => ({
  container: {
    margin: theme.spacing(2)
  },
  recipeLink: {
    display: 'block',
    margin: theme.spacing(2)
  },
  showMoreButton: {
    marginTop: theme.spacing(2)
  }
}));

export const Recipes = ({ error, loading, recipes, getRecipes }) => {
  const recipesPerPage = 20;
  const [filterText, setFilterText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moreToShow, setMoreToShow] = useState(false);

  useEffect(() => {
    getRecipes();
  }, [getRecipes]);

  useEffect(() => {
    // The displayed recipe list is updated whenever this component receives
    // a new list of recipes.
    setSearchResults(recipes.slice(0, recipesPerPage));

    if (recipes.length > recipesPerPage) {
      setMoreToShow(true);
    }
  }, [recipes]);

  const classes = useStyles();

  const handleSearchTermsChange = searchTerms => {
    setFilterText(searchTerms);
    setCurrentPage(1);
    const filteredRecipes = filterRecipes(searchTerms);
    const currentRecipes = changeDisplayedRecipeList(filteredRecipes, 1);
    setSearchResults(currentRecipes);
    toggleShowMore(1, filteredRecipes);
  };

  // Increase the amount of currently displayed recipes.
  const handleShowMore = () => {
    const newPage = currentPage + 1;
    const filteredRecipes = filterRecipes(filterText);
    const currentRecipes = changeDisplayedRecipeList(filteredRecipes, newPage);
    setSearchResults(currentRecipes);
    setCurrentPage(newPage);
    toggleShowMore(newPage, filteredRecipes);
  };

  // The number of recipes to show is greater than the current amount
  // of visible recipe -> enable displaying more. Otherwise disable it.
  const toggleShowMore = (pageNumber, recipeList) => {
    if (recipesPerPage * pageNumber < recipeList.length) {
      setMoreToShow(true);
    } else {
      setMoreToShow(false);
    }
  };

  // Make a new list of displayed recipes based on the current page number.
  const changeDisplayedRecipeList = (recipeList, pageNumber) => {
    const lastRecipeIndex = pageNumber * recipesPerPage;
    const currentRecipes = recipeList.slice(0, lastRecipeIndex);
    return currentRecipes;
  };

  const filterRecipes = searchTerms => {
    // Filter the recipes (title or ingredients) that match the user's search terms.
    const filteredRecipes = recipes.filter(
      recipe =>
        recipe.title.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1 ||
        recipe.ingredients.toLowerCase().indexOf(searchTerms.toLowerCase()) > -1
    );
    return filteredRecipes;
  };

  let pageContent = null;

  // "Show more" button is displayed only if there is more recipes to show.
  const showMoreButton = moreToShow ? (
    <Button className={classes.showMoreButton} onClick={handleShowMore}>
      Show more
    </Button>
  ) : null;

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
            key={recipe.id}
            component={RouterLink}
            to={`/recipes/${recipe.id}`}
          >
            {recipe.title}
          </Link>
        ))}
        {showMoreButton}
      </div>
    );
  }

  return (
    <Fragment>
      <TopNavBar>
        <SearchBar
          searchTerms={filterText}
          handleChange={handleSearchTermsChange}
        />
      </TopNavBar>
      {pageContent}
    </Fragment>
  );
};

Recipes.propTypes = {
  error: PropTypes.string,
  loading: PropTypes.bool,
  recipes: PropTypes.array,
  getRecipes: PropTypes.func.isRequired
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
