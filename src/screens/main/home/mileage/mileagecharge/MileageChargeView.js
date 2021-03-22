import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ImageBackground,
    TouchableWithoutFeedback,
    Text,
    TextInput,
    Dimensions,
    ScrollView,
    Keyboard,
    Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import I18n from '../../../../../i18n/index.js';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { CustomButton, SubHeader } from '../../../../../components/index';
import { fonts } from '../../../../../styles';

import { connect } from 'react-redux';
import * as mileageChargeAction from '../../../../../modules/main/home/mileage/mileagecharge/mileageCharge_store';

import {numberWithCommas} from '../../../../../util/comma';

const deviceHeight = Dimensions.get("window").height;
class MileageChargeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            sendId: null,
            chargeMileage: null,
            mileage: 0,
        };
    }

    componentDidMount(){
        this.setState({mileage: this.props.route.params.mileage})
    }


    _requestChargeMileage = async () => {
        
        if(this.state.chargeMileage>0 ){
            await this.props.mileageChargeRequest({jwt: this.props.jwt, value: this.state.chargeMileage});
            
        }
    }

    toggleModal = () => {
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }
    toMileageChargeComp = () => {
        const { navigation } = this.props;
        this.setState({ isModalVisible: !this.state.isModalVisible })
        navigation.navigate('MileageChargeTxid', 
        {
            mileage: this.state.chargeMileage,
        })
    }
    onMileageChanged(value) {
        let newText = '';
        let numbers = '0123456789';
    
        for (var i=0; i < value.length; i++) {
            if(numbers.indexOf(value[i]) > -1 ) {
                newText = newText + value[i];
            }
            else {
                this.textInput.clear();
                // alert("please enter numbers only");
                Alert.alert(I18n.t('translation.onlyNumber'))
            }
        }
        this.setState({ chargeMileage: value.replace(/[a-z-#*;,.<>\{\}\[\]\\\/]/gi, '') });
      }

    render() {
        //console.log(this.state.chargeMileage)
        if(this.props.mileageChargeStore.chargeResult===1){
            this.props.mileageChargeClear();
            this.props.navigation.navigate('Mileage');
        }
        if(this.props.mileageChargeStore.chargeResult===2){
            Alert.alert(I18n.t('translation.chargemileage.text_1'), I18n.t('translation.chargemileage.text_2'));
            this.props.mileageChargeClear();
        }
        const { navigation } = this.props;
        return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View style={styles.container}>
                <SubHeader
                    title={I18n.t('translation.mileageCharge')}
                    mode='close'
                    onPress={()=> navigation.goBack()}/>

                    <View style={styles.header}>
                        <View style={styles.possMileage}>
                            <Text>{I18n.t('translation.myMileage')}</Text>
                            <View style={styles.possDetail}>
                                <Text style={[{ fontSize: 24, fontWeight: 'bold' }, styles.font]}>{numberWithCommas(this.state.mileage) + ' G'}</Text>
                                <View style={{ width: 74, height: 40 }}>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.sendDetail}>
                        <Text style={[styles.sendDetailText, styles.font]}>{I18n.t('translation.toChargeMileage')}</Text>
                        <TextInput style={styles.sendIdInput}
                            ref={input => { this.textInput = input }}
                            placeholder={I18n.t('translation.placeholder_01')}
                            keyboardType={'numeric'}
                            underlineColorAndroid='transparent'
                            onChangeText={(_chargeMileage) => this.onMileageChanged(_chargeMileage)}
                        ></TextInput>
                    </View>
                <View style={styles.botBtnView}>
                    <View style={styles.botBtn}>
                        <CustomButton
                            title={I18n.t('translation.applyCharge')}
                            onPress={()=>this._requestChargeMileage()}
                        >

                        </CustomButton>

                    </View>

                </View>

                
                <Modal
                    style={styles.modal}
                    isVisible={this.state.isModalVisible}
                    hideModalContentWhileAnimating={false}>
                    {!this.state.chargeMileage ?
                        (<View style={[styles.modalView, {height: 108}]}>
                            <Text style={{ fontSize: 12, marginTop: 20.5, color: '#717171' }}>{I18n.t('translation.mileageAlert_01')}</Text>
                            <View style={styles.modalBtnView}>
                                 <TouchableOpacity style={[styles.modalBtn, {width:'100%'}]}
                                    onPress={this.toggleModal}>
                                    <Text style={{ fontSize: 12, color: '#ff0000' }}>{I18n.t('translation.check')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>)
                        :
                        (<View style={[styles.modalView, {height: 200}]}>
                            <Text style={[{ fontSize: 16, fontWeight: 'bold', marginTop: 29 }, styles.font]}>{I18n.t('translation.mileageCharge')}</Text>
                            <Text style={{ fontSize: 12, marginTop: 47.5, color: '#717171' }}>{this.state.chargeMileage} {I18n.t('translation.mileageAlert_02')}</Text>
                            <View style={styles.modalBtnView}>
                                <TouchableOpacity style={[styles.modalBtn, {width:'50%'}]}
                                    onPress={this.toggleModal}>
                                    <Text style={{ fontSize: 12, color: '#929292' }}>{I18n.t('translation.cancel')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.modalBtn, {width:'50%'}]}
                                    onPress={this.toMileageChargeComp}>
                                    <Text style={{ fontSize: 12, color: '#ff0000' }}>{I18n.t('translation.check')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>)
                    }

                </Modal>
                
                
            </View>
            </TouchableWithoutFeedback>
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
        color: '#717171'
    },
    sendIdInput: {
        width: '90%',
        height: 50,
        backgroundColor: '#f5f5f8',
        fontSize: 18,
        paddingLeft: '3%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e8e8e8'
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

});


const mapStateToProps = (state) => ({
    //mileageHome : state.MileageHomeStore,
    jwt : state.AuthStore.jwt,
    mileageChargeStore: state.MileageChargeStore,
  
});

const mapDispatchToProps = (dispatch) => ({
    mileageChargeRequest : (values) => dispatch(mileageChargeAction.mileageChargeRequest(values)),
    mileageChargeClear : () => dispatch(mileageChargeAction.mileageChargeClear()),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(MileageChargeScreen);

export default connected;