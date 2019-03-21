import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView, Linking } from 'react-native';

export default class ObjectiveDetailPage extends Component {
    constructor(props) {
        super(props)
    }
  render() {
    return (
        <ScrollView>
          <TouchableOpacity onPress={() => {this.props.backFunction()}}><Text>Inapoi</Text></TouchableOpacity>
            <Image
                resizeMode="contain"
                source={require("/Licenta/mobileApp/assets/imgs/pic1.jpg")}
            />
            <Text>{this.props.data.title}</Text>
            <Text>Descriere :{this.props.data.description}</Text>
            <Text>Adresa :{this.props.data.address}</Text>
            <Text>Orar :{this.props.data.timetable}</Text>
            <TouchableOpacity onPress={() => Linking.openURL("tel:" + this.props.data.tel)}>
              <Text>Telefon :{this.props.data.tel}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL("mailto:" + this.props.data.email)}>
              <Text>Email :{this.props.data.email}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL("http://www.facebook.com/" + this.props.data.web)}>
              <Text>Facebook :{this.props.data.facebook}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => Linking.openURL("http://" + this.props.data.web)}>
              <Text>Web :{this.props.data.web}</Text>
            </TouchableOpacity>
            
            <Text>Rating :{this.props.data.rating}</Text>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    content: {
      flex: 1,
      height: 300,
      backgroundColor: "#ff0000",
      borderWidth: 0.5,
      borderColor: '#d6d7da',
    },
    imageHolder: {
      flex: 0.9,
    },
    textHolder: {
      flex: 0.1
    }
  });