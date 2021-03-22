export const FIND_ID_REQUESTING = 'FIND_ID_REQUESTING';
export const FIND_ID_RESULT = 'FIND_ID_RESULT';

export const FIND_PW_REQUESTING = 'FIND_PW_REQUESTING';
export const FIND_PW_RESULT = 'FIND_PW_RESULT';

export const findIDRequest = (request) => ({ type: FIND_ID_REQUESTING,  payload: request }); // email
export const findIDResult = (response) => ({ type: FIND_ID_RESULT,  payload:response});

export const findPWRequest = (request) => ({ type: FIND_PW_REQUESTING,  payload: request }); // id, email
export const findPWResult = (response) => ({ type: FIND_PW_RESULT,  payload:response});



const initialState = {
    findIDResult: 0,
    findPWResult: 0,
}

export default function handleClient(state = initialState, action) {
    switch (action.type) {
        case FIND_ID_REQUESTING:
            return {
                ...state,
            };
        case FIND_ID_RESULT:
            return {
                ...state,
                findIDResult: action.payload.result,
            };
   

        case FIND_PW_REQUESTING:
            return {
                ...state,
            };
        case FIND_PW_RESULT:
            return {
                ...state,
                findPWResult: action.payload.result,
            };

       
        default:
            return state;
    }
}