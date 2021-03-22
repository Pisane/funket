import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';

import {SubHeader} from '../../../components/index';
import I18n from '../../../i18n/index';


import {connect} from 'react-redux';

import * as passwordCheckActions from '../../../modules/myinfo/MyInfoMng_store';

class MyinfoMngScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            password:'',
        }
    }
   
 


    render(){
        const { navigation } = this.props;
        if(this.props.PasswordCheck.requesting === true )
        {
           //console.log(this.props.PasswordCheck);
            if(this.props.PasswordCheck.result == 1){
                
                navigation.navigate('ChangePw');
                this.props.passwordCheckReset();
               
            }
            else{
                // Alert.alert("일치하지 않는 비밀번호 입니다.");
                Alert.alert(I18n.t('translation.myinfomng.text_7'));
                this.props.passwordCheckReset();    
            }
            
            
        }

        return (
            
            <View style={styles.rootContainer}>
                {/* <View style = {styles.headerContainer}>
                    <View style = {styles.headerDetailContainer}>
                        <TouchableOpacity 
                            style={styles.headerDivineLeft}
                            onPress={()=>navigation.goBack()}>
                            <Image
                                style = {styles.backButton}
                                source = {require('../../../../assets/images/avatar.png')}
                            />
                        </TouchableOpacity>
                        <View style={styles.headerDivineCenter}>
                            <Text style={styles.headerText}>
                                회원 정보 관리
                            </Text>
                        </View >
                        <View style={styles.headerDivineRight}/>

                    </View> 
                   
                </View> */}
                 <SubHeader
                    // title='회원 정보 관리'
                    title = {I18n.t('translation.myinfomng.text_1')}
                    mode='back'
                    onPress={()=> navigation.goBack()}/>
                <View style={styles.bodyContainer}>
                    <View style={styles.contentContainer}>

                        <Text style={styles.text_1}>
                            {/* 비밀번호 확인 */}
                            {I18n.t('translation.myinfomng.text_2')}
                        </Text>
                        <Text style={styles.text_2}>
                            {/* 회원님의 정보를 안전하게 보호하기 위해{"\n"}비밀번호 확인이 필요합니다. */}
                            {I18n.t('translation.myinfomng.text_3')}
                        </Text>
                        <View style={styles.line} />
                        <View style={styles.closedInputContainer}>
                            <Text style={styles.closedInputText}>
                                {/* 아이디 */}
                                {I18n.t('translation.myinfomng.text_4')}
                            </Text>
                            <Text style={styles.closedInputText}>
                                {this.props.MyInfo.id}
                            </Text>
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput 
                                style={[styles.inputText,{marginLeft: '5.75%'}]}
                                // placeholder='현재 비밀번호를 입력해주세요.'
                                placeholder={I18n.t('translation.myinfomng.text_5')}
                                secureTextEntry={true}
                                underlineColorAndroid='transparent'
                                onChangeText={(password)=> this.setState({password})}
                                >
                                
                            </TextInput>
                        </View>
                        
                    </View>
                    <TouchableOpacity 
                        style={styles.checkButtonContainer}
                        onPress={()=>this.props.passwordCheckRequest({jwt: this.props.jwt, pw: this.state.password})}
                        >
                        <View style={styles.checkButton}>
                            <Text style={styles.checkButtonText}>
                                {/* 확인 */}
                                {I18n.t('translation.myinfomng.text_6')}
                            </Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        
            
        );
    }
}

const styles = StyleSheet.create({
    rootContainer:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'column',
    },

    headerContainer:{
        width: '100%',
        height: 120,
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e8',
    },
    headerDetailContainer:{
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 64,
        marginBottom: 16,
    },
    headerDivineLeft:{
        flex: 1,
        alignItems: 'flex-start',
    },
    headerDivineCenter:{
        flex: 1,
        alignItems: 'center',
    },
    headerDivineRight:{
        flex:1,
    },
    backButton:{
        width: 40,
        height: 40,
        marginLeft: 20,

    },
    headerText:{
        fontSize: 18,

    },

    bodyContainer:{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent:'space-between',
        width: '100%',
    },
    contentContainer:{
        width: '100%',
        height: 265,
        alignItems: 'center',
        flexDirection: 'column',
    },
    text_1:{
        fontSize: 14,
        fontWeight: '500',
        marginTop: 29,
    },
    text_2:{
        fontSize: 14,
        marginTop: 19,
        color: '#535353',
        textAlign: 'center',
    },
    line:{
        width: '90%',
        height : 1,
        backgroundColor: '#e2e2e2',
        marginTop: 32,
    },
    closedInputContainer:{
        width:'80%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth:1,
        borderColor: '#b4b4b4',
        backgroundColor: '#e8e8e8',
        marginTop: 25,
    },
    closedInputText:{
        fontSize: 14,
        color: '#717171',
        // marginLeft: 23,
        marginLeft: '5.75%',
    },
    inputContainer:{
        width:'80%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth:1,
        borderColor: '#e8e8e8',
        marginTop: 10,
    },
    inputText:{
        fontSize: 14,
        color: '#b4b4b4',
    },
    checkButtonContainer:{
        width: '100%',
        height: 80,
        alignItems: 'center',
    },
    checkButton:{
        width:'90%',
        height: 50,
        borderRadius: 10,
        backgroundColor: '#0090ff',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center'
    },
    checkButtonText:{
        fontSize: 18,
        color: '#ffffff',
    },
    
});



const mapStateToProps = (state) => ({
    MyInfo : state.MyinfoStore.myInfoData,
    PasswordCheck : state.MyInfoMngStore,
    jwt : state.AuthStore.jwt,


});

const mapDispatchToProps = (dispatch) => ({
    passwordCheckRequest : (values) => dispatch(passwordCheckActions.passwordCheckRequest(values)),
    passwordCheckReset : () => dispatch(passwordCheckActions.passwordCheckReset()),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(MyinfoMngScreen);

export default connected;