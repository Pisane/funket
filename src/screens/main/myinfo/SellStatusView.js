import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  ScrollView,
  FlatList
} from 'react-native';

import {SubHeader} from '../../../components/index';

import {connect} from 'react-redux';
import I18n from '../../../i18n/index';

import * as sellProgressActions from '../../../modules/myinfo/sellProgress/sellProgress_store';

import {numberWithCommas} from '../../../util/comma';


class SellStatusScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            sell_Seq: null,
        }

    }

    componentDidMount () {

        this.focusListener = this.props.navigation.addListener("focus", () => {
    
            const _seq  = this.props.route.params.seq;
            this.setState({sell_Seq:_seq});
            this.props.sellProgressRequest({jwt: this.props.jwt, seq: _seq, lang: this.props.lang});
        
          }); 
        
       
    }

    _renderItem = ({item}) => (
        <View style={styles.buyerListInnerContainer}>
            <Text style={styles.listDateText}>
                {item.date}
            </Text>
            <Text style={styles.listIDText}>
                {item.buyerID}
            </Text>
            <Text style={styles.listCountText}>
                {/* {item.count+'장 구매'} */}
                {I18n.t('translation.sellstatus.text_13',{count: item.count})}
            </Text>
            <Text style={styles.listChatText}>
                {/* 채팅하기 */}
                {I18n.t('translation.sellstatus.text_14')}
            </Text>
        </View>
    );
        

    render(){
        const { navigation } = this.props;
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
                                판매 현황
                            </Text>
                        </View >
                        <View style={styles.headerDivineRight}/>

                    </View>
                </View> */}
               <SubHeader
                    // title='판매 현황'
                    title={I18n.t('translation.sellstatus.text_1')}
                    mode='back'
                    onPress={()=> navigation.goBack()}/>

                <View style={styles.bodyContainer}>
                    <View style={styles.sellInfoContainer}>
                        <View style={styles.sellInfo_1_Container}>
                            <Text style={styles.sellInfo_1_Text_1}>
                                {this.props.SellProgress.SellProgressInfo.name}
                            </Text>
                            <View style={styles.sellInfo_1_Text_2_Container}>
                                <Text style={[styles.sellInfo_1_Text_2,{color:'#717171',marginRight: '3.5%',}]}>
                                    {/* 남은 수량 */}
                                    {I18n.t('translation.sellstatus.text_2')}
                                </Text>
                                <Text style={styles.sellInfo_1_Text_2}>
                                    {/* {this.props.SellProgress.SellProgressInfo.count+'장'}  */}
                                    {I18n.t('translation.sellstatus.text_3',{count:this.props.SellProgress.SellProgressInfo.count})}
                                </Text>
                            </View>

                        </View>
                        <View style={styles.sellInfo_2_Container}>
                            <View style={styles.sellInfo_2_Inner_Left_Container}>
                                <Text style={styles.sellInfo_2_Inner_Left_Text_1}>
                                    {/* 판매 금액 */}
                                    {I18n.t('translation.sellstatus.text_4')}
                                </Text>
                                <Text style={styles.sellInfo_2_Inner_Left_Text_2}>
                                    {/* {'총'+ (this.props.SellProgress.SellProgressInfo.totalPrice) +'USDT'} */}
                                    {I18n.t('translation.sellstatus.text_5',{totalPrice: numberWithCommas(this.props.SellProgress.SellProgressInfo.totalPrice)})}
                                </Text>
                            </View>
                            <View style={styles.sellInfo_2_Inner_Right_Container}>
                                <View style={[styles.sellInfo_2_Inner_Right_Detail_Container,
                                    {marginTop: 12}]}>
                                    <Text style={[styles.sellInfo_2_Inner_Right_Text,{color:'#717171'}]}>
                                        {/* 판매 이율 */}
                                        {I18n.t('translation.sellstatus.text_6')}
                                    </Text>
                                    <Text style={styles.sellInfo_2_Inner_Right_Text}>
                                        {/* {this.props.SellProgress.SellProgressInfo.rate+'%'} */}
                                        {I18n.t('translation.sellstatus.text_7', {rate: this.props.SellProgress.SellProgressInfo.rate})}
                                    </Text>
                                </View>
                                <View style={[styles.sellInfo_2_Inner_Right_Detail_Container,
                                    {marginTop: 4}]}>
                                    <Text style={[styles.sellInfo_2_Inner_Right_Text,{color:'#717171'}]}>
                                        {/* 장당가격 */}
                                        {I18n.t('translation.sellstatus.text_8')}
                                    </Text>
                                    <Text style={styles.sellInfo_2_Inner_Right_Text}>
                                        {/* {this.props.SellProgress.SellProgressInfo.perPrice+'USDT'} */}
                                        {I18n.t('translation.sellstatus.text_9',{perPrice: numberWithCommas(this.props.SellProgress.SellProgressInfo.perPrice)})}
                                    </Text>
                                </View>
                            </View>

                        </View>
                        

                    </View>
                    <View style={styles.buyerInfoContainer}>
                            <View style={styles.buyerTitleContainer}>
                                <Text style={styles.buyerTitle}>
                                    {/* 구매한 사람 */}
                                    {I18n.t('translation.sellstatus.text_10')}
                                </Text>
                               <TouchableOpacity onPress={()=>navigation.navigate('TradeHistory')}>
                                    <Text style={styles.goTradeHistoryText}>
                                        {/* {'거래내역 보러가기 >'} */}
                                        {I18n.t('translation.sellstatus.text_11')}
                                    </Text>
                               </TouchableOpacity>
                                
                            </View>
                            {
                                this.props.SellProgress.SellProgressInfo.buyerList.length > 0 ?
                                    <FlatList
                                    data={this.props.SellProgress.SellProgressInfo.buyerList}
                                    renderItem={this._renderItem}
                                    keyExtractor={(item,index) => 'key_'+index}
                                />
                                :
                                    <View style={styles.emptyBuyerContainer}>
                                        <Text style={styles.emptyBuyerText}>
                                            {/* 아직 구매한 사람이 없습니다. */}
                                            {I18n.t('translation.sellstatus.text_12')}
                                        </Text>
                                    </View>
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
        fontSize: 18,

    },
    bodyContainer:{
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
       
    },

    
    sellInfoContainer:{
        width: '100%',
        height: 135,
        backgroundColor: '#ffffff',
        alignItems: 'center',
        // borderBottomColor: '#e8e8e8',
        // borderBottomWidth: 1,
    },
    sellInfo_1_Container:{
        height : 30,
        width : '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 20,
    },
    sellInfo_1_Text_1:{
        fontSize: 24,
        fontWeight: 'bold',
    },
    sellInfo_1_Text_2_Container:{
        flexDirection: 'row',
        alignItems:'flex-end',

    },
    sellInfo_1_Text_2:{
        fontSize: 14,
    },
    sellInfo_2_Container:{
        height : 88,
        width : '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 24,
    },
    sellInfo_2_Inner_Left_Container:{
        width: '45%',
        flexDirection: 'column',
    },
    sellInfo_2_Inner_Left_Text_1:{
        fontSize: 12,
    },
    sellInfo_2_Inner_Left_Text_2:{
        fontSize: 18,
        marginTop: 7,
        color: '#ff6600',
    },

    sellInfo_2_Inner_Right_Container:{
        width: '40%',
        flexDirection: 'column',
        alignItems:'flex-end',
    }, 
    sellInfo_2_Inner_Right_Detail_Container:{
        width:'100%',
        flexDirection: 'row',
        height: 16,
        justifyContent:'space-between',

    }, 
    sellInfo_2_Inner_Right_Text:{
        fontSize: 12,
    },
   

    buyerInfoContainer:{
        width:'100%',
        marginTop: 10,
        // borderTopWidth: 1,
        // borderTopColor: '#e8e8e8',
        flexDirection: 'column',
    },
    buyerTitleContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        width: '100%',
        backgroundColor: '#ffffff',
        justifyContent: 'space-between'
    },
    buyerTitle:{
        
        marginLeft: '5%',
        fontSize: 14,
        color: '#5e5e5e',
    },
    goTradeHistoryText:{
        fontSize: 11,
        color: '#AEAEB8',
        marginRight: '5%',
    },

    buyerListInnerContainer: {
        width: '100%',
        height : 48,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
        borderTopColor: '#e8e8e8',
        borderTopWidth: 1,
        // borderBottomColor: '#e8e8e8',
        // borderBottomWidth: 1,

    },
    listDateText: {
        marginLeft: '5%',
        marginRight: '7.5%',
        fontSize: 10,
        color: '#AEAEB8',
    },
    listIDText:{
        width: 80,
        // marginRight: 2,
        marginLeft: '0.5%',
        fontSize: 12,
        // fontWeight:'500',
    },
    listCountText:{
        marginRight: '24%',
        width : 55,
        fontSize: 12,
        color: '#717171',
        textAlign: 'right',
    },
    listChatText:{
        fontSize: 12,
        color: '#FF6600',
        textAlign: 'right',
        width : 46,
    },
    emptyBuyerContainer:{
        height : 50,
        borderBottomColor: '#E8E8E8',
        borderBottomWidth: 1,
        borderTopColor: '#E8E8E8',
        borderTopWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    emptyBuyerText:{
        marginLeft: '5%',
        fontSize: 12,
        color: '#636366',
    }


});

const mapStateToProps = (state) => ({
    MyInfo : state.MyinfoStore.myInfoData,
    SellProgress : state.SellProgressStore,
    jwt : state.AuthStore.jwt,
    lang : state.AuthStore.lang,
});

const mapDispatchToProps = (dispatch) => ({
    sellProgressRequest : (values) => dispatch(sellProgressActions.sellProgressRequest(values)),
    
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(SellStatusScreen);

export default connected;