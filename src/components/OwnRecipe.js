import React, { Fragment, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { deleteRecipe } from '../store/actions/recipes';
import { getOwnRecipes } from '../store/actions/users';
import Recipe from './Recipe';
import TopNavBar from './ui/TopNavBar';

// This component is used for adding update link and delete button to a recipe component
const OwnRecipe = ({
  deleteRecipe,
  getOwnRecipes,
  recipesError,
  recipesLoading,
  userError,
  userLoading,
  ownRecipes,
  match
}) => {
  // This prop needs to be passed to the actual recipe component
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

  if (
    recipeDeleted &&
    !recipesError &&
    !recipesLoading &&
    !userError &&
    !userLoading
  ) {
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
      {/* The url params prop (recipeId) is passed to the recipe component */}
      <Recipe match={match}>
        <div>
          <Button component={Link} to={`/recipes/${recipeId}/modify`}>
            Modify
          </Button>
          <Button onClick={handleDialogOpen}>Delete</Button>
        </div>
        <Fragment>
          <div>{recipesError}</div>
          <div>{userError === recipesError ? null : userError}</div>
        </Fragment>
      </Recipe>
    </Fragment>
  );
};

const mapStateToProps = ({ recipes, user }) => {
  return {
    recipesError: recipes.error,
    recipesLoading: recipes.loading,
    userError: user.error,
    userLoading: user.loading,
    ownRecipes: user.ownRecipes
  };
};

export default connect(
  mapStateToProps,
  { deleteRecipe, getOwnRecipes }
)(OwnRecipe);
