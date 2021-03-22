import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
    FlatList,
    Image
} from 'react-native';
import {withNavigation} from '@react-navigation/native';
import I18n from '../../../i18n/index';
import { SliderBox } from 'react-native-image-slider-box';
import Carousel from 'react-native-snap-carousel';
import {fonts} from '../../../styles'
import ListCard from '../../../components/ListCard';

import { connect } from 'react-redux';
import * as homeAction from '../../../modules/main/home/homeStore';

import {numberWithCommas} from '../../../util/comma';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentIndex: 0,
            carouselAuto : true,
        };
    }
    componentDidMount() {


        const { navigation } = this.props;

        this.focusListener = navigation.addListener("focus", () => {
    
            this.props.homeDataRequest({jwt: this.props.jwt, lang : this.props.lang})
          });
        
       


    }
    _renderEvent = ({ item, index }) => {
        return (
            <View style={styles.eventSliderEvent}>
                <Text style={{ color: '#fff' }}>{item.title}</Text>
                <Text style={{ color: '#fff' }}>{item.text}</Text>
            </View>
        );
    }

    render() {

        const { navigation } = this.props;

        return (
            // 
            <View style={styles.container}>
                <View style={styles.title}>
                    <Image 
                        style={styles.titleIcon}
                        source = {require('../../../../assets/images/logo_funket.png')}
                        resizeMode='contain'>
                    </Image>
                </View>
                {/* <ScrollView> */}
                <FlatList
                ListHeaderComponent={
                    <>
                    <View style={styles.header}>
                        <View style={styles.headerText}>
                        <Text style={styles.font}>{I18n.t('translation.myMileage')}</Text>
                        </View>
                    </View>
                    <View style={styles.section}>
                        <TouchableOpacity style={styles.mileage}
                            onPress={() => navigation.navigate('Mileage')}
                        >
                            <View style={styles.mileageDetail}>
                                
                                <View style={styles.mileageVal}>
                                    <Text style={[{ fontSize: 20, color: '#ffffff'},styles.font]}>{numberWithCommas(this.props.homeStore.mileage)+'G'} </Text>
                                    <View style={styles.mileageBtn}>
                                        <TouchableOpacity
                                          onPress={() => navigation.navigate('MileageSend')}
                                        >
                                            <Text style={[styles.font, styles.mileageBtnFont]}>{I18n.t('translation.toSend')}</Text>
                                        </TouchableOpacity>
                                        <Text style={[styles.font, styles.mileageBtnFont]}> | </Text>
                                        <TouchableOpacity
                                        onPress={() => navigation.navigate('MileageCharge',{mileage: this.props.homeStore.mileage})}
                                        >
                                            <Text style={[styles.font, styles.mileageBtnFont]}>{I18n.t('translation.toCharge')}</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <View style={styles.eventSlider}>
                            <Carousel
                                layout={'default'}
                                ref={(c) => { this._carousel = c; }}
                                data={this.props.homeStore.carouselItems}
                                sliderWidth={deviceWidth}
                                itemWidth={deviceWidth * 0.9}
                                renderItem={this._renderEvent}
                                onSnapToItem={index => this.setState({ currentIndex: index })}
                                inactiveSlideScale={0.95}
                                keyExtractor={(item,index)=>'key_'+index}
                                // autoplay={this.state.carouselAuto}
                                // autoplayInterval={5000}
                                // loop={true}
                            />
                        </View>
                    </View>
                    <View style={styles.lineStyle_100_Thick}></View>
                    <View style={styles.bottom}>
                        <Text style={[styles.subTitle, styles.font]}>{I18n.t('translation.recentList')}</Text>
                        </View>
                        </>}
                            data={this.props.homeStore.listData}
                            renderItem={ListCard}
                            keyExtractor={(item,index) => item.seq}
                            ListFooterComponent={
                            <View style={styles.banner}>
                            {/* <TouchableOpacity style={styles.bannerItem}>
                                <Text style={styles.font}>{I18n.t('translation.event01')}</Text>
                            </TouchableOpacity> */}
                        </View>
                        }/>                    
            </View>
        );
    }
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    font : {
        fontFamily: fonts.primaryRegular,
        includeFontPadding: false
    },
    lineStyle_100_Thick: {
        backgroundColor: '#f5f7f8',
        height: 10,
        width: '100%',
    },
    title: {
        width: '100%',
        height: 97.5,
        backgroundColor: '#fff',
    },
    titleIcon: {
        width: 93,
        height: 24,
        marginTop: 50,
        marginLeft: '5%',
        // fontSize: 25,
        // color: '#000',
    },
    header: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    headerText: {
        width: '90%',
        marginBottom: 4,
    },
    section: {
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    banner: {
        width: '100%',
        alignItems: 'center',
    },
    bannerItem: {
        width: '90%',
        height: 50,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#B8B8B8',
    },
    mileage: {
        width: '90%',
        height: 59,
        backgroundColor: '#0090ff',
        borderRadius: 10,
        
        justifyContent: 'center',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#4d4d4d',
                shadowOffset: {
                    width: 8,
                    height: 8,
                },
                shadowOpacity: 0.3,
                shadowRadius: 15,
            }, android: {
                elevation: 8,
            },
        }),

    },
    mileageDetail: {
        width: '90%'
    },
    mileageVal: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    mileageBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    mileageBtnFont: {
        color: '#ffffff'
    },
    userName: {
        fontSize: 25,
        fontWeight: 'bold'
    },

    eventSlider: {
        width: '100%',
        marginTop: 20,
        marginBottom: 20
    },
    eventSliderEvent: {
        width: '100%',
        height: 184,
        backgroundColor: '#000',
        borderRadius: 20,
    },
    bottom: {
        width: '100%',
        height: 60,
        marginTop: 10,
        // height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        borderBottomWidth: 1,
        borderColor: '#B8B8B8',
    },
    subTitle: {
        width: '90%',
        // marginVertical: 10,
        fontSize: 14
    },
    list:{
        width: '100%',
        height: 49,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderColor: '#B8B8B8',
    },
    listItem:{
        flexDirection: 'row',
        justifyContent: 'space-between'

    }
})

const mapStateToProps = (state) => ({
    homeStore : state.HomeStore,
    jwt : state.AuthStore.jwt,
    lang : state.AuthStore.lang,
  
});

const mapDispatchToProps = (dispatch) => ({
    homeDataRequest : (values) => dispatch(homeAction.homeDataRequest(values)),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);

export default connected;

