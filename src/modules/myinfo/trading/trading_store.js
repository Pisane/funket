export const BUY_TRADING_REQUESTING = 'BUY_TRADING_REQUESTING';
export const BUY_TRADING_SUCCESS = 'BUY_TRADING_SUCCESS';

export const SELL_TRADING_REQUESTING = 'SELL_TRADING_REQUESTING';
export const SELL_TRADING_SUCCESS = 'SELL_TRADING_SUCCESS';

export const buyTradingRequest = (request) => ({type: BUY_TRADING_REQUESTING, payload: request}); // id
export const buyTradingSuccess = (response) => ({type: BUY_TRADING_SUCCESS, payload: response}); // 구매 현황 정보

export const sellTradingRequest = (request) => ({type: SELL_TRADING_REQUESTING, payload: request}); // id
export const sellTradingSuccess = (response) => ({type: SELL_TRADING_SUCCESS, payload: response}); // 판매 현황 정보

const initialState ={
    buyTrading:[
        {
            seq: null,
            name: null,
            status: null,
            price: 0.0,
            count: 0,
            totalPrice: 0.0,
        },
    ],
    sellTrading:[
        {
            seq: null,
            name: null,
            status: null, //판매 상태는 하나임
            price: 0.0,
            count: 0,
        },
    ],
};

export default function handleLogin(state=initialState, action){
    switch(action.type){
        case BUY_TRADING_REQUESTING :
            return {
                buyTrading:[
                    {
                        seq: null,
                        name: null,
                        status: null,
                        price: 0.0,
                        count: 0,
                        totalPrice: 0.0,
                    },
                ],
                sellTrading:[
                    {
                        seq: null,
                        name: null,
                        status: null, //판매 상태는 하나임
                        price: 0.0,
                        count: 0,
                    },
                ],
            };
            
        case BUY_TRADING_SUCCESS :
            //console.log(action.payload);
            return {
                ...state,
                buyTrading: action.payload,
                
            };
        case SELL_TRADING_REQUESTING :
            return {
                buyTrading:[
                    {
                        seq: null,
                        name: null,
                        status: null,
                        price: 0.0,
                        count: 0,
                        totalPrice: 0.0,
                    },
                ],
                sellTrading:[
                    {
                        seq: null,
                        name: null,
                        status: null, //판매 상태는 하나임
                        price: 0.0,
                        count: 0,
                    },
                ],
            };
        case SELL_TRADING_SUCCESS :
            
            return {
                ...state,
                sellTrading: action.payload,
            };
        
        default :
            return state;
    }
}
