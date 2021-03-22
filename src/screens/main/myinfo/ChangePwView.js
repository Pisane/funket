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
import * as passwordChangeActions from '../../../modules/myinfo/changePw/passwordChange_store';

class ChangePwScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            newPw: '',
            forCheckNewPw: '',
        }
    }

    componentDidMount(){
        this.props.userInfoDetailRequest({jwt: this.props.jwt});
    }

    componentDidUpdate(){
        if(this.props.passwordChangeStore.passwordChangeResult===1)
        {   ß
            //console.log(this.props.passwordChangeStore.passwordChangeResult);
            // Alert.alert('비밀번호가 변경되었습니다.');
            Alert.alert(I18n.t('translation.pwchange.text_9'));
            this.props.passwordChagneResultReset();
        }
    }

    

    _validatePw(){
        let pw = this.state.newPw;
        let forCheckNewPw = this.state.forCheckNewPw;

        if( pw == forCheckNewPw){
        
            return true;
        }else{
            return false;
        }
    }
    async _passwordChange(){
        if(this._validatePw()){
           
            await this.props.passwordChangeRequest({jwt:this.props.jwt, pw: this.state.newPw});
        }else{
            // Alert.alert('비밀번호 변경 오류', '비밀번호가 일치하지 않습니다.');
            Alert.alert(I18n.t('translation.pwchange.text_10'), I18n.t('translation.pwchange.text_11'));
        }


    }

    render(){
        const { navigation } = this.props;

        
        return (
            
            <View style={styles.rootContainer}>
                {/* <View style = {styles.headerContainer}>
                    <View style = {styles.headerDetailContainer}>
                        <TouchableOpacity 
                            style={styles.headerDivineLeft}
                            onPress={()=>navigation.navigate("Myinfo")}
                            >
                            <Image
                                style = {styles.backButton}
                                source = {require('../../../../assets/images/avatar.png')}
                            />
                        </TouchableOpacity>
                        <View style={styles.headerDivineCenter}>
                            <Text style={styles.headerText}>
                                회원 정보
                            </Text>
                        </View >
                        <View style={styles.headerDivineRight}/>

                    </View>
                </View> */}
                <SubHeader
                    // title='회원 정보'
                    title={I18n.t('translation.pwchange.text_1')}
                    mode='back'
                    onPress={()=> navigation.navigate('Myinfo')}/>
                <View style={styles.bodyContainer}>
                    <View style={styles.contentContainer}>
                        <View style={styles.contentText_1_Container}>
                            <Text style={styles.contentText_1}>
                                {/* 기본 정보 */}
                                {I18n.t('translation.pwchange.text_2')}
                            </Text>
                        </View>
                        
                        {/* <View style={styles.contentListContainer}>
                            <Text style={styles.contentListText_1}>
                                
                                {I18n.t('translation.pwchange.text_3')}
                            </Text>
                            <Text style={styles.contentListText_2}>
                                {this.props.passwordChangeStore.userInfoDetail.name}
                            </Text>
                        </View> */}
                        <View style={styles.contentListContainer}>
                            <Text style={styles.contentListText_1}>
                                {/* 아이디 */}
                                {I18n.t('translation.pwchange.text_4')}
                            </Text>
                            <Text style={styles.contentListText_2}>
                                {this.props.passwordChangeStore.userInfoDetail.id}
                            </Text>
                        </View>
                        <View style={styles.contentListContainer}>
                            <Text style={styles.contentListText_1}>
                                {/* 이메일 */}
                                {I18n.t('translation.pwchange.text_5')}
                            </Text>
                            <Text style={styles.contentListText_2}>
                                {this.props.passwordChangeStore.userInfoDetail.email}
                            </Text>
                        </View>
                        <View style={[styles.contentListContainer,{marginBottom:28}]}>
                            <Text style={styles.contentListText_1}>
                                {/* 지갑주소 */}
                                {I18n.t('translation.pwchange.text_6')}
                            </Text>
                            <Text 
                                style={[styles.contentListText_2,{width:'65%'}]}
                                ellipsizeMode='tail' numberOfLines={1}
                                >
                                {this.props.passwordChangeStore.userInfoDetail.wallet}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.pwChangeContainer}>
                        <Text style={styles.pwChangeText}>
                            {/* 비밀번호 변경 */}
                            {I18n.t('translation.pwchange.text_7')}
                        </Text>
                        <View style={styles.pwChangeInput}>
                            <TextInput 
                                style={styles.pwChangeInputText}
                                // placeholder='새 비밀번호'
                                placeholder={I18n.t('translation.pwchange.text_12')}
                                secureTextEntry={true}
                                underlineColorAndroid='transparent'
                                onChangeText={(newPw)=> this.setState({newPw})}
                                >
                            </TextInput>
                        </View>
                        <View style={styles.pwChangeInput}>
                            <TextInput 
                                style={styles.pwChangeInputText}
                                // placeholder='비밀번호 확인'
                                placeholder={I18n.t('translation.pwchange.text_13')}
                                secureTextEntry={true}
                                underlineColorAndroid='transparent'
                                onChangeText={(forCheckNewPw)=> this.setState({forCheckNewPw})}
                                >
                            </TextInput>
                        </View>
                        <View style={styles.checkButtonContainer}>
                            <TouchableOpacity 
                                style={styles.checkButton}
                                onPress={()=>this._passwordChange()}>
                                <Text style={styles.checkButtonText}>
                                    {/* 확인 */}
                                    {I18n.t('translation.pwchange.text_8')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rootContainer:{
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f5f7f8',
        flexDirection: 'column',
    },

    headerContainer:{
        width: '100%',
        height: 107,
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e8',
        backgroundColor: '#fff'
    },
    headerDetailContainer:{
        flex: 3,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 61,
        marginBottom: 23,
        height : 28,
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
        width: '100%',
    },
    contentContainer:{
        width: '100%',
        backgroundColor: '#fff',
        height: 205,
        alignItems:'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e8',
        flexDirection: 'column',
        justifyContent:'flex-start',
    },
    contentText_1_Container:{
        height: 19.5,
        width:'100%',
        marginTop: 32,
        // marginLeft: 20,
        marginLeft: '5%',
        marginBottom: 23.5,
    },
    contentText_1:{
        fontSize: 16,
        
    },
    contentListContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 12,
    },
    contentListText_1:{
        width: 50,
        fontSize: 13,
        // marginLeft: 36,
        marginLeft: '9%',
        color: '#515154',
    },
    contentListText_2:{
        fontSize: 13,
        // marginLeft: 19,
        marginLeft: '4.8%',
    },
    pwChangeContainer:{
        width: '100%',
        backgroundColor: '#fff',
        height: 250,
        alignItems:'flex-start',
        borderTopWidth: 1,
        borderTopColor:'#e8e8e8',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e2e2',
        marginTop: 8,
    },
    pwChangeText:{
        fontSize: 16,
        marginTop: 32,
        marginBottom: 12,
        // marginLeft: 22,
        marginLeft: '5.5%',
    },
    pwChangeInput:{
        width: '90%',
        height: 47,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#e8e8e8',
        backgroundColor: '#f5f7f8',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
        // marginLeft: 22,
        marginLeft: '5.5%',
        
    },
    pwChangeInputText:{
        fontSize: 14,
        color: '#b4b4b4',
        // marginLeft: 20,
        marginLeft:'5%',
    },
    checkButtonContainer:{
        width: '100%',
        height: 80,
        alignItems: 'center',
        //marginTop: 15,
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
    passwordChangeStore : state.PasswordChangeStore,
    userId : state.MyinfoStore.myInfoData.id,
    jwt : state.AuthStore.jwt,
    
});

const mapDispatchToProps = (dispatch) => ({
    passwordChangeRequest : (values) => dispatch(passwordChangeActions.passwordChangeRequest(values)),
    userInfoDetailRequest: (values) => dispatch(passwordChangeActions.userInfoDetailRequest(values)),
    passwordChagneResultReset: ()=> dispatch(passwordChangeActions.passwordChagneResultReset()),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePwScreen);

export default connected;