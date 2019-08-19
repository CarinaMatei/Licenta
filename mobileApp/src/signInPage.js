import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, ImageBackground, Image } from 'react-native';

export default class SignInPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            re_password: ""
        }
    }

    signInFn = () => {
        if (this.state.username.length === "test" && this.state.password === 'test' && this.state.re_password === 'test') {
            this.props.signInSuccess();
        } else {
            //show some error
        }
    }


    render() {
        return (
          <ImageBackground 
                source={require("/Licenta/mobileApp/assets/imgs/signInBack.jpg")}
                style={{width: '100%', height: '100%'}}>
            <TouchableOpacity 
                style={styles.backButton} 
                onPress={() => {this.props.backFn()}}>
                <Image source={require("/Licenta/mobileApp/assets/icons/backSignIn.png")}></Image>
            </TouchableOpacity>
            <View style={styles.content}>
                <Image
                  style={styles.logo}
                  source={require("/Licenta/mobileApp/assets/icons/logo.png")}
                />
                <Text style={styles.signInTitle}>Sign in</Text>
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
                <TextInput
                    style={styles.inputField}
                    placeholder={'Retype password'}
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({re_password:text})}>
                </TextInput>
                <TouchableOpacity 
                    style={styles.signInButton}
                    onPress={() => {this.signInFn()}}>
                    <Text style={styles.signInText}>Create user</Text>
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
        signInTitle: {
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
        signInButton: {
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
        signInText: {
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
        backButton: {
          width: 15, 
          height: 15,
          marginTop: 20,
          marginLeft: 5
        }
      });
