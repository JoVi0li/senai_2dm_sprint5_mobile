import React, { Component } from "react";
import { Image, View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'

import logo from '../../assets/img/logo.png'
import user from '../../assets/img/user.png'
import lock from '../../assets/img/lock.png'

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from "../services/api";


export default class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            senha: ''
        }
    }

    efetuarLogin = () => {
        this.props.navigation.navigate('Paciente');
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.imgTextContent}>
                    <Image style={styles.img} source={logo}/>
                    <Text style={styles.text}>Bem-vindo</Text>
                </View>
                <View style={styles.inputButtonContent}>
                    <TextInput
                        style={styles.inputLogin}
                        keyboardType='email-address'
                        onChangeText={email => this.setState({email})}
                        placeholder='Digite seu e-mail'
                        placeholderTextColor='#7D7878'
                        textAlign='center'

                    />
                    <TextInput
                        style={styles.inputLogin}
                        secureTextEntry={true}
                        onChangeText={senha => this.setState({senha})}
                        placeholder='Digite sua senha'
                        placeholderTextColor='#7D7878'
                        textAlign='center'
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.efetuarLogin}
                    >
                        <Text style={styles.buttonText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '95%',
      alignSelf: 'center',
      backgroundColor: '#fff',
      alignItems: 'center',
    },
    imgTextContent: {
        width: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 100,
        marginBottom: 80
    },
    img: {
        width: 107,
        height: 100
    },
    text: {
        fontSize: 36,
        color: '#83BEDF',
        fontWeight: 'bold'
    },
    inputButtonContent: {
        flex: 2,
        width: '90%',
    },
    inputLogin: {
        height: '100%',
        height: 75,
        backgroundColor: '#F1F1F1',
        borderRadius: 30,
        marginBottom: 30,
    },
    button: {
        width: '50%',
        height: 75,
        alignItems: 'center',
        backgroundColor: 'red',
        alignSelf: 'center',
        borderRadius: 30,
        backgroundColor: '#83BEDF'
    },
    buttonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        margin: 'auto'
    }
  });
  