import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  ScrollView,
  FlatList,
  TextInput,
  Alert
} from 'react-native';

import {SubHeader} from '../../../components/index';
import I18n from '../../../i18n/index';

import {connect} from 'react-redux';

import * as addReferrerActions from '../../../modules/myinfo/addReferrer/addReferrer_store';

class AddReferrerScreen extends Component {
    constructor(props){
        super(props);
        this.state={
            referrer: '',
            isBtnClicked: false,
        }
    }

    componentDidMount(){
      

    }

    componentDidUpdate(){
        if(this.state.isBtnClicked && this.props.addReferrerResult === 1){
            this._alertSuccess();
            this.setState({isBtnClicked: false})
        }else if(this.state.isBtnClicked && this.props.addReferrerResult === 2){
            this._alertFail();
            this.setState({isBtnClicked: false})

        }
    }

    _alertSuccess(){
        // Alert.alert("추천인을 등록하였습니다.");
        Alert.alert(I18n.t('translation.addref.text_5'))
    }
    _alertFail(){
        // Alert.alert("추천인을 등록하는데 실패하였습니다. 다시 한번 시도해주시기 바랍니다.");
        Alert.alert(I18n.t('translation.addref.text_6'))
    }
    
    render(){
        const { navigation } = this.props;
        
        

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
                                추천인 등록
                            </Text>
                        </View >
                        <View style={styles.headerDivineRight}/>

                    </View>
                </View> */}
                <SubHeader
                    // title='추천인 등록'
                    title={I18n.t('translation.addref.text_1')}
                    mode='back'
                    onPress={()=> navigation.goBack()}/>

                <View style={styles.bodyContainer}>
                    <View style={styles.referrerContainer}>
                        <Text style={styles.referrerText}>
                            {/* 추천인 */}
                            {I18n.t('translation.addref.text_2')}
                        </Text>
                        <TextInput
                            style={styles.referrerInputContainer}
                            onChangeText={(referrer)=>this.setState({referrer})}
                        />
                        <Text style={styles.referrerInfoText}>
                            {/* 추천인 아이디를 입력하면 추천인에게 보너스가 지급됩니다. */}
                            {I18n.t('translation.addref.text_3')}
                        </Text>
                        

                    </View>
                    <TouchableOpacity 
                        style={styles.buttonContainer}
                        onPress={()=>{
                            this.setState({isBtnClicked: true})
                            this.props.addReferrerRequest({jwt: this.props.jwt, id: this.state.referrer})
                        }}
                        >
                        <Text style={styles.buttonText}>
                            {/* 등록 완료 */}
                            {I18n.t('translation.addref.text_4')}
                        </Text>
                    </TouchableOpacity>
                    
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
        borderBottomWidth: 1,
        borderBottomColor: '#e8e8e8',
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
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        //marginTop: '2.5%',
       
    },

    referrerContainer:{
        width:'100%',
    },
    referrerText: {
        marginTop : 23.5,
        fontSize : 14,
        marginLeft: '5%',
        marginBottom: 8.5,
    },
    referrerInputContainer: {
        height: 51,
        width: '90%',
        backgroundColor: '#F2F2F7',
        borderRadius: 10,
        marginBottom: 7,
        marginLeft: '5%',
        paddingLeft: 10,
    },
    referrerInfoText: {
        fontSize : 11,
        marginLeft: '5%',
        color: '#AEAEB2',
    },
    buttonContainer:{
       flexDirection: 'row',
       alignItems: 'center',
       justifyContent: 'center',
       backgroundColor : '#0090FF',
       width: '90%',
       height: 51,
       borderRadius: 10,
       marginBottom: '7%',
    },
    buttonText:{
        fontSize: 18,
        color: '#ffffff',
    }
  

});


const mapStateToProps = (state) => ({
   addReferrerResult : state.AddReferrerStore.result,
   jwt : state.AuthStore.jwt,
});

const mapDispatchToProps = (dispatch) => ({
   addReferrerRequest : (values) => dispatch(addReferrerActions.addReferrerRequest(values)),
});

const connected = connect(
    mapStateToProps,
    mapDispatchToProps
)(AddReferrerScreen);

export default connected;