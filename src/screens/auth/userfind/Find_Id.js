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
import CustomInput from '../../../components/CustomInput'
import {CustomButton} from '../../../components/index'

import I18n from '../../../i18n/index';

import * as findIDAction from '../../../modules/auth/userfind/store';


class FindIdScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      ableToSend: true,
    }
  }

  componentDidUpdate(){
    if(this.state.ableToSend === false && this.props.FindStore.findIDResult === 1){
      //보내졌음
      this.setState({ableToSend: true})
      Alert.alert(I18n.t('translation.findid.text_4'), I18n.t('translation.findid.text_5'))
    }
  }

  isEmail = (value) => {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(value)
    
  }
  findIDRequest= () => {
    if(this.state.email!='' && this.isEmail(this.state.email))
    {
      this.props.findIDRequest({email: this.state.email})
      this.setState({ableToSend: false})
    }
  }

  

  render() {
    //이메일 결과
    
    const { navigation } = this.props;
    return (
    <View style={styles.rootContainer}>
        
        <View style={styles.body_section}>
          <View style={styles.body_title}>
            <Text style={[styles.body_title_text, styles.font]}>
            {/* 이메일 인증 */}
              {I18n.t('translation.findid.text_1')}
            </Text>
          </View>
            <CustomInput.Common
            // checkText='해당 메일로 아이디를 보내드립니다.'
              checkText = {I18n.t('translation.findid.text_2')}
              onChangeText = {(email)=>this.setState({email: email})}
            >

            </CustomInput.Common>
          </View>
          <View style={styles.botBtnView}>
            <View style={styles.botBtn}>
              <CustomButton
                  // title='메일 발송하기'
                  title = {I18n.t('translation.findid.text_3')}
                  onPress={()=>this.findIDRequest()}
              >

              </CustomButton>

            </View>
        </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    body_section:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 24
      },
    body_title:{
        width: '90%',
        marginBottom: 12
      },
      body_title_text:{
        fontSize: 16,
        color: '#121212'
      },
    inputStyle:{
        width: '100%'
    },
    botBtnView: {
        width: '90%',
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'column',
        // position: 'absolute'
    },
    botBtn: {
        width: '100%',
        height: 50,
        marginBottom: 19
    },

});
const mapStateToProps = (state) => ({
  FindStore : state.FindStore,
});

const mapDispatchToProps = (dispatch) => ({
  findIDRequest : (values) => dispatch(findIDAction.findIDRequest(values)),
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(FindIdScreen);

export default connected;
