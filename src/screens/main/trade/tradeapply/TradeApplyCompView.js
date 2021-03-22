import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ImageBackground,
    Text,
    TextInput,
    Dimensions,
    ScrollView
} from 'react-native';
import Modal from 'react-native-modal';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { CustomButton } from '../../../../components/index';
import { fonts } from '../../../../styles';
import I18n from '../../../../i18n';

import { connect } from 'react-redux';

import {numberWithCommas} from '../../../../util/comma';

// import * as homeAction from '../../../../modules/main/trade/apply/tradeApply_store';

const deviceHeight = Dimensions.get("window").height;
class TradeApplyCompScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            sendId: null,
            sendMileage: null,
        };
    }

    render() {
        const { navigation, route} = this.props;
        const {buyInfo} = this.props;
    //    const { id, mileage } = route.params;

        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={[styles.titleText, styles.font]}></Text>
                    <TouchableOpacity style={styles.backBtn}
                        onPress={() => navigation.navigate('Trade')}>
                        <FeatherIcon name='x' size={28}/></TouchableOpacity>
                </View>
                <ScrollView style={{ width: '100%'}}>
                    <View style={styles.header}>
                        <View style={styles.possMileage}>
                            <Text style={[styles.font, styles.possTitle]}>{I18n.t('translation.buyApplyComp')}</Text>
                            <Text style={[styles.font, styles.possText]}>{I18n.t('translation.buyApplyNoti_01')}</Text>
                            <Text style={[styles.font, styles.possText]}><Text style={[styles.font, {color: '#0090ff'}]}>{I18n.t('translation.buyApplyNoti_02', {name : 'TXID'})}</Text>{I18n.t('translation.buyApplyNoti_03')}</Text>
                        </View>
                    </View>
                    <View style={styles.sendDetail}>
                        <View style={styles.sendDetailTitle}>
                            <Text style={[styles.font, {fontWeight:'bold', fontSize: 14}]}>{I18n.t('translation.buyInfo')}</Text>
                        </View>
                        <View style={styles.detailView}>
                        <View style={styles.detailText}>
                            <Text style={[styles.detailName, styles.font]}>{I18n.t('translation.itemName')}</Text>
                            <Text style={[styles.detailName, styles.font]}>{I18n.t('translation.buyQuan')}</Text>
                            <Text style={[styles.detailName, styles.font]}>{I18n.t('translation.price')}</Text>
                            <Text style={[styles.detailName, styles.font]}>{I18n.t('translation.downPayment')}</Text>
                            <Text style={[styles.detailName, styles.font]}>{I18n.t('translation.remainMileage')}</Text>
        
                        </View>
                        <View style={styles.detailVal}>
                            <Text style={[styles.detailNum, styles.font]}>{buyInfo.name}</Text>
                            <Text style={[styles.detailNum, styles.font]}>{numberWithCommas(buyInfo.count)} {I18n.t('translation.count')}</Text>
                            <Text style={[styles.detailNum, styles.font]}>{numberWithCommas(buyInfo.totalPrice) +' USDT'}</Text>
                            <Text style={[styles.detailNum, styles.font]}>{numberWithCommas(buyInfo.totalPayPrice)+ ' G'}({I18n.t('translation.itemCount')+numberWithCommas(buyInfo.payPrice)+'G'} )</Text>
                            <Text style={[styles.detailNum, styles.font]}>{numberWithCommas(buyInfo.remainMileage)+' G'}</Text>
                            
                        </View>
                        </View>
                        <View style={styles.detailBot}>
                            <View style={styles.detailBotText}>
                            <Text style={[styles.detailBotName, styles.font]}>{I18n.t('translation.salePersonAddr')}</Text>
                            </View>
                            <View style={styles.detailBotVal}>
                            <Text 
                                ellipsizeMode='tail' numberOfLines={1}
                                style={[styles.detailBotNum, styles.font]}>
                                    {buyInfo.sellerWallet}
                            </Text>
                            </View>
                            {/* <TouchableOpacity style={styles.detailBotBtn}>
                            <Text style={[styles.detailBotBtnText, styles.font]}>{I18n.t('translation.send')}</Text>
                            </TouchableOpacity> */}
                        </View>
                        <View>
                        <Text style={[styles.attentionText, styles.font]}>{I18n.t('translation.tradeApplyNoti_01',{day: buyInfo.date+' 11:00'})}</Text>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.botBtnView}>
                    <View style={styles.botBtn}>
                        <CustomButton
                            title={I18n.t('translation.buyCheck')}
                            onPress={() => {navigation.navigate('Trading')}}
                        >
                        </CustomButton>

                    </View>

                </View>
                </View>
        );
    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    font: {
        fontFamily: fonts.primaryRegular,
        includeFontPadding: false
    },
    title: {
        width: '100%',
        height: 100,
        backgroundColor: '#fff',
        // borderBottomWidth: 2,
        // borderBottomColor: '#e2e2e2',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    backBtn: {
        width: '90%',
        marginTop: 60,
        position: 'absolute',
        alignItems: 'flex-end'
    },
    titleText: {
        marginTop: 55,
        fontSize: 18,
        color: '#000',
    },
    header: {
        // width: '90%',
        // height: '10%',
        marginTop: '5%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        // borderBottomWidth: 1,
        // borderBottomColor: '#e5e5e5'
    },
    botBtnView: {
        width: '90%',
        justifyContent: 'flex-end',
        flexDirection: 'column',
        // position: 'absolute'
    },
    possMileage:{
        width: '80%'
    },
    possTitle:{
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 16
    },
    possText :{
        fontSize: 14,
        color: '#717171'
    },

    sendDetail:{
        // width: '100%',
         marginTop: '20%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendDetailTitle:{
        width: '80%',
        height: 30,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
        marginBottom: 15
    },
    detailView:{
        width: '80%',
        flexDirection: 'row'
    },
    detailText:{
        width: '30%',
    },
    detailVal:{
        width: '70%'
    },
    detailName:{
       fontSize: 12,
       marginBottom: 8,
       color: '#787878'
    },
    detailNum:{
        fontSize: 12,
        marginBottom: 8,
    },
    detailBot:{
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    detailBotText:{
        width: '30%'
    },
    detailBotName:{
        fontSize: 12,
        marginBottom: 8,
        color: '#787878'
    },
    detailBotNum:{
        fontSize: 12,
        marginBottom: 8,
    },
    detailBotVal:{
        width: '50%',
        flexDirection: 'row',
    },  
    detailBotBtn:{
        width: '20%',
        alignItems: 'flex-end'
    },
    detailBotBtnText:{
        fontSize: 12,
        marginBottom: 8,
        color: '#0090ff'
    },
    attentionText:{
        fontSize: 10,
        color: '#ff6600',
        marginTop: 12
    },
    botBtn: {
        width: '100%',
        height: 50,
        marginBottom: 19
    },

});

const mapStateToProps = (state) => ({
    buyInfo : state.TradeApplyStore.buyInfo,
  

});

const mapDispatchToProps = (dispatch) => ({
  
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(TradeApplyCompScreen);

export default connected;
