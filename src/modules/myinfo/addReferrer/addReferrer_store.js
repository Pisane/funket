export const ADD_REFERRER_REQUESTING = 'ADD_REFERRER_REQUESTING';
export const ADD_REFERRER_RESULT = 'ADD_REFERRER_RESULT';

export const addReferrerRequest = (request) => ({type: ADD_REFERRER_REQUESTING, payload: request}); // 추천인 id
export const addReferrerResult = (response) => ({type: ADD_REFERRER_RESULT, payload: response}); // 1: 성공 / 2: 실패(아이디가 없음)



const initialState = {
    result: 0,
    
};

export default function handleLogin(state=initialState, action){
    switch(action.type){
        case ADD_REFERRER_REQUESTING :
            return {
               result : 0,
            };
            
        case ADD_REFERRER_RESULT :
            //console.log(action.payload);
            return {
               result: action.payload.result,
            };
       
        
        default :
            return state;
    }
}
