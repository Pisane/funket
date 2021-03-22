import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ImageBackground,
    Text,
    TextInput,
    Dimensions,
    ScrollView,
    Alert,
    Image,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import I18n from '../../../../../i18n/index.js';
import Clipboard from '@react-native-community/clipboard';
import Modal from 'react-native-modal';
import { CustomButton, SubHeader} from '../../../../../components/index';
import { fonts } from '../../../../../styles';
import Icon from 'react-native-vector-icons/Feather';

import { connect } from 'react-redux';
import * as txidCheckAction from '../../../../../modules/main/home/mileage/mileagecharge/txidCheck_store';

const deviceHeight = Dimensions.get("window").height;

class MileageChargeTxidScreen extends Component {
    static defaultProps = { 
        usdtAddr: 'defaultUSDTaddr',
        //chargeMileage: '0'
    }
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            chargeMileage: null,// 충전 마일리지 state로 navigaion으로 params 받아옴.
            txidCompText: null,
            txidState: null,
            isModalVisible: false,
            seq : null,
            day: null,
            alert: false,

        };
    }

    componentDidMount() {
        // 네비게이션으로 부터 전달 받은 값으로 할까?
        // 충전 신청한 마일리지
        // usdt를 송금할 주소
        // request charge 한 seq
        const item = this.props.route.params.data;
        this.setState({seq: item.seq});
        this.setState({chargeMileage: item.value});
        this.setState({day: item.day});
        
    }

    componentDidUpdate(){
        if(this.state.alert && this.props.txidCheck.txidCheckResult===1){
            //TXID 확인 성공
            
            Alert.alert(
                // '충전완료',
                I18n.t('translation.txidtocharge.text_1'), 
                // '충전이 성공적으로 완료되었습니다.',
                I18n.t('translation.txidtocharge.text_2')
                [
                    {
                        text: I18n.t('translation.txidtocharge.text_3'), onPress: () => {
                            this.setState({alert: false});
                            this.props.txidCheckClear()
                            this.props.navigation.goBack()}
                    }
                ],
            { cancelable: false } );
        } 
        if(this.state.alert && this.props.txidCheck.txidCheckResult===2){
            //TXID 확인 실패
            this.setState({alert: false});
            this.props.txidCheckClear();
            Alert.alert(
                // '충전실패', 
                I18n.t('translation.txidtocharge.text_4'),
                // '다시 한번 확인하여 txid를 입력해주시기 바랍니다.'
                I18n.t('translation.txidtocharge.text_5'),
            );
        }
    }

    _requestTxidInsert = async () => {

        //seq, txid 조합으로 서버에게 요청
        //console.log('클릭')
        if(this.state.txidCompText){
            await this.props.txidCheckRequest({
                jwt: this.props.jwt,
                seq: this.state.seq,
                txid : this.state.txidCompText,
            });
        }else{
            this.setState({ isModalVisible: !this.state.isModalVisible })
        }
       
        this.setState({alert: true})
        
    }
    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }
    txidClearModal = () => {
        this.setState({txidState: true})
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }
    copyToClipboard = () => {
        Clipboard.setString(this.props.usdtAddr)
        Alert.alert(
            I18n.t('translation.copied'),
            this.props.usdtAddr,

        )

    }
    render() {
        const { navigation, route } = this.props;

         //const { mileage } = route.params;
         

        return (
            <View style={styles.container}>
                <SubHeader
                title={I18n.t('translation.readyChargeMileage')}
                mode='close'
                onPress={() => navigation.goBack()}
                ></SubHeader>
                <View style={styles.header}>
                    <View style={styles.possMileage}>
                        <Text>{I18n.t('translation.appliedMileage')}</Text>
                        <View style={styles.possDetail}>
                            <Text style={[{ fontSize: 24, fontWeight: 'bold', color: '#0090ff' }, styles.font]}>{this.state.chargeMileage + ' G'}</Text>
                            <View style={{ width: 74, height: 40 }}>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.sendDetail}>
                    <Text style={[styles.sendDetailText, styles.font]}>{I18n.t('translation.toUSDTAddr')}</Text>
                    <View style={styles.addr}>
                        <View style={{ height: '100%', justifyContent: 'center' }}>
                            <Text>{this.props.usdtAddr}</Text>
                        </View>
                        <View style={{ height: '100%', justifyContent: 'center' }}>
                            <TouchableOpacity
                                onPress={() => this.copyToClipboard()}>
                                <Text>{I18n.t('translation.copy')}</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    <View style={styles.headerTitle}>
                        <Text style={[styles.font, styles.subTitle]} >{I18n.t('translation.TXID')}</Text>
                    </View>
                    

                            <View>
                            <View style={styles.myTxid}>
                            <View style={styles.myTxidAddr}>
                            <TextInput style={[styles.font, { width: '100%', fontWeight: 'bold', fontSize: 15 }]}
                                                        ref={input => { this.textInput = input }}
                                                        keyboardType={"default"}
                                                        underlineColorAndroid='transparent'
                                                        onChangeText={(_setTxid) => this.setState({ txidCompText: _setTxid })}
                            ></TextInput>
                        </View>
                        <View style={styles.myTxidBtn}>
                            <CustomButton
                                title={<Icon name='check' size={25} color="#fff"></Icon>}
                                onPress={()=>this._requestTxidInsert()}
                                ></CustomButton>
                        </View>
                        </View>
                        <View style={styles.txidAlert}>
                    <Text style={[styles.txidAlertText, styles.font]}>{I18n.t('translation.attentionText_01', {day: this.state.day+" 11:00"})}</Text>
                    </View>
                    </View>
                       

                </View>
                <View style={styles.botBtnView}>
                    <View style={styles.botBtn}>

                    </View>

                </View>



                <Modal
                    style={styles.modal}
                    isVisible={this.state.isModalVisible}
                    hideModalContentWhileAnimating={false}>
                    {!this.state.txidCompText ?
                        (<View style={[styles.modalView, { height: 108 }]}>
                            <Text style={{ fontSize: 12, marginTop: 20.5, color: '#717171' }}>{I18n.t('translation.modalTXID_01')}</Text>
                            <View style={styles.modalBtnView}>
                                <TouchableOpacity style={[styles.modalBtn, { width: '100%' }]}
                                    onPress={this.toggleModal}>
                                    <Text style={{ fontSize: 12, color: '#ff0000' }}>{I18n.t('translation.check')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>)
                        :
                        (<View style={[styles.modalView, { height: 200 }]}>
                            <Text style={[{ fontSize: 16, fontWeight: 'bold', marginTop: 29 }, styles.font]}>{I18n.t('translation.TXID')} {I18n.t('translation.inputComp')}</Text>
                            <Text style={{ fontSize: 12, marginTop: 47.5, color: '#717171' }}>{I18n.t('translation.modalTXID_02')}</Text>
                            <View style={styles.modalBtnView}>
                                <TouchableOpacity style={[styles.modalBtn, { width: '100%' }]}
                                    onPress={()=>this._requestTxidInsert()}>
                                    <Text style={{ fontSize: 12, color: '#ff0000' }}>{I18n.t('translation.check')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>)
                    }

                </Modal>
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
        borderBottomWidth: 2,
        borderBottomColor: '#e2e2e2',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    backBtn: {
        width: '90%',
        marginTop: 50,
        position: 'absolute',
        alignItems: 'flex-end'
    },
    titleText: {
        marginTop: 55,
        fontSize: 18,
        color: '#000',
    },
    header: {
        width: '100%',
        height: 108.3,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5'
    },
    possMileage: {
        width: '90%',
        height: 73,
        marginTop: 19.5
    },
    possDetail: {
        marginVertical: 17,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sendDetail: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        
    },
    sendDetailText: {
        width: '90%',
        marginTop: 40,
        marginBottom: 6.5,
        fontSize: 14,
    },
    addr: {
        width: '90%',
        height: 30,
        backgroundColor: '#f5f5f8',
        fontSize: 18,
        paddingLeft: '3%',
        paddingRight: '3%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e8e8e8',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    mileageSendInput: {
        width: '90%',
        height: 50,
        // backgroundColor: '#f5f5f8',
        fontSize: 18,
        paddingLeft: '3%',
        // borderRadius: 10,
        borderBottomWidth: 1,
        borderColor: '#e8e8e8'
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
    modal: {
        alignItems: 'center',
    },
    modalView: {
        width: '85%',

        backgroundColor: '#fff',
        borderRadius: 20,
        alignItems: 'center',
    },
    modalBtnView: {
        width: '90%',
        marginTop: 20,
        height: 58,
        borderTopWidth: 1,
        borderColor: '#eeeeee',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    modalBtn: {
        // width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        width: '90%',
        marginTop: 20,
    },
    myTxid: {
        width: '90%',
        height: 64,
        flexDirection: 'row',
        marginTop: 10
    },
    myTxidAddr: {
        width: '78%',
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        borderColor: '#0090FF',
        borderWidth: 1,
        marginRight: '2%',
        paddingLeft: '5%',
        paddingRight: '5%'

    },
    myTxidAddrClear:{
        width: '100%',
        height: 50,
        backgroundColor: '#f5f5f8',
        fontSize: 18,
        paddingLeft: '3%',
        paddingRight: '3%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e8e8e8',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    myTxidBtn: {
        width: '20%',
        height: 50,
    },
    txidAlert: {
        width: '90%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    txidAlertText: {
        width: '90%',
        marginBottom: 6.5,
        fontSize: 10,
        color: '#717171'
    },

});

const mapStateToProps = (state) => ({
    mileageHome : state.MileageHomeStore,
    jwt : state.AuthStore.jwt,
    txidCheck : state.TxidCheckStore,
  
});

const mapDispatchToProps = (dispatch) => ({
    txidCheckRequest : (values) => dispatch(txidCheckAction.txidCheckRequest(values)),
    txidCheckClear : () => dispatch(txidCheckAction.txidCheckClear()),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(MileageChargeTxidScreen);

export default connected;