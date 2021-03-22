import React, { Component } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import {fonts} from '../styles';
// 공통 버튼 컴포넌트
// 일반적으로 사용되는 버튼 컴포넌트 입니다.
 /* props
    title (type : string)
    buttonColor (type : string)
    titleColor (type: string)
    nonClick (type: bool) // 버튼 클릭을 막고 싶을 때.
    onPress (type: function)
 */
export default class CustomButton extends Component{
  static defaultProps = {
    title: 'untitled',
    buttonColor: '#0090ff',
    titleColor: '#fff',
    nonClick: false,
    onPress: () => null,
  }

  constructor(props){
    super(props);
    this.state ={
      nonClick: this.props.nonClick,

    }
  }

  render(){
    return (
      <TouchableOpacity style={(this.props.nonClick)? (
        [styles.nonClickButton,
        {backgroundColor: '#e8e8e8'}
        ]) : (
        [styles.button,
        {backgroundColor: this.props.buttonColor}
        ])}
      onPress={this.props.onPress}
      disabled={this.props.nonClick}>
        
        <Text style={[
          styles.title,
          {color: this.props.titleColor}
        ]}>{this.props.title}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    borderRadius: 10,
  },
  nonClickButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 0,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontFamily: fonts.primaryRegular
  },
});