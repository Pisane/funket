import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    ImageBackground,
    Text,
    ScrollView,
    Dimensions
} from 'react-native';
import I18n from '../../../i18n';
import { CustomButton, TabHeader } from '../../../components/index';
import TradeListCard from '../../../components/TradeList';
import { fonts } from '../../../styles';

import { connect } from 'react-redux';
import * as tradeDataAction from '../../../modules/main/trade/trade_store';



var deviceWidth = Dimensions.get("window").width;
var deviceheight = Dimensions.get("window").height;
class TradeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        
        }
    }

    componentDidMount(){
        this.focusListener = this.props.navigation.addListener("focus", () => {
            this.props.tradeDataRequest({jwt: this.props.jwt, lang: this.props.lang})
        });
        
    }

    render() {
        const { navigation } = this.props;
        return (
            // 
            <View style={styles.container}>
               <TabHeader
               title={I18n.t('translation.title_01')}
               >

               </TabHeader>
                <ScrollView style={{ flex: 1, width: '100%' }}>
                    <View style={styles.header}>
                        <View style={styles.filter}>
                            <View style={styles.filterText}>
                                <Text style={[styles.font, {fontSize:16 } ]}>{I18n.t('translation.itemList_01')}</Text>
                            </View>
                            <View style={styles.filterBtn}></View>
                            {/* <CustomButton
                                title={I18n.t('translation.filter')}
                                onPress={() => navigation.navigate('Mileage')}
                            ></CustomButton> */}
                        </View>
                    </View>
                    <View style={styles.tradeSection}>
                        {
                            this.props.tradeDataStore.products[0].seq != null ?
                            <TradeListCard
                                data={this.props.tradeDataStore.products}
                                mileage = {this.props.mileage}
                                navigation={navigation}
                            ></TradeListCard> :
                            <View></View>
                        }
                        
                    </View>
                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        // backgroundColor: '#fff',
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
        borderBottomColor: '#e2e2e2'
    },
    titleText: {
        marginTop: 65,
        marginLeft: '5%',
        fontSize: 25,
        color: '#000',
    },
    header: {
        width: '100%',
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#fff',
    },
    filter: {
        width: '90%',
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: '5%',
        paddingRight: '5%'
    },
    filterText: {
        width: '45%',
        height: 30,
        justifyContent: 'center',


    },
    filterBtn: {
        width: '35%',
    },
    tradeSection: {
        width: '100%',
        alignItems: 'center',
    },
    tradeList: {
        backgroundColor: '#000',
        marginRight: 10,
        width: '90%',
        height: 100,
        borderRadius: 20,
    }

})

const mapStateToProps = (state) => ({
    tradeDataStore : state.TradeDataStore,
    jwt : state.AuthStore.jwt,
    mileage: state.HomeStore.mileage,
    lang : state.AuthStore.lang,
  
});

const mapDispatchToProps = (dispatch) => ({
    tradeDataRequest : (values) => dispatch(tradeDataAction.tradeDataRequest(values)),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(TradeScreen);

export default connected;
