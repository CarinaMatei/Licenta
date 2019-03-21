import React, { Component } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

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
          <View style={styles.content}>
              <Text style={styles.signInTitle}>Sign in</Text>
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
            <TextInput
                style={styles.inputField}
                placeholder={'retype password'}
                secureTextEntry={true}
                onChangeText={(text) => this.setState({re_password:text})}
            ></TextInput>
            <TouchableOpacity 
                style={styles.signInButton}
                onPress={() => {this.signInFn()}}
            >
                <Text style={styles.signInText}>Create user</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {this.props.backFn()}}><Text>Inapoi</Text></TouchableOpacity>
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
        signInTitle: {
            paddingBottom: 50,
            fontSize: 40,
            fontWeight: 'bold',
            color: 'black',
            textAlign: 'center'
        },
        signInButton: {
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
        signInText: {
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
