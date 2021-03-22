export const PASSWORD_CHECK_REQUESTING = 'PASSWORD_CHECK_REQUESTING';
export const PASSWORD_CHECK_RESULT = 'PASSWORD_CHECK_RESULT';
export const PASSWORD_CHECK_RESET = 'PASSWORD_CHECK_RESET';



export const passwordCheckRequest = (request) => ({type: PASSWORD_CHECK_REQUESTING, payload: request});
export const passwordCheckResult = (response) => ({type: PASSWORD_CHECK_RESULT,  payload:response});
export const passwordCheckReset = () => ({type: PASSWORD_CHECK_RESET});

// 초기 상태 정의 
const initialState = {
    requesting: false,
    result : 0,
};

// result : 0 (idle) / 1(success) / 2(fail)

export default function handleLogin(state=initialState, action){
    switch(action.type){
        case PASSWORD_CHECK_REQUESTING :
            return {
                requesting: false,
                result : 0,
            };
            
        case PASSWORD_CHECK_RESULT :
            
            return {
                requesting: true,
                result : action.payload.result,
            };
        case PASSWORD_CHECK_RESET :
            return {
                requesting: false,
                result: 0,
            };
      
        default :
            return state;
    }
}

