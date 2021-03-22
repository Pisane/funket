export const MILEAGE_SEND_REQUESTING = 'MILEAGE_SEND_REQUESTING';
export const MILEAGE_SEND_RESULT = 'MILEAGE_SEND_RESULT';
export const MILEAGE_SEND_CLEAR = 'MILEAGE_SEND_CLEAR';

export const mileageSendRequest = (request) => ({type: MILEAGE_SEND_REQUESTING, payload: request}); // jwt, toId, value
export const mileageSendResult = (response) => ({type: MILEAGE_SEND_RESULT, payload: response}); // 거래내역 전체
export const mileageSendClear = () => ({type: MILEAGE_SEND_CLEAR}); 



const initialState = {
    sendResult : 0,
    remainValue: 0,
};

export default function handleLogin(state=initialState, action){
    switch(action.type){
        case MILEAGE_SEND_REQUESTING :
            return {
                sendResult : 0,
                remainValue: 0,
            };
            
        case MILEAGE_SEND_RESULT :
            return {
                sendResult : action.payload.sendResult, // true || false
                remainValue: action.payload.remainValue,
            };
        case MILEAGE_SEND_CLEAR :
            return {
                ...state,
                sendResult : 0, 
                
            };
        
        default :
            return state;
    }
}
