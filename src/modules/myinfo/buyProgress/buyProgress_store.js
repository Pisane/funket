export const BUY_PROGRESS_REQUESTING = 'BUY_PROGRESS_REQUESTING';
export const BUY_PROGRESS_SUCCESS = 'BUY_PROGRESS_SUCCESS';

export const INSERT_TXID_REQUESTING = 'INSERT_TXID_REQUESTING';
export const INSERT_TXID_RESULT = 'INSERT_TXID_RESULT';
export const INSERT_TXID_RESET = 'INSERT_TXID_RESET';

export const CANCEL_BUY_REQUESTING = 'CANCEL_BUY_REQUESTING';
export const CANCEL_BUY_SUCCESS = 'CANCEL_BUY_SUCCESS';
export const CANCEL_BUY_RESET = 'CANCEL_BUY_RESET';

export const buyProgressRequest = (request) => ({type: BUY_PROGRESS_REQUESTING, payload: request}); // 구매 현황의 고유 번호 seq
export const buyProgressSuccess = (response) => ({type: BUY_PROGRESS_SUCCESS, payload: response}); // 구매 현황 정보

export const insertTxidRequest = (request) => ({type: INSERT_TXID_REQUESTING, payload: request}); // seq, id, txid
export const insertTxidResult = (response) => ({type: INSERT_TXID_RESULT, payload: response}); // result : 1(성공), 2(실패)
export const insertTxidReset = () => ({type: INSERT_TXID_RESET}); // result : 1(성공), 2(실패)

export const cancelBuyRequest = (request) => ({type: CANCEL_BUY_REQUESTING, payload: request}) //id, seq
export const cancelBuySuccess = () => ({type: CANCEL_BUY_SUCCESS}) // 성공 시...
export const cancelBuyReset = () => ({type: CANCEL_BUY_RESET}) // 리셋

const initialState = {
    BuyProgressInfo:{
        name : null,
        count : 0,
        perDownPayment : 0,
        perPrice : 0,
        sellerID : null,
        sellerWallet: null,
        totalPrice: 0.0,
        totalPayPrice: 0.0,
    },
    cancelResult: false,
    txidResult: 0,
    
};

export default function handleLogin(state=initialState, action){
    switch(action.type){
        case BUY_PROGRESS_REQUESTING :
            return {
               ...state,
               cancelResult: false,
               txidResult: false,
            };
            
        case BUY_PROGRESS_SUCCESS :
            //console.log(action.payload);
            return {
                ...state,
                BuyProgressInfo: action.payload,
            };
        case INSERT_TXID_REQUESTING :
            return {
                ...state,
                txidResult: 0,
            };
            
        case INSERT_TXID_RESULT :
            return {
                ...state,
                txidResult : action.payload.result,
            };
        case INSERT_TXID_RESET :
            return {
                ...state,
                txidResult : 0,
            };
     
        case CANCEL_BUY_REQUESTING :
            return {
                ...state,
                cancelResult: false,
            };
            
        case CANCEL_BUY_SUCCESS :
            return {
                ...state,
                cancelResult: true,
            };
        case CANCEL_BUY_RESET:
            return {
                ...state,
                cancelResult: false,
            };
        
        default :
            return state;
    }
}
