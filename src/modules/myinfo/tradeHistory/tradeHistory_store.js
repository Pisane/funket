export const TRADE_HISTORY_REQUESTING = 'TRADE_HISTORY_REQUESTING';
export const TRADE_HISTORY_SUCCESS = 'TRADE_HISTORY_SUCCESS';

export const tradeHistoryRequest = (request) => ({type: TRADE_HISTORY_REQUESTING, payload: request}); // id
export const tradeHistorySuccess = (response) => ({type: TRADE_HISTORY_SUCCESS, payload: response}); // 거래내역 전체



const initialState = {
    TradeHistory:[
        {
            title: null,
            data: [
                {
                    seq: null,
                    time: null,
                    type: null,
                    name : null,
                    count: null,
                    price: null,
                },
            ],
        },
    ],
    
};

export default function handleLogin(state=initialState, action){
    switch(action.type){
        case TRADE_HISTORY_REQUESTING :
            return {
               ...state,
            };
            
        case TRADE_HISTORY_SUCCESS :
            return {
                TradeHistory : action.payload,
            };

        
        default :
            return state;
    }
}
