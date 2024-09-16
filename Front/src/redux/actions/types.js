// datos de los mentores
// id, fist_name, last_name, role, avatar, skills (array),top, category(array[0]=categoria,[1]=nombreM)
//pricing(array), experience(array), education(array)

export const GET_ALL_MENTORS = "GET_ALL_MENTORS";
export const GET_ALL_MENTORS_TOP = "GET_ALL_MENTORS_TOP";

//FILTER
export const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
export const FILTER_BY_NAME = "FILTER_BY_NAME"; // temporary is used by the searchBar
export const FILTER_BY_SKILLS = "FILTER_BY_SKILLS";
export const FILTER_BY_PRICE_RANGE = "FILTER_BY_PRICE_RANGE";

//ORDER
export const ORDER_BY_PRICE = "ORDER_BY_PRICE";
export const ORDER_BY_NAME = "ORDER_BY_NAME";

//COMMENTS
export const POST_COMMENT = "POST_COMMENT";
export const GET_COMMENTS = "GET_COMMENTS";
export const UPDATE_COMMENT_BY_ID = "UPDATE_COMMENT_BY_ID";
export const DELETE_COMMENT_BY_ID = "DELETE_COMMENT_BY_ID";

//USERS
export const LOGIN_GOOGLE_REQUEST = 'LOGIN_GOOGLE_REQUEST';
export const LOGIN_GOOGLE_SUCCESS = 'LOGIN_GOOGLE_SUCCESS';
export const LOGIN_GOOGLE_FAILURE = 'LOGIN_GOOGLE_FAILURE';

export const GET_TOKEN= "GET_TOKEN";
export const VALIDATE_SESSION = "VALIDATE_SESSION";

export const LOGIN_PROFILE = "LOGIN_PROFILE";
export const SHOW_LIKES = "SHOW_LIKES";
export const ADD_FAVORITE = "ADD_FAVORITE";
export const REMOVE_FAVORITE = "REMOVE_FAVORITE";
export const GET_USERS = "GET_USER";
export const GET_USER_BY_ID = "GET_USER_BY_ID";
export const GET_MENTOR_BY_ID = "GET_MENTOR_BY_ID";

export const POST_USER = "POST_USER";
export const REDIRECT_TOKEN = "REDIRECT_TOKEN";
export const LOG_OUT = "LOG_OUT"


/* const BASE_URL = 'http://localhost:5173/'; 

export const loginGoogleUser = async () => {
    try {
        const url = `${BASE_URL}/api/sessions/google`;
        window.location.assign(url);
    } catch (error) {
        console.error('Error al iniciar sesión con Google:', error);
    }
}

export const loginGoolgeUSerCallback = async () => {
    try {
        const response = await fetch(`${BASE_URL}/api/sessions/google/callback`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error al iniciar sesión con Google:', error);
    }
} */