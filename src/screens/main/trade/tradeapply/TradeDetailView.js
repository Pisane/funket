import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ImageBackground,
    Text,
    ScrollView,
    Dimensions,
    Alert
} from 'react-native';
import I18n from '../../../../i18n';
import Modal from 'react-native-modal';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { fonts } from '../../../../styles';
import {CustomButton, SubHeader} from '../../../../components/index';

import { connect } from 'react-redux';
import * as tradeDetailAction from '../../../../modules/main/trade/detail/tradeDetail_store';

import {numberWithCommas, refineFloat, refineFloatForValue} from '../../../../util/comma';

class TradeDetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // _id : props.route.params.id
            isModalVisible: false,
            able_count : 1,
            //maxCount: 0,
        }
    }

    componentDidMount(){
        // 해당 거래 상세 내용 불러오기
        this.focusListener = this.props.navigation.addListener("focus", () => {
            const _seq = this.props.route.params.data.seq;
            const _jwt = this.props.jwt;
            const _lang = this.props.lang; // 1: ko , 2: en

            this.props.tradeDetailRequest({jwt : _jwt, seq : _seq, lang: _lang});
        });
        
    }
    



    // this.setState({maxPurchase: data.able_count})
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }
    toTradeApply = () => {
        const { navigation, route } = this.props;
        const data = this.props.tradeDetail
        this.setState({ isModalVisible: !this.state.isModalVisible })

        if(this.props.mileage >= refineFloatForValue(this.state.able_count*data.product.payPrice))
        {
            navigation.navigate('TradeApply', {applyData: data, count: this.state.able_count})
        }else{
            Alert.alert(I18n.t('translation.tradeDetailView.text_1'), I18n.t('translation.tradeDetailView.text_2'))
        }
        
    }
    securityDeposit(val) {
        const result = val * 10 / 100;
        return +(Math.ceil(result + "e+2") + "e-2");

    }
    buyPlusCalc() {
        const maxCount = this.props.tradeDetail.product.able_count;
        if (this.state.able_count < maxCount){
            this.setState({able_count: this.state.able_count + 1})
        }
    }
    buyMinusCalc() {
        if (this.state.able_count > 1){
            this.setState({able_count: this.state.able_count - 1})
        }
    }

    // refineFloat(value){
    //     return Number(Math.round(value+'e2')+'e-2').toFixed(2); 
    // }
    
    
    render() {
        const { navigation, route } = this.props;
        const { data } = route.params;
        const  tradeDetail  = this.props.tradeDetail;

        //const secDepo = this.securityDeposit(tradeDetail.product.cur_price)
        return (
            // 
            <View style={styles.rootContainer}>
                <SubHeader
                    title={I18n.t('translation.itemDetail')}
                    mode='back'
                    onPress={()=> navigation.goBack()}/>
                <View style={styles.header}>
                    <View style={styles.headerTitle2}>
                        <Text style={[styles.font, styles.subTitle]} >{tradeDetail.product.name}</Text>
                    </View>
                    <View style={styles.detailSection}>
                        <View style={styles.detailLeft}>
                            <Text style={[styles.font, styles.textTitle]}>{I18n.t('translation.salePrice')}</Text>
                            <Text style={[styles.font, { fontSize: 11 }]}>{I18n.t('translation.itemCount')} <Text style={[styles.font, styles.usdtText]}>{numberWithCommas(tradeDetail.product.cur_price)+' USDT'}</Text></Text>
                        </View>
                        <View style={styles.detailRight}>
                            <View style={styles.detailRightName}>
                                <Text style={[styles.font, styles.nameText]}>{I18n.t('translation.downPaymentOne')}</Text>
                                <Text style={[styles.font, styles.nameText]}>{I18n.t('translation.remainItem')}</Text>
                            </View>
                            <View style={styles.detailRightValue}>
                                <Text style={[styles.font, styles.valueText]}>{numberWithCommas(tradeDetail.product.payPrice)+' G'}</Text>
                                <Text style={[styles.font, styles.valueText]}>{tradeDetail.product.able_count} {I18n.t('translation.count')}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <ScrollView style={{width: '100%'}}>
                <View style={styles.explainSection}>
                <View style={styles.explainDetail}>
                    <Text style={[styles.font, styles.explainTitle]}>{I18n.t('translation.itemExplanTitle')}</Text>

                    <Text style={[styles.font, styles.explainText]}>
                        {tradeDetail.product.description}
                    </Text>
                </View>
                
            </View>
            </ScrollView>
            <View style={styles.botBtnView}>
                    <View style={styles.botBtn}>
    
                        <CustomButton
                            title={I18n.t('translation.buy')}
                            onPress={this.toggleModal}
                        />
                    </View>
                </View>

                <Modal
                style={styles.modal}
                isVisible={this.state.isModalVisible}
                hideModalContentWhileAnimating={true}
                backdropColor={'#fff'}
                backdropOpacity={0}
                propagateSwipe={true}
                onBackdropPress={this.toggleModal}
                // swipeDirection={'down'}
                // onSwipeComplete={this.toggleModal} //modal animated bug
                >
                    <View style={[styles.modalView, {height: 217}]}>
                        <View style={styles.modalBuy}>
                            <View style={styles.modalHead}> 
                                <Text style={[styles.font, {fontSize:18, marginLeft: 10}]}> {tradeDetail.product.name}</Text>
                                <Text style={[styles.font]}> {I18n.t('translation.downPayment')} {numberWithCommas(refineFloat(this.state.able_count*tradeDetail.product.payPrice))+ 'G'} </Text>
                            </View>
                            <View style={styles.modalValue}>
                                <View style={styles.modalValSelect}>
                                <TouchableOpacity
                              onPress={()=> {this.buyMinusCalc()}}
                              >
                                <FeatherIcon name='minus' size={28} color={'#717171'}/>
                            </TouchableOpacity>
                            <View style={styles.modalValNum}>
                                <Text>{this.state.able_count}</Text>
                            </View>
                            <TouchableOpacity
                             onPress={() => {this.buyPlusCalc()}}>
                                <FeatherIcon name='plus' size={28} color={'#717171'} />
                            </TouchableOpacity>
                            <Text style={[styles.font, {fontSize: 18, color: '#717171'}]}> {I18n.t('translation.count')}</Text>
                                </View>
                                <Text style={[styles.font]}>{I18n.t('translation.price')} {numberWithCommas(refineFloat(this.state.able_count*tradeDetail.product.cur_price))+' USDT'}</Text>
                            </View> 
                        </View>
                        <View style={styles.modalBtnView}>
                    <View style={styles.modalBtn}>
                        <CustomButton
                            title={I18n.t('translation.buy')}
                            onPress={()=>this.toTradeApply()}
                       />

                    </View>
                    </View>
                    </View>
                    </Modal>
            </View>

        );
    }
}
const styles = StyleSheet.create({

    rootContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',

    },
    font: {
        fontFamily: fonts.primaryRegular,
        includeFontPadding: false
    },
    headerContainer:{
        width: '100%',
        height: 120,
        backgroundColor: '#fff',
        borderBottomWidth: 2,
        borderBottomColor: '#e2e2e2',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 59,
        paddingLeft: '5%',
        paddingRight: '5%',
    },
    headerTitle:{
        flex: 6,
        alignItems: 'center',
    },
    headerTitleText:{
        fontSize: 24,
        color: '#000000',
        fontWeight:'500',
        fontFamily:fonts.primaryRegular,
    },
    backIcon: {
        flex: 1,
        alignItems: 'flex-start'
    },
    closeIcon:{
        flex: 1,
        alignItems: 'flex-end'
    },
    header: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: '#e8e8e8',
        borderBottomWidth : 1
    },
    headerTitle2: {
        width: '90%',
        marginTop: 20,
    },
    detailSection: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15
    },
    detailLeft: {
        width: '65%'
    },
    detailRight: {
        width: '35%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    detailRightValue: {
        alignItems: 'flex-end'
    },
    textTitle: {
        fontSize: 14,

    },
    usdtText: {
        fontSize: 18,
        color: '#0090ff',
        fontWeight: 'bold'
    },
    nameText: {
        fontSize: 12,
        color: '#717171'
    },
    valueText: {
        fontSize: 12
    },
    explainSection:{
        marginTop : 10,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderBottomColor: '#e8e8e8',
        borderBottomWidth : 1,
        borderTopColor: '#e8e8e8',
        borderTopWidth : 1,
        marginBottom: 80
    },
    explainDetail:{
        width: '90%',
        paddingTop: 20
    },
    explainTitle:{
        fontSize: 14,
        
    },
    explainText:{
        fontSize: 12,
        color : '#b4b4b4',
        lineHeight: 30
    },
    botBtnView: {
        width: '90%',
        flex: 1,
        // height : deviceHeight*0.95,
        justifyContent: 'flex-end',
        flexDirection: 'column',
        
        
    },
    botBtn: {
        width: '100%',
        height: 50,
        marginBottom: 19,
    },
    modal: {
        justifyContent: "flex-end",
        margin: 0,

    },
    modalBuy:{
        width: '90%',
        marginTop : 19,
        alignItems: 'center',
    },
    modalView: {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center',
        borderWidth: 2,
        borderColor :'#e8e8e8',
    },
    modalHead:{
        width: '100%',
        height: 27,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalValue:{
        width: '100%',
        marginTop: 20,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#F5F7F8',
        paddingLeft: 5,
        paddingRight: 10,
    },
    modalValSelect:{
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    modalValNum:{
        width:58, 
        height:35, 
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f5f7f8',
        borderColor: '#e8e8e8',
        borderWidth: 1
    },
    modalBtn:{
        // width: '90%',
        height: 50,
        marginBottom: 19,
    },
    modalBtnView:{
        width: '90%',
        flex: 1,
        // height : deviceHeight*0.95,
        justifyContent: 'flex-end',
        flexDirection: 'column',
    }

})

const mapStateToProps = (state) => ({
    jwt : state.AuthStore.jwt,
    lang : state.AuthStore.lang,
    tradeDetail : state.TradeDetailStore,
    mileage: state.HomeStore.mileage,
  
});

const mapDispatchToProps = (dispatch) => ({
    tradeDetailRequest : (values) => dispatch(tradeDetailAction.tradeDetailRequest(values)),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(TradeDetailScreen);

export default connected;