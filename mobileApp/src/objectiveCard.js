import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, ImageBackground } from 'react-native';

class BackgroundImage extends Component {
  render() {
    return (
      <ImageBackground source={require("/Licenta/mobileApp/assets/imgs/pic1.jpg")} style={styles.backgroundImgStyle}>
        {this.props.children}
      </ImageBackground>
    )
  }
}

export default class ObjectiveCard extends Component {
    constructor(props) {
        super(props)
    }

    formatDistance = (dist) => {
      let formatedDistance = "";
      if(dist>1000) {
        formatedDistance = parseInt(dist/1000) + " km"; 
      } else {
        formatedDistance = dist + " m";
      }
      return formatedDistance;
    } 
  render() {
    return (
      <TouchableOpacity style={styles.cardStyle} onPress={() => {this.props.clickFn(this.props.data)}}>
        <BackgroundImage imgUrl={"/Licenta/mobileApp/assets/imgs/pic1.jpg"}>
          <View style={styles.content}>
          <View style={styles.rewardElement}>
            <Text style={styles.rewardText}>{this.props.data.reward}</Text>
          </View>
          <View style={styles.priceElement}>
            <Text style={styles.rewardText}>{this.props.data.price}</Text>
          </View>
            <View style={styles.textHolder}>
                <Text style={styles.imageTitle}>{this.props.data.title}</Text>
                <View style={styles.iconContainer}>
                  <Image resizeMode="contain" source={require("/Licenta/mobileApp/assets/icons/distance.png")} style={styles.locationImg}></Image> 
                  <Text style={styles.distance}>{this.formatDistance(this.props.data.distance)}</Text>
                </View>
            </View>
          </View>
        </BackgroundImage>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    cardStyle: {
      flex: 1,
      height: 300,
      backgroundColor: "#CEE3F6",
      borderWidth: 0.5,
      borderColor: '#d6d7da',
    },
    locationImg: {
      width: 15,
      height: 15
    },
    backgroundImgStyle: {
      flex:1,
      width: "100%",
      height: 300
    },
    iconContainer: {
      flexDirection: "row"
    },
    content: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end"
    },
    imageHolder: {
      flex: 0.8
    },
    textHolder: {
     flex: 0.2,
     height: 40,
     justifyContent:"flex-end",
     backgroundColor: "rgba(255,255,255, 0.6)"
    },
    image: {
      flex:1,
      height: 50
    },
    imageTitle: {
      color: '#333',
      fontSize: 15,
      paddingBottom: 5,
      paddingLeft: 3
    },
    distance: {
      fontSize: 15,
      color: '#333',
      paddingLeft: 3
    },
    rewardText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold'
    },
    rewardElement: {
      display: 'flex',
      position: 'absolute',
      top:15,
      right: 44,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#e6709d',
      borderBottomLeftRadius: 15,
      borderTopLeftRadius: 15,
      borderColor: '#fff',
      borderWidth: 1,
      width: 30,
      height: 30,
      zIndex: 100
    },
    priceElement: {
      display: 'flex',
      position: 'absolute',
      top:15,
      right: 15,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#01b4ae',
      borderBottomRightRadius: 15,
      borderTopRightRadius: 15,
      borderColor: '#fff',
      borderWidth: 1,
      width: 30,
      height: 30,
      zIndex: 100
    }
  });