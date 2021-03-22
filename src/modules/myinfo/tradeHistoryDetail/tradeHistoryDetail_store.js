export const TRADE_HISTORY_DETAIL_REQUESTING = 'TRADE_HISTORY_DETAIL_REQUESTING';
export const TRADE_HISTORY_DETAIL_SUCCESS = 'TRADE_HISTORY_DETAIL_SUCCESS';

export const tradeHistoryDetailRequest = (request) => ({type: TRADE_HISTORY_DETAIL_REQUESTING, payload: request}); // seq, type
export const tradeHistoryDetailSuccess = (response) => ({type: TRADE_HISTORY_DETAIL_SUCCESS, payload: response}); // 거래 상체 내역



const initialState = {
    type: null,
    name: null,
    date: null,
    perPrice: 0,
    count : 0,
    fee: 0,
    rate: 0,
    totalPrice: 0,
    
};

export default function handleLogin(state=initialState, action){
    switch(action.type){
        case TRADE_HISTORY_DETAIL_REQUESTING :
            return {
               ...state,
            };
            
        case TRADE_HISTORY_DETAIL_SUCCESS :
        
            return {
                type: action.payload.type,
                name: action.payload.name,
                date: action.payload.date,
                perPrice: action.payload.perPrice,
                count : action.payload.count,
                fee: action.payload.fee,
                rate: action.payload.rate,
                totalPrice: action.payload.totalPrice,
            };

        
        default :
            return state;
    }
}
