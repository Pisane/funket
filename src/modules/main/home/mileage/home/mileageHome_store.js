export const MILEAGE_HOME_REQUESTING = 'MILEAGE_HOME_REQUESTING';
export const MILEAGE_HOME_SUCCESS= 'MILEAGE_HOME_SUCCESS';

export const mileageHomeRequest = (request) => ({type: MILEAGE_HOME_REQUESTING, payload: request}); // jwt
export const mileageHomeSuccess = (response) => ({type: MILEAGE_HOME_SUCCESS, payload: response}); // 거래내역 전체



const initialState = {
    mileage: 0,
    chargeMileageList: [
        {
            seq : 0,
            value: 0,
            day:null,
        },
    ],
    listData:[
        {
            key : 0,
            day : null,
            title: null,
            value: 0,
            time: null,
            totalValue: 0,
            type: null,
        }
    ],
};

export default function handleLogin(state=initialState, action){
    switch(action.type){
        case MILEAGE_HOME_REQUESTING :
            return {
               ...state,
            };
            
        case MILEAGE_HOME_SUCCESS :
            return {
                mileage: action.payload.mileage,
                chargeMileageList : action.payload.chargeMileageList,
                listData: action.payload.listData,
            };

        
        default :
            return state;
    }
}
