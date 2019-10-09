import React, { Fragment, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteRecipe } from '../../store/actions/recipes';
import { getOwnRecipes } from '../../store/actions/users';
import Recipe from '../Recipe/Recipe';
import TopNavBar from '../ui/TopNavBar/TopNavBar';

// This component is used for adding update link and delete button to a recipe component.
export const OwnRecipe = ({
  deleteRecipe,
  getOwnRecipes,
  recipesError,
  userError,
  loading,
  ownRecipes,
  match
}) => {
  const {
    params: { recipeId }
  } = match;

  useEffect(() => {
    getOwnRecipes();
  }, [getOwnRecipes]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [recipeDeleted, setRecipeDeleted] = useState(false);

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDelete = () => {
    setDialogOpen(false);
    setRecipeDeleted(true);
    deleteRecipe(recipeId);
  };

  const dialog = (
    <Dialog
      open={dialogOpen}
      onClose={handleDialogClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
    >
      <DialogTitle id="dialog-title">Delete recipe</DialogTitle>
      <DialogContent>
        <DialogContentText id="dialog-description">
          Delete this recipe.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary" autoFocus>
          Cancel
        </Button>
        <Button onClick={handleDelete} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );

  if (recipeDeleted && !recipesError && !userError && !loading) {
    return <Redirect to="/myrecipes" />;
  }

  if (!ownRecipes.find(id => id === recipeId)) {
    return (
      <Fragment>
        <TopNavBar />
        <div>Recipe not found.</div>
      </Fragment>
    );
  }

  return (
    <Fragment>
      {dialog}
      {/* The url params prop (recipeId) is passed to the recipe component. */}
      <Recipe match={match}>
        <div>
          <Button component={Link} to={`/recipes/${recipeId}/modify`}>
            Modify recipe
          </Button>
          <Button onClick={handleDialogOpen}>Delete recipe</Button>
        </div>
        <Fragment>
          <div>{recipesError}</div>
          <div>{userError === recipesError ? null : userError}</div>
        </Fragment>
      </Recipe>
    </Fragment>
  );
};

OwnRecipe.propTypes = {
  deleteRecipe: PropTypes.func.isRequired,
  getOwnRecipes: PropTypes.func.isRequired,
  recipesError: PropTypes.string,
  userError: PropTypes.string,
  loading: PropTypes.bool,
  ownRecipes: PropTypes.array,
  match: PropTypes.object.isRequired
};

const mapStateToProps = ({ recipes, user }) => {
  return {
    recipesError: recipes.error,
    loading: recipes.loading || user.loading,
    userError: user.error,
    ownRecipes: user.ownRecipes
  };
};

export default connect(
  mapStateToProps,
  { deleteRecipe, getOwnRecipes }
)(OwnRecipe);
