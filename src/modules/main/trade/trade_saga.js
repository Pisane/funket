import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';



import {
    TRADEDATA_REQUESTING,
    tradeDataSuccess,
} from './trade_store';

import axios from 'axios';
import * as config from '../../../config';

//const loginUrl = `http://localhost:7900/api/users/signin`;

async function getTradeDataApi(jwt, lang)
{

    try{

        // const response = {
        //     products: [
        //         {
        //             cur_price: 2613.69,
        //             seq: "5ed9dbe048a4694ed4d5a462",
        //             name: "Gold",
        //             able_count: 3,             // 구매가능 수량
        //             category: "Gold",
        //             date: '2020-07-20',
        //             payPrice: 6.36,
        //         },
        //         {
        //             cur_price: 72.78,
        //             seq: "5ej678fgasdfasdfasdf59jkk",
        //             name: "Chamchi",
        //             able_count: 14,             // 구매가능 수량
        //             category: "Chamchi",
        //             date: '2020-07-20',
        //             payPrice: 7.78,
        //         },
        //         {
        //             cur_price: 12.78,
        //             seq: "aejgagasdgasdg59jkk",
        //             name: "Gold",
        //             able_count: 12,             // 구매가능 수량
        //             category: "Gold",
        //             date: '2020-07-20',
        //             payPrice: 1.27,
        //         },
        //         {
        //             cur_price: 62.11,
        //             seq: "124124124124124s59jkk",
        //             name: "Gold",
        //             able_count: 19,             // 구매가능 수량
        //             category: "Gold",
        //             date: '2020-07-20',
        //             payPrice: 6.21,
        //         },
        //         {
        //             cur_price: 10.71,
        //             seq: "zxcvzasdfasdzxcvk",
        //             name: "Gold",
        //             able_count: 200,             // 구매가능 수량
        //             category: "Gold",
        //             date: '2020-07-20',
        //             payPrice: 1.07,
        //         },
        //     ],
        // }
        const headerParams = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        }

        const response = await axios({
            method: 'post',
            url: `${config.URL}/products/list`,
            headers: headerParams,
            data:{
                lang: lang,
            },
        })

        
        return response.data;

    }catch(err){
        
        throw err;
    }
}

function* tradeDataFlow (jwt, lang) {
    let response;
    try {
        response = yield call (getTradeDataApi, jwt, lang);
        yield put(tradeDataSuccess(response));
    }catch (error) {
        // error? send it to redux
        // yield put(errorIn(error));
        // console.log('error')
        //yield put(tradeDataSuccess(response));
       
    }finally {
        // No matter what, if our 'forked' 'task' was cancelled
        // we will then just redirect them to login
        if(yield cancelled()) {
            //history.push('/login');
            //browserHistory.push('/login');

        }
    }
    
    //return the token for health and wealth
    return response;
}

// Our watcher (saga). It will watch for many things.
function* tradeDataWatcher () { 
    // Generators halt execution until their next step is ready/occurring
    // So it's not like this loop is firing in the background 1000/sec
    // Instead, it says, "okay, true === true", and hits the first step...

    while( true ){

        // ... and in this first it sees a yield statement with 'take' which
        // pauses the loop. It will sit here and WAIT for this action.
        //
        // yield take(ACTION) just says, when our generator sees the ACTION
        // it will pull from that ACTION's payload that we send up, its
        // email and password. ONLY when this happens will the loop move
        // forward...
        const { payload } = yield take(TRADEDATA_REQUESTING);
        const jwt = payload.jwt;
        const lang = payload.lang;
        // ... and pass the email and password to our loginFlow() function.
        // The fork() method spins up another "process" that will deal with
        // handling the loginFlow's execution in the background!
        // 
        // It also passes back to us, a reference to this forked task
        // which is stored in our const task here. We can use this to manage
        // the task.
        //
        // However, fork() does not block our loop. It's in the background
        // therefore as soon as loop executes this it mores forward...

        const task = yield fork(tradeDataFlow, jwt, lang);
        // ... and begins looking for either CLIENT_UNSET or LOGIN_ERROR!
        // it gets to here and stops and begins watching
        // for these tasks only. Why would it watch for login any more?
        // During the life cycle of this generator, the user will login once
        // and all we need to watch for is either logging out, or a login
        // error. The moment it does grab either of these though it will
        // once again move forward...
        // const action = yield take([CLIENT_UNSET, LOGIN_ERROR]);
        //const action = yield take(LOGIN_ERROR);

        // ... if, for whatever reason, we decide to logout during this
        // cancel the current action. i.e. the user is being logged
        // in, they get impatient and start hammering the logout button.
        // this would result in the above statement seeing the CLIENT_UNSET
        // action, and down here, knowing that we should cancel the
        // forked 'task' that was trying to log them in. It will do so
        // and move forward...
        //if(action.type === LOGIN_ERROR) yield cancel(task);

        // ... finally we'll just log them out. This will unset the client
        // access token... -> follow this back up to the top of the while loop
        //yield call(logout);
    }
}

export default tradeDataWatcher;

