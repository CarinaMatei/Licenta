import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import ObjectiveCard from './src/objectiveCard.js';
import ObjectiveDetailPage from './src/objectiveDetailPage.js';
import LoginPage from './src/loginPage.js';
import SignInPage from './src/signInPage.js';

export default class HelloWorldApp extends Component {

  constructor() {
    super();
    this.state={
      currentPage: "login",
      selectedObjective: null
    }
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

  render() {

    response = [
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
          geolocation: "latitudine, longitudine",
          timetable: "09:00-18:00",
          rating: 45
      },
      {
          id:1,
          title: "title 2",
          description: "descriere text",
          img: "/assets/imgs/pic2.jpg",
          tel: "0742000001",
          email: "a@b.com",
          facebook: "fb",
          web: "www.obiectiv.ro",
          address: "strada x nr y orasul z",
          geolocation: "latitudine, longitudine",
          timetable: "09:00-18:00",
          rating: 45
      },
      {
          id:1,
          title: "title 3",
          description: "descriere text",
          img: "/assets/imgs/pic3.jpg",
          tel: "0742000001",
          email: "a@b.com",
          facebook: "fb",
          web: "www.obiectiv.ro",
          address: "strada x nr y orasul z",
          geolocation: "latitudine, longitudine",
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
          geolocation: "latitudine, longitudine",
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
          geolocation: "latitudine, longitudine",
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
          geolocation: "latitudine, longitudine",
          timetable: "09:00-18:00",
          rating: 45
      }
  
  ]

    if (this.state.currentPage === "login") {
      return (
        <LoginPage 
          loginSuccess={this.goToHomePage}
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
      return (
        <View style={{ flex: 1}}>
        <FlatList
          data={response}
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