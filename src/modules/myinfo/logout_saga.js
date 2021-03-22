import { take, fork, cancel, call, put, cancelled } from 'redux-saga/effects';
// import { AsyncStorage } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';



import {
    TRADE_HISTORY_DETAIL_REQUESTING,
    tradeHistoryDetailSuccess,
} from './store';

import axios from 'axios';

//const loginUrl = `http://localhost:7900/api/users/signin`;

async function getTradeHistoryDetailApi(seq, type)
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
       /*
            {
                date,
                type,
                name
                count
                price
            } 
       */



        const data1={
            type: 1,
            name: '금광개발권',
            date: '2020.07.14 14:05:18',
            perPrice: 30,
            count : 10,
            fee: 200,
            rate: 0,
            totalPrice: 300,
       };

       const data2={
        type: 2,
        name: '금광개발권',
        date: '2020.07.14 14:05:18',
        perPrice: 30,
        count : 10,
        fee: 200,
        rate: 2,
        totalPrice: 300,
   };

        const response = data2;
        
        
        return response;
    }catch(err){
        
        throw err;
    }
}

function* tradeHistoryDetailFlow (seq, type) {
    let response;
    try {
        response = yield call (getTradeHistoryDetailApi, seq, type);
       
        yield put(tradeHistoryDetailSuccess(response));
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
function* tradeHistoryDetailWatcher () { 
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
        const { payload } = yield take(TRADE_HISTORY_DETAIL_REQUESTING);
        const seq = payload.seq;
        const type = payload.type;
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

        const task = yield fork(tradeHistoryDetailFlow, seq, type);
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

export default tradeHistoryDetailWatcher;

