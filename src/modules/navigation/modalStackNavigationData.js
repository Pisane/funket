import MileageSendScreen from '../../screens/main/home/mileage/mileagesend/MileageSendView'
import MileageSendCompScreen from '../../screens/main/home/mileage/mileagesend/MileageSendCompView'
import MileageChargeScreen from '../../screens/main/home/mileage/mileagecharge/MileageChargeView';
import MileageChargeTxidScreen from '../../screens/main/home/mileage/mileagecharge/MileageChargeTxidView';
import TradeDetailScreen from '../../screens/main/trade/tradeapply/TradeDetailView';
import TradeApplyScreen from '../../screens/main/trade/tradeapply/TradeApplyView';
import TradeApplyCompScreen from '../../screens/main/trade/tradeapply/TradeApplyCompView';
import BuyStatusScreen from '../../screens/main/myinfo/BuyStatusView';

import MileageScreen from '../../screens/main/home/mileage/MileageView';
import TradingScreen from '../../screens/main/myinfo/TradingView';

import TabNavigator from './MainTabNavigator';


//모달 형식의 navigationData입니다. 
//어느 페이지에서도 언제든지 접근 가능하게 하기위해 따로 모았습니다.

const ModalStackNavigationData = [
    {
        name: 'Main',
        component: TabNavigator,
        options: {
          gestureEnabled: false,
        },
      },
  {
    name: 'MileageSend',
    component: MileageSendScreen,
    options: {
      gestureEnabled: false,
    },
  },
  {
    name: 'MileageSendComp',
    component: MileageSendCompScreen,
    options: {
      gestureEnabled: false,
    },
  },
  {
    name: 'MileageCharge',
    component: MileageChargeScreen,
    options: {
      gestureEnabled: false,
    },
  },
  {
    name: 'MileageChargeTxid',
    component: MileageChargeTxidScreen,
    options: {
      gestureEnabled: false,
    },
  },
  {
    name: 'TradeDetail',
    component: TradeDetailScreen,
    options: {
      gestureEnabled: false,
    },
  },
  {
    name: 'TradeApply',
    component: TradeApplyScreen,
    options: {
      gestureEnabled: false,
    },
  },
  {
    name: 'TradeApplyComp',
    component: TradeApplyCompScreen,
    options: {
      gestureEnabled: false,
    },
  },
  {
    name: 'BuyStatus',
    component: BuyStatusScreen,
    options: {
      gestureEnabled: false,
    },
  },
  {
    name: 'Mileage',
    component: MileageScreen,
    options: {
      gestureEnabled: false,
    },
  },
  {
    name: 'Trading',
    component: TradingScreen,
    options: {
      gestureEnabled: false,
    },
  },
]

export default ModalStackNavigationData;

