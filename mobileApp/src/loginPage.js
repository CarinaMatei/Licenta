import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

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
      <View style={styles.content}>
          <Text style={styles.loginTitle}>Login</Text>
        <TextInput
            style={styles.inputField}
            placeholder={'username'}
            onChangeText={(text) => this.setState({username:text})}
        ></TextInput>
         <TextInput
            style={styles.inputField}
            placeholder={'password'}
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
      fontSize: 40,
      fontWeight: 'bold',
      color: 'black',
      textAlign: 'center'
    },
    loginButton: {
      height: 50,
      marginRight: 20,
      marginLeft: 20,
      backgroundColor: "#ff0000",
      borderWidth: 0.5,
      borderColor: '#d6d7da',
      borderRadius: 5,
      alignItems: 'center',
      paddingTop: 10,
      marginBottom: 10
    },
    signinButton: {
        height: 50,
        marginRight: 20,
        marginLeft: 20,
        backgroundColor: "#ccc",
        borderWidth: 0.5,
        borderColor: '#d6d7da',
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
      height: 40,
      marginRight: 20,
      marginLeft: 20,
      borderWidth: 0.5,
      borderColor: '#000',
      borderRadius: 5,
      marginBottom: 10
    }
  });