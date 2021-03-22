export const SELL_PROGRESS_REQUESTING = 'SELL_PROGRESS_REQUESTING';
export const SELL_PROGRESS_SUCCESS = 'SELL_PROGRESS_SUCCESS';



export const sellProgressRequest = (request) => ({type: SELL_PROGRESS_REQUESTING, payload: request}); // 판매 현황의 고유 번호 seq
export const sellProgressSuccess = (response) => ({type: SELL_PROGRESS_SUCCESS, payload: response}); // 판매 현황 정보



const initialState = {
    SellProgressInfo:{
        name : null,
        count : 0,
        rate : 0,
        perPrice : 0,
        totalPrice : 0,
        buyerList:[
            {
                date: null,
                buyerID: null,
                count: 0,
            },
        ],
    },

    
};

export default function handleLogin(state=initialState, action){
    switch(action.type){
        case SELL_PROGRESS_REQUESTING :
            return {
               ...state,
            };
            
        case SELL_PROGRESS_SUCCESS :
            //console.log(action.payload);
            return {
                SellProgressInfo: action.payload,
            };
      
        
        default :
            return state;
    }
}
