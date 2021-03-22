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
} from 'react-native';
import Modal from 'react-native-modal';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { CustomButton, SubHeader} from '../../../../../components/index';
import { fonts } from '../../../../../styles';
import I18n from '../../../../../i18n';

import { connect } from 'react-redux';
import * as mileageSendAction from '../../../../../modules/main/home/mileage/mileagesend/mileageSend_store';

import {numberWithCommas} from '../../../../../util/comma';

const deviceHeight = Dimensions.get("window").height;
class MileageSendScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            sendId: null,
            sendMileage: null,
            //mileage: 0,
        };
    }

    componentDidMount(){
      
    }

    componentDidUpdate(){
        
        this.checkSendResult();
    }



    //모달 처리
    toggleModal = () => {
        console.log('modal call')
        this.setState({ isModalVisible: !this.state.isModalVisible })
    }
    //마일리지 보내기 완료시
    toMileageSendComp =  () => {
        const { navigation } = this.props;
        this.setState({ isModalVisible: !this.state.isModalVisible })
        if(this.props.homeStore.mileage>=this.state.sendMileage){

            // 요청하기
            this.props.mileageSendRequest({jwt: this.props.jwt, toId : this.state.sendId, value: this.state.sendMileage});
            
            
        }
        
    }
    //마일리지 입력 변경시 처리
    onMileageChanged(value) {
        let newText = '';
        let numbers = '0123456789';
    
        for (var i=0; i < value.length; i++) {
            if(numbers.indexOf(value[i]) > -1 ) {
                newText = newText + value[i];
            }
            else {
                // this.setState({sendMileage: null})
                Alert.alert(I18n.t('translation.onlyNumber'));
            
            }
        }
        this.setState({ sendMileage: value.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '') });

      }

    checkSendResult = () => {
     
        if(this.props.mileageSend.sendResult===1){
            //성공
            this.props.mileageSendClear();
            this.props.navigation.navigate('MileageSendComp', {id: this.state.sendId, mileage: this.state.sendMileage, remainValue: this.props.mileageSend.remainValue});
        } else if(this.props.mileageSend.sendResult===2){
            //실패
            this.props.mileageSendClear();
            Alert.alert(I18n.t('translation.sendmileage.text_1'), I18n.t('translation.sendmileage.text_2'));

        }
    }

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <SubHeader
                title={I18n.t('translation.giftMileage')}
                mode='close'
                onPress={() => navigation.goBack()}
                ></SubHeader>
                <ScrollView style={{ width: '100%' }}>
                    <View style={styles.header}>
                        <View style={styles.possMileage}>
                            <Text>{I18n.t('translation.myMileage')}</Text>
                            <View style={styles.possDetail}>
                                <Text style={[{ fontSize: 24, fontWeight: 'bold' }, styles.font]}>{numberWithCommas(this.props.homeStore.mileage) + ' G'}</Text>
                                <View style={{ width: 74, height: 40 }}>
                                    <CustomButton
                                        title={I18n.t('translation.charge')}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles.sendDetail}>
                        <Text style={[styles.sendDetailText, styles.font]}>{I18n.t('translation.recipient')}</Text>
                        <TextInput style={styles.sendIdInput}
                            placeholder={I18n.t('translation.placeholder_02')}
                            keyboardType={"default"}
                            underlineColorAndroid='transparent'
                            onChangeText={(_sendId) => this.setState({ sendId: _sendId })}
                        ></TextInput>
                        <Text style={[styles.sendDetailText, styles.font]}>{I18n.t('translation.toGiftMileage')}</Text>
                        <TextInput style={styles.mileageSendInput}
                            placeholder={I18n.t('translation.placeholder_03')}
                            keyboardType="numeric"
                            underlineColorAndroid='transparent'
                            onChangeText={(_sendMileage) => this.onMileageChanged(_sendMileage)}
                        />

                    </View>
                </ScrollView>
                <View style={styles.botBtnView}>
                    <View style={styles.botBtn}>
                        <CustomButton
                            title={I18n.t('translation.toSend')}
                            onPress={()=>this.toggleModal()}
                        >

                        </CustomButton>

                    </View>

                </View>



                <Modal
                    style={styles.modal}
                    isVisible={this.state.isModalVisible}
                    hideModalContentWhileAnimating={false}>
                    {!this.state.sendId || !this.state.sendMileage ?
                        (<View style={[styles.modalView, {height: 108}]}>
                            <Text style={{ fontSize: 12, marginTop: 20.5, color: '#717171' }}>{I18n.t('translation.modalMileage_01')}</Text>
                            <View style={styles.modalBtnView}>
                                 <TouchableOpacity style={[styles.modalBtn, {width:'100%'}]}
                                    onPress={this.toggleModal}>
                                    <Text style={{ fontSize: 12, color: '#ff0000' }}>{I18n.t('translation.check')}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>)
                        :
                        (<View style={[styles.modalView, {height: 288}]}>
                            <Text style={[{ fontSize: 16, fontWeight: 'bold', marginTop: 29 }, styles.font]}>{I18n.t('translation.giftMileage')}</Text>
                            <Text style={{ fontSize: 12, marginTop: 47.5, color: '#717171' }}>{I18n.t('translation.modalMileage_02', {name: this.state.sendId})}</Text>
                            <Text style={{ fontSize: 12, marginTop: 29.5, color: '#717171' }}>{I18n.t('translation.toGiftMileage')}</Text>
                            <Text style={{ fontSize: 21, fontWeight: 'bold', marginTop: 15 }}>{this.state.sendMileage} G</Text>
                            <View style={styles.modalBtnView}>
                                <TouchableOpacity style={[styles.modalBtn, {width:'50%'}]}
                                    onPress={this.toggleModal}>
                                    <Text style={{ fontSize: 12, color: '#929292' }}>{I18n.t('translation.cancel')}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.modalBtn, {width:'50%'}]}
                                    onPress={this.toMileageSendComp}>
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
    homeStore : state.HomeStore,
    jwt : state.AuthStore.jwt,
    mileageSend : state.MileageSendStore,
  
});

const mapDispatchToProps = (dispatch) => ({
    mileageSendRequest : (values) => dispatch(mileageSendAction.mileageSendRequest(values)),
    mileageSendClear : () => dispatch(mileageSendAction.mileageSendClear()),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(MileageSendScreen);

export default connected;