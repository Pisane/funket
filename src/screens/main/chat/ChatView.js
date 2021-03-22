import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  ImageBackground,
  Text
} from 'react-native';

import {TabHeader} from '../../../components/index';
class ChatScreen extends Component {
    constructor(props){
        super(props);

    }
    render(){
        return (
            <View>
                <TabHeader
                title='채팅'
                ></TabHeader>
            </View>
        );
    }
}

export default ChatScreen;