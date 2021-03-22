export const LOGIN_REQUESTING = 'LOGIN_REQUESTING';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_EXISTING = 'LOGIN_EXISTING';
export const LOGOUT = 'LOGOUT';
export const LOGIN_CLEAR = 'LOGIN_CLEAR';

export const SET_LANGUAGE = 'SET_LANGUAGE';

export const loginRequest = (objectForLogin) => ({ type: LOGIN_REQUESTING,  payload: objectForLogin });
export const loginSuccess = (response) => ({ type: LOGIN_SUCCESS,  payload:response});
export const loginClear = () => ({ type: LOGIN_CLEAR });
export const loginError = () => ({ type: LOGIN_ERROR,  errorLog });

export const logout = () => ({type: LOGOUT});

export const setLang = (request) => ({type: SET_LANGUAGE, payload: request});

const initialState = {
    result: 0,
    requesting: false,
    errors: null,
    jwt: null,
    lang: 1,
    //id: null,
}
export default function handleClient(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUESTING:
            return {
                ...state,
                result: 0,
                requesting: true,
                errors: null,
                jwt: null,
               //id: null,
           
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                requesting: false,
                errors: null,
                jwt: action.payload.jwt,
                result : action.payload.result,
                //id: action.payload.id,
               
            };
        case LOGIN_ERROR:
            return {
                ...state,
                requesting: false,
                errors: action.error.toString(),
                result : 2,
                jwt: null,
                //id: null,
               
            };
        case LOGIN_CLEAR:
            return {
                ...state,
                result: 0,
                requesting: false,
                errors: null,
                jwt: null,
                //id: null,
               
            };
        case SET_LANGUAGE:
            return {
                ...state,
                lang : action.payload.lang,
               
            };
        case LOGOUT:
            return {
                ...state,
                result: 0,
                requesting: false,
                errors: null,
                jwt: null,
                
            };
        default:
            return state;
    }
}