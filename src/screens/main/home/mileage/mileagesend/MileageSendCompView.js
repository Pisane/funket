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
import { CustomButton } from '../../../../../components/index';
import { fonts } from '../../../../../styles';
import I18n from '../../../../../i18n';

import {numberWithCommas} from '../../../../../util/comma';

const deviceHeight = Dimensions.get("window").height;
class MileageSendCompScreen extends Component {
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
        
       const { id, mileage, remainValue } = route.params;

        return (
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={[styles.titleText, styles.font]}></Text>
                    <TouchableOpacity style={styles.backBtn}
                        onPress={() => navigation.navigate('Home')}>
                        <FeatherIcon name='x' size={28}/></TouchableOpacity>
                </View>
                <ScrollView style={{ width: '100%' }}>
                    <View style={styles.header}>
                        <View style={styles.possMileage}>
                            <Text style={[styles.font, styles.possText]}><Text style={[styles.font, {color:'#0090ff', fontWeight:'bold', fontSize: 24}]}>{id}</Text> {I18n.t('translation.toPerson')}</Text>
                            <Text style={[styles.font, styles.possText]}>{numberWithCommas(mileage)}{I18n.t('translation.mileageGiftTo')}</Text>
                        </View>
                    </View>
                    <View style={styles.sendDetail}>
                        <View style={styles.sendDetailTitle}>
                            <Text style={[styles.font, {fontWeight:'bold', fontSize: 14}]}>{I18n.t('translation.giftMileage02')}</Text>
                        </View>
                        <View style={styles.detailView}>
                        <View style={styles.detailText}>
                            <Text style={[styles.detailName, styles.font]}>{I18n.t('translation.recipient')}</Text>
                            <Text style={[styles.detailName, styles.font]}>{I18n.t('translation.toGiftMileage02')}</Text>
                            <Text style={[styles.detailName, styles.font]}>{I18n.t('translation.remainMileage')} </Text>
                        </View>
                        <View style={styles.detailText}>
                            <Text style={[styles.detailNum, styles.font]}>{id} </Text>
                            <Text style={[styles.detailNum, styles.font]}>{numberWithCommas(mileage) + ' G'} </Text>
                            <Text style={[styles.detailNum, styles.font]}>{numberWithCommas(remainValue) + ' G'} </Text>
                        </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.botBtnView}>
                    <View style={styles.botBtn}>
                        <CustomButton
                            // title={'확인'}
                            title={I18n.t('translation.check')}
                            onPress={() => {navigation.navigate('Home')}}
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
        width: '90%',
        height: '10%',
        marginTop: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        // borderBottomWidth: 1,
        // borderBottomColor: '#e5e5e5'
    },
    botBtnView: {
        width: '90%',
        flex: 1,
        justifyContent: 'flex-end',
        flexDirection: 'column',
        // position: 'absolute'
    },
    possMileage:{
        width: '80%'
    },
    possText :{
        fontSize: 24
    },
    sendDetail:{
        width: '100%',
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
        width: '40%',
    },
    detailName:{
       fontSize: 12,
       marginBottom: 15,
       color: '#787878'
    },
    detailNum:{
        fontSize: 12,
        marginBottom: 15,
    },
    botBtn: {
        width: '100%',
        height: 50,
        marginBottom: 19
    },

});
export default MileageSendCompScreen;