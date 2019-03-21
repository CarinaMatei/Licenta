import React, { Component } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

export default class TestComponent extends Component {
    constructor(props) {
        super(props)
    }
  render() {
    let a = "ceva etxt";
    return (
      <View>
        <TouchableOpacity 
         onPress={() => {this.props.callbackFn}}
         >
         <Text>{this.props.message}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}