import * as actionTypes from './actionTypes';
import axios from '../../axiosInstance';
import { getAuthHeaderConfig } from './utils';

// Create a new recipe.

export const createRecipe = recipe => async dispatch => {
  dispatch(createRecipeStart());
  try {
    const config = getAuthHeaderConfig();
    if (config) {
      const result = await axios.post('recipes', recipe, config);
      dispatch(createRecipeSuccess(result.data));
    } else {
      dispatch(createRecipeFail('Not logged in.'));
    }
  } catch (error) {
    dispatch(createRecipeFail('Something went wrong.'));
  }
};

const createRecipeStart = () => ({
  type: actionTypes.CREATE_RECIPE_START
});

const createRecipeSuccess = recipe => ({
  type: actionTypes.CREATE_RECIPE_SUCCESS,
  recipe
});

const createRecipeFail = error => ({
  type: actionTypes.CREATE_RECIPE_FAIL,
  error
});

// Get all recipes.

export const getRecipes = () => async dispatch => {
  dispatch(getRecipesStart());
  try {
    const result = await axios.get('recipes');
    dispatch(getRecipesSuccess(result.data));
  } catch (error) {
    dispatch(getRecipesFail('Recipes not found.'));
  }
};

const getRecipesStart = () => ({
  type: actionTypes.GET_RECIPES_START
});

const getRecipesSuccess = recipes => ({
  type: actionTypes.GET_RECIPES_SUCCESS,
  recipes
});

const getRecipesFail = error => ({
  type: actionTypes.GET_RECIPES_FAIL,
  error
});

// Get a recipe.

export const getRecipe = recipeId => async dispatch => {
  dispatch(getRecipeStart());
  try {
    const result = await axios.get(`recipes/${recipeId}`);
    dispatch(getRecipeSuccess(result.data));
  } catch (error) {
    dispatch(getRecipeFail('Recipe not found.'));
  }
};

const getRecipeStart = () => ({
  type: actionTypes.GET_RECIPE_START
});

const getRecipeSuccess = recipe => ({
  type: actionTypes.GET_RECIPE_SUCCESS,
  recipe
});

const getRecipeFail = error => ({
  type: actionTypes.GET_RECIPE_FAIL,
  error
});

// Modify a recipe.

export const updateRecipe = (recipe, recipeId) => async dispatch => {
  dispatch(updateRecipeStart());
  try {
    const config = getAuthHeaderConfig();
    if (config) {
      const result = await axios.put(`recipes/${recipeId}`, recipe, config);
      dispatch(updateRecipeSuccess(result.data));
    } else {
      dispatch(updateRecipeFail('Not logged in.'));
    }
  } catch (error) {
    dispatch(updateRecipeFail('Something went wrong.'));
  }
};

const updateRecipeStart = () => ({
  type: actionTypes.UPDATE_RECIPE_START
});

const updateRecipeSuccess = recipe => ({
  type: actionTypes.UPDATE_RECIPE_SUCCESS,
  recipe
});

const updateRecipeFail = error => ({
  type: actionTypes.UPDATE_RECIPE_FAIL,
  error
});

// Delete a recipe.

export const deleteRecipe = recipeId => async dispatch => {
  dispatch(deleteRecipeStart());
  try {
    const config = getAuthHeaderConfig();
    if (config) {
      await axios.delete(`recipes/${recipeId}`, config);
      dispatch(deleteRecipeSuccess());
    } else {
      dispatch(deleteRecipeFail('Not logged in.'));
    }
  } catch (error) {
    dispatch(deleteRecipeFail('Something went wrong.'));
  }
};

const deleteRecipeStart = () => ({
  type: actionTypes.DELETE_RECIPE_START
});

const deleteRecipeSuccess = () => ({
  type: actionTypes.DELETE_RECIPE_SUCCESS
});

const deleteRecipeFail = error => ({
  type: actionTypes.DELETE_RECIPE_FAIL,
  error
});
