export const ID_CHECK_REQUESTING = 'ID_CHECK_REQUESTING';
export const ID_CHECK_RESULT = 'ID_CHECK_RESULT';
export const ID_CHECK_RESET = 'ID_CHECK_RESET';


export const REF_CHECK_REQUESTING = 'REF_CHECK_REQUESTING';
export const REF_CHECK_RESULT = 'REF_CHECK_RESULT';
export const REF_CHECK_RESET = 'REF_CHECK_RESET';


export const SIGNUP_REQUESTING = 'SIGNUP_REQUESTING';
export const SIGNUP_RESULT = 'SIGNUP_RESULT';
export const SIGNUP_RESET = 'SIGNUP_RESET';

export const idCheckRequest = (request) => ({ type: ID_CHECK_REQUESTING,  payload: request });
export const idCheckResult = (response) => ({ type: ID_CHECK_RESULT,  payload:response});
export const idCheckReset = () => ({ type: ID_CHECK_RESET});

export const refCheckRequest = (request) => ({ type: REF_CHECK_REQUESTING,  payload: request });
export const refCheckResult = (response) => ({ type: REF_CHECK_RESULT,  payload:response});
export const refCheckReset = () => ({ type: REF_CHECK_RESET});

export const signupRequest = (request) => ({ type: SIGNUP_REQUESTING,  payload: request });
export const signupResult = (response) => ({ type: SIGNUP_RESULT,  payload:response});
export const signupReset = () => ({ type: SIGNUP_RESET});

const initialState = {
    idCheckResult: 0,
    refCheckResult: 0,
    signupResult: 0,
}

export default function handleClient(state = initialState, action) {
    switch (action.type) {
        case ID_CHECK_REQUESTING:
            return {
                ...state,
            };
        case ID_CHECK_RESULT:
            return {
                ...state,
                idCheckResult: action.payload.result,
            };
        case ID_CHECK_RESET:
            return {
                ...state,
                idCheckResult: 0,
            };

        case REF_CHECK_REQUESTING:
            return {
                ...state,
            };
        case REF_CHECK_RESULT:
            return {
                ...state,
                refCheckResult: action.payload.result,
            };
        case REF_CHECK_RESET:
                return {
                    ...state,
                    refCheckResult: 0,
                };

        case SIGNUP_REQUESTING:
            return {
                ...state,
            };
        case SIGNUP_RESULT:
            return {
                ...state,
                signupResult: action.payload.result,
            };
        case SIGNUP_RESET:
            return {
                ...state,
                signupResult: 0,
            };
        
       
        default:
            return state;
    }
}