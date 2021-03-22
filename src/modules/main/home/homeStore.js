export const HOMEDATA_REQUESTING = 'HOMEDATA_REQUESTING';
export const HOMEDATA_SUCCESS = 'HOMEDATA_SUCCESS';

export const homeDataRequest = (request) => ({type: HOMEDATA_REQUESTING, payload: request}); // jwt
export const homeDataSuccess = (response) => ({type: HOMEDATA_SUCCESS, payload: response}); // 거래내역 전체



const initialState = {
    id : null,
    mileage: 0,
    carouselItems:[
        {
            title: null,
            text: null,
            img: null,           
        },
    ],
    listData:[
        {
            seq:null,
            day:null,
            title:null,
            values:null,
        }
    ],
};

export default function handleLogin(state=initialState, action){
    switch(action.type){
        case HOMEDATA_REQUESTING :
            return {
               ...state,
            };
            
        case HOMEDATA_SUCCESS :
            return {
                userName : action.payload.userName,
                mileage: action.payload.mileage,
                carouselItems : action.payload.carouselItems,
                listData: action.payload.listData,
            };

        
        default :
            return state;
    }
}
