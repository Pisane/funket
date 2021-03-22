export const PASSWORD_CHAGNE_REQUESTING = 'PASSWORD_CHAGNE_REQUESTING';
export const PASSWORD_CHANGE_RESULT = 'PASSWORD_CHANGE_RESULT';
export const PASSWORD_CHANGE_RESULT_RESET = 'PASSWORD_CHANGE_RESULT_RESET';

export const USERINFO_DETAIL_REQUESTING = 'USERINFO_DETAIL_REQUESTING';
export const USERINFO_DETAIL_RESULT = 'USERINFO_DETAIL_RESULT';


export const passwordChangeRequest = (request) => ({type: PASSWORD_CHAGNE_REQUESTING, payload: request}); //id, password
export const passwordChangeResult = (response) => ({type: PASSWORD_CHANGE_RESULT, payload : response}); // success / fail : 1 / 2
export const passwordChagneResultReset = () => ({type:PASSWORD_CHANGE_RESULT_RESET});

export const userInfoDetailRequest = (request) => ({type: USERINFO_DETAIL_REQUESTING, payload: request}); //id
export const userInfoDetailResult = (response) => ({type:USERINFO_DETAIL_RESULT, payload: response});

// 초기 상태 정의 
const initialState = {
    userInfoDetail: {
        id: null,
        //name: null,
        email: null,
        wallet: null,
    },
    passwordChangeResult: 0,

};



export default function handleLogin(state=initialState, action){
    switch(action.type){
        case PASSWORD_CHAGNE_REQUESTING :
            return {
                ...state,
            };
            
        case PASSWORD_CHANGE_RESULT :
            
            return {
                ...state,
                passwordChangeResult : action.payload.result,
            };
        case PASSWORD_CHANGE_RESULT_RESET :
            return {
                ...state,
                passwordChangeResult: 0,
            };
        case USERINFO_DETAIL_REQUESTING :
            return {
                ...state,
                
            };
        case USERINFO_DETAIL_RESULT :
            return {
                userInfoDetail:{
                    id: action.payload.id,
                   // name : action.payload.name,
                    email : action.payload.email,
                    wallet: action.payload.wallet,
                },
                passwordChangeResult: 0,
            };
        default :
            return state;
    }
}

