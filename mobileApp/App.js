import React, { Component } from 'react';
import { Text, Animated, View, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator, TextInput, Image, ImageBackground } from 'react-native';
import ObjectiveCard from './src/objectiveCard.js';
import ObjectiveDetailPage from './src/objectiveDetailPage.js';
import LoginPage from './src/loginPage.js';
import SignInPage from './src/signInPage.js';
import requests from './src/requests.js';
import { PermissionsAndroid } from 'react-native';
import geolib from 'geolib';
import { CameraKitCameraScreen, } from 'react-native-camera-kit';
import QRCode from 'react-native-qrcode';  
import { db } from './db'
import { initialRes } from './initialRes'

export default class HelloWorldApp extends Component {

  constructor() {
    super();
    // global.baseColor = "#5ec9ff";
    this.filteredObjectives = null;
    this.response = null;
    this.state = {
      currentPage: "home", //todo change to login
      selectedObjective: null,
      objectives: null,
      searchText: "",
      filter: null,
      marginAnim: new Animated.Value(0)
    }
    this.moveAnimation = new Animated.ValueXY({ x: -200, y: 50 });
    this.moveAnimationMain = new Animated.ValueXY({ x: -200, y: 50 });
    this.sideMenuOpen = false;
    this.userInfo = {
      points: 55,
    }
  }

  componentDidMount() {
    console.log("mount ")

    this.requestLocation();
 
    // use PouchDB
    //db.get('4711')
    //.then(doc => console.log(doc))
    db.info().then(function (info) {
      //if(info.doc_count === 0){
        db.bulkDocs(initialRes).then(function(){
          console.log("My db2", info);
          db.allDocs({
            include_docs: true,
          }).then(function(result) {
            console.log("My db2 res", result);
            this.res = result.rows;
          });
        });
     // }

    })
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
        }, (error) => { console.log(error) },
          { enableHighAccuracy: false, timeout: 5000, maximumAge: 1000 });
      } else {
        console.log('Location permission denied');
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

  guestLogin = () => {
    this.setState({
      currentPage: "loading",
      selectedObjective: null,
      isGuest: true
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
      selectedObjective: null,
      isGuest: false
    })
  }

  goToSignIn = () => {
    this.setState({
      currentPage: "signIn"
    })
  }

  goToLoginPage = () => {
    this.setState({
      currentPage: "login"
    })
  }

  addDistance = (res) => {
    console.log(this.state.latitude)
    let newResponse = res.map((obj) => {
      if (this.state.latitude && this.state.longitude) {
        obj.distance = geolib.getDistance(
          { latitude: this.state.latitude, longitude: this.state.longitude },
          { latitude: parseFloat(obj.geolocation.split(",")[0]), longitude: parseFloat(obj.geolocation.split(",")[1]) }
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

  openSideMenu = () => {
    if (!this.sideMenuOpen) {
      this.sideMenuOpen = true;
      Animated.spring(this.moveAnimation, {
        toValue: { x: 0, y: 50 },
      }).start();
      Animated.timing(                  // Animate over time
        this.state.marginAnim,            // The animated value to drive
        {
          toValue: 160,
          duration: 500,              // Make it take a while
        }
      ).start();
    } else {
      this.sideMenuOpen = false;
      Animated.spring(this.moveAnimation, {
        toValue: { x: -200, y: 50 },
      }).start();
      Animated.timing(                  // Animate over time
        this.state.marginAnim,            // The animated value to drive
        {
          toValue: 0,
          duration: 500,              // Make it take a while
        }
      ).start();
    }
  }

  startScan = () => {
    this.setState({
      currentPage: "scanQR"
    })
  }

  logout = () => {
    this.setState({
      currentPage: "login"
    })
  }

  scanQRCode = (val) => {
    alert("QR VALUE: " + val)
    this.userInfo.points = this.userInfo.points + parseInt(val);
    this.setState({
      currentPage: "home"
    })
  }

  setFilter = (criteria) => {
    this.openSideMenu();
    this.setState({
      filter: criteria
    })
  }

  filterItems = (data) => {
    let res = data.filter((item) => item.category === this.state.filter);
    return res;
  }

  generateQR = () => {
    this.setState({
      currentPage: "generateQR"
    })
  }

  render() {


    if (this.state.currentPage === "loading") {
      this.getObjectives();
      return (
        <View style={[styles.container, styles.horizontal]}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )
    }

    if (this.state.currentPage === "generateQR") {
      let value = this.userInfo.points.toString();
      return (
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <ImageBackground 
                    source={require("/Licenta/mobileApp/assets/imgs/signInBack.jpg")}
                    style={{width: '100%', height: '100%'}}>
              <View style={styles.headerContent}>
                <TouchableOpacity style={styles.backButton} onPress={() => { this.goToHomePage() }}>
                  <Image
                    resizeMode="contain"
                    source={require("/Licenta/mobileApp/assets/icons/back.png")}
                  />
                </TouchableOpacity>
              </View>
            </ImageBackground>
          </View>
          <View style={{ flex: 1, alignItems: 'center', paddingTop: 40, }}>
            <QRCode
              value={value}
              //Setting the value of QRCode
              size={250}
              //Size of QRCode
              bgColor="#000"
              //Background Color of QRCode
              fgColor="#fff"
            //Front Color of QRCode
            />
          </View>
        </View>
      )
    }

    if (this.state.currentPage === "scanQR") {
      return (
        <View style={{ flex: 1 }}>

          <CameraKitCameraScreen
            showFrame={true}
            //Show/hide scan frame
            scanBarcode={true}
            //Can restrict for the QR Code only
            laserColor={'blue'}
            //Color can be of your choice
            frameColor={'yellow'}
            //If frame is visible then frame color
            colorForScannerFrame={'black'}
            //Scanner Frame color
            onReadCode={event =>
              this.scanQRCode(event.nativeEvent.codeStringValue)
            }
          />
        </View>
      )
    }


    if (this.state.currentPage === "login") {
      return (
        <LoginPage
          loginSuccess={this.goToLoadingPage}
          goToSignIn={this.goToSignIn}
          guestLogin={this.guestLogin}
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
      // let response = this.addDistance(this.state.objectives);
      let response = this.addDistance(initialRes);
      if (this.state.searchText && this.state.searchText.length) {
        this.filteredObjectives = response.filter(obj => obj.title.includes(this.state.searchText));
      } else {
        this.filteredObjectives = response.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
      }
      this.response = response;
      let data = this.filteredObjectives ? this.filteredObjectives : response;
      if (this.state.filter && this.state.filter !== "all") {
        data = this.filterItems(data);
      }
      const loginText = this.state.isGuest ? "Login" : "Logout";

      return (
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <ImageBackground 
              source={require("/Licenta/mobileApp/assets/imgs/signInBack.jpg")}
              style={{width: '100%', height: '100%'}}>
              <View style={styles.headerContent}>
                <TouchableOpacity style={styles.menu} onPress={this.openSideMenu}>
                  <Image
                    resizeMode="contain"
                    source={require("/Licenta/mobileApp/assets/icons/menu.png")}
                  />
                </TouchableOpacity>
                <View style={styles.wrapper}>
                  <Image
                    resizeMode="contain"
                    source={require("/Licenta/mobileApp/assets/icons/search.png")}
                  />
                  <TextInput
                    style={styles.inputField}
                    placeholder={'Search'}
                    onChangeText={(text) => this.setState({ searchText: text })}>
                  </TextInput>
                </View>
              </View>
            </ImageBackground>
          </View>
            
          <Animated.View style={{ marginLeft: this.state.marginAnim }}>
            <FlatList
              data={data}
              renderItem={({ item }) => <ObjectiveCard data={item} clickFn={this.clickCard} keyExtractor={Math.random()} key={Math.random()}/>}
              numColumns={2}
            />
          </Animated.View>
        
          <Animated.View style={[styles.sideMenu, this.moveAnimation.getLayout()]}>
            <ImageBackground 
              source={require("/Licenta/mobileApp/assets/imgs/signInBack.jpg")}
              style={{width: '100%', height: '100%'}}>
            {!this.state.isGuest &&
              <View>
                <Image
                  style={styles.logo}
                  source={require("/Licenta/mobileApp/assets/icons/logo.png")}
                />
                <Text style={styles.pointsText}>Your visit points:</Text>
                <Text style={styles.pointsText2}>{this.userInfo.points}</Text>
              </View>
            }
            <View style={styles.menuBorder}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => { this.setFilter("all") }}>
                <Text style={styles.menuText}>
                  <Image source={require("/Licenta/mobileApp/assets/icons/home.png")}>
                  </Image> Home
                </Text>
              </TouchableOpacity>
            </View>
            {!this.state.isGuest &&
              <View style={styles.menuBorder}>
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => { this.startScan() }}>
                  <Text style={styles.ticketText}>
                    <Image source={require("/Licenta/mobileApp/assets/icons/scanQR.png")}>  
                    </Image> Scan ticket
                  </Text>
                </TouchableOpacity>
              </View>
            }
            {!this.state.isGuest &&
              <View style={styles.menuBorder}>
                <TouchableOpacity
                  style={styles.menuButton}
                  onPress={() => { this.generateQR() }}>
                  <Text style={styles.ticketText}>
                    <Image source={require("/Licenta/mobileApp/assets/icons/generateQR.png")}> 
                    </Image> Generate QR
                  </Text>
                </TouchableOpacity>
              </View>
            }
            <View style={styles.menuBorder}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => { this.setFilter("hotel") }}>
                <Text style={styles.menuText}>
                  <Image source={require("/Licenta/mobileApp/assets/icons/hotel.png")}>
                  </Image> Hotels
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.menuBorder}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => { this.setFilter("restaurant") }}>
                <Text style={styles.menuText}>
                  <Image source={require("/Licenta/mobileApp/assets/icons/restaurant.png")}>
                  </Image> Restaurants
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.menuBorder}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => { this.setFilter("muzeu") }}>
                <Text style={styles.menuText}>
                  <Image source={require("/Licenta/mobileApp/assets/icons/museum.png")}>
                  </Image> Museums
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.menuBorder}>
              <TouchableOpacity
                style={styles.menuButton}
                onPress={() => { this.setFilter("cafe") }}>
                <Text style={styles.menuText}>
                  <Image source={require("/Licenta/mobileApp/assets/icons/cafe.png")}>
                  </Image> Cafes
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.content}>
              <TouchableOpacity
                style={styles.logoutButton}
                onPress={() => { this.logout() }}>
                <Text style={styles.logoutText}>{loginText}</Text>
              </TouchableOpacity>
            </View>
            </ImageBackground>
          </Animated.View>
        </View>
      );
    }

    if (this.state.currentPage === "objectiveDetail") {
      return (
        <ObjectiveDetailPage data={this.state.selectedObjective} backFunction={this.goToHomePage} />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  content: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  logo: {
    marginLeft: 50,
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 70
  },
  inputField: {
    flex: 1,
    fontSize: 15,
    height: 36,
    marginRight: 20,
    marginLeft: 5,
    borderWidth: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  header: {
    backgroundColor: "#a65c73",
    height: 50
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: "#fff"
  },
  headerContent: {
    flex: 1,
    flexDirection: "row"
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
    height: 38,
    borderRadius: 5,
    margin: 0,
    marginLeft: 10,
    marginTop: 6,
    marginBottom: 5
  },
  menu: {
    alignItems: 'flex-start',
    marginLeft: 12,
    marginRight: 50,
    marginTop: 10,
    marginBottom: 12
  },
  sideMenu: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6F9BA8',
    borderRadius: 0,
    width: 160,
    height: '100%',
    zIndex: 100,
    justifyContent: 'flex-start'
  },
  pointsText: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 19,
    color: "#fff",
    paddingTop: 15,
    marginLeft: 8
  },
  pointsText2: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    color: "#fff",
    marginLeft: 50,
    marginTop: 10,
    paddingLeft: 10
  },
  ticketText: {
    fontSize: 19,
    justifyContent: 'center',
    alignItems: 'center',
    color: "#fff",
    paddingTop: 15,
  },
  header: {
    backgroundColor: "#01b4ae",
    height: 50
  },
  headerContent: {
    flex: 1,
    flexDirection: "row"
  },
  backButton: {
    flex: 0.1,
    color: "#fff",
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 5
  },
  menuText: {
    fontSize: 19,
    color: "#fff",
    paddingTop: 15,
  },
  menuBorder: {
    borderBottomColor: "#fff",
    borderBottomWidth: 0.5,
    width: '100%',
    flex: 1,
    paddingLeft: 10
  },
  logoutButton: {
    height: 40,
    marginRight: 5,
    marginLeft: 5,
    marginTop: 10,
    backgroundColor: "#01b4ae",
    borderWidth: 0.5,
    borderColor: '#01b4ae',
    borderRadius: 5,
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
    marginBottom: 10
  },
  logoutText: {
    color: '#fff',
    fontSize: 18,
  }
})