import React, { Component } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SubHeader } from '../../../components/index';
import {fonts} from '../../../styles'
import I18n from '../../../i18n/index';

import FindIdScreen from './Find_Id';
import FindPwScreen from './Find_Pw';
const Tab = createMaterialTopTabNavigator();

export default function UserFindTabs({navigation}) {
  return (
    <View style={{height:'100%'}}>
      <SubHeader
      title={I18n.t('translation.userFind')}
      mode='back'
      onPress={() => navigation.goBack()}
      /> 

    <Tab.Navigator
    tabBarOptions={{
      // labelStyle: {
      //   activeTintColor : '#0090FF'
      // }
      activeTintColor : '#0090ff',
      inactiveTintColor: '#AEAEB2',
     labelStyle : { fontFamily:fonts.primaryRegular}
    }}
    >
      <Tab.Screen name={I18n.t('translation.findId')} component={FindIdScreen} />
      <Tab.Screen name={I18n.t('translation.findPw')} component={FindPwScreen} />
    </Tab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  font: {
    fontFamily: fonts.primaryRegular,
    includeFontPadding: false
},
})