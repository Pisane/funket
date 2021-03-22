import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    TouchableOpacity
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { fonts } from '../../styles';

// 공통 헤드 컴포넌트
// sub page에서 사용되는 header section 컴포넌트입니다. (back, close형태의 modal)
 /* props
    title (type : string)
    mode (type : string { 'back' , 'close' , 'chat'  })
    onPress (type : function)
    reportOnPress (type: function)
 */
export default class SubHeader extends Component{
  
    static defaultProps ={
        title: 'untitled',
        mode: 'default',
        underLine: true,
        onPress: () => null,
        reportOnPress: () => null,
    }
    constructor(props){
        super(props);
    }
    render(){
        const {navigation} = this.props;
        let backIconView = null;
        let closeIconView = null;
        if(this.props.mode === 'back'){
            backIconView = <TouchableOpacity style={styles.backIcon}
                        onPress={this.props.onPress}>
                        <FeatherIcon name='arrow-left' size={28} />
                        </TouchableOpacity>;
            closeIconView = <View style={styles.closeIcon}></View> 
        }else if (this.props.mode === 'close'){
            backIconView = <View style={styles.backIcon}></View> 
            closeIconView = <TouchableOpacity style={styles.closeIcon}
                            onPress={this.props.onPress}>
                            <FeatherIcon name='x' size={28} />
                            </TouchableOpacity>
        }else if (this.props.mode === 'chat'){
            backIconView = <TouchableOpacity style={styles.backIcon}
                            onPress={this.props.onPress}>
                            <FeatherIcon name='arrow-left' size={28} />
                            </TouchableOpacity>;
            closeIconView = <TouchableOpacity style={styles.closeIcon}
            onPress={this.props.reportOnPress}>
            <Text style={[styles.font, {fontSize:14, color:'#717171'}]}>신고</Text>
            </TouchableOpacity>
        }else {
            backIconView = <View style={styles.backIcon}></View> 
            closeIconView = <View style={styles.closeIcon}></View> 
        }

    return (
        <View style={(this.props.underLine) ? (styles.headerContainer) : (styles.noneLineHeaderContainer)}>
            <View style={styles.headerBox}>
         {backIconView}
       
        <View style={styles.headerTitle}> 
        <Text style={[styles.headerTitleText, styles.font]}>{this.props.title}</Text>
        </View>
       {closeIconView}
       </View>
        </View>

        );
    }
}



const styles = StyleSheet.create({
    font: {
        fontFamily: fonts.primaryRegular,
        includeFontPadding: false
    },
    headerContainer:{
        width: '100%',
        height: 107,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e2e2e2',
        paddingTop: 50,
        alignItems:'center'
    },
    noneLineHeaderContainer:{
        width: '100%',
        height: 107,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#ffffff',
        paddingTop: 50,
        alignItems:'center'
    },
    headerBox:{
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerTitle:{
        flex: 6,
        alignItems: 'center',
    },
    headerTitleText:{
        fontSize: 24,
        color: '#000000',
        fontWeight:'500',
        fontFamily:fonts.primaryRegular,
        justifyContent: 'center',
        alignItems:'center'
    },
    backIcon: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    closeIcon:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
})
