export const TRADE_DETAIL_REQUESTING = 'TRADE_DETAIL_REQUESTING';
export const TRADE_DETAIL_SUCCESS = 'TRADE_DETAIL_SUCCESS';

export const tradeDetailRequest = (request) => ({type: TRADE_DETAIL_REQUESTING, payload: request}); // jwt, seq
export const tradeDetailSuccess = (response) => ({type: TRADE_DETAIL_SUCCESS, payload: response}); // 거래내역 전체



const initialState = {
    buyer: {
        id: null,
        email : null,
        remainValue: 0,
    },
    seller: {
        wallet : null,
    },
    product: 
    {
        seq: null,
        cur_price: 0.0,
        name: '',
        able_count: 0,             // 구매가능 수량
        category: '',
        date: '',
        payPrice: 0.0,
        description: '',
    },
    
    
};

export default function handleLogin(state=initialState, action){
    switch(action.type){
        case TRADE_DETAIL_REQUESTING :
            return {
               ...state,
            };
            
        case TRADE_DETAIL_SUCCESS :
            return {
                buyer: action.payload.buyer,
                seller: action.payload.seller,
                product : action.payload.product,
            };

        
        default :
            return state;
    }
}
