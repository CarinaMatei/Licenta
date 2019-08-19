import React, { Component } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, ScrollView, Linking, ImageBackground } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Stars from 'react-native-stars';

export default class ObjectiveDetailPage extends Component {
    constructor(props) {
        super(props)
    }
  render() {
    let objectiveLocation = {
      lat: parseFloat(this.props.data.geolocation.split(",")[0]),
      long: parseFloat(this.props.data.geolocation.split(",")[1])
    }
    return (
        <View>
          <View style={styles.header}>
            <ImageBackground 
                    source={require("/Licenta/mobileApp/assets/imgs/signInBack.jpg")}
                    style={{width: '100%', height: '100%'}}>
            <View style={styles.headerContent}>
              <TouchableOpacity style={styles.backButton} onPress={() => {this.props.backFunction()}}>
                <Image
                  resizeMode="contain"
                  source={require("/Licenta/mobileApp/assets/icons/back.png")}
                />
              </TouchableOpacity>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{this.props.data.title}</Text>
              </View>
            </View>
            </ImageBackground>
          </View>
          <ScrollView style={{marginBottom: 50}}>
            <Image
              resizeMode="contain"
              source={require("/Licenta/mobileApp/assets/imgs/pic1.jpg")}
              style={styles.objImg}
            />
            <Text style={styles.imageTitle}> {this.props.data.title}</Text>
            <View style={styles.infoView}>
              <Text style={styles.infoTitle}>Informations</Text>
              <Text style={styles.info}>
                <Image source={require("/Licenta/mobileApp/assets/icons/location.png")}>
                </Image>  {this.props.data.address}
              </Text>
              <Text style={styles.info}>
                <Image source={require("/Licenta/mobileApp/assets/icons/timetable.png")}>
                </Image>  {this.props.data.timetable}
              </Text>             
              <TouchableOpacity onPress={() => Linking.openURL("tel:" + this.props.data.tel)}>
                <Text style={styles.info}>
                  <Image source={require("/Licenta/mobileApp/assets/icons/tel.png")}>
                  </Image>  {this.props.data.tel}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL("mailto:" + this.props.data.email)}>
                <Text style={styles.info}>
                  <Image source={require("/Licenta/mobileApp/assets/icons/email.png")}>
                  </Image>  {this.props.data.email}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL("http://www.facebook.com/" + this.props.data.web)}>
                <Text style={styles.info}>
                  <Image source={require("/Licenta/mobileApp/assets/icons/facebook.png")}>
                  </Image>  {this.props.data.facebook}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => Linking.openURL("http://" + this.props.data.web)}>
                <Text style={styles.info}>
                  <Image source={require("/Licenta/mobileApp/assets/icons/web.png")}>
                  </Image>  {this.props.data.web}
                </Text>
              </TouchableOpacity>                   
              
              <View style={{flex:1, flexDirection:"row", marginBottom: 10}}>
                <Text style={styles.infoRating}> Rating:</Text>
                  <View style={{marginTop: 10}}>
                    <Stars
                        half={true}
                        default={this.props.data.rating/10}
                        spacing={4}
                        starSize={25}
                        count={5}
                        fullStar={require('/Licenta/mobileApp/assets/icons/star.png')}
                        emptyStar={require('/Licenta/mobileApp/assets/icons/starempty.png')}
                        halfStar={require('/Licenta/mobileApp/assets/icons/starhalf.png')}/>
                  </View>
              </View>
            </View>

            <MapView style={{height:300}}
            initialRegion={{
              latitude: objectiveLocation.lat,
              longitude: objectiveLocation.long,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}>
            </MapView>
            <Marker
              coordinate={{latitude: objectiveLocation.lat,longitude:objectiveLocation.long}}
              title="title"
              description="desc"
            />
            <TouchableOpacity style={styles.navigateButton} 
                onPress={() => Linking.openURL('google.navigation:q=' + objectiveLocation.lat + ',' + objectiveLocation.long)}>
              <Text style={styles.navigateText}>Navigate</Text></TouchableOpacity>

            <View style={styles.infoView}>
              <Text style={styles.infoTitle}>Description</Text>
              <Text style={styles.info}>{this.props.data.description}</Text>
            </View>
          </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    content: {
      flex: 1,
      height: 300,
      backgroundColor: "#CEE3F6",
      borderWidth: 0.5,
      borderColor: '#CEE3F6'
    },
    navigateButton: {
      flex: 1,
      width: "100%",
      height: 40,
      backgroundColor: "#e6709d"
    },
    objImg: {
      height: 300,
      width: "100%"
    },
    navigateText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: "#fff",
      textAlign: 'center',
      marginTop: 5,
      marginBottom: 5
    },
    header:{
      backgroundColor: "#01b4ae",
      height: 50
    },
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      color: "#fff",
      marginTop: 10,
      marginBottom: 10
    },
    headerContent: {
      flex: 1,
      flexDirection: "row"     
    },
    backButton:{
      flex: 0.1,
      color: "#fff",
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 5
    },
    titleContainer: {
      flex: 0.8,
      flexDirection: "row",
      color: "#fff",
      justifyContent: "center"
    },
    infoTitle: {
      margin:10,
      color: "#222",
      fontSize: 25,
      borderBottomWidth: 1,
      marginBottom: 2
    },
    info: {
      flex: 1,
      fontSize: 15,
      color: '#333',
      marginBottom: 13,
      marginLeft: 10,
      marginTop: 10,
      marginBottom: 10
    },
    infoRating: {
      flex: 0.4,
      fontSize: 15,
      color: '#333',
      marginBottom: 13,
      marginLeft: 10,
      marginTop: 10,
      marginBottom: 10
    },
    infoView: {
      flex: 1,
      borderRadius: 0,
      borderWidth: 0.5,
      borderColor: '#333',
      margin: 15,
      shadowOffset: {width: 10,  height: 10},
      shadowColor: '#333',
      shadowOpacity: 1.0,
      shadowRadius: 10
    },
    imageTitle: {
      fontSize: 25,
      fontWeight: 'bold',
      color: '#333'
    },
    imageHolder: {
      flex: 0.9,
    },
    textHolder: {
      flex: 0.1
    }
  });