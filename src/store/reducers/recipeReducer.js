import * as actionTypes from '../actions/actionTypes';

const initialState = {
  recipes: [],
  recipe: null,
  loading: false,
  error: null
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_RECIPES_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.GET_RECIPES_SUCCESS:
      return {
        ...state,
        recipes: action.recipes,
        loading: false,
        error: null
      };
    case actionTypes.GET_RECIPES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.GET_RECIPE_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.GET_RECIPE_SUCCESS:
      return {
        ...state,
        recipe: action.recipe,
        loading: false,
        error: null
      };
    case actionTypes.GET_RECIPE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.CREATE_RECIPE_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.CREATE_RECIPE_SUCCESS:
      return {
        ...state,
        recipe: action.recipe,
        loading: false,
        error: null
      };
    case actionTypes.CREATE_RECIPE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.UPDATE_RECIPE_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.UPDATE_RECIPE_SUCCESS:
      return {
        ...state,
        recipe: action.recipe,
        loading: false,
        error: null
      };
    case actionTypes.UPDATE_RECIPE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.DELETE_RECIPE_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.DELETE_RECIPE_SUCCESS:
      return {
        ...state,
        recipe: null,
        loading: false,
        error: null
      };
    case actionTypes.DELETE_RECIPE_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default recipeReducer;
