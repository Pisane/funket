import LoginSaga from './auth/login/saga';

import HomeSaga from './main/home/homeSaga';
import MileageHomeSaga from './main/home/mileage/home/mileageHome_saga';
import MileageChargeSaga from './main/home/mileage/mileagecharge/mileageCharge_saga';
import TxidCheckSaga from './main/home/mileage/mileagecharge/txidCheck_saga';
import MileageSendSaga from './main/home/mileage/mileagesend/mileageSend_saga';
import TradeDataSaga from './main/trade/trade_saga';
import TradeDetailSaga from './main/trade/detail/tradeDetail_saga';
import TradeApplySaga from './main/trade/apply/tradeApply_saga';

import MyinfoSaga from './myinfo/loadMyinfo_saga';
import ChangeFeeSaga from './myinfo/changeFee_saga';
import PasswordCheckSaga from './myinfo/passwordCheck_saga';
import UserInfoDetailSaga from './myinfo/changePw/userInfoDetail_saga';
import PasswordChangeSaga from './myinfo/changePw/passwordChange_saga';
import BuyTradingSaga from './myinfo/trading/buyTrading_saga';
import SellTradingSaga from './myinfo/trading/sellTrading_saga';
import BuyProgressSaga from './myinfo/buyProgress/buyProgress_saga';
import InsertTxidSaga from './myinfo/buyProgress/insertTxid_saga';
import CancelBuySaga from './myinfo/buyProgress/cancelBuy_saga';
import SellProgressSaga from './myinfo/sellProgress/sellProgress_saga';
import TradeHistorySaga from './myinfo/tradeHistory/tradeHistory_saga';
import TradeHistoryDetailSaga from './myinfo/tradeHistoryDetail/tradeHistoryDetail_saga';
import AddReferrerSaga from './myinfo/addReferrer/addReferrer_saga';

import IdCheckSaga from './auth/siginup/idcheck_saga';
import RefCheckSaga from './auth/siginup/refcheck_saga';
import SignupSaga from './auth/siginup/signup_saga';

import FindIDSaga from './auth/userfind/findID_saga';
import FindPWSaga from './auth/userfind/findPw_saga';

import { all, fork } from 'redux-saga/effects';
export default function* rootSaga() {
    yield all([
        fork(LoginSaga),
        fork(HomeSaga),
        fork(MileageHomeSaga),
        fork(MileageChargeSaga),
        fork(TxidCheckSaga),
        fork(MileageSendSaga),
        fork(TradeDataSaga),
        fork(TradeDetailSaga),
        fork(TradeApplySaga),

        fork(MyinfoSaga),
        fork(ChangeFeeSaga),
        fork(PasswordCheckSaga),
        fork(UserInfoDetailSaga),
        fork(PasswordChangeSaga),
        fork(BuyTradingSaga),
        fork(SellTradingSaga),
        fork(BuyProgressSaga),
        fork(InsertTxidSaga),
        fork(CancelBuySaga),
        fork(SellProgressSaga),
        fork(TradeHistorySaga),
        fork(TradeHistoryDetailSaga),
        fork(AddReferrerSaga),

        fork(IdCheckSaga),
        fork(RefCheckSaga),
        fork(SignupSaga),
        fork(FindIDSaga),
        fork(FindPWSaga),


    ]);
}