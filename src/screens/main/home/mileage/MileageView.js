import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ImageBackground,
    Text,
    ScrollView,
    Dimensions,
    TextInput,
    FlatList
} from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';
import I18n from '../../../../i18n/index.js';
import { CustomButton, SubHeader} from '../../../../components/index';
import Mileage_ListCard from '../../../../components/Mileage_ListCard';
import {fonts} from '../../../../styles'

import { connect } from 'react-redux';
import * as mileageHomeAction from '../../../../modules/main/home/mileage/home/mileageHome_store';

import {numberWithCommas} from '../../../../util/comma';

//state ListData 는 임시로 작성


//마일리지 스크린의 특이사항으로 listdata의 양이 가변적이기 때문에 단순 스크롤뷰로 처리하지 않고 FlatList로 처리했습니다.
class MileageScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener("focus", () => {
    
            this.props.mileageHomeRequest({jwt: this.props.jwt, lang: this.props.lang})
        
          }); 
    }

    ChargeReady(data, _navigation) {

        return (
            
            <View style={{width:'100%', alignItems:'center', marginTop: 10}}>
        {data.data.map((item, idx) => (
        <TouchableOpacity 
        style={{borderRadius:10, borderWidth:1, borderColor: '#e8e8e8', width: '100%', height: 60, marginBottom: 8,
        justifyContent: 'space-between',
        flexDirection: 'column', alignItems:'center', paddingLeft:'5%', paddingRight:'5%'}}
        key={`cardList_item-${idx+1}`}
         onPress={() => navigation.navigate('TradeDetail', {data: item})}
        >
            <Text style={[styles.itemValue, styles.font]}>{numberWithCommas(item.value)+' G'} </Text>
           
            <Text style={[styles.itemTextReady, styles.font]}>{I18n.t('translation.TXID_Ready')}</Text>
            
            
        </TouchableOpacity>
        ))}
        </View>
        );
    }

    _renderChargeMileage = ({item})=> (
        
        <TouchableOpacity 
            style={{borderRadius:10, borderWidth:1, borderColor: '#e8e8e8', width: '80%', height: 60, marginBottom: 8,
            justifyContent: 'space-between',
            flexDirection: 'row', alignItems:'center', paddingLeft:'5%', paddingRight:'5%'}}
            //key={`cardList_item-${item.seq+1}`}
            onPress={() => this.props.navigation.navigate('MileageChargeTxid', {data: item})}
        >
                <Text style={[styles.itemValue, styles.font]}>{numberWithCommas(item.value)} </Text>
                <Text style={[styles.itemTextReady, styles.font]}>{I18n.t('translation.TXID_Ready')}</Text>
        </TouchableOpacity>
    );

    render() {
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <SubHeader
                    // title='마일리지'
                    title={I18n.t('translation.mileagehome.text_1')}
                    mode='back'
                    onPress={()=> navigation.goBack()}/>

                <FlatList
                style={styles.listSection}
                ListHeaderComponent={
                    <>
                    <View style={styles.header}>
                    <View style={styles.headerTitle}>
                        <Text  style={[styles.font,styles.subTitle]} >{I18n.t('translation.myMileage')}</Text>
                    </View>
                    <View style={styles.myMileage}>
                    <View style={styles.myMileageValue}>
                    <Text style={[styles.font, {fontWeight:'bold', fontSize: 24}]}>{numberWithCommas(this.props.mileageHome.mileage)}</Text>
                    <Text>G</Text>                        
                    </View>
                    <View style={styles.myMileageBtn}>
                        <CustomButton
                            title={I18n.t('translation.charge')}
                            onPress={() => navigation.navigate('MileageCharge',{mileage: this.props.mileageHome.mileage})}
                        >
                        </CustomButton>
                    </View>
                    </View>
                    {/* 보유마일리지  */}

                    <View style={styles.headerTitle}> 
                        <Text style={[styles.font,styles.subTitle]}>{I18n.t('translation.readyChargeMileage')}</Text>
                        {/* <this.ChargeReady
                        data ={this.state.chargeListData}
                        navigation = {navigation}
                        ></this.ChargeReady> */}
                    
                        <View style={{width:'100%', flexDirection: 'row', alignItems:'center', marginTop: 10}}>
                            {/* {
                                this.props.mileageHome.chargeMileageList.map((item, idx) => (
                                    <TouchableOpacity 
                                        style={{borderRadius:10, borderWidth:1, borderColor: '#e8e8e8', width: '100%', height: 60, marginBottom: 8,
                                        justifyContent: 'space-between',
                                        flexDirection: 'row', alignItems:'center', paddingLeft:'5%', paddingRight:'5%'}}
                                        key={`cardList_item-${idx+1}`}
                                        onPress={() => navigation.navigate('MileageChargeTxid', {data: item})}
                                    >
                                        <Text style={[styles.itemValue, styles.font]}>{item.value} </Text>
                                        <Text style={[styles.itemTextReady, styles.font]}>{I18n.t('translation.TXID_Ready')}</Text>
                                    </TouchableOpacity>
                                ))
                            } */}
                            {
                                this.props.mileageHome.chargeMileageList[0].seq != 0 ?
                                <FlatList
                                    data={this.props.mileageHome.chargeMileageList}
                                    renderItem={this._renderChargeMileage}
                                    keyExtractor = {(item, index)=> 'key_'+item.seq}
                                /> :
                                <View></View>
                            } 
                        </View>
                    </View>
                <View>
                </View>
                </View>

                <View style={styles.mileageHistory}>
                    <View style={styles.mileageHistoryTitle}>
                    <View style={styles.mileageHistoryTitleView}>
                        <Text  style={[styles.font,styles.subTitle]}>{I18n.t('translation.historyMileage')}</Text>
                        {/* <Text>드롭박스 TouchableOpacity </Text>                         */}
                    </View>

                    </View>
                </View>
                </>}

                data={this.props.mileageHome.listData[0].key != 0 ? this.props.mileageHome.listData: null}
                renderItem={Mileage_ListCard}
                keyExtractor={(item,index) => 'key_'+index}
                ListFooterComponent={
                    <View></View>
                }/>

            </View>
        );
    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        
    },
    font : {
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
    subTitle : {
        fontSize: 14,
        color: '#717171',
        
    },
    backBtn: {
        width: ' 90%',
        marginTop: 60,
        position: 'absolute',
    },
    titleText: {
        fontWeight: 'bold',
        marginTop: 55,
        fontSize: 25,
        color: '#000',
    },
    header: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: 30
    },
    headerTitle:{
        width: '90%',
        marginTop : 20,
    },
    myMileage:{
        width: '90%',
        height: 64,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e8',
        marginTop: 10
    },
    myMileageValue:{
        width: '78%',
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 10,
        backgroundColor: '#f5f5f8',
        marginRight: '2%',
        paddingLeft: '5%',
        paddingRight: '5%'
        
    },
    myMileageBtn:{
        width: '20%',
        height: 50,
    },
    mileageHistory:{
        width: '100%',
        marginTop: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderBottomColor: '#e8e8e8',
        borderBottomWidth: 1
    },
    mileageHistoryTitle:{
        width: '90%',
        height: 50,
        justifyContent: 'space-between',
    },
    mileageHistoryTitleView:{
        width: '100%',
        height: 50,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',

    },
    listSection:{
        width: '100%'
    },
    itemValue: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemTextClear:{
        fontSize: 12,
        color: '#b4b4b4'
    },
    itemTextReady:{
        fontSize: 12,
        color: '#0090ff'
    }
      

})


const mapStateToProps = (state) => ({
    mileageHome : state.MileageHomeStore,
    jwt : state.AuthStore.jwt,
    lang : state.AuthStore.lang,
});

const mapDispatchToProps = (dispatch) => ({
    mileageHomeRequest : (values) => dispatch(mileageHomeAction.mileageHomeRequest(values)),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(MileageScreen);

export default connected;