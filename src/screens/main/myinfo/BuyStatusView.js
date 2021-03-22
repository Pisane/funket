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

import Slider from '@react-native-community/slider';
import Clipboard from '@react-native-community/clipboard';


import {SubHeader} from '../../../components/index';
import I18n from '../../../i18n/index';

import {connect} from 'react-redux';

import * as buyProgressActions from '../../../modules/myinfo/buyProgress/buyProgress_store';

import {numberWithCommas} from '../../../util/comma';


/*
    MyInfo.id
    전 뷰에서 네비게이션의 매개변수로 넘어온 구매 현황 seq
*/

class BuyStatusScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            buy_Seq : null,
            txid : '',
        }
        //let seq = JSON.stringify(this.props.navigation.getParam('seq', 0));
    }

    componentDidMount (){
        //구매현황 view에서 넘어온 seq 매개변수 받기
        this.focusListener = this.props.navigation.addListener("focus", () => {
    
            let _seq = this.props.route.params.seq;
           
            this.setState({buy_Seq:_seq});
            this.props.buyProgressRequest({jwt: this.props.jwt, seq: _seq, lang: this.props.lang});
        
          }); 
          
       
        //this.props.buyTradingRequest(this.props.MyInfo.id);
        
        //만약에 해당 구매건을 취소하였다면 구매현황으로 보낸다
       
    }

    componentDidUpdate(){
        if(this.props.BuyProgress.txidResult === 1){
            //txid 입력 성공
            Alert.alert(
                // 'txid 확인 성공',
                I18n.t('translation.buystatus.text_19'), 
                // 'txid 확인이 완료되어 진행중인 구매건이 완료되었습니다.', 
                I18n.t('translation.buystatus.text_20'),
                [
                    {text: I18n.t('translation.buystatus.text_21'), onPress: () => {
                    this.props.navigation.navigate('Trading')}
                    },
                ],
                { cancelable: false });

        }else if(this.props.BuyProgress.txidResult ===2){
            //txid 입력 실패
            Alert.alert(
                // 'txid 확인 실패', 
                I18n.t('translation.buystatus.text_22'),
                // '입력하신 txid가 확인되지 않습니다. 다시 한번 요청해주세요'
                I18n.t('translation.buystatus.text_23')
            );
            this.props.insertTxidReset();
            
        }
    }

    _cancelBuyAlert(){
        Alert.alert(
            // '구매신청 취소 안내'
            I18n.t('translation.buystatus.text_15'),
            // '구매신청을 취소해도 계약금으로 \n 사용된 마일리지는 환불되지 않습니다. \n\n 구매를 취소하시겠습니까? '
            I18n.t('translation.buystatus.text_16'),
            [
                {text: I18n.t('translation.buystatus.text_17'), onPress : () => this.props.cancelBuyRequest({seq: this.state.buy_Seq, jwt: this.props.jwt}) },  //구매취소 
                {text: I18n.t('translation.buystatus.text_18'), style: "cancel"} //아니오
            ],
            {cancelable: true}
        )
    }
    copyToClipboard = () => {
        Clipboard.setString(this.props.BuyProgress.BuyProgressInfo.sellerWallet)
        Alert.alert(
            I18n.t('translation.copied'),
            this.props.BuyProgress.BuyProgressInfo.sellerWallet,

        )

    }
    
    render(){
        const { navigation } = this.props;

        // if(this.props.BuyProgress.cancelResult=== true){
            
        //     this.props.cancelBuyReset();
        //     this.props.navigation.navigate('Trading');
            
        // }

     

        return (
            this.props.BuyProgress.cancelResult === true ?
            <CancelComplete
                name={this.props.BuyProgress.BuyProgressInfo.name}
                count={this.props.BuyProgress.BuyProgressInfo.count}
                perPrice = {this.props.BuyProgress.BuyProgressInfo.perPrice}
                perDownPayment = {this.props.BuyProgress.BuyProgressInfo.perDownPayment}
                sellerWallet = {this.props.BuyProgress.BuyProgressInfo.sellerWallet}
                totalPrice = {this.props.BuyProgress.BuyProgressInfo.totalPrice}
                totalPayPrice = {this.props.BuyProgress.BuyProgressInfo.totalPayPrice}
                navigation = {navigation}
                />:
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
                                구매 현황
                            </Text>
                        </View >
                        <View style={styles.headerDivineRight}/>

                    </View>
                </View> */}

                <SubHeader
                    // title='구매 현황'
                    title={I18n.t('translation.buystatus.text_1')}
                    mode='back'
                    onPress={()=> navigation.goBack()}/>

                <View style={styles.bodyContainer}>
                    <View style={styles.buyInfoContainer}>
                        <View style={styles.buyInfo_1_Container}>
                            <Text style={styles.buyInfo_1_Text_1}>
                                {this.props.BuyProgress.BuyProgressInfo.name}
                            </Text>
                            <Text style={styles.buyInfo_1_Text_2}>
                                    {/* txid를 입력하세요 */}
                                    {I18n.t('translation.buystatus.text_2')}
                            </Text>
                        </View>
                        <View style={styles.buyInfo_2_Container}>
                            <View style={styles.buyInfo_2_Inner_Left_Container}>
                                <Text style={styles.buyInfo_2_Inner_Left_Text_1}>
                                    {/* {'구매수량 '+ this.props.BuyProgress.BuyProgressInfo.count +' 장'} */}
                                    {I18n.t('translation.buystatus.text_3',{count:this.props.BuyProgress.BuyProgressInfo.count})}
                                </Text>
                                <Text style={styles.buyInfo_2_Inner_Left_Text_2}>
                                    {/* {
                                        this.props.BuyProgress.BuyProgressInfo.count*
                                        (this.props.BuyProgress.BuyProgressInfo.perPrice)
                                        +' USDT'
                                    } */}
                                    {
                                        I18n.t('translation.buystatus.text_4',
                                            {totalPrice: numberWithCommas(this.props.BuyProgress.BuyProgressInfo.totalPrice)})
                                    }
                                </Text>
                            </View>
                            <View style={styles.buyInfo_2_Inner_Right_Container}>
                                <View style={[styles.buyInfo_2_Inner_Right_Detail_Container,
                                    {marginTop: 12}]}>
                                    <Text style={[styles.buyInfo_2_Inner_Right_Text,{color:'#717171'}]}>
                                        {/* 계약금(장당) */}
                                        {I18n.t('translation.buystatus.text_5')}
                                    </Text>
                                    <Text style={styles.buyInfo_2_Inner_Right_Text}>
                                        {/* {this.props.BuyProgress.BuyProgressInfo.perDownPayment+'G'} */}
                                        {I18n.t('translation.buystatus.text_6',{perDownPayment:numberWithCommas(this.props.BuyProgress.BuyProgressInfo.perDownPayment)})}
                                    </Text>
                                </View>
                                <View style={[styles.buyInfo_2_Inner_Right_Detail_Container,
                                    {marginTop: 4}]}>
                                    <Text style={[styles.buyInfo_2_Inner_Right_Text,{color:'#717171'}]}>
                                        {/* 장당가격 */}
                                        {I18n.t('translation.buystatus.text_7')}
                                    </Text>
                                    <Text style={styles.buyInfo_2_Inner_Right_Text}>
                                        {/* {this.props.BuyProgress.BuyProgressInfo.perPrice+' USDT'} */}
                                        {I18n.t('translation.buystatus.text_8',{perPrice: numberWithCommas(this.props.BuyProgress.BuyProgressInfo.perPrice)})}
                                    </Text>
                                </View>
                            </View>

                        </View>
                    </View>
                    {/* <View style={styles.buyProgressContainer}>
                        <View style={styles.buyProgressTitleContainer}>
                            <Text style={styles.buyProressTitle}>
                                구매 진행 상황
                            </Text>
                        </View>
                        <Slider
                            style={styles.slider}
                            thumbTintColor="#0090ff"
                            minimumValue={1}
                            maximumValue={3}
                            value={2}
                            step={1}
                            disabled='true'
                            minimumTrackTintColor="#0090ff"
                            maximumTrackTintColor="#b4b4b4"
                            />
                        <View style={styles.sliderTextContainer}>
                            <Text style={styles.sliderText}>
                                구매신청
                            </Text>
                            <Text style={styles.sliderText}>
                                TXID 입력
                            </Text>
                            <Text style={styles.sliderText}>
                                구매완료
                            </Text>
                        </View>

                    </View> */}
                    <View style={styles.sellerInfoContainer}>
                        <View style={styles.sellerTitleCotainer}>
                            <View style={styles.sellerTitleLeftContainer}>
                                <Image
                                    source = {require('../../../../assets/images/icons/icon_Avatar.png')}
                                    style={styles.sellerTitleImage}/>
                                <Text style={styles.sellerTitleText}>
                                    {this.props.BuyProgress.BuyProgressInfo.sellerID}
                                </Text>
                            </View>
                            <View style={styles.chatButton}>
                                <Text style={styles.chatText}>
                                    {/* 채팅하기 */}
                                    {I18n.t('translation.buystatus.text_9')}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.sellerWalletContainer}>
                            <Text style={styles.sellerWalletTitle}>
                                {/* 판매자 지갑 주소 */}
                                {I18n.t('translation.buystatus.text_10')}
                            </Text>
                            <View style={styles.sellerWalletAddrContainer}>
                                <View style={styles.sellerWalletAddrInnerContainer}>
                                    <Text
                                        ellipsizeMode='tail' numberOfLines={1} 
                                        style={[styles.sellerWalletAddrText,{width: '85%',fontSize:14}]}>
                                        {this.props.BuyProgress.BuyProgressInfo.sellerWallet}
                                    </Text>

                                    <TouchableOpacity
                                        onPress={() => this.copyToClipboard()}>
                                         <Text style={{color: '#AEAEB2', fontSize:12}}>
                                            {/* 복사 */}
                                            {I18n.t('translation.buystatus.text_11')}
                                        </Text>
                                    </TouchableOpacity>

                                   
                                </View>                                
                            </View>
                        </View>

                    </View>
                    <View style={styles.txidCotainer}>
                        <View style={styles.txid_Top_Container}>
                            <Text style={styles.txidTitle}>
                                TXID
                            </Text>
                            

                            <View style={styles.txid_Top_Inner_Container}>
                                <View style={styles.txid_Input_Container}>
                                    <TextInput 
                                        style={styles.txidInputText}
                                        onChangeText={(txid)=> this.setState({txid})}
                                        // placeholder='TXID를 입력하세요.'
                                        placeholder={I18n.t('translation.buystatus.text_12')}
                                    >
                                    </TextInput>
                                </View>
                                <TouchableOpacity 
                                    style={styles.txidCheckImage}
                                    onPress={()=>this.props.insertTxidRequest({seq: this.state.buy_Seq, jwt: this.props.jwt, txid: this.state.txid})}>
                                    <Image 
                                        style={{width: 18, height: 14}}
                                        source = {require('../../../../assets/images/icons/icon_Check.png')}
                                        resizeMode="center"
                                    />
                                </TouchableOpacity>
                            </View> 
                                
                            <Text style={styles.txidCheckText}>
                                {/* TXID가 확인되면 자동으로 판매로 넘어가게 됩니다. */}
                                {I18n.t('translation.buystatus.text_13')}
                            </Text>
                            
                        </View>
                        
                      
                        <TouchableOpacity onPress={()=>this._cancelBuyAlert()}>
                            <Text style={styles.buyCancelText}>
                                {/* 구매 취소하기 */}
                                {I18n.t('translation.buystatus.text_14')}
                            </Text>
                        </TouchableOpacity>
                            
   
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
        height: 120,
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e8',
        backgroundColor: '#fff'
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
        width: '100%',
       
    },

    
    buyInfoContainer:{
        width: '100%',
        height: 135,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        borderBottomColor: '#e8e8e8',
        borderBottomWidth: 1,
    },
    buyInfo_1_Container:{
        height : 30,
        width : '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    buyInfo_1_Text_1:{
        fontSize: 24,
        fontWeight: 'bold',
    },
    buyInfo_1_Text_2:{
        fontSize: 14,
        color: '#0090ff',
    },
    buyInfo_2_Container:{
        height : 88,
        width : '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    buyInfo_2_Inner_Left_Container:{
        width: '40%',
        flexDirection: 'column',
    },
    buyInfo_2_Inner_Left_Text_1:{
        fontSize: 12,
    },
    buyInfo_2_Inner_Left_Text_2:{
        fontSize: 18,
        marginTop: 7,
        color: '#0090ff',
    },

    buyInfo_2_Inner_Right_Container:{
        width: '40%',
        flexDirection: 'column',
        alignItems:'flex-end',
    }, 
    buyInfo_2_Inner_Right_Detail_Container:{
        width:'100%',
        flexDirection: 'row',
        height: 16,
        justifyContent:'space-between',

    }, 
    buyInfo_2_Inner_Right_Text:{
        fontSize: 12,
    },
    slider:{
        marginTop: 10,
        width: '90%', 
        height: 4,
        
    },
    sliderThumb:{
        width: 14,
        height: 14,
        backgroundColor:'#0090ff',
    },

    buyProgressContainer:{
        width: '100%',
        height: 117,
        flexDirection:'column',
        alignItems:'center',
        backgroundColor: '#ffffff',
        borderBottomColor: '#e8e8e8',
        borderBottomWidth: 1,

    },
    buyProgressTitleContainer:{
        height: 15,
        width: '90%',
        marginTop: 23,
        marginBottom: 22,
    },
    buyProressTitle:{
        fontSize: 12,
    },
    slider:{
        width: '70%', 
        height: 4,     
    },
    sliderTextContainer:{
        height: 13,
        width: '74%',
        marginTop: 14,
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    sliderText:{
        fontSize: 10,
        color: '#0090ff',
    },

    sellerInfoContainer:{
        width:'100%',
        height: 172,
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        marginTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#e8e8e8',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e2e2',

    },
    sellerTitleCotainer:{
        width: '90%',
        height: 40,
        flexDirection: 'row',
        justifyContent:'space-between',
        marginTop: 20,
    },
    sellerTitleLeftContainer:{
        width: '50%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    sellerTitleImage:{
        width: 40,
        height: 40,
        resizeMode: 'cover',
    },
    sellerTitleText: {
        // marginLeft: 15,
        marginLeft: '3.8%',
        fontSize: 16,
    },
    chatButton:{
        width: 72,
        height: 35,
        borderRadius: 10,
        backgroundColor: '#0090ff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatText:{
        fontSize: 14,
        color:'#ffffff',
    },
    sellerWalletContainer:{
        flexDirection: 'column',
        width: '90%',
        height: 57,
        marginTop: 33.5,
    },
    sellerWalletTitle:{
        fontSize: 14,
        marginBottom: 10.5,
    },
    sellerWalletAddrContainer:{
        width: '100%',
        height: 30,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#e8e8e8',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f5f7f8'
    },
    sellerWalletAddrInnerContainer:{
        width: '90%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sellerWalletAddrText:{
        color: '#b4b4b4',
    },
    txidCotainer:{
        flex: 1,
        width: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    txid_Top_Container:{
        width: '90%',
        height: 75.5,
        marginTop: 25,
        flexDirection: 'column',
        justifyContent: 'space-between',
       
        
    },
    txidTitle:{
        fontSize: 14,
    },
    txid_Top_Inner_Container:{
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    txid_Input_Container:{
        width: 300,
        height : '100%',
        backgroundColor: '#f5f7f8',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 20,
        borderColor: '#e8e8e8',
        borderRadius: 10,
        borderWidth: 1,
    },
    txidInputText: {
        fontSize : 14,
        color: '#b4b4b4'
        
    },
    txidCheckImage:{
        width: 50,
        height: 50,
        backgroundColor: '#0090FF',
        borderRadius: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },

    txid_Complete_Container:{
        width: '100%',
        height : '100%',
        backgroundColor: '#f2f2f7',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: 8,
        paddingLeft: 12,
        paddingRight: 19,
    },
    txidCompleteText: {
        fontSize : 18,
        color: '#636366'
        
    },
    CompleteText: {
        fontSize : 13,
        color: '#aeaeb8'
        
    },

    txidCheckText:{
        fontSize : 11,
        color: '#aeaeb8',
        marginTop: 7,
    },

    buyCancelText: {
        marginBottom : 20.5,
        fontSize: 14,
        color: '#b4b4b4',
    },

});

const mapStateToProps = (state) => ({
    MyInfo : state.MyinfoStore.myInfoData,
    BuyProgress : state.BuyProgressStore,
    jwt : state.AuthStore.jwt,
    lang : state.AuthStore.lang,
});

const mapDispatchToProps = (dispatch) => ({
    buyProgressRequest : (values) => dispatch(buyProgressActions.buyProgressRequest(values)),
    
    insertTxidRequest : (values) => dispatch(buyProgressActions.insertTxidRequest(values)),
    insertTxidReset : () => dispatch(buyProgressActions.insertTxidReset()),

    cancelBuyRequest : (values) => dispatch(buyProgressActions.cancelBuyRequest(values)),
    cancelBuyReset : () => dispatch(buyProgressActions.cancelBuyReset()),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(BuyStatusScreen);

export default connected;

class CancelComplete extends React.PureComponent{
    render() {
        return (
            <View style={{
                flex: 1,
                alignItems: 'flex-start',
                backgroundColor: '#ffffff',
                flexDirection: 'column',

            }}>
                <Text style={
                    {
                        fontSize: 24,
                        marginTop: '30%',
                        marginLeft: '10%',

                    }
                }>
                    {/* 구매 신청 취소 완료 */}
                    {I18n.t('translation.buystatus.text_24')}
                </Text>
                <View style={
                    {
                        width: '100%',
                        height: 20, 
                        marginTop: 20,
                        flexDirection: 'row',

                    }}>
                    <Text style={
                            {
                                fontSize: 14,
                                marginLeft: '10%',
                                color: '#636366',

                            }
                        }>
                        {/* 게약금으로 사용된 */}
                        {I18n.t('translation.buystatus.text_25')}
                    </Text>
                    <Text style={
                            {
                                fontSize: 14,
                                marginLeft: 2,
                                color: '#FF6600',

                            }
                        }>
                        {/* 마일리지는 환불되지 않습니다. */}
                        {I18n.t('translation.buystatus.text_26')}
                    </Text>
                </View>

                <Text style={
                    {
                        marginTop : 165,
                        fontSize: 16,
                        marginLeft: '10%',

                    }}>
                    {/* 구매 정보 */}
                    {I18n.t('translation.buystatus.text_27')}
                </Text>
                <View style={{
                        marginTop: 12,
                        marginLeft: '5%',
                        marginBottom: 4,
                        height: 1,
                        backgroundColor: '#E8E8E8',
                        width: '85%',
                    }}>

                </View>
                <View style={{
                        marginTop: 7,
                        marginLeft: '10%',
                        width : '80%',
                        height: 20,
                        flexDirection: 'row',

                    }}>
                    <Text style={{
                            width:71,
                            marginRight: 34,
                            fontSize: 13,
                            color: '#636366',
                        }}>
                        {/* 상품명 */}
                        {I18n.t('translation.buystatus.text_28')}
                    </Text>
                    <Text style={{
                            fontSize: 13,
                            color: '#2C2C2E',
                        }}>
                        {this.props.name}
                    </Text>

                </View>
                <View style={{
                        marginTop: 7,
                        marginLeft: '10%',
                        width : '80%',
                        height: 20,
                        flexDirection: 'row',

                    }}>
                    <Text style={{
                            width:71,
                            marginRight: 34,
                            fontSize: 13,
                            color: '#636366',
                        }}>
                        {/* 구매수량 */}
                        {I18n.t('translation.buystatus.text_29')}
                    </Text>
                    <Text style={{
                            fontSize: 13,
                            color: '#2C2C2E',
                        }}>
                        {/* {this.props.count+' 장'} */}
                        {I18n.t('translation.buystatus.text_30',{count: this.props.count})}
                    </Text>

                </View>
                <View style={{
                        marginTop: 7,
                        marginLeft: '10%',
                        width : '80%',
                        height: 20,
                        flexDirection: 'row',

                    }}>
                    <Text style={{
                            width:71,
                            marginRight: 34,
                            fontSize: 13,
                            color: '#636366',
                        }}>
                        {/* 가격 */}
                        {I18n.t('translation.buystatus.text_31')}
                    </Text>
                    <Text style={{
                            fontSize: 13,
                            color: '#2C2C2E',
                        }}>
                        {numberWithCommas(this.props.totalPrice)+' USDT'}
                    </Text>

                </View>
                <View style={{
                        marginTop: 7,
                        marginLeft: '10%',
                        width : '80%',
                        height: 20,
                        flexDirection: 'row',

                    }}>
                    <Text style={{
                            width:71,
                            marginRight: 34,
                            fontSize: 13,
                            color: '#636366',
                        }}>
                        {/* 계약금 */}
                        {I18n.t('translation.buystatus.text_32')}
                    </Text>
                    <Text style={{
                            fontSize: 13,
                            color: '#2C2C2E',
                        }}>
                        {/* {this.props.perDownPayment*this.props.count+' G(환불되지 않음)'} */}
                        {I18n.t('translation.buystatus.text_33', {totalDownPayment: this.props.totalPayPrice})}
                    </Text>

                </View>
                <View style={{
                        marginTop: 7,
                        marginLeft: '10%',
                        width : '80%',
                        height: 20,
                        flexDirection: 'row',

                    }}>
                    <Text style={{
                            width:71,
                            marginRight: 34,
                            fontSize: 13,
                            color: '#636366',
                        }}>
                        {/* 판매자 주소 */}
                        {I18n.t('translation.buystatus.text_34')}
                    </Text>
                    <Text style={{
                            fontSize: 13,
                            color: '#2C2C2E',
                        }}>
                        {this.props.sellerWallet}
                    </Text>

                </View>

                <TouchableOpacity 
                    style={{
                        marginTop:99,
                        borderRadius: 10,
                        width: '90%',
                        height: 51,
                        marginLeft: '5%',
                        backgroundColor: '#FF6600',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: 28,
                        

                    }}
                    onPress={()=>this.props.navigation.navigate('Trading')}>
                    <Text style={{
                             fontSize: 18,
                             color: '#ffffff',
                        }}>
                            {/* 구매현황 확인하기 */}
                            {I18n.t('translation.buystatus.text_35')}
                    </Text>
                </TouchableOpacity>

               
            </View>
        );
    }
}