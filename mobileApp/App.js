import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet, ActivityIndicator, TextInput, Image } from 'react-native';
import ObjectiveCard from './src/objectiveCard.js';
import ObjectiveDetailPage from './src/objectiveDetailPage.js';
import LoginPage from './src/loginPage.js';
import SignInPage from './src/signInPage.js';
import requests from './src/requests.js';
import {PermissionsAndroid} from 'react-native';
import geolib from 'geolib';

export default class HelloWorldApp extends Component {

  constructor() {
    super();
    global.baseColor = "#5ec9ff";
    this.filteredObjectives =null;
    this.state={
      currentPage: "loading", //todo change to login
      selectedObjective: null,
      objectives: null,
      searchText: "",
    }
  }

  componentDidMount() {
    console.log("mount ")
   
    this.requestLocation();
  }

  requestLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'text ' +
            'text',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use location');
        navigator.geolocation.getCurrentPosition((pos) => {
          console.log(pos);
          this.setState({
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude
          })
        }, (error) => {console.log(error)},
        {enableHighAccuracy: false, timeout: 5000, maximumAge: 1000});
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  getObjectives = async () => {
    const objectivesList = await requests.getObjectives();
    console.log(objectivesList);
    this.setState({
      objectives: objectivesList,
      currentPage: "home"
    })
  }

  clickCard = (objective) => {
    console.log("card clicked");
    this.setState({
      currentPage: "objectiveDetail",
      selectedObjective: objective
    })
  }

  goToHomePage = () => {
    this.setState({
      currentPage: "home",
      selectedObjective: null
    })
  }

  goToLoadingPage = () => {
    this.setState({
      currentPage: "loading",
      selectedObjective: null
    })
  }

  goToSignIn =() => {
    this.setState({
      currentPage: "signIn"
    })
  }

  goToLoginPage =() => {
    this.setState({
      currentPage: "login"
    })
  }

  addDistance = (res) => {
    console.log(this.state.latitude)
    let newResponse = res.map((obj) => {
      if(this.state.latitude && this.state.longitude) {
        obj.distance = geolib.getDistance(
          {latitude: this.state.latitude, longitude: this.state.longitude},
          {latitude: parseFloat(obj.geolocation.split(",")[0]), longitude: parseFloat(obj.geolocation.split(",")[1])}
        )
      } else {
        obj.distance = "";
      }
      return obj;
    })
    console.log("add distance")
    return newResponse; 
    // return res;
  }

  render() {

    initialRes = [
      {
          id:1,
          title: "title 1",
          description: "descriere text",
          img: "/assets/imgs/pic1.jpg",
          tel: "0742000001",
          email: "a@b.com",
          facebook: "fb",
          web: "www.obiectiv.ro",
          address: "strada x nr y orasul z",
          geolocation: "36.7667,-122.084",
          timetable: "09:00-18:00",
          rating: 45,
      },
      {
          id:1,
          title: "abc 2",
          description: "descriere text",
          img: "/assets/imgs/pic2.jpg",
          tel: "0742000001",
          email: "a@b.com",
          facebook: "fb",
          web: "www.obiectiv.ro",
          address: "strada x nr y orasul z",
          geolocation: "46.7667,24.6",
          timetable: "09:00-18:00",
          rating: 45
      },
      {
          id:1,
          title: "abc 3",
          description: "descriere text",
          img: "/assets/imgs/pic3.jpg",
          tel: "0742000001",
          email: "a@b.com",
          facebook: "fb",
          web: "www.obiectiv.ro",
          address: "strada x nr y orasul z",
          geolocation: "49.7667,23.6",
          timetable: "09:00-18:00",
          rating: 45
      },
      {
          id:1,
          title: "title 4",
          description: "descriere text",
          img: "/assets/imgs/pic4.jpg",
          tel: "0742000001",
          email: "a@b.com",
          facebook: "fb",
          web: "www.obiectiv.ro",
          address: "strada x nr y orasul z",
          geolocation: "46.9667,23.6",
          timetable: "09:00-18:00",
          rating: 45
      },
      {
          id:1,
          title: "title 6",
          description: "descriere text",
          img: "/assets/imgs/pic5.jpg",
          tel: "0742000001",
          email: "a@b.com",
          facebook: "fb",
          web: "www.obiectiv.ro",
          address: "strada x nr y orasul z",
          geolocation: "46.8667,23.6",
          timetable: "09:00-18:00",
          rating: 45
      },
      {
          id:1,
          title: "title 7",
          description: "descriere text",
          img: "/assets/imgs/pic6.jpg",
          tel: "0742000001",
          email: "a@b.com",
          facebook: "fb",
          web: "www.obiectiv.ro",
          address: "strada x nr y orasul z",
          geolocation: "46.7667,33.6",
          timetable: "09:00-18:00",
          rating: 45
      }
  
  ]

    if (this.state.currentPage === "loading") {
      this.getObjectives();
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }


    if (this.state.currentPage === "login") {
      return (
        <LoginPage 
          loginSuccess={this.goToLoadingPage}
          goToSignIn={this.goToSignIn}
        />
      )
    }

    if (this.state.currentPage === "signIn") {
      return (
        <SignInPage
          data={this.state.selectedObjective} backFn={this.goToLoginPage}
          signInSuccess={this.goToLoginPage}
          backToLogin={this.goToLoginPage}
        />
      )
    }

    if (this.state.currentPage === "home") {
      let response = this.addDistance(this.state.objectives);
      if(this.state.searchText && this.state.searchText.length) {
          this.filteredObjectives = response.filter(obj => obj.title.includes(this.state.searchText));
      } else {
        this.filteredObjectives = response.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
      }
      let data = this.filteredObjectives ? this.filteredObjectives : response;

      return (
        <View style={{ flex: 1}}>
         <View style={styles.header}>
          <View style={styles.headerContent}>
           <View style={styles.wrapper}>
              <Image
                  resizeMode="contain"
                  source={require("/Licenta/mobileApp/assets/icons/email.png")}
              />
              <TextInput
                  style={styles.inputField}
                  placeholder={'Search'}
                  onChangeText={(text) => this.setState({searchText:text})}
              ></TextInput>
            </View>
          </View>
        </View>
        <FlatList
          data={data}
          renderItem={({item}) => <ObjectiveCard data={item} clickFn={this.clickCard}/>}
          numColumns={2}
        />
        </View>
      );
    }

    if (this.state.currentPage === "objectiveDetail") {
      return (
        <ObjectiveDetailPage data={this.state.selectedObjective} backFunction={this.goToHomePage}/>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  inputField: {
    flex: 1,
    fontSize: 18,
    height: 40,
    marginRight: 20,
    marginLeft: 5,
    marginTop: 10,
    borderWidth: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginBottom: 10
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  header:{
    backgroundColor: "#83adef",
    height: 50
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: "#fff"
  },
  headerContent: {
    flex: 1,
    flexDirection: "row",
    paddingTop: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    color: "#fff",
    justifyContent: "center"
  },
  wrapper: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    height: 43,
    borderRadius: 5,
    margin: 0,
    paddingLeft: 10
  }
})