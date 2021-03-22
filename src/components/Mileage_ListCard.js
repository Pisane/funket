import React from 'react';
import {
    StyleSheet,
    View,
    Text,
} from 'react-native';

import {fonts} from '../styles/index';

import {numberWithCommas} from '../util/comma';


export default function Mileage_ListCard({item, index}){

    return (
        <View style={styles.list}>
            <View style={styles.listItem}>
                <View style={{width:'20%' }}><Text style={[{ color: '#8d8d8d', fontSize:10 },styles.font]}>{item.day} </Text></View>
                <View style={{width:'60%'}}><Text style={[{ color: '#000',fontSize:12},styles.font]}>{item.title} </Text></View>
                <View style={{width:'10%', alignItems: 'flex-end'}}>
                    <Text style={[{ color: item.type=="C" || item.type=="D" || item.type=="R" ? '#2692FF':'#FF6600',fontSize:13 },styles.font]}>
                        {
                            (item.type=="C" || item.type=="D" || item.type=="R" 
                            ? '+': '-') +numberWithCommas(item.value)
                        }
                    </Text>
                </View>
            </View>
            <View style={styles.listItem}>
                <View style={{width:'20%' }}></View>
                <View style={{width:'60%'}}><Text style={[{ color: '#AEAEB8',fontSize:10},styles.font]}>{item.time} </Text></View>
                <View style={{width:'10%', alignItems: 'flex-end'}}><Text style={[{ color: '#8E8E93',fontSize:10 },styles.font]}>{numberWithCommas(item.totalValue)}</Text></View>
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    font : {
        fontFamily: fonts.primaryRegular,
        includeFontPadding: false
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
