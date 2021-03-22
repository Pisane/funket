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
import I18n from '../../../i18n/index';

import {connect} from 'react-redux';

import * as tradingActions from '../../../modules/myinfo/trading/trading_store';

import {numberWithCommas} from '../../../util/comma';


class TradingScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            status : 1, // 1: 구매 / 2: 판매
        }
    }

    componentDidMount (){
        this.focusListener = this.props.navigation.addListener("focus", () => {
    
            //console.log(this.state)
            this.state.status = 1;

            this.props.buyTradingRequest({jwt: this.props.jwt, lang : this.props.lang});
        
          });
        
        
    }

    _buyButtonClick() {
        this.state.status = 1;
        this.props.buyTradingRequest({jwt: this.props.jwt, lang: this.props.lang});
    }

    _sellButtonClick() {
        this.state.status = 2;
        this.props.sellTradingRequest({jwt: this.props.jwt, lang: this.props.lang});
    }

    _renderBuyTradingItem = ({item}) => (
        <TouchableOpacity 
            style={styles.tradingStatusItemContainer}
            onPress={()=>this.props.navigation.navigate('BuyStatus',{seq: item.seq})}>
            <View style={styles.innerContainer_1}>
                <Text style={styles.inner_1_text_1}>
                    {item.name}
                </Text>
                <Text style={styles.inner_1_text_2}>
                    {
                      item.status===1 ? 
                        // 'TXID 입력대기' 
                        I18n.t('translation.trading.text_6')
                      :
                        // 'TXID 확인중' 
                        I18n.t('translation.trading.text_7')
                    }
                </Text>
            </View>
            <View style={styles.innerContainer_2}>
                <Text style={styles.inner_2_text_1}>
                    {/* 구매가격 */}
                    {I18n.t('translation.trading.text_8')}
                </Text>
                <Text style={styles.inner_2_text_2}>
                    {/* {'(장당 '+ item.price +' USDT)'} */}
                    {I18n.t('translation.trading.text_9',{price: numberWithCommas(item.price)})}
                </Text>
            </View>
            <View style={styles.innerContainer_3}>
                <View style={styles.inner_3_LeftCotainer}>
                    <Text style={styles.inner_3_LeftText_1}>
                        {numberWithCommas(item.totalPrice) + ' USDT'}
                    </Text>
                </View>
            
                <View style={styles.inner_3_RightCotainer}>
                    <Text style={styles.inner_3_RightText_1}>
                        {/* 구매수량 */}
                        {I18n.t('translation.trading.text_10')}
                    </Text>
                    <Text style={styles.inner_3_RightText_2}>
                        {
                            // (item.count)+'장'
                            I18n.t('translation.trading.text_11',{count:item.count})
                        }
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
    _renderSellTradingItem = ({item}) => (
        <TouchableOpacity 
            style={styles.tradingStatusItemContainer}
            onPress={()=>this.props.navigation.navigate('SellStatus',{seq: item.seq})}>
            <View style={styles.innerContainer_1}>
                <Text style={styles.inner_1_text_1}>
                    {item.name}
                </Text>
                <Text style={[styles.inner_1_text_2,{color:'#ff6600'}]}>
                    {/* 판매 중 */}
                    {I18n.t('translation.trading.text_12')}
                </Text>
            </View>
            <View style={styles.innerContainer_2}>
                <Text style={styles.inner_2_text_1}>
                    {/* 판매가격 */}
                    {I18n.t('translation.trading.text_13')}
                </Text>
                <Text style={styles.inner_2_text_2}>
                    {/* (장당) */}
                    {I18n.t('translation.trading.text_14')}
                </Text>
            </View>
            <View style={styles.innerContainer_3}>
                <View style={styles.inner_3_LeftCotainer}>
                    <Text style={[styles.inner_3_LeftText_1,{color:'#ff6600'}]}>
                        {numberWithCommas(item.price) + ' USDT'}
                    </Text>

                </View>
            
                <View style={styles.inner_3_RightCotainer}>
                    <Text style={styles.inner_3_RightText_1}>
                        {/* 잔여 수량 */}
                        {I18n.t('translation.trading.text_15')}
                    </Text>
                    <Text style={styles.inner_3_RightText_2}>
                        {/* {item.count+'장'} */}
                        {I18n.t('translation.trading.text_11',{count: item.count})}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
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
                                거래 현황
                            </Text>
                        </View >
                        <View style={styles.headerDivineRight}/>

                    </View>
                </View> */}

                <SubHeader
                    // title='거래 현황'
                    title={I18n.t('translation.trading.text_1')}
                    mode='back'
                    onPress={()=> navigation.goBack()}/>
                <View style={styles.bodyContainer}>
                    <View style={styles.topButtonContainer}>
                        <TouchableOpacity 
                            style={[styles.button,{ backgroundColor: this.state.status === 1 ? '#0090ff' : '#e5e5ea'}]}
                            onPress={()=>this._buyButtonClick()}>
                            <Text style={[styles.buttonText_16,{color: this.state.status === 1 ? '#ffffff' : '#aeaeb8'}]}>
                                {/* 구매 */}
                                {I18n.t('translation.trading.text_2')}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.button,{backgroundColor: this.state.status===1 ? '#e8e8e8' : '#ff6600'}]}
                            onPress={()=>this._sellButtonClick()}>
                            <Text style={[styles.buttonText_16,{color: this.state.status===1 ? '#b4b4b4' : '#ffffff'}]}>
                                {/* 판매 */}
                                {I18n.t('translation.trading.text_3')}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tradingFlatListContainer}>
                        {
                            this.state.status === 1 ? 
                            this.props.buyTrading[0].seq !== 0 ?
                                <FlatList
                                    data={this.props.buyTrading}
                                    renderItem={this._renderBuyTradingItem}
                                    keyExtractor={(item,index) => 'key_'+item.seq }
                                />
                            :
                                <View style={styles.emptyContainer}>
                                    <Image
                                        style = {styles.emptyImage}
                                        source = {require('../../../../assets/images/icons/icon_Empty.png')}
                                     />

                                    <Text style={styles.emptyText}>
                                        {/* 현재 구매 중인 상품이 없습니다. */}
                                        {I18n.t('translation.trading.text_4')}
                                    </Text>
                                </View>
                            :
                            this.props.sellTrading[0].seq !== 0 ? 
                                <FlatList
                                    data={this.props.sellTrading}
                                    renderItem={this._renderSellTradingItem}
                                    keyExtractor={(item,index) => 'key_'+item.seq }
                                />
                            :
                                <View style={styles.emptyContainer}>
                                    <Image
                                        style = {styles.emptyImage}
                                        source = {require('../../../../assets/images/icons/icon_Empty.png')}
                                    />

                                    <Text style={styles.emptyText}>
                                        {/* 현재 판매 중인 상품이 없습니다. */}
                                        {I18n.t('translation.trading.text_5')}
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
    
    topButtonContainer:{
        width: '90%',
        height: 40,
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        //marginBottom: 10,
    },
    button:{
        width: '49%',
        borderRadius: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText_16:{
        fontSize: 16,
    },
    tradingFlatListContainer:{
        width: '90%',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    tradingStatusItemContainer:{
        width: '100%',
        height : 110,
        backgroundColor: '#ffffff',
        borderRadius: 15,
        borderColor: '#e8e8e8',
        borderWidth: 1,
        flexDirection: 'column',
        marginBottom: 5,
    },
    innerContainer_1:{
        marginTop: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems : 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    inner_1_text_1:{
        fontSize: 16,
    },
    inner_1_text_2:{
        fontSize: 12,
        color : '#0090ff',
    },
    innerContainer_2:{
        marginTop: 11,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems : 'center',
        paddingLeft: 20,
        paddingRight: 20,
    },
    inner_2_text_1:{
        fontSize: 10,
    },
    inner_2_text_2:{
        fontSize: 10,
        // marginLeft: 8,
        marginLeft: '2%',
        color: '#b4b4b4',
    },
    innerContainer_3:{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        marginBottom: 14,
    },
    inner_3_LeftCotainer:{
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    inner_3_LeftText_1:{
        fontSize: 18,
        color: '#0090ff',
    },
    inner_3_LeftText_2:{
        // marginLeft:1,
        marginLeft: '0.25%',
        fontSize: 10,
        color: '#717171',
    },
    inner_3_RightCotainer:{
        flexDirection: 'row',
        alignItems:'center',
        
    },
    inner_3_RightText_1:{
        fontSize: 10,
        color: '#717171',
        marginRight: 14,
        //marginRight: '3.5%',
    },
    inner_3_RightText_2:{
        fontSize: 14,
    },

    emptyContainer:{
        height: 160,
        flexDirection: 'column',
        marginTop: 177,
        alignItems: 'center',
        width: '100%',
    },
    emptyImage:{
        width: 120,
        height: 120,
        marginBottom: 20,
    },
    emptyText:{
        fontSize: 16,
        color: '#AEAEB8',
        //marginBottom: 251,
    },


});


const mapStateToProps = (state) => ({
    buyTrading : state.TradingStore.buyTrading,
    sellTrading : state.TradingStore.sellTrading,
    jwt : state.AuthStore.jwt,
    lang : state.AuthStore.lang,

});

const mapDispatchToProps = (dispatch) => ({
    buyTradingRequest : (values) => dispatch(tradingActions.buyTradingRequest(values)),
    sellTradingRequest : (values) => dispatch(tradingActions.sellTradingRequest(values)),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(TradingScreen);

export default connected;