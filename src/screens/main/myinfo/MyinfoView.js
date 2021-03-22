import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Modal from 'react-native-modal';


import Slider from '@react-native-community/slider';
import I18n from '../../../i18n/index.js';


import {connect} from 'react-redux';
import * as myinfoActions from '../../../modules/myinfo/store';
import * as myAuthActions from '../../../modules/auth/login/Authstore';

import { fonts } from '../../../styles';

import {TabHeader} from '../../../components/index';



class MyinfoScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            selectLangVisible: false,
        };
    }

    componentDidMount(){
        //내 정보에 그릴 사용자 데이터 가져오기
        //데이터가 변할 수 있으니까 이 화면이 불릴 때 마다 다시 불러온다
        //로그인이 되어 있는가?
        //this.setState({lang:1})
        this.focusListener = this.props.navigation.addListener("focus", () => {
            this.setState({selectLangVisible: false});
            this.props.myinfoRequest({jwt: this.props.jwt});
            
            //this.ScrollView.scrollTo({y:0,animated:false})
        
          });
        
    }

    toggleKor(){
        I18n.locale = 'ko'
        this.props.setLang({lang: 1})

    }
    toggleEng(){
        I18n.locale = 'en'
        this.props.setLang({lang: 2})
    }

    toggleLang(){
        this.setState({selectLangVisible: !this.state.selectLangVisible})
    }
 
    render(){
        const { navigation } = this.props;
        return (
            <View style={styles.rootContainer}>
                <TabHeader
                    title = {I18n.t('translation.myinfo.text_1')}
                    noti = {true}
                ></TabHeader>
                <ScrollView 
                    style={styles.scrollView}
                    ref={(ref) => this.ScrollView=ref}
                    
                    // onContentSizeChange={() => {
                    //     // 여기다가 어떤 경우에 스크롤을 하면 될지에 대한 조건문을 추가하면 된다.
                    //     this.ScrollView.scrollTo({y:0,animated:false})

                    // }}
                >
                    <View style={styles.bodyContainer}>
                        <View style={styles.lineStyle_100}/>
                        <View style={styles.body_1_Container}>
                            <Text style={styles.idText} >
                                {this.props.MyInfo.id+I18n.t('translation.myinfo.text_21')}
                            </Text>
                            <TouchableOpacity onPress={()=>navigation.navigate('MyInfoMng')}>
                                <Text style={[styles.infoTextSize_12,styles.infoTextGrayColor]} >
                                    {I18n.t('translation.myinfo.text_2')}
                                </Text> 
                            </TouchableOpacity>
                            
                        </View>
                        <View style={styles.body_2_Container}>
                            <Text style={[styles.infoTextSize_12,styles.infoTextGray_2_Color]} >
                                {/* 구매 중 */}
                                {I18n.t('translation.myinfo.text_3')}
                            </Text>
                            <Text style={[styles.infoTextSize_12,styles.infoTextBlackColor]} >
                                {this.props.MyInfo.buyCount+I18n.t('translation.myinfo.text_16')}
                            </Text>
                            <Text style={[styles.infoTextSize_12,styles.infoTextGray_2_Color]} >
                                {/* 판매 중 */}
                                {I18n.t('translation.myinfo.text_4')}
                            </Text>
                            <Text style={[styles.infoTextSize_12,styles.infoTextBlackColor]} >
                                {this.props.MyInfo.sellCount+I18n.t('translation.myinfo.text_16')}
                            </Text>
                        </View>
                        <View style={styles.lineStyle_86}/>
                        <View style={styles.body_3_Container}>
                            <TouchableOpacity 
                                style={styles.item_1_Container}
                                onPress={()=>navigation.navigate('Trading')}>
                                <Image
                                    style = {styles.icon_1}
                                    source = {require('../../../../assets/images/icons/icon_TradeStatus.png')}/>
                                <Text style={[styles.infoTextSize_12,styles.infoTextBlackColor]}>
                                    {/* 거래현황 */}
                                    {I18n.t('translation.myinfo.text_5')}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.item_1_Container}
                                onPress={()=>navigation.navigate('Mileage')}>
                                <Image
                                    style = {styles.icon_1}
                                    source = {require('../../../../assets/images/icons/icon_Mileage.png')}/>
                                <Text style={[styles.infoTextSize_12,styles.infoTextBlackColor]}>
                                    {/* 마일리지 */}
                                    {I18n.t('translation.myinfo.text_6')}
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={styles.item_1_Container}
                                onPress={()=>navigation.navigate('TradeHistory')}>
                                <Image
                                    style = {styles.icon_1}
                                    source = {require('../../../../assets/images/icons/icon_TradeHistory.png')}/>
                                <Text style={[styles.infoTextSize_12,styles.infoTextBlackColor]}>
                                    {/* 거래내역 */}
                                    {I18n.t('translation.myinfo.text_7')}
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.lineStyle_100_Thick}/>
                        <View style={styles.body_4_Container}>
                            <Text style={styles.text_32}>
                                {/* 판매 이율 */}
                                {I18n.t('translation.myinfo.text_8')}
                            </Text>
                            <View style={styles.item_2_Container}>
                                <Text style={styles.text_Blue_Bold_18}>
                                    {this.props.MyInfo.rate}
                                </Text>
                                <Text style={styles.text_32}>
                                    %
                                </Text>
                            </View>
                        </View>
                        <Slider
                            style={styles.slider}
                            minimumValue={1}
                            maximumValue={3}
                            value={this.props.MyInfo.rate}
                            step={1}
                            minimumTrackTintColor="#0090ff"
                            maximumTrackTintColor="#e8e8e8"
                            onValueChange={(value)=>(this.props.changeFeeRequest({jwt: this.props.jwt, changedRate: value}))}
                            onSlidingComplete={(value)=>(this.props.changeFeeRequest({jwt: this.props.jwt, changedRate: value}))}/>

                        <View style={styles.body_5_Container}>
                            <Text style={styles.sliderText_12}>
                                    1%
                            </Text>
                            <Text style={styles.sliderText_12}>
                                    2%
                            </Text>
                            <Text style={styles.sliderText_12}>
                                    3%
                            </Text>
                        </View>

                    </View>
                    
                    {/* <View style={styles.buttonContainer}>
                        <View style={styles.buttonDetailContainer}>
                            <Text style={styles.buttonText}>
                                KYC 인증
                            </Text>
                        </View>
                    </View> */}
                    <TouchableOpacity 
                        style={styles.buttonContainer}
                        onPress={()=>navigation.navigate('AddReferrer')}
                        disabled={!this.props.MyInfo.referrer ? false : true}
                        >
                        <View style={styles.buttonDetailContainer}>
                            <Text style={styles.buttonText}>
                                {/* 추천인 아이디 */}
                                {I18n.t('translation.myinfo.text_9')}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonDetailContainer}>
                            <Text style={styles.buttonText}>
                                {/* Push 알림 */}
                                {I18n.t('translation.myinfo.text_10')}
                            </Text>
                            <Text style={styles.buttonBlueText}>
                                on
                            </Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonDetailContainer}>
                            <Text style={styles.buttonText}>
                                {/* KYC 인증 */}
                                {I18n.t('translation.myinfo.text_11')}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={styles.buttonDetailContainer}
                            onPress={()=>this.toggleLang()}>
                            <Text style={styles.buttonText}>
                                {/* 언어설정 */}
                                {I18n.t('translation.myinfo.text_12')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonDetailContainer}>
                                <Text style={styles.buttonText}>
                                    {/* 고객센터*/}
                                    {I18n.t('translation.myinfo.text_13')}
                                </Text>
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <View style={styles.buttonDetailContainer}>
                                <Text style={styles.buttonText}>
                                    {/* 버전정보 */}
                                    {I18n.t('translation.myinfo.text_14')}                        
                                </Text>
                        </View>
                    </View>
                    <View style={styles.logoutContainer}>
                        <TouchableOpacity 
                           
                            onPress={()=>{
                                this.props.logout()
                                navigation.navigate('Login')
                            }}>
                            {/* 로그아웃 */}
                            <Text style={styles.logoutText}>
                                {I18n.t('translation.myinfo.text_15')}
                            </Text>
                        
                        </TouchableOpacity>
                    </View>

                   
                </ScrollView>

                <Modal
                        isVisible={this.state.selectLangVisible}
                        // useNativeDriver={true}
                        hideModalContentWhileAnimating={false}
                        style={{alignItems: 'center'}}
                    >
                        <View
                            style={{width:250, height:300, alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 20,}}>
                        
                            <Text
                                style={{fontSize: 16, height: 20, marginBottom: 43, marginTop: 36}}>
                                {/* 언어 선택 */}
                                {I18n.t('translation.myinfo.text_17')}
                            </Text>
                    
                            
                            <View style={{width: '60%', height: 100, flexDirection: 'column', justifyContent:'space-between' }}>
                                <View style={{flexDirection: 'row' , alignItems: 'center'}}>
                                    <RadioButton.Android
                                            // value="한국어"
                                            status={this.props.lang === 1 ? 'checked' : 'unchecked'}
                                            onPress={()=>this.toggleKor()}
                                            color ={this.props.lang===1 ? '#0090ff': '#2C2C2E' }
                                            
                                        /> 
                                    <Text style={{color : this.props.lang===1 ? '#0090ff': '#2C2C2E' }}>
                                        {/* 한국어 */}
                                        {I18n.t('translation.myinfo.text_18')}
                                    </Text>
                                </View>
                                <View style={{flexDirection: 'row' , alignItems: 'center'}}>
                                    <RadioButton.Android
                                            // value="Eng"
                                            status={this.props.lang === 2 ? 'checked' : 'unchecked'}
                                            onPress={()=>this.toggleEng()}
                                            color ={this.props.lang===2 ? '#0090ff': '#2C2C2E' }
                                        />
                                    <Text style={{color : this.props.lang===2 ? '#0090ff': '#2C2C2E'  }}>
                                        {/* 영어 */}
                                        {I18n.t('translation.myinfo.text_19')}
                                    </Text>
                                </View>
                                    
                            </View>
                            <View style={{width: '70%', height: 1, marginTop: 30, backgroundColor: '#E5E5EA'}}/>
                            <TouchableOpacity 
                                style={{marginTop: 20}}
                                onPress={()=>this.toggleLang()}>
                                    <Text style={{fontSize: 16, color: '#0090FF'}}>
                                        {/* 확인 */}
                                        {I18n.t('translation.myinfo.text_20')}
                                    </Text>
                                
                            </TouchableOpacity>
                        </View>

                    </Modal>
               

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
        flexDirection: 'row',
        marginTop: 65,
        width: '90%',
        height: 35.5,
        alignItems: 'center',
        justifyContent:'space-between',
        marginBottom: 19.5,
    },
    scrollView:{
        width: '100%',
    },
    bodyContainer:{
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
    },
    myInfoText:{
        fontSize: 24,
        color: '#000000',
        fontWeight:'500',
    },
    alarmIcon:{
        width: 16.5,
        height: 18,
        resizeMode: 'cover'  
    },
    lineStyle_100:{
        backgroundColor: '#e8e8e8',
        height:1,
        width:'100%',
    },
    body_1_Container:{
        flexDirection: 'row',
        marginTop: 41,
        width: '70%',
        height : 27,
        justifyContent: 'space-between', 
        alignItems: 'center',   
    }, 
    idText:{
        fontSize: 18,
        color: '#000000',
        fontWeight:'500',
    },
    infoTextSize_12 : {
        fontSize: 12,
        color: '#b4b4b4',
    },
    infoTextGrayColor : {
        color: '#b4b4b4',
    },
    infoTextGray_2_Color: {
        color: '#717171',
    },
    infoTextBlackColor : {
        color : '#000000',
    },
    body_2_Container:{
        flexDirection: 'row',
        marginTop: 27,
        marginBottom: 22,
        width: '80%',
        height : 30,
        justifyContent: 'space-between', 
        alignItems: 'center',
        paddingLeft: '10%',
        paddingRight: '10%', 
        borderRadius: 10,
        backgroundColor: '#f6f6f6',
    },
    lineStyle_86:{
        backgroundColor: '#e8e8e8',
        height:1,
        width:'86%',
    },
    body_3_Container:{
        flexDirection: 'row',
        marginTop: 27,
        width: '70%',
        height : 75,
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 17,
    },
    item_1_Container:{
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: 46,
        height: 75,
    },
    icon_1: {
        width: 40,
        height: 40,
        resizeMode: 'cover',
    },
    lineStyle_100_Thick:{
        backgroundColor: '#f5f7f8',
        height:10,
        width:'100%',
    },
    body_4_Container: {
        flexDirection: 'row',
        marginTop: 24,
        width: '90%',
        height : 27,
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 19,
    },
    item_2_Container:{
        width : 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    text_32: {
        fontSize: 16,
        color: '#000000',
    },
    text_Blue_Bold_18: {
        fontSize: 18,
        color: '#0090ff',
        fontWeight: 'bold',
    },
    slider:{
        width: '90%', 
        height: 19,
    },
    body_5_Container:{
        flexDirection: 'row',
        marginTop: 12,
        width: '90%',
        height : 18,
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: 18,
    },
    sliderText_12:{
        fontSize: 12,
        color: '#b8b8b8',
    },
    buttonContainer:{
        width: '100%',
        borderColor: '#e8e8e8',
        borderWidth: 1,
        flexDirection: 'column',
        alignItems: 'center',
    },
    buttonDetailContainer:{
        width: '80%',
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    buttonText: {
        fontSize: 14,
        color: '#5e5e5e',
    },
    buttonBlueText: {
        fontSize: 16,
        color: '#0090ff',
    },
    logoutContainer:{
        width: '100%',
        height: 60,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f5f7f8',
    },
    logoutText:{
        paddingTop: 11,
        fontSize: 14,
        color: '#c2c2c2',
    },

    
});

const mapStateToProps = (state) => ({
    MyInfo : state.MyinfoStore.myInfoData,
    jwt: state.AuthStore.jwt,
    lang : state.AuthStore.lang,
});

const mapDispatchToProps = (dispatch) => ({
    myinfoRequest : (values) => dispatch(myinfoActions.myinfoRequest(values)),
    changeFeeRequest: (values) => dispatch(myinfoActions.changeFeeRequest(values)),
    logout : () => dispatch(myAuthActions.logout()),
    setLang : (value) => dispatch(myAuthActions.setLang(value)),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(MyinfoScreen);

export default connected;