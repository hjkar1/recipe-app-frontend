import * as actionTypes from './actionTypes';
import axios from '../../axiosInstance';
import { getAuthHeaderConfig } from './utils';

const setToken = user => {
  window.localStorage.setItem('loggedInUser', JSON.stringify(user));
};

export const login = user => async dispatch => {
  dispatch(loginStart());
  try {
    const response = await axios.post('users/login', user);
    setToken(response.data);
    dispatch(loginSuccess(user.username));
  } catch (error) {
    dispatch(loginFail('Login failed.'));
  }
};

const loginStart = () => ({
  type: actionTypes.LOGIN_START
});

const loginSuccess = user => ({
  type: actionTypes.LOGIN_SUCCESS,
  user
});

const loginFail = error => ({
  type: actionTypes.LOGIN_FAIL,
  error
});

export const logout = () => dispatch => {
  window.localStorage.removeItem('loggedInUser');
  dispatch(logoutSuccess());
};

const logoutSuccess = () => {
  return {
    type: actionTypes.LOGOUT_SUCCESS
  };
};

export const signup = user => async dispatch => {
  dispatch(signupStart());
  try {
    await axios.post('users', user);
    dispatch(signupSuccess());
  } catch (error) {
    dispatch(signupFail('Something went wrong.'));
  }
};

const signupStart = () => ({
  type: actionTypes.SIGNUP_START
});

const signupSuccess = () => ({
  type: actionTypes.SIGNUP_SUCCESS
});

const signupFail = error => ({
  type: actionTypes.SIGNUP_FAIL,
  error
});

export const signupClear = () => ({
  type: actionTypes.SIGNUP_CLEAR
});

export const getOwnRecipes = () => async dispatch => {
  dispatch(getOwnRecipesStart());
  try {
    const config = getAuthHeaderConfig();
    if (config) {
      const result = await axios.get('users/recipes', config);
      dispatch(getOwnRecipesSuccess(result.data));
    } else {
      dispatch(getOwnRecipesFail('Not logged in.'));
    }
  } catch (error) {
    dispatch(getOwnRecipesFail('Something went wrong.'));
  }
};

const getOwnRecipesStart = () => ({
  type: actionTypes.GET_OWN_RECIPES_START
});

const getOwnRecipesSuccess = recipes => ({
  type: actionTypes.GET_OWN_RECIPES_SUCCESS,
  recipes
});

const getOwnRecipesFail = error => ({
  type: actionTypes.GET_OWN_RECIPES_FAIL,
  error
});
