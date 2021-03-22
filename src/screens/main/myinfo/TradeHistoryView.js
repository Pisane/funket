import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  ScrollView,
  SectionList
} from 'react-native';

import {SubHeader} from '../../../components/index';
import I18n from '../../../i18n/index';

import {connect} from 'react-redux';

import * as tradeHistoryActions from '../../../modules/myinfo/tradeHistory/tradeHistory_store';

import {numberWithCommas} from '../../../util/comma';



class TradeHistoryScreen extends Component {
    constructor(props){
        super(props);

    }

    componentDidMount(){
        this.focusListener = this.props.navigation.addListener("focus", () => {
    
            this.props.tradeHistoryRequest({jwt: this.props.jwt, lang : this.props.lang});
        
          });
        
        //console.log(this.props.TradeHistory.TradeHistory)
    }
    

    _renderHeaderItem = ({section}) => (
        <View sytle={styles.sectionHeaderContainer}>
            <Text style={styles.sectionHeaderText}>
                {section.title}
            </Text>
        </View>
        
    );
    _renderItem = ({item}) => (
        <TouchableOpacity 
            style={styles.sectionContainer}
            onPress={()=>this.props.navigation.navigate('TradeHistoryDetail',{type: item.type,seq: item.seq})}>
            <Text style={styles.sectionTimeText}>
                {item.time}
            </Text>
            
               
            <Text style={[styles.sectionTypeText,{color: item.type===1?'#0090ff':'#ff6600'}]}>
                {
                    item.type===1 ? 
                        // '구매완료' 
                        I18n.t('translation.tradehistory.text_4')
                    : 
                        // '판매완료'
                        I18n.t('translation.tradehistory.text_5')
                }
            </Text>
            
            <Text style={styles.sectionNameText}>
                {item.name}
            </Text>
            <Text style={styles.sectionCountText}>
                {/* {item.count+'장'} */}
                {I18n.t('translation.tradehistory.text_6',{count: item.count})}
            </Text>
            <Text style={[styles.sectionPriceText,{color: item.type===1?'#0090ff':'#ff6600'}]}>
                {numberWithCommas(item.price)+' USDT'}
            </Text>
        </TouchableOpacity>
    );
    

    render(){
        const { navigation } = this.props;
        navigation
       

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
                                거래 내역
                            </Text>
                        </View >
                        <View style={styles.headerDivineRight}/>

                    </View>
                </View> */}
               <SubHeader
                    // title='거래 내역'
                    title={I18n.t('translation.tradehistory.text_1')}
                    mode='back'
                    onPress={()=> navigation.goBack()}/>

                <View style={styles.bodyContainer}>
                    <View style={styles.itemConfigContainer}>
                        <Text style={styles.itemTitle}>
                            {/* 금광 */}
                            {I18n.t('translation.tradehistory.text_2')}
                        </Text>
                        {/* <Text style={styles.dateFilter}>
                            최근 1개월
                        </Text> */}
                    </View>

                    <View style={styles.sectionListContainer}>
                        {
                            this.props.TradeHistory.TradeHistory[0].title != '' ?
                            <SectionList 
                                sections={this.props.TradeHistory.TradeHistory}
                                keyExtractor={(item, index)=> 'key_'+index}
                                renderSectionHeader={this._renderHeaderItem}
                                renderItem={this._renderItem}
                            />
                            :
                            <View style={styles.emptyContainer}>
                                    <Image
                                        style = {styles.emptyImage}
                                        source = {require('../../../../assets/images/icons/icon_Empty.png')}
                                    />

                                    <Text style={styles.emptyText}>
                                        {/* 거래 내역을 찾을 수 없습니다. */}
                                        {I18n.t('translation.tradehistory.text_3')}
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
    itemConfigContainer:{
        height : 53.5,
        width: '100%',
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e8',
    },
    itemTitle:{
        marginLeft: '10%',
        fontSize: 16,
        fontWeight: '500',
    },
    dateFilter:{
        fontSize: 12,
        color: '#b4b4b4',
        marginRight: '5%',
    },
    sectionListContainer:{
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: 5,
        borderTopColor:'#E5E5EA',
        borderTopWidth: 1,
        borderBottomColor:'#E5E5EA',
        borderBottomWidth: 1,
        backgroundColor: '#ffffff',
    },
    sectionHeaderContainer:{
        width: '100%',
        height : 32,
        // borderTopColor: '#e8e8e8',
        // borderTopWidth: 1,
    },
    sectionHeaderText:{
        marginTop: '6%',
        fontSize: 12,
        marginLeft: '5%',
    },
    sectionContainer:{
        width: '100%',
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
       
    },
    sectionTimeText:{
        fontSize: 12,
        marginRight: '3.75%',
        marginLeft: '6%',
        color: '#AEAEB2',
    },
    sectionTypeText:{
        fontSize: 12,
        marginRight: '4.3%',
    },
    sectionNameText:{
        fontSize: 12,
        marginRight: '27.5%',
    },
    sectionCountText:{
        width: 40,
        fontSize: 12,
        marginRight: '2.5%',
        color:'#636366',
        textAlign: 'right',
    },
    sectionPriceText:{
        width: 80,
        fontSize: 12,
        textAlign: 'right',

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
    MyInfo : state.MyinfoStore.myInfoData,
    TradeHistory : state.TradeHistoryStore,
    jwt : state.AuthStore.jwt,
    lang : state.AuthStore.lang,
});

const mapDispatchToProps = (dispatch) => ({
    tradeHistoryRequest : (values) => dispatch(tradeHistoryActions.tradeHistoryRequest(values)),
    
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(TradeHistoryScreen);

export default connected;