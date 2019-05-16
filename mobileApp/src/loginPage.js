import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, ImageBackground } from 'react-native';

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
          source={require("/Licenta/mobileApp/assets/imgs/loginBack.jpg")}
          style={{width: '100%', height: '100%'}}>
        <View style={styles.content}>
            <Text style={styles.loginTitle}>Login</Text>
          <TextInput
              style={styles.inputField}
              placeholder={'Username'}
              onChangeText={(text) => this.setState({username:text})}
          ></TextInput>
          <TextInput
              style={styles.inputField}
              placeholder={'Password'}
              secureTextEntry={true}
              onChangeText={(text) => this.setState({password:text})}
          ></TextInput>
          <TouchableOpacity 
              style={styles.loginButton}
              onPress={() => {this.loginFn()}}
          >
              <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity 
              style={styles.signinButton}
              onPress={() => {this.signInFn()}}
          >
              <Text style={styles.loginText}>Sign in</Text>
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
    loginTitle: {
      paddingBottom: 50,
      fontSize: 50,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center',
      letterSpacing: 5,
      textShadowOffset: {width: 4, height: 4},
      textShadowRadius: 4,
      textShadowColor: '#E2A9F3'
    },
    loginButton: {
      height: 50,
      marginRight: 20,
      marginLeft: 20,
      backgroundColor: "#8181F7",
      borderWidth: 0.5,
      borderColor: '#8181F7',
      borderRadius: 5,
      alignItems: 'center',
      paddingTop: 10,
      marginBottom: 10
    },
    signinButton: {
      height: 50,
      marginRight: 20,
      marginLeft: 20,
      backgroundColor: "#E2A9F3",
      borderWidth: 0.5,
      borderColor: '#E2A9F3',
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
      marginRight: 20,
      marginLeft: 20,
      borderWidth: 0.5,
      borderColor: '#000',
      borderRadius: 5,
      marginBottom: 10
    }
  });