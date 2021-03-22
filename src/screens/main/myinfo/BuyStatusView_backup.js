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
} from 'react-native';

import Slider from '@react-native-community/slider';

import {connect} from 'react-redux';

import * as buyProgressActions from '../../../modules/myinfo/buyProgress/buyProgress_store';

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
        
        console.log('전 뷰에서 넘어온 매개변수 : '+this.props.route.params.seq);
    }

    componentDidMount (){
        //구매현황 view에서 넘어온 seq 매개변수 받기
        
        this.setState({buy_Seq:this.props.route.params.seq});

        this.props.buyProgressRequest({seq: this.state.buy_Seq});
        //this.props.buyTradingRequest(this.props.MyInfo.id);
        
        //만약에 해당 구매건을 취소하였다면 구매현황으로 보낸다
       
    }

    render(){
        const { navigation } = this.props;

        if(this.props.BuyProgress.cancelResult=== true){
            this.props.cancelBuyReset();
            this.props.navigation.navigate('Trading');
            
        }
        return (
            <View style={styles.rootContainer}>
                <View style = {styles.headerContainer}>
                    <View style = {styles.headerDetailContainer}>
                        <TouchableOpacity 
                            style={styles.headerDivineLeft}
                            onPress={()=>navigation.navigate('Trading')}>
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
                </View>
               

                <View style={styles.bodyContainer}>
                    <View style={styles.buyInfoContainer}>
                        <View style={styles.buyInfo_1_Container}>
                            <Text style={styles.buyInfo_1_Text_1}>
                                {this.props.BuyProgress.BuyProgressInfo.name}
                            </Text>
                            <Text style={styles.buyInfo_1_Text_2}>
                                {
                                    this.props.BuyProgress.BuyProgressInfo.status === 1 ?
                                    'txid를 입력하세요' :
                                    'txid를 확인 중입니다'
                                } 
                            </Text>
                        </View>
                        <View style={styles.buyInfo_2_Container}>
                            <View style={styles.buyInfo_2_Inner_Left_Container}>
                                <Text style={styles.buyInfo_2_Inner_Left_Text_1}>
                                    {'구매수량 '+ this.props.BuyProgress.BuyProgressInfo.count +' 장'}
                                </Text>
                                <Text style={styles.buyInfo_2_Inner_Left_Text_2}>
                                    {
                                        this.props.BuyProgress.BuyProgressInfo.count*
                                        (this.props.BuyProgress.BuyProgressInfo.perPrice+this.props.BuyProgress.BuyProgressInfo.perDownPayment)
                                        +' USDT'
                                    }
                                </Text>
                            </View>
                            <View style={styles.buyInfo_2_Inner_Right_Container}>
                                <View style={[styles.buyInfo_2_Inner_Right_Detail_Container,
                                    {marginTop: 12}]}>
                                    <Text style={[styles.buyInfo_2_Inner_Right_Text,{color:'#717171'}]}>
                                        계약금(장당)
                                    </Text>
                                    <Text style={styles.buyInfo_2_Inner_Right_Text}>
                                        {this.props.BuyProgress.BuyProgressInfo.perDownPayment+'G'}
                                    </Text>
                                </View>
                                <View style={[styles.buyInfo_2_Inner_Right_Detail_Container,
                                    {marginTop: 4}]}>
                                    <Text style={[styles.buyInfo_2_Inner_Right_Text,{color:'#717171'}]}>
                                        장당가격
                                    </Text>
                                    <Text style={styles.buyInfo_2_Inner_Right_Text}>
                                        {this.props.BuyProgress.BuyProgressInfo.perPrice+' USDT'}
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
                                    source = {require('../../../../assets/images/avatar.png')}
                                    style={styles.sellerTitleImage}/>
                                <Text style={styles.sellerTitleText}>
                                    {this.props.BuyProgress.BuyProgressInfo.sellerID}
                                </Text>
                            </View>
                            <View style={styles.chatButton}>
                                <Text style={styles.chatText}>
                                    채팅하기
                                </Text>
                            </View>
                        </View>
                        <View style={styles.sellerWalletContainer}>
                            <Text style={styles.sellerWalletTitle}>
                                판매자 지갑 주소
                            </Text>
                            <View style={styles.sellerWalletAddrContainer}>
                                <View style={styles.sellerWalletAddrInnerContainer}>
                                    <Text style={[styles.sellerWalletAddrText,{fontSize:14}]}>
                                        {this.props.BuyProgress.BuyProgressInfo.sellerWallet}
                                    </Text>
                                    <Text style={[styles.sellerWalletAddrText,{fontSize:12}]}>
                                        복사
                                    </Text>
                                </View>                                
                            </View>
                        </View>

                    </View>
                    <View style={styles.txidCotainer}>
                        <View style={styles.txid_Top_Container}>
                            <Text style={styles.txidTitle}>
                                TXID
                            </Text>
                            {
                                this.props.BuyProgress.txidResult === false ?
                                <View style={styles.txid_Top_Inner_Container}>
                                    <View style={styles.txid_Input_Container}>
                                        <TextInput 
                                            style={styles.txidInputText}
                                            onChangeText={(txid)=> this.setState({txid})}
                                            placeholder='TXID를 입력하세요.'>
                                        </TextInput>
                                    </View>
                                    <TouchableOpacity onPress={()=>this.props.insertTxidRequest({seq: this.state.buy_Seq, id: this.props.MyInfo.id, txid: this.state.txid})}>
                                        <Image 
                                            style={styles.txidCheckImage}
                                            source = {require('../../../../assets/images/avatar.png')}
                                        />
                                    </TouchableOpacity>
                                </View> 
                                :
                                <View style={styles.txid_Top_Inner_Container}>
                                    <View style={styles.txid_Complete_Container}>
                                        <Text style={styles.txidCompleteText}>
                                            {this.props.BuyProgress.BuyProgressInfo.txid}
                                        </Text>
                                        <Text style={styles.CompleteText}>
                                            입력완료
                                        </Text>
                                    </View>
                                </View>
                            }
                            <Text style={styles.txidCheckText}>
                                TXID가 확인되면 자동으로 판매로 넘어가게 됩니다.
                            </Text>
                            
                        </View>
                        
                        {
                            this.props.BuyProgress.cancelResult === false?
                            <TouchableOpacity onPress={()=>this.props.cancelBuyRequest({seq: this.state.buy_Seq, id: this.props.MyInfo.id})}>
                                <Text style={styles.buyCancelText}>
                                    구매 취소하기
                                </Text>
                            </TouchableOpacity>
                            :
                            <View></View>
                        }
   
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
        fontFamily: 'NotoSansKR-Regular',
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
        fontFamily: 'NotoSansKR-Regular',
        fontSize: 24,
        fontWeight: 'bold',
    },
    buyInfo_1_Text_2:{
        fontFamily: 'NotoSansKR-Regular',
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
        fontFamily: 'NotoSansKR-Regular',
        fontSize: 12,
    },
    buyInfo_2_Inner_Left_Text_2:{
        fontFamily: 'NotoSansKR-Regular',
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
        fontFamily: 'NotoSansKR-Regular',
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
        fontFamily: 'NotoSansKR-Regular',
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
        fontFamily: 'NotoSansKR-Regular',
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
        marginLeft: 15,
        fontSize: 16,
        fontFamily: 'NotoSansKR-Regular',
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
        fontFamily: 'NotoSansKR-Regular',
    },
    sellerWalletContainer:{
        flexDirection: 'column',
        width: '90%',
        height: 57,
        marginTop: 33.5,
    },
    sellerWalletTitle:{
        fontSize: 14,
        fontFamily: 'NotoSansKR-Regular',
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
        fontFamily: 'NotoSansKR-Regular',
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
        fontFamily: 'NotoSansKR-Regular',
    },
    txid_Top_Inner_Container:{
        width: '100%',
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
    },
    txid_Input_Container:{
        width: 280,
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
        fontFamily: 'NotoSansKR-Regular',
        color: '#b4b4b4'
        
    },
    txidCheckImage:{
        width: 50,
        height: 50,
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
        fontFamily: 'NotoSansKR-Regular',
        color: '#636366'
        
    },
    CompleteText: {
        fontSize : 13,
        fontFamily: 'NotoSansKR-Regular',
        color: '#aeaeb8'
        
    },

    txidCheckText:{
        fontSize : 11,
        fontFamily: 'NotoSansKR-Regular',
        color: '#aeaeb8',
        marginTop: 7,
    },

    buyCancelText: {
        marginBottom : 20.5,
        fontSize: 14,
        color: '#b4b4b4',
        fontFamily: 'NotoSansKR-Regular',
    },

});

const mapStateToProps = (state) => ({
    MyInfo : state.MyinfoStore.myInfoData,
    BuyProgress : state.BuyProgressStore,
});

const mapDispatchToProps = (dispatch) => ({
    buyProgressRequest : (values) => dispatch(buyProgressActions.buyProgressRequest(values)),
    insertTxidRequest : (values) => dispatch(buyProgressActions.insertTxidRequest(values)),
    cancelBuyRequest : (values) => dispatch(buyProgressActions.cancelBuyRequest(values)),
    cancelBuyReset : (values) => dispatch(buyProgressActions.cancelBuyReset(values)),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(BuyStatusScreen);

export default connected;