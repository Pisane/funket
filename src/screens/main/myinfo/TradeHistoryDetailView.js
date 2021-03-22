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

import * as tradeHistoryDetailActions from '../../../modules/myinfo/tradeHistoryDetail/tradeHistoryDetail_store';

import {numberWithCommas} from '../../../util/comma';

class TradeHistoryDetailScreen extends Component {
    constructor(props){
        super(props);

    }

    componentDidMount(){
        let _seq = this.props.route.params.seq;
        let _type = this.props.route.params.type;
        
        this.props.tradeHistoryDetailRequest({
            jwt: this.props.jwt, 
            seq: _seq, 
            type: _type, 
            lang: this.props.lang,
        });

    }
    
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
                                {
                                    this.props.TradeHistoryDetail.type===1 ? '구매내역 상세보기' : '판매내역 상세보기'
                                }
                            </Text>
                        </View >
                        <View style={styles.headerDivineRight}/>

                    </View>
                </View> */}

                <SubHeader
                    title={this.props.TradeHistoryDetail.type===1 ? 
                        // '구매내역 상세보기'
                        I18n.t('translation.tradehistorydetail.text_1')
                        : 
                        // '판매내역 상세보기'
                        I18n.t('translation.tradehistorydetail.text_2')
                    }
                    mode='back'
                    onPress={()=> navigation.goBack()}/>
               

                <View style={styles.bodyContainer}>
                    <View style={styles.info_1_Container}>
                        <View style={[styles.info_1_Inner_Container,{ marginTop:'7%'}]}>
                            <Text style={[styles.info_1_Text,{width: 50, color:'#858585'}]}>
                                {/* 거래 상품 */}
                                {I18n.t('translation.tradehistorydetail.text_3')}
                            </Text>
                            <Text style={[styles.info_1_Text,{marginLeft:'16%'}]}>
                                {this.props.TradeHistoryDetail.name}
                            </Text>
                        </View>
                        <View style={[styles.info_1_Inner_Container,{marginTop:'3.2%'}]}>
                            <Text style={[styles.info_1_Text,{width: 50, color:'#858585'}]}>
                                {
                                    this.props.TradeHistoryDetail.type===1 ? 
                                        // '구매 완료' 
                                        I18n.t('translation.tradehistorydetail.text_4')
                                        : 
                                        // '판매 완료'
                                        I18n.t('translation.tradehistorydetail.text_5')
                                }
                            </Text>
                            <Text style={[styles.info_1_Text,{marginLeft:'16%'}]}>
                                {this.props.TradeHistoryDetail.date}
                            </Text>
                        
                        </View>
                    </View>
                    <View style={styles.info_2_Container}>
                        <View style={[styles.info_1_Inner_Container,{marginTop:'7%'}]}>
                            <Text style={[styles.info_1_Text,{color:'#858585', width: 100}]}>
                                {
                                    this.props.TradeHistoryDetail.type===1?
                                        // '구매'
                                        I18n.t('translation.tradehistorydetail.text_6')
                                    :
                                        // '판매'
                                        I18n.t('translation.tradehistorydetail.text_7')
                                    + I18n.t('translation.tradehistorydetail.text_8')
                                    // '가격(장당)'
                                }
                            </Text>
                            <Text style={[styles.info_1_Text]}>
                                {numberWithCommas(this.props.TradeHistoryDetail.perPrice)+ ' USDT'}
                            </Text>
                        </View>
                        <View style={[styles.info_1_Inner_Container,{marginTop:'3.2%'}]}>
                            <Text style={[styles.info_1_Text,{color:'#858585', width: 100}]}>
                                {
                                    this.props.TradeHistoryDetail.type===1 ? 
                                        // '구매'
                                        I18n.t('translation.tradehistorydetail.text_6') 
                                    : 
                                        // '판매'
                                        I18n.t('translation.tradehistorydetail.text_7')
                                    + I18n.t('translation.tradehistorydetail.text_9')
                                    // ' 장수'
                                }
                            </Text>
                            <Text style={[styles.info_1_Text]}>
                                {
                                    // this.props.TradeHistoryDetail.count + ' 장'
                                    I18n.t('translation.tradehistorydetail.text_10',{count: this.props.TradeHistoryDetail.count})
                                }
                            </Text>
                        </View>

                        {
                            this.props.TradeHistoryDetail.type === 1 ?
                            <View style={[styles.info_1_Inner_Container,{marginTop:'3.2%'}]}>
                                <Text style={[styles.info_1_Text,{color:'#858585', width: 100}]}>
                                    {/* 총 구매 금액 */}
                                    {I18n.t('translation.tradehistorydetail.text_11')}
                                </Text>
                                <Text style={[styles.info_1_Text]}>
                                    {numberWithCommas(this.props.TradeHistoryDetail.totalPrice) + ' USDT'}
                                </Text>
                            </View>
                            :
                            <View style={[styles.info_1_Inner_Container,{marginTop:'3.2%'}]}>
                                <Text style={[styles.info_1_Text,{color:'#858585', width: 100}]}>
                                    {/* 판매 이율 */}
                                    {I18n.t('translation.tradehistorydetail.text_12')}
                                </Text>
                                <Text style={[styles.info_1_Text]}>
                                    {this.props.TradeHistoryDetail.rate + '%'}
                                </Text>
                            </View>
                        }
                        {
                            this.props.TradeHistoryDetail.type === 1 ?
                            <View style={[styles.info_1_Inner_Container,{marginTop:'3.2%'}]}>
                                <Text style={[styles.info_1_Text,{color:'#858585', width: 100}]}>
                                    {/* 총 계약금 */}
                                    {I18n.t('translation.tradehistorydetail.text_13')}
                                </Text>
                                <Text style={[styles.info_1_Text]}>
                                    {numberWithCommas(this.props.TradeHistoryDetail.fee)+' G'}
                                </Text>
                            </View>
                            :
                            <View style={[styles.info_1_Inner_Container,{marginTop:'3.2%'}]}>
                                <Text style={[styles.info_1_Text,{color:'#858585', width: 100}]}>
                                    {/* 총 판매 수수료 */}
                                    {I18n.t('translation.tradehistorydetail.text_14')}
                                </Text>
                                <Text style={[styles.info_1_Text]}>
                                    {numberWithCommas(this.props.TradeHistoryDetail.fee) + 'G'}
                                </Text>
                            </View>
                        }
                        {
                            this.props.TradeHistoryDetail.type === 2 ?
                            <View style={[styles.info_1_Inner_Container,{marginTop:'3.2%'}]}>
                                <Text style={[styles.info_1_Text,{color:'#858585', width: 100}]}>
                                    {/* 총 판매금액 */}
                                    {I18n.t('translation.tradehistorydetail.text_15')}
                                </Text>
                                <Text style={[styles.info_1_Text]}>
                                    {numberWithCommas(this.props.TradeHistoryDetail.totalPrice)+' USDT'}
                                </Text>
                            </View>
                            :
                            <View>

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
        marginTop: '2.5%',
       
    },
    info_1_Container:{
        width:'100%',
        height: 110,
        flexDirection: 'column',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#e8e8e8',
        borderBottomWidth: 1,
        borderBottomColor:'#e8e8e8',
        backgroundColor: '#ffffff',
    },
    info_1_Inner_Container:{
        width: '80%',
        height: 15,
        flexDirection: 'row',
    },
    info_1_Text: {
        fontSize: 12, 
    },
    info_2_Container:{
            width:'100%',
            height: 163,
            flexDirection: 'column',
            alignItems: 'center',
            borderTopWidth: 1,
            borderTopColor: '#e8e8e8',
            borderBottomWidth: 1,
            borderBottomColor:'#e8e8e8',
            backgroundColor: '#ffffff',
    },
  

});


const mapStateToProps = (state) => ({
   
    TradeHistoryDetail : state.TradeHistoryDetailStore,
    jwt: state.AuthStore.jwt,
    lang : state.AuthStore.lang,
});

const mapDispatchToProps = (dispatch) => ({
    tradeHistoryDetailRequest : (values) => dispatch(tradeHistoryDetailActions.tradeHistoryDetailRequest(values)),
    
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(TradeHistoryDetailScreen);

export default connected;