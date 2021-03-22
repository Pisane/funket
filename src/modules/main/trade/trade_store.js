export const TRADEDATA_REQUESTING = 'TRADEDATA_REQUESTING';
export const TRADEDATA_SUCCESS = 'TRADEDATA_SUCCESS';

export const tradeDataRequest = (request) => ({type: TRADEDATA_REQUESTING, payload: request}); // jwt
export const tradeDataSuccess = (response) => ({type: TRADEDATA_SUCCESS, payload: response}); // 거래내역 전체



const initialState = {
    products: [
        {
            
            seq: null,
            cur_price: 0.0,
            name: '',
            able_count: 0,             // 구매가능 수량
            //image: '',
            category: '',
            date: '',
            payPrice: 0.0,
            //description: '',
            //__v: 0
        },
    ],
};

export default function handleLogin(state=initialState, action){
    switch(action.type){
        case TRADEDATA_REQUESTING :
            return {
               ...state,
            };
            
        case TRADEDATA_SUCCESS :
            return {
                products: action.payload,
            };

        
        default :
            return state;
    }
}
