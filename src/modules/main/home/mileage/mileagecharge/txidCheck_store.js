export const TXID_CHECK_REQUESTING = 'TXID_CHECK_REQUESTING';
export const TXID_CHECK_RESULT = 'TXID_CHECK_RESULT';
export const TXID_CHECK_CLEAR = 'TXID_CHECK_CLEAR';

export const txidCheckRequest = (request) => ({type: TXID_CHECK_REQUESTING, payload: request}); // jwt, seq, txid
export const txidCheckResult = (response) => ({type: TXID_CHECK_RESULT, payload: response}); // 거래내역 전체
export const txidCheckClear = () => ({type: TXID_CHECK_CLEAR}); 


const initialState = {
    txidCheckResult : 0,
};

export default function handleLogin(state=initialState, action){
    switch(action.type){
        case TXID_CHECK_REQUESTING :
            return {
                txidCheckResult : 0,
            };
            
        case TXID_CHECK_RESULT :
            return {
                txidCheckResult : action.payload.txidCheckResult,
            };
        case TXID_CHECK_CLEAR :
            return {
                txidCheckResult : 0,
            };
        
        default :
            return state;
    }
}
