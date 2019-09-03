import * as actionTypes from '../actions/actionTypes';

const initialState = {
  user: null,
  signedUp: false,
  ownRecipes: [],
  loading: false,
  error: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOGIN_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.user,
        loading: false,
        error: null
      };
    case actionTypes.LOGIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.LOGOUT_SUCCESS:
      return {
        ...state,
        user: null
      };
    case actionTypes.SIGNUP_START:
      return {
        ...state,
        signedUp: false,
        loading: true,
        error: null
      };
    case actionTypes.SIGNUP_SUCCESS:
      return {
        ...state,
        signedUp: true,
        loading: false,
        error: null
      };
    case actionTypes.SIGNUP_FAIL:
      return {
        ...state,
        signedUp: false,
        loading: false,
        error: action.error
      };
    case actionTypes.SIGNUP_CLEAR:
      return {
        ...state,
        signedUp: false,
        loading: false,
        error: null
      };
    case actionTypes.GET_OWN_RECIPES_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case actionTypes.GET_OWN_RECIPES_SUCCESS:
      return {
        ...state,
        ownRecipes: action.recipes,
        loading: false,
        error: null
      };
    case actionTypes.GET_OWN_RECIPES_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    case actionTypes.CLEAR_ERROR_MESSAGE:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default userReducer;
