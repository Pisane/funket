import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  TextInput,
  Button,
  ActivityIndicator,
  Alert
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';

import * as loginActions from '../../modules/auth/login/Authstore';
//임시 로딩 페이지. 사용할지 말지 고려중
import { fonts, colors } from '../../styles';
class AuthLoadingScreen extends Component {
    constructor(props){
        super(props);

    }
    componentDidMount(){
      const {navigation} = this.props;

      navigation.navigate('Login')
    }

    render(){
      const {navigation} = this.props;
        return (
            <View style={styles.container}>
              <ActivityIndicator color={colors.white} />
              {/* <Text>Loading...</Text> */}
              <Image
                style={{width: 150, height: 35}}
                source={require('../../../assets/images/logo_funket.png')}
                resizeMode='contain'
              ></Image>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  
    },
    bgImage: {
      flex: 1,
      marginHorizontal: -20,
    },
    section: {
      flex: 1,
      paddingHorizontal: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    sectionLarge: {
      flex: 2,
      justifyContent: 'space-around',
    },
    sectionHeader: {
      marginBottom: 8,
    },
    priceContainer: {
      alignItems: 'center',
    },
    description: {
      padding: 15,
      lineHeight: 25,
    },
    titleDescription: {
      color: '#19e7f7',
      textAlign: 'center',
      fontFamily: fonts.primaryRegular,
      fontSize: 15,
    },
    title: {
      marginTop: 30,
    },
    price: {
      marginBottom: 5,
    },
    priceLink: {
      borderBottomWidth: 1,
      borderBottomColor: colors.primary,
    },
    inputs:{
      height:45,
      marginLeft:16,
      borderBottomColor: '#FFFFFF',
    },
    inputContainer: {
      borderBottomColor: '#F5FCFF',
      backgroundColor: '#FFFFFF',
      borderRadius:30,
      borderBottomWidth: 1,
      width:250,
      height:45,
      marginBottom:20,
      flexDirection: 'row',
      alignItems:'center'
  },
  });
  
const mapStateToProps = (state) => ({
})

const mapDispatchToProps = (dispatch) => ({
})

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(AuthLoadingScreen)
export default connected;