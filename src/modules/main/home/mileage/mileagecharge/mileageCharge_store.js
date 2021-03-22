export const MILEAGE_CHARGE_REQUESTING = 'MILEAGE_CHARGE_REQUESTING';
export const MILEAGE_CHARGE_RESULT = 'MILEAGE_CHARGE_RESULT';
export const MILEAGE_CHARGE_CLEAR = 'MILEAGE_CHARGE_CLEAR';

export const mileageChargeRequest = (request) => ({type: MILEAGE_CHARGE_REQUESTING, payload: request}); // jwt, value
export const mileageChargeResult = (response) => ({type: MILEAGE_CHARGE_RESULT, payload: response}); // 거래내역 전체
export const mileageChargeClear = () => ({type: MILEAGE_CHARGE_CLEAR});


const initialState = {
   
    chargeResult : 0,
};

export default function handleLogin(state=initialState, action){
    switch(action.type){
        case MILEAGE_CHARGE_REQUESTING :
            return {
               
                chargeResult : 0,
            };
            
        case MILEAGE_CHARGE_RESULT :
            return {
               
                chargeResult : action.payload.chargeResult, // true || false
            };
        case MILEAGE_CHARGE_CLEAR :
            return {
                
                chargeResult : 0,
            };

        
        default :
            return state;
    }
}
