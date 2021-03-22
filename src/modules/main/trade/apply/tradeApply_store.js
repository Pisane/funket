export const TRADE_APPLY_REQUESTING = 'TRADE_APPLY_REQUESTING';
export const TRADE_APPLY_RESULT = 'TRADE_APPLY_RESULT';
export const TRADE_APPLY_CLEAR = 'TRADE_APPLY_CLEAR';

export const tradeApplyRequest = (request) => ({type: TRADE_APPLY_REQUESTING, payload: request}); // jwt, seq, count
export const tradeApplyResult = (response) => ({type: TRADE_APPLY_RESULT, payload: response}); // 거래내역 전체
export const tradeApplyClear = () => ({type: TRADE_APPLY_CLEAR }); // 리셋



const initialState = {
   result: 0,
   buyInfo: {
       name: null,
       count: 0,
       totalPrice : 0,
       payPrice : 0,
       totalPayPrice : 0,
       remainMileage: 0,
       sellerWallet: null,
       date: null,
   },
    
    
};

export default function handleLogin(state=initialState, action){
    switch(action.type){
        case TRADE_APPLY_REQUESTING :
            return {
                result: 0,
                buyInfo : null,
            };
            
        case TRADE_APPLY_RESULT :
            return {
                result : action.payload.result,
                buyInfo : action.payload.buyInfo,
            };
        case TRADE_APPLY_CLEAR :
            return {
                ...state,
                result : 0,
                
            };
        
        default :
            return state;
    }
}
