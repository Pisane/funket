import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import I18n from '../../../i18n/index.js';
import { getLanguages } from 'react-native-i18n';
import * as loginAction from '../../../modules/auth/login/Authstore';
import { fonts, colors } from '../../../styles';
import { CustomButton, TabHeader} from '../../../components'

let isEmpty = function(value){ if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){ return true }else{ return false } };


class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: 'test45',
      password: '1234',
      error: false,
      languages: [],
      loginBtnClick: false,
    }
  }
  // 기기 언어설정에 따른 언어팩 적용 ko,en 
  componentDidMount() {
    getLanguages().then(languages => {
      this.setState({ languages });
      //console.log(languages);
      if(languages[0]=="en")
      {
        I18n.locale = 'en'
        this.props.setLang({lang: 2})
      }else if(languages[0]=="ko-KR"){
        I18n.locale = 'ko'
        this.props.setLang({lang: 1})
      }
    })
   
  }

  componentDidUpdate(){
    if(this.state.loginBtnClick && this.props.auth.result===1)
    {
      this.props.navigation.navigate('Main',{jwt: this.props.auth.jwt});
      this.setState({loginBtnClick: false})
    }else if(this.state.loginBtnClick && this.props.auth.result===2){
      Alert.alert(I18n.t('translation.loginFailTitle'),I18n.t('translation.loginFailContent'));
      this.setState({loginBtnClick: false})
    }
  }

  _loginRequest =  (values) => {
    const { navigation } = this.props;

    this.setState({loginBtnClick: true})
    if(!isEmpty(values.email)&&!isEmpty(values.password)){
      //두개가 비어있지 않으면 
      this.props.loginRequest(values)
      
    }

  }

  render() {
   
    const { navigation } = this.props;
 
    //console.log(this.props.auth)

    

    
    // if(this.props.auth.errors != null)
    // {
    //   Alert.alert(I18n.t('translation.loginFailTitle'),I18n.t('translation.loginFailContent'));
    // }

    return (
      <View style={styles.rootContainer}>

        <View style={styles.logoSection}>
          <Image style={styles.logoImage}
            source={require('../../../../assets/images/logo_funket.png')}
            resizeMode='contain'
          />
        </View>
        <KeyboardAvoidingView style={styles.inputSection} behavior="padding" enabled>

          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder={I18n.t('translation.id')}
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({ email })}
            ></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <TextInput style={styles.inputs}
              placeholder={I18n.t('translation.password')}
              secureTextEntry={true}
              underlineColorAndroid='transparent'
              onChangeText={(password) => this.setState({ password })}
            ></TextInput>
          </View>
          <View style={styles.btnSection}>
            <View style={styles.button}>
              <CustomButton title={I18n.t('translation.login')}
                onPress={() => {
                  this._loginRequest({ email: this.state.email, password: this.state.password })
                }}
              ></CustomButton>
            </View>

            <View style={styles.authTextSection}>
              <TouchableOpacity 
                style={styles.authText}
                onPress={() => navigation.navigate('UserFind')}
              >
                <Text style={[styles.authTextStyle, styles.font]}>{I18n.t('translation.forgotPw')}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.authText}>
                <Text style={[styles.authTextStyle, styles.font]}
                  onPress={() => navigation.navigate('SignUp')}
                >{I18n.t('translation.signup')}</Text>
              </TouchableOpacity>
            </View>
            </View>
          </KeyboardAvoidingView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  font: {
    fontFamily: fonts.primaryRegular,
    includeFontPadding: false
  },
  logoSection:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImage:{
    width: 128,
    height: 28,
    
  },
  inputSection:{
    flex: 1.3,
    width: '100%'
  },
  inputContainer:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputs:{
    width: '80%',
    height: 51,
    paddingLeft: '5%',
    borderColor: '#e8e8e8',
    borderRadius: 8,
    backgroundColor: '#f5f7f8', 
    marginBottom: 4
  },
  authSection:{
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSection:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10%'
  },
  button:{
    width: '80%',
    height: 51,

  },
  authTextSection:{
    width: '70%',
    height: 20,
    marginTop : 12,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  authText:{
    width: '50%',
    alignItems: 'center',
  },
  authTextStyle:{
    fontSize: 12,
    color: '#717171'
  }

});
const mapStateToProps = (state) => ({
  auth : state.AuthStore,

});

const mapDispatchToProps = (dispatch) => ({
  loginRequest : (values) => dispatch(loginAction.loginRequest(values)),
  setLang : (values) => dispatch(loginAction.setLang(values)),
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);

export default connected;
