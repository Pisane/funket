import React from 'react';
import { 
    StyleSheet,
    View,
    Text,
    Image,
    TouchableOpacity
} from 'react-native';
import I18n from '../i18n';
import { fonts } from '../styles';
//표기 잘 되는지 이름 변경 넣어봤습니다. 
    const itemNameCheck = (name) =>{
            switch(name){
                case "Gold" : 
                    return "금광 개발권"
                case "Chamchi":
                    return "참치 지분권" 
            }
    }
    
export default function MileageListCard(props){
    const {navigation} = props;

    return (
        <View style={styles.mainContainer}>
        <View style={styles.container}>
            {props.data.map((item, idx) => (
            <TouchableOpacity 
            style={styles.tradeList} 
            key={`View_item-${idx+1}`}
            onPress={() => navigation.navigate('TradeDetail', {data: item})}
            >
                <View style={styles.listName}>
                <Text style={[{fontSize: 14}, styles.font]}>{itemNameCheck(item.name)} </Text>
                </View>
                <View style={styles.listDetail}>
                <Text style={[{color: '#b4b4b4', fontSize: 10}, styles.font]}>{I18n.t('translation.remainItem02')} <Text style={[{color: '#000000', fontSize: 12}, styles.font]}>{item.able_count} {I18n.t('translation.count')}</Text></Text>
                <Text style={[{color: '#b4b4b4', fontSize: 10}, styles.font]}>{I18n.t('translation.itemCount')} <Text style={[{color: '#0090ff', fontSize: 16}, styles.font]}>{item.able_count} USDT</Text></Text>
                </View>
            </TouchableOpacity>
            ))}
        </View>
        
    </View>
    );
}



const styles = StyleSheet.create({
    mainContainer:{
        // flex:1,
        width: '100%',
        // alignItems: 'center',
    },
    font: {
        fontFamily: fonts.primaryRegular,
        includeFontPadding: false
    },
    container:{
        width: '100%',
        alignItems: 'center',
    },
    tradeList:{
        backgroundColor: '#fff',
        // marginRight: 10,
        width: '90%',
        height: 60,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#d1d1d1',
        marginVertical: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: '5%',
        paddingRight: '5%'
        
    },
    listName:{
        width: '50%',
    },
    listDetail:{
        width: '50%',
        alignItems: 'flex-end'
    },
    itemText:{
        color: '#000'
    }
})
