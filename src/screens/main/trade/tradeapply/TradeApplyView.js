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
import { CustomButton, SubHeader } from '../../../../components/index';
import { RadioButton } from 'react-native-paper';

import { connect } from 'react-redux';
import * as tradeApplyAction from '../../../../modules/main/trade/apply/tradeApply_store';

import {numberWithCommas} from '../../../../util/comma';


const deviceHeight = Dimensions.get("window").height;
class TradeApplyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            topChecked: false,
            botChecked: false,
            allChecked: false
        }
    }

    componentDidUpdate(){
        //만약 구매 신청이 올바르게 완료되었으면 완료 페이지로 이동  TradeApplyCompView
        if(this.props.applyResult===1){
            this.props.navigation.navigate('TradeApplyComp')
            this.props.tradeApplyClear()

        }
        if(this.props.applyResult===2){
            Alert.alert("구매에 실패하였습니다")
            this.props.tradeApplyClear()
            this.props.navigation.navigate('TradeDetail',{seq: this.props.route.params.applyData.product.seq})
        }
    }
    
    toggleRadioTop = () => {
        this.setState({ topChecked: !this.state.topChecked })
    }
    toggleRadioBot = () => {
        this.setState({ botChecked: !this.state.botChecked })
    }

    toggleAll = () => {
        this.setState({allChecked: true, topChecked: true, botChecked: true})
    }

    _applyTrade = () => {
        if(this.state.topChecked && this.state.botChecked){
            //구매신청
            
            this.props.tradeApplyRequest({
                jwt: this.props.jwt, 
                seq: this.props.route.params.applyData.product.seq, 
                count: this.props.route.params.count,
                lang : this.props.lang, 
            })
        }else{
            Alert.alert("이용약관에 동의하고 다시 시도해주시기 바랍니다.")
        }
    }

    render() {
        const { navigation, route } = this.props;
        const {applyData, count} = route.params;


       
        return (
            // 
            <View style={styles.rootContainer}>
                <SubHeader
                    title='구매 신청'
                    mode='close'
                    onPress={() => navigation.goBack()} />
                <ScrollView style={styles.scrollView}>
                    <View style={styles.body_1_container}>
                        <View style={styles.body_1_topSection}>
                            <View style={styles.body_1_section_left}>
                                <Text style={[styles.font, { color: '#717171', fontSize: 16 }]}>{I18n.t('translation.buyPerson')}</Text>
                            </View>
                            {/* <View style={styles.body_1_section_mid}>
                                <Text style={[styles.font, { color: '#000000', fontSize: 16 }]}>홍길동</Text>
                            </View> */}
                        </View>
                        <View style={styles.body_1_botSection}>
                            <View style={styles.body_1_section_left}>
                                <Text style={[styles.font, styles.body_name_textStyle]}>{I18n.t('translation.id')}</Text>
                                <Text style={[styles.font, styles.body_name_textStyle]}>{I18n.t('translation.emailAddr')}</Text>
                                <Text style={[styles.font, styles.body_name_textStyle]}>{I18n.t('translation.remainMileage')}</Text>
                            </View>
                            <View style={styles.body_1_section_mid}>
                                <Text style={[styles.font, styles.body_detail_textStyle]}>{applyData.buyer.id}</Text>
                                <Text style={[styles.font, styles.body_detail_textStyle]}>{applyData.buyer.email}</Text>
                                <View style={styles.body_1_section_right}>
                                    <Text style={[styles.font, styles.body_detail_textStyle]}>{numberWithCommas(applyData.buyer.remainValue)}</Text>
                                    {/* <Text style={[styles.font, styles.body_name_textStyle]}>홍길동</Text> */}
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.lineStyle_100_Thick} />
                    <View style={styles.body_2_container}>
                        <View style={styles.body_2_topSection}>
                            <View style={styles.body_2_section_left}>
                                <Text style={[styles.font, styles.body_section_titleStyle]}>{I18n.t('translation.buyItem')} </Text>
                            </View>
                        </View>
                        <View style={styles.body_2_midSection}>
                            <View style={styles.body_2_section_midLeft}>
                                <Text style={[styles.font, { color: '#000000', fontSize: 16, fontWeight: '500' }]}>{applyData.product.name}</Text>

                            </View>
                            <View style={styles.body_2_section_midRight}>
                                <Text style={[styles.font, { color: '#000000', fontSize: 12 }]}>2 {I18n.t('translation.count')}</Text>
                                <Text style={[styles.font, { color: '#000000', fontSize: 12 }]}>{I18n.t('translation.allCount',{count: numberWithCommas(applyData.product.cur_price*count)})+' USDT'}</Text>
                            </View>
                        </View>
                        <View style={styles.body_2_botSection}>
                            <View style={styles.body_2_section_left}>
                                <Text style={[styles.font, styles.body_name_textStyle]}>{I18n.t('translation.downPayment')}</Text>
                                <Text style={[styles.font, styles.body_name_textStyle]}>{I18n.t('translation.salePersonAddr')}</Text>
                            </View>
                            <View style={styles.body_2_section_mid}>
                                <Text style={[styles.font, styles.body_detail_textStyle]}>{numberWithCommas(applyData.product.payPrice*count) + ' G'}</Text>
                                <Text 
                                    ellipsizeMode='tail' numberOfLines={1}
                                    style={[styles.font, styles.body_detail_textStyle]}>
                                        {applyData.seller.wallet}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.lineStyle_100_Thick} />
                    <View style={styles.body_3_container}>
                        <View style={styles.body_3_topSection}>
                            <View style={styles.body_2_section_left}>
                                <Text style={[styles.font, styles.body_section_titleStyle]}>{I18n.t('translation.termsUse')}</Text>
                            </View>
                        </View>
                        <View style={styles.body_3_midSection}>
                            {/* <TouchableOpacity style={styles.body_3_midTouch}> */}
                                
                                <View style={styles.body_3_midTouch}>
                                <RadioButton.Android
                                    value="allCheck"
                                    status={this.state.allChecked === true ? 'checked' : 'unchecked'}
                                    onPress={()=>this.toggleAll()}
                                    color={'#0090ff'}
                                />
                                </View>
                            {/* </TouchableOpacity> */}
                        </View>
                        <View style={styles.body_3_botSection}>
                            <View style={styles.body_3_botTouch}>
                            <View style={styles.radioBtnStyle}>
                                <RadioButton.Android
                                    value="check"
                                    status={this.state.topChecked === true ? 'checked' : 'unchecked'}
                                    onPress={()=>this.toggleRadioTop()}
                                    color={'#0090ff'}
                                />
                            <Text style={[styles.font, styles.body_name_textStyle]}>{I18n.t('translation.termsAgreement')}</Text>
                                </View>
                                <View style={styles.radioBtnStyle}>
                                <RadioButton.Android
                                    value="check"
                                    status={this.state.botChecked === true ? 'checked' : 'unchecked'}
                                    onPress={()=>this.toggleRadioBot()}
                                    color={'#0090ff'}
                                />
                                <Text style={[styles.font, styles.body_name_textStyle]}>{I18n.t('translation.termsAgreement')}</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </ScrollView>
                <View style={styles.botBtnView}>
                    <View style={styles.botBtn}>
                        <CustomButton
                            title={I18n.t('translation.buyApply')}
                            onPress={(applyData, count)=>this._applyTrade(applyData,count)}
                        >
                        </CustomButton>

                    </View>

                </View>

            </View>

        );
    }
}
const styles = StyleSheet.create({

    rootContainer: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#ffffff'
    },
    font: {
        fontFamily: fonts.primaryRegular,
        includeFontPadding: false
    },
    lineStyle_100_Thick: {
        backgroundColor: '#f5f7f8',
        height: 10,
        width: '100%',
    },
    scrollView: {
        width: '100%'
    },
    body_section_titleStyle: {
        color: '#000000',
        fontSize: 14
    },
    body_1_container: {
        width: '100%',
        height: 181,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    body_1_topSection: {
        width: '90%',
        height: 63.5,
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: '#e8e8e8',
        borderBottomWidth: 1
    },
    body_1_section_left: {
        width: '30%', //112+88...200 670 기준 29.85%
        // flexDirection: 'row',
        // marginVertical: 8

    },
    body_1_section_mid: {
        width: '70%',
        // flexDirection: 'row',
    },
    body_1_section_right: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    body_1_botSection: {
        width: '90%',
        height: 117.5,
        alignItems: 'center',
        flexDirection: 'row',
    },
    body_name_textStyle: {
        fontSize: 14,
        color: '#717171',
        lineHeight: 30
    },
    body_detail_textStyle: {
        fontSize: 14,
        color: '#121212',
        lineHeight: 30
    },

    body_2_container: {
        width: '100%',
        height: 195,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    body_2_topSection: {
        width: '90%',
        height: 40,
        alignItems: 'flex-end',
        flexDirection: 'row',

    },
    body_2_midSection: {
        width: '90%',
        height: 64,
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: '#e8e8e8',
        borderBottomWidth: 1
    },
    body_2_section_left: {
        width: '30%', //112+88...200 670 기준 29.85%
        // flexDirection: 'row',
        // marginVertical: 8

    },
    body_2_section_mid: {
        width: '70%',
        // flexDirection: 'row',
    },
    body_2_section_midLeft: {
        width: '30%', //112+88...200 670 기준 29.85%
        //flexDirection: 'row',
        // marginVertical: 8
    },
    body_2_section_midRight: {
        width: '70%',
        alignItems: 'flex-end'
    },
    body_2_section_right: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    body_2_botSection: {
        width: '90%',
        height: 91,
        alignItems: 'center',
        flexDirection: 'row',
    },
    body_3_container: {
        width: '100%',
        height: 242,
        backgroundColor: '#ffffff',
        alignItems: 'center'
    },
    body_3_topSection: {
        width: '90%',
        height: 52.5,
        alignItems: 'center',
        flexDirection: 'row',
    },
    body_3_midSection: {
        width: '90%',
        height: 52.5,
        alignItems: 'center',
        marginBottom: 8
    },
    body_3_midTouch: {
        width: '100%',
        height: 54,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e8e8e8',
        alignItems: 'center',
        flexDirection: 'row',

    },
    body_3_botSection: {
        width: '90%',
        height: 52.5,
        alignItems: 'center',
    },
    body_3_botTouch: {
        width: '100%',
        height: 105,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e8e8e8',
        backgroundColor: '#f5f7f8'
    },
    botBtnView: {
        width: '90%',
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'column',
        // position: 'absolute'
    },
    botBtn: {
        width: '100%',
        height: 50,
        marginBottom: 19
    },
    radioBtnStyle:{
        height: '50%',
        alignItems: 'center',
        flexDirection: 'row',
        // width: '10%'
    },
})

const mapStateToProps = (state) => ({
    applyResult : state.TradeApplyStore.result,
    jwt : state.AuthStore.jwt,
    lang : state.AuthStore.lang,
  
});

const mapDispatchToProps = (dispatch) => ({
    tradeApplyRequest : (values) => dispatch(tradeApplyAction.tradeApplyRequest(values)),
    tradeApplyClear : () => dispatch(tradeApplyAction.tradeApplyClear()),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(TradeApplyScreen);

export default connected;