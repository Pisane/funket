import { Provider } from 'react-redux';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text, } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import AppView from './src/screens/AppView'
import storeIndex from './src/modules/index';

import createSagaMiddleware from 'redux-saga';
import rootSaga from './src/modules/rootSaga';
import { fonts } from './src/styles';



const sagaMiddleware = createSagaMiddleware()
const store = createStore(storeIndex, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default function App() {
  return (
    <Provider store = {store}>
    <SafeAreaProvider>
      <SafeAreaView 
      edges={['top']}
      style={styles.container}>
      <NavigationContainer>
        {/* <View style={styles.container}></View> */}
          <AppView style={styles.appView}/>

      </NavigationContainer>
      </SafeAreaView>
      </SafeAreaProvider>
      </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0090ff',

  },
});
