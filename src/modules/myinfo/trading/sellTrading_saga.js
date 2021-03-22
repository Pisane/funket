import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';



import {
    SELL_TRADING_REQUESTING,
    sellTradingSuccess,
} from './trading_store';

import axios from 'axios';
import * as config from '../../../config';

//const loginUrl = `http://localhost:7900/api/users/signin`;

async function getSellTradingApi(jwt, lang)
{

    try{
        /*
        const response = await axios({
            method: 'post',
            url: loginUrl,
            // config: { 
            //     headers: {'Content-Type': 'application/json' }
            // },
            data: {
                'email': email,
                'password': password
            }
        });
        */
       const headerParams = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
        }

        const response = await axios({
            method: 'post',
            url: `${config.URL}/orders/mine/sellHistory`,
            headers: headerParams,
            data:{
                lang : lang
            },
        })



        // const data1 =  [
        //         {
        //             seq: 1,
        //             name: '금광 개발권',
        //             status: 1,
        //             price: 80.0,
        //             count: 5,
        //         },
        //         {
        //             seq: 2,
        //             name: '금광 개발권',
        //             status: 1,
        //             price: 30.0,
        //             count: 3,
        //         },
        //         {
        //             seq: 3,
        //             name: '금광 개발권',
        //             status: 1,
        //             price: 70.0,
        //             count: 2,
        //         },
        //         {
        //             seq: 4,
        //             name: '금광 개발권',
        //             status: 1,
        //             price: 40.0,
        //             count: 5,
        //         },
        //         {
        //             seq: 5,
        //             name: '금광 개발권',
        //             status: 1,
        //             price: 65.0,
        //             count: 5,
        //         },
        //     ];
        // const data2 = [
        //     {
        //         seq: 0,
        //         name: null,
        //         status: 0,
        //         price: 0,
        //         count: 0,
        //     },
        // ]

        // const response = data1;
        
        
        return response.data;
    }catch(err){
        
        throw err;
    }
}

function* sellTradingFlow (jwt, lang) {
    let response;
    try {
        response = yield call (getSellTradingApi, jwt, lang);
        yield put(sellTradingSuccess(response));
    }catch (error) {
        // error? send it to redux
        // yield put(errorIn(error));
        // console.log('error')
        
       
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
function* sellTradingWatcher () { 
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
        const { payload } = yield take(SELL_TRADING_REQUESTING);
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

        const task = yield fork(sellTradingFlow, jwt, lang);
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

export default sellTradingWatcher;

