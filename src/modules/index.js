import { combineReducers } from 'redux';
import AuthStore from './auth/login/Authstore';

import HomeStore from './main/home/homeStore';
import MileageHomeStore from './main/home/mileage/home/mileageHome_store';
import MileageChargeStore from './main/home/mileage/mileagecharge/mileageCharge_store';
import TxidCheckStore from './main/home/mileage/mileagecharge/txidCheck_store';
import MileageSendStore from './main/home/mileage/mileagesend/mileageSend_store';
import TradeDataStore from './main/trade/trade_store';
import TradeDetailStore from './main/trade/detail/tradeDetail_store';
import TradeApplyStore from './main/trade/apply/tradeApply_store';

import MyinfoStore from './myinfo/store';
import MyInfoMngStore from './myinfo/MyInfoMng_store';
import PasswordChangeStore from './myinfo/changePw/passwordChange_store';
import TradingStore from './myinfo/trading/trading_store';
import BuyProgressStore from './myinfo/buyProgress/buyProgress_store';
import SellProgressStore from './myinfo/sellProgress/sellProgress_store';
import TradeHistoryStore from './myinfo/tradeHistory/tradeHistory_store';
import TradeHistoryDetailStore from './myinfo/tradeHistoryDetail/tradeHistoryDetail_store';
import AddReferrerStore from './myinfo/addReferrer/addReferrer_store';

import SignupStore from './auth/siginup/store';
import FindStore from './auth/userfind/store';

// import LoginStore from'./auth/login/store';
const storeIndex = combineReducers({
  AuthStore,
  HomeStore,
  MileageHomeStore,
  MileageChargeStore,
  TxidCheckStore,
  MileageSendStore,
  TradeDataStore,
  TradeDetailStore,
  TradeApplyStore,
  MyinfoStore,
  MyInfoMngStore,
  PasswordChangeStore,
  TradingStore,
  BuyProgressStore,
  SellProgressStore,
  TradeHistoryStore,
  TradeHistoryDetailStore,
  AddReferrerStore,
  SignupStore,
  FindStore,

  // LoginStore
});

export default storeIndex;