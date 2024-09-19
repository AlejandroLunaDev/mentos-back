import axios from "axios";
//Aquí los action Types
import {
  GET_TOKEN,
  VALIDATE_SESSION,
  LOG_OUT,
  GET_ALL_MENTORS,
  GET_MENTORS,
  GET_ALL_MENTORS_TOP,
  ORDER_BY_PRICE,
  ORDER_BY_NAME,
  POST_COMMENT,
  GET_COMMENTS,
  UPDATE_COMMENT_BY_ID,
  DELETE_COMMENT_BY_ID,
  GET_USERS,
  GET_USER_BY_ID,
  GET_MENTOR_BY_ID,
  POST_USER,
  LOGIN_PROFILE,
  SHOW_LIKES,
  ADD_FAVORITE,
  FILTER_BY_CATEGORY,
  FILTER_BY_NAME,
  FILTER_BY_SKILLS,
  FILTER_BY_PRICE_RANGE,
  REMOVE_FAVORITE,
  REDIRECT_TOKEN,
  LOGIN_GOOGLE_REQUEST,
  LOGIN_GOOGLE_SUCCESS,
  LOGIN_GOOGLE_FAILURE
} from "./types";
import { getBaseUrl } from "../../common/helper/envHelper";

axios.defaults.baseURL = getBaseUrl();
//----------------------MENTOR-------------------
export function getAllMentor() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/api/users");
      return dispatch({
        type: GET_ALL_MENTORS,
        payload: response.data,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
}
export function getMentors() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/api/users");
      return dispatch({
        type: GET_MENTORS,
        payload: response.data,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
}
export function getAllMentorTop() {
  return async function (dispatch) {
    try {
      const response = await axios.get("/api/users");

      return dispatch({
        type: GET_ALL_MENTORS_TOP,
        payload: response.data,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
}
//--------------user----------

export function addFavorite(userId, userFav, mentorId) {
  const data = {
    likes: [...userFav, mentorId],
  };
  return async function (dispatch) {
    try {
      const response = await axios.put(`api/users/${userId}`, data);
      return dispatch({
        type: ADD_FAVORITE,
        payload: response.data.detail,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
}
export function removeFavorite(userId, userFav, mentorId) {
  const filter = userFav.filter((id) => id !== mentorId);
  const data = {
    likes: filter,
  };
  return async function (dispatch) {
    try {
      const response = await axios.put(`api/users/${userId}`, data);
      return dispatch({
        type: REMOVE_FAVORITE,
        payload: response.data.detail,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
}

//---------------------GOOGLE---------------------------------

// Iniciar el login redirigiendo al usuario a Google 
export function loginGoogleUser() {
  return async function (dispatch) {
    try {
      dispatch({ type: LOGIN_GOOGLE_REQUEST });
      // Redirige a la página de autenticación de Google
      const url = `/api/sessions/google`;
      window.location.assign(url);

    } catch (error) {
      return dispatch({
        type: LOGIN_GOOGLE_FAILURE,
        payload: error.message,
      });
    }
  };
}
// Manejar el callback de Google después del login
export function loginGoogleUserCallback() {
  return async function (dispatch) {
    try {
      dispatch({ type: LOGIN_GOOGLE_REQUEST });

      // Hacer la petición al backend para obtener los datos del usuario
      const response = await axios.get(`/api/sessions/google/callback`);

      return dispatch({
        type: LOGIN_GOOGLE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      return dispatch({
        type: LOGIN_GOOGLE_FAILURE,
        payload: error.message,
      });
    }
  };
} 
// --------------Filter ----------------
export function FilterByCategory(category) {
  return {
    type: FILTER_BY_CATEGORY,
    payload: category,
  };
}
export function FilterByName(name) {
  return {
    type: FILTER_BY_NAME,
    payload: name,
  };
}
export function FilterBySkills(skills) {
  return {
    type: FILTER_BY_SKILLS,
    payload: skills,
  };
}
export function FilterByPriceRange(PriceRange) {
  return {
    type: FILTER_BY_PRICE_RANGE,
    payload: PriceRange,
  };
}

//----------------------------------------------------------------
export function getmentorsById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`api/users/${id}`);
      return dispatch({
        type: GET_MENTOR_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
}

//--------------------ORDER BY--------------------
export function orderByPrice(order) {
  return {
    type: ORDER_BY_PRICE,
    payload: order,
  };
}
export function orderByName(order) {
  return {
    type: ORDER_BY_NAME,
    payload: order,
  };
}

//--------------------COMMETS--------------------

export function getComents() {
  return async function (dispatch) {
    try {
      const response = await axios.get(`getComments`);
      return dispatch({
        type: GET_COMMENTS,
        payload: response.data,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
}
//comment= {rating, comment, mentorId, userId}
export function postComment(comment) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`postComment`, comment);
      return dispatch({
        type: POST_COMMENT,
        payload: response.data,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
}
//editCommet={id, rating, comment }
export function updateCommentById({ id, rating, comment }) {
  return async function (dispatch) {
    try {
      const response = await axios.put(`updateComment/${id}`, {
        rating,
        comment,
      });
      return dispatch({
        type: UPDATE_COMMENT_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
}
export function deleteCommentById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.delete(`deleteComment/${id}`);
      return dispatch({
        type: DELETE_COMMENT_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
}
//-------------------------USER-----------------------
export function obtainToken({ email }) {
  return async function (dispatch) {
    try {
      const theData = {
        id: "6",
        data1: email,
      };
      const response = await axios.post("activateUser/", theData);
      dispatch({ type: GET_TOKEN, payload: response.data });
      return response.data.text;
    } catch (error) {
      throw new Error(error.message);
    }
  };
}
export function validateSession(email, token) {
  return async function (dispatch) {
    try {
      const theData = {
        id: "7",
        data1: email,
        data2: token,
      };
      const response = await axios.post("/activateUser/", theData);
      dispatch({ type: VALIDATE_SESSION, payload: response.data });
      return response.data.detail.userValidate.findUser[0];
    } catch (error) {
      //return error.response.data;
      throw new Error(error.message);
    }
  };
}

export function logOut() {
  return {
    type: LOG_OUT,
    payload: [],
  };
}

export function loginProfile(bool) {
  return {
    type: LOGIN_PROFILE,
    payload: bool,
  };
}
export function listWish(bool) {
  return {
    type: SHOW_LIKES,
    payload: bool,
  };
}

export function getUsers() {
  return async function (dispatch) {
    try {
      const response = await axios.post(`findUser`);
      return dispatch({
        type: GET_USERS,
        payload: response.data,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
}
export function getUserById(id) {
  return async function (dispatch) {
    try {
      const response = await axios.get(`api/users/${id}`);
      return dispatch({
        type: GET_USER_BY_ID,
        payload: response.data,
      });
    } catch (error) {
      throw Error(error.message);
    }
  };
}
export function postUser(userData) {
  return async function (dispatch) {
    try {
      const response = await axios.post(`newUser`, userData);
      return dispatch({
        type: POST_USER,
        payload: response.data,
      });
    } catch (error) {
      throw Error(error.response ? error.response.data.text : error.message);
    }
  };
}


export function redirectToken(token) {
  return {
    type: REDIRECT_TOKEN,
    payload: token,
  };
}

