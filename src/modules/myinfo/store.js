export const MYINFO_REQUESTING = 'MYINFO_REQUESTING';
export const MYINFO_SUCCESS = 'MYINFO_SUCCESS'; 
export const MYINFO_ERROR = 'MYINFO_ERROR';

export const MYINFO_CLEAR = 'MYINFO_CLEAR';
export const CHANGE_FEE_REQUEST = 'CHANGE_FEE_REQUEST';
export const CHANGE_FEE_SUCCESS = 'CHANGE_FEE_SUCCESS';


export const myinfoRequest = (objectForMyInfo) => ({type: MYINFO_REQUESTING, payload: objectForMyInfo});
export const myinfoSuccess = (response) => ({ type: MYINFO_SUCCESS,  payload:response});
export const myinfoClear = ()=>({type: MYINFO_CLEAR});

export const changeFeeRequest = (objectForChangeFee) => ({type: CHANGE_FEE_REQUEST, payload: objectForChangeFee});
export const changeFeeSuccess = (changedRate) => ({type:CHANGE_FEE_SUCCESS, payload:changedRate});

// 초기 상태 정의 
const initialState = {
    requesting: false,
    myInfoData:{
        id: null,
        buyCount: null,
        sellCount: null,
        rate: null,
        referrer: null,
    },
  
  
};


export default function handleLogin(state=initialState, action){
    switch(action.type){
        case MYINFO_REQUESTING :
            return {
                requesting: true,
                myInfoData:{
                    id: null,
                    buyCount: null,
                    sellCount: null,
                    rate: null,
                    referrer: null,
                },
                
            };
            
        case MYINFO_SUCCESS :
            return {
                requesting: false,
                myInfoData:{
                    id: action.payload.id,
                    buyCount: action.payload.buyCount,
                    sellCount: action.payload.sellCount,
                    rate: action.payload.rate,
                    referrer: action.payload.referrer,
                }
            };
        case MYINFO_CLEAR :
            return {
                requesting: false,
                myInfoData:{
                    id: null,
                    buyCount: null,
                    sellCount: null,
                    rate: null,
                    referrer: null,
                },
            };
        case CHANGE_FEE_REQUEST :
            
            return {
                requesting: true,
                myInfoData:{
                    ...state.myInfoData,
                },
            };
        case CHANGE_FEE_SUCCESS :
            return {
                requesting: false,
                myInfoData:{
                    ...state.myInfoData,
                    rate: action.payload.result === 1 ? action.payload.changedRate : 0,
                },    
            };
        default :
            return state;
    }
}

