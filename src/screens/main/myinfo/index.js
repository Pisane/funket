import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';


const Stack = createStackNavigator();

import MyinfoScreen from './MyinfoView';
import MyinfoMngScreen from './MyInfoMngView';
import ChangePwScreen from './ChangePwView';
import BuyStatusScreen from './BuyStatusView';
import SellStatusScreen from './SellStatusView';
import TradeHistoryScreen from './TradeHistoryView';
import TradeHistoryDetailScreen from './TradeHistoryDetailView';
import TradingScreen from './TradingView';
import AddReferrerScreen from './AddReferrerView';


const StackNavigationData = [
  {
    name: 'Myinfo',
    component: MyinfoScreen,
    options: {
      gestureEnabled: false,
    },
  },
  {
    name: 'MyInfoMng',
    component: MyinfoMngScreen,
    options: {
      gestureEnabled: false,
    },
  },
  {
    name: 'ChangePw',
    component: ChangePwScreen,
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
    name: 'SellStatus',
    component: SellStatusScreen,
    options: {
      gestureEnabled: false,
    },
  },
  {
    name: 'TradeHistory',
    component: TradeHistoryScreen,
    options: {
      gestureEnabled: false,
    },
  },
  {
    name: 'TradeHistoryDetail',
    component: TradeHistoryDetailScreen,
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
  {
    name: 'AddReferrer',
    component: AddReferrerScreen,
    options: {
      gestureEnabled: false,
    },
  },
 ]


export default function NavigatorView(props) {

  return (
    <Stack.Navigator
     screenOptions={{
       headerShown: false,
     }}
    >
      {StackNavigationData.map((item, idx) => (
        <Stack.Screen
          key={`myinfo_stack_item-${idx+1}`}
          name={item.name} 
          component={item.component} 
          options={item.options}
        />
      ))}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 100 + '%',
    height: 57,
  },
});

