import * as React from 'react';
import HomeScreen from '../../screens/main/home/index';
import ChatView from '../../screens/main/chat/index';
import MyinfoScreen from '../../screens/main/myinfo/index';
import TradeScreen from '../../screens/main/trade/index';

import FeatherIcon from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import I18n from '../../i18n/index';

const tabNavigationData = [
  {
    name: 'home',
    component: HomeScreen,
    Icon: <FeatherIcon name='home' size={30} color='#B4B4B4'/>,
    focusedIcon: <FeatherIcon name='home' size={30} color='#0090FF'/>,
  },
  {
    name: 'trade',
    component: TradeScreen,
    Icon: <FeatherIcon name='list' size={30} color='#B4B4B4'/>,
    focusedIcon: <FeatherIcon name='list' size={30} color='#0090FF'/>,
  },
  {
    name: 'chat',
    component: ChatView,
    Icon: <Ionicons name='chatbox-outline' size={30} color='#B4B4B4'/>,
    focusedIcon: <Ionicons name='chatbox-outline' size={30} color='#0090FF'/>,
  },

  {
    name: 'myinfo',
    component: MyinfoScreen,
    Icon: <Ionicons name='person-outline' size={30} color='#B4B4B4'/>,
    focusedIcon: <Ionicons name='person-outline' size={30} color='#0090FF'/>,
  },
];

export default tabNavigationData;