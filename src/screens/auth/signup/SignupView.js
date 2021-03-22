import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { CustomButton, SubHeader } from '../../../components'
import CustomInput from '../../../components/CustomInput';
import I18n from '../../../i18n/index';
import { fonts } from '../../../styles';

import { connect } from 'react-redux';
import * as signupAction from '../../../modules/auth/siginup/store';


class SignupScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      idCheckText: '',
      pw: '',
      pwCheckType: null,
      usdtAddr: '',
      email: '',
      emailCheckText: '',
      referrer: '',
      refCheckText: '',

      btnDisable: true,

      idChecked: true,
      refChecked: false,
      signupChecked: false,
      emailChecked: false,
    }
  }
  componentDidMount(){

  }
  componentDidUpdate(){
     //id 중복 체크 확인 결과
    const {signupStore} = this.props
   
    if(!this.state.idChecked)
    {
      
      if(signupStore.idCheckResult==1){
        //성공
        this.setState({idCheckText: '', idChecked: true})
        
      }else if(signupStore.idCheckResult==2){
        this.setState({idCheckText: I18n.t('translation.SignUp.text_8'), idChecked: true})
      }
    }
    
    //ref 중복 체크 확인 결과
    if(!this.state.refChecked){
      if(signupStore.refCheckResult===1){
        //성공
        this.setState({refCheckText: '', refChecked : true})
      }else if(signupStore.refCheckResult===2){
        this.setState({refCheckText: I18n.t('translation.SignUp.text_9'), refChecked : true})
      }
    }
    
    //signup 버튼 활성화 확인
    if(this.state.signupChecked=== false)
    {
      if(
        signupStore.idCheckResult===1 &&
        (signupStore.refCheckResult===1 || this.state.referrer == '')&&
        this.state.pwCheckType === true &&
        this.state.emailChecked === true &&
        this.state.id != '' &&
        this.state.pw != '' &&
        this.state.email != '' &&
        this.state.addr != ''
      ){
        this.setState({btnDisable: false, signupChecked: true})
      }else{
        this.setState({btnDisable: true, signupChecked: true})
      }
    }
    
    // console.log(signupStore.signupResult)
    //signup 요청 결과
    if(signupStore.signupResult===1){
      navigation.navigate('Login')
      this.props.signupReset()
    }else if(signupStore.signupResult===2){
      Alert.alert(I18n.t('translation.SignUp.text_10'), I18n.t('translation.SignUp.text_11'))
      this.props.signupReset()
    }else if(signupStore.signupResult===3){
      Alert.alert(I18n.t('translation.SignUp.text_10'), I18n.t('translation.SignUp.text_12'))
      this.props.signupReset()
    }else if(signupStore.signupResult===4){
      Alert.alert(I18n.t('translation.SignUp.text_10'), I18n.t('translation.SignUp.text_14'))
      this.props.signupReset()
    }
  }
  
  idCheck = () => {
    console.log('call')
    this.setState({idChecked: false, signupChecked: false})

    if(this.state.id != ''){
      this.props.idCheckRequest({id: this.state.id})
    }
    
  }
  refCheck = () => {
    this.setState({refChecked: false, signupChecked: false})

    if(this.state.referrer != '')
    {
      this.props.refCheckRequest({id: this.state.referrer})
    }
    
  }
  _signupRequest = () => {
    this.props.signupRequest({
      id: this.state.id,
      pw: this.state.pw,
      email: this.state.email,
      addr: this.state.usdtAddr,
      ref: this.state.referrer,
    })
  }

  pwCheck = (_pw) => {
    //첫번째 비밀번호 TextInput값과 비밀번호 확인 TextInput 검증 
    this.setState({signupChecked: false})
    if (this.state.pw === _pw && _pw.length >= 6) {
        this.setState({ pwCheckType: true })
    }else if(this.state.pw !== _pw){
        this.setState({ pwCheckType: false })
    }else {
        //여기서 영문 숫자 조합 체크를 넣어도 될것같음.
        this.setState({ pwCheckType: null })
    }
  }
  
  isEmail = () => {
    this.setState({signupChecked:false, emailChecked: false})

    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    console.log(this.state.emailChecked)
    if(this.state.emailChecked===false && regExp.test(this.state.email))
    {
      this.setState({emailChecked: true, emailCheckText: ''})
      
    }else{
      this.setState({emailCheckText: I18n.t('translation.SignUp.text_13')})
    }
  
  }

  render() {
    const { navigation, signupStore } = this.props;

    // keyboardAvoidingView 의 android 알려진 문제로 behavior 를 기본으로 사용할것을 권장함
    const keyboardVerticalOffset = Platform.OS === 'ios' ? 60 : 20
    const behavior = Platform.OS === 'ios' ? "padding": null
    return (
      <View style={styles.rootContainer}>
        <SubHeader
          title={I18n.t('translation.signup')}
          mode='back'
          underLine= {false}
          onPress={() => navigation.goBack()}
        >
        </SubHeader>
       
        <KeyboardAvoidingView style={styles.avoidView} behavior={behavior} enabled keyboardVerticalOffset={keyboardVerticalOffset} >
        <ScrollView style={styles.scrollView}>
          <View style={styles.body_section}>
            <View style={styles.body_title}>
              <Text style={[styles.body_title_text, styles.font]}>
              {I18n.t('translation.id')}
              </Text>
            </View>
              <CustomInput.CheckIcon
                placeholder={I18n.t('translation.SignUp.text_1')}
                onChangeText={(_id)=> {
                  this.setState({id : _id})
                }}
                onEndEditing={()=>{
                  this.idCheck()
                }}
                checkText={this.state.idCheckText}
              ></CustomInput.CheckIcon>
          </View>
          <View style={styles.body_section}>
            <View style={styles.body_title}>
              <Text style={[styles.body_title_text, styles.font]}>
              {I18n.t('translation.password')}
              </Text>
            </View>
            <CustomInput.Pw
            placeholder= {I18n.t('translation.SignUp.text_2')}
            confirmPlaceholder= {I18n.t('translation.SignUp.text_3')}
            onChangeText={(_pw) => {this.setState({pw:_pw})}}
            confirmOnChangeText={(_checkPw) => {this.pwCheck(_checkPw)}}
            checkPw = {this.state.pwCheckType}
            checkText={I18n.t('translation.SignUp.text_4')}
            errorText={I18n.t('translation.SignUp.text_5')}
            ></CustomInput.Pw>
          </View>
          <View style={styles.body_section}>
            <View style={styles.body_title}>
              <Text style={[styles.body_title_text, styles.font]}>
              {I18n.t('translation.usdtAddr')}
              </Text>
            </View>
              <CustomInput.CheckIcon
                onChangeText={(_usdtAddr) => {this.setState({usdtAddr:_usdtAddr})}}
              ></CustomInput.CheckIcon>
          </View>
          <View style={styles.body_section}>
            <View style={styles.body_title}>
              <Text style={[styles.body_title_text, styles.font]}>
              {I18n.t('translation.emailCert')}
              </Text>
            </View>
                <CustomInput.CheckIcon
                onChangeText={(_email) => {this.setState({email:_email})}}
                onEndEditing={()=>this.isEmail()}
                checkText={this.state.emailCheckText}
                keyboardType={"email-address"}
              ></CustomInput.CheckIcon>
          </View>
          <View style={styles.body_section}>
            <View style={styles.body_title}>
              <Text style={[styles.body_title_text, styles.font]}>
              {I18n.t('translation.referrer')}
              </Text>
            </View>
                <CustomInput.CheckIcon
                onChangeText={(_referrer) => {this.setState({referrer:_referrer})}}
                onEndEditing={()=>{this.refCheck()}}
                checkText={this.state.refCheckText}
              ></CustomInput.CheckIcon>
                       
          </View>
          <View style={styles.body_section}>
          <View style={styles.body_title}>
              <Text style={[styles.body_title_text, styles.font]}>
              {/* 이용약관 */}
                {I18n.t('translation.SignUp.text_6')}
              </Text>
              <View>
                <Text style={{height:200}}>임시 블럭</Text>
              </View>
            </View>
          </View>
          <View style={styles.body_section}>
          <View style={styles.body_section_btn}>
          <CustomButton
            // title={'회원가입'}
            title={I18n.t('translation.SignUp.text_7')}
            nonClick={this.state.btnDisable}
            onPress={()=>this._signupRequest()}
            >
          </CustomButton>
          </View>
          </View>
        </ScrollView>
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
  avoidView: {
    flex: 1, 
    width: '100%', 
    flexDirection: 'column',
    justifyContent: 'center',
  },
  scrollView:{
    width: '100%',
  },
  body_section:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24
  },
  body_section_btn:{
    width: '90%',
    height:50
  },  
  body_title:{
    width: '90%',
    marginBottom: 12
  },
  body_title_text:{
    fontSize: 16,
    color: '#121212'
  },
  body_input_style:{
    width: '90%',
    height: 47.5,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#e8e8e8',
    paddingLeft: '5%',
    paddingRight: '5%',
    marginBottom: 8,

  }

});

const mapStateToProps = (state) => ({
  signupStore : state.SignupStore,

});

const mapDispatchToProps = (dispatch) => ({
  idCheckRequest : (values) => dispatch(signupAction.idCheckRequest(values)),
  refCheckRequest : (values) => dispatch(signupAction.refCheckRequest(values)),
  signupRequest : (values) => dispatch(signupAction.signupRequest(values)),
  signupReset : () => dispatch(signupAction.signupReset()),

});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen);

export default connected;