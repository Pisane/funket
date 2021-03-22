import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { connect } from 'react-redux';
import CustomInput from '../../../components/CustomInput'
import {CustomButton} from '../../../components/index'

import I18n from '../../../i18n/index';

import * as findPWAction from '../../../modules/auth/userfind/store';


class FindPwScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      email: '',
      albeToSend: true,
    }
  }

  componentDidUpdate(){
    if(this.state.ableToSend === false && this.props.FindStore.findPWResult === 1){
      //보내졌음
      this.setState({ableToSend: true})
      Alert.alert(I18n.t('translation.findpw.text_5'), I18n.t('translation.findpw.text_6'))
    }
  }

  isEmail = (value) => {
    var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    return regExp.test(value)
    
  }

  findPWRequest= () => {
    if(this.state.email!='' && this.state.id!='' && this.isEmail(this.state.email))
    {
      //console.log('call')
      this.props.findPWRequest({id: this.state.id, email: this.state.email})
      this.setState({ableToSend: false})
    }
  }


  render() {

    const { navigation } = this.props;
    return (
    <View style={styles.rootContainer}>

             
        <ScrollView style={{width: '100%'}}>
          <View style={styles.body_section}>
          <View style={styles.body_title}>
                <Text style={[styles.body_title_text, styles.font]}>
                {/* 이름 */}
                  {I18n.t('translation.findpw.text_1')}
                </Text>
              </View> 
              <CustomInput.Common
                onChangeText = {(id)=>this.setState({id: id})}
              />

            
          </View>
          <View style={styles.body_section}>
          <View style={styles.body_title}>
                <Text style={[styles.body_title_text, styles.font]}>
                  {/* 이메일 인증 */}
                  {I18n.t('translation.findpw.text_2')}
                </Text>
              </View>
              <CustomInput.Common
              // placeholder='가입시 등록한 이메일을 입력하세요'
                placeholder={I18n.t('translation.findpw.text_3')}
                onChangeText = {(email)=>this.setState({email: email})}
              >

              </CustomInput.Common>
          </View>
          <View style={{height:300}}>

          </View>
        </ScrollView>
     
        <View style={styles.botBtnView}>
                    <View style={styles.botBtn}>
                        <CustomButton
                            // title='메일 발송하기'
                            title={I18n.t('translation.findpw.text_4')}
                            onPress={()=>this.findPWRequest()}
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
    avoidView: {
        flex: 1, 
        width: '100%', 
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
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
  findPWRequest : (values) => dispatch(findPWAction.findPWRequest(values)),
});

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(FindPwScreen);

export default connected;
