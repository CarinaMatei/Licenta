import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, ImageBackground, Image } from 'react-native';

export default class LoginPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: ""
        }
    }

loginFn = () => {
    if (this.state.username === "test" && this.state.password === 'test') {
        this.props.loginSuccess();
    } else {
        //show some error
    }
} 

signInFn = () => {
    this.props.goToSignIn()
}

  render() {
    return (
      <ImageBackground 
          source={require("/Licenta/mobileApp/assets/imgs/signInBack.jpg")}
          style={{width: '100%', height: '100%'}}>
        <View style={styles.content}>
          <Image
            style={styles.logo}
            source={require("/Licenta/mobileApp/assets/icons/logo.png")}
          />
            <Text style={styles.loginTitle}>Login</Text>
          <TextInput
              style={styles.inputField}
              placeholder={'Username'}
              onChangeText={(text) => this.setState({username:text})}>
          </TextInput>
          <TextInput
              style={styles.inputField}
              placeholder={'Password'}
              secureTextEntry={true}
              onChangeText={(text) => this.setState({password:text})}>
          </TextInput>
          <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => {this.loginFn()}}>
              <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity 
              style={styles.signinButton}
              onPress={() => {this.signInFn()}}>
              <Text style={styles.loginText}>Sign in</Text>
          </TouchableOpacity>
          <Text style={styles.loginOrText}>OR</Text>
          <TouchableOpacity
              style={styles.loginGuest}  
              onPress={() => {this.props.guestLogin()}}>
              <Text style={styles.loginGuestText}>Login as a guest</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
    content: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    logo: {
      marginLeft: 170,
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginTitle: {
      paddingBottom: 50,
      fontSize: 50,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center',
      letterSpacing: 5,
      textShadowOffset: {width: 4, height: 4},
      textShadowRadius: 4,
      textShadowColor: '#F5A9BC'
    },
    loginButton: {
      height: 50,
      marginRight: 20,
      marginLeft: 20,
      backgroundColor: "#01b4ae",
      borderWidth: 0.5,
      borderColor: '#01b4ae',
      borderRadius: 5,
      alignItems: 'center',
      paddingTop: 10,
      marginBottom: 10
    },
    signinButton: {
      height: 50,
      marginRight: 20,
      marginLeft: 20,
      backgroundColor: "#e6709d",
      borderWidth: 0.5,
      borderColor: '#e6709d',
      borderRadius: 5,
      alignItems: 'center',
      paddingTop: 10,
      marginBottom: 10
    },
    loginText: {
      color: '#fff',
      fontSize: 20,
    },
    inputField: {
      fontSize: 18,
      height: 40,
      color: '#ffffff',
      marginRight: 20,
      marginLeft: 20,
      borderWidth: 0.5,
      borderColor: '#ffffff',
      borderRadius: 5,
      marginBottom: 10
    },
    loginGuest: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginOrText: {
      marginLeft: 190,
      fontSize: 20,
      color: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20,
      fontWeight: 'bold'
    },
    loginGuestText: {
      fontSize: 20,
      color: '#ffffff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20,
      fontWeight: 'bold'
    }
  });