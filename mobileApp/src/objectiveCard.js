import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native';

export default class ObjectiveCard extends Component {
    constructor(props) {
        super(props)
    }
  render() {
    return (
      <TouchableOpacity style={styles.cardStyle} onPress={() => {this.props.clickFn(this.props.data)}}>
        <View style={styles.content}>
          <View style={styles.imageHolder}>
              <Image
                resizeMode="contain"
                source={require("/Licenta/mobileApp/assets/imgs/pic1.jpg")}
              />
          </View>
          <View style={styles.textHolder}>
              <Text>{this.props.data.title}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    cardStyle: {
      flex: 1,
      height: 300,
      backgroundColor: "#ff0000",
      borderWidth: 0.5,
      borderColor: '#d6d7da',
    },
    content: {
        flex: 1,
        flexDirection: "column"
    },
    imageHolder: {
      flex: 0.9
    },
    textHolder: {
     flex: 0.1
    },
    image: {
      flex:1,
      height: 50
    }
  });