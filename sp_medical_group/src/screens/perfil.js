import React, { Component } from "react";
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

import user from '../../assets/img/user.png'

export default class Perfil extends Component{
    constructor(props){
        super(props);
        this.state = {
            nome: '',
            email: ''
        }
    }

    buscarDadosStorage = async () =>{
        try {
          const valorToken = await AsyncStorage.getItem('userToken');
    
          jwtDecode(valorToken);
    
          if (valorToken != null) {
            this.setState({nome: jwtDecode(valorToken).name})
            this.setState({email: jwtDecode(valorToken).email})
          }
        } catch (error) {
          console.warn(error)
        }
      }

      realizarLogout = async () =>{
          try {
              await AsyncStorage.removeItem('userToken')
              this.props.navigation.navigate('Login')
          } catch (error) {
              
          }
      }

      componentDidMount(){
          this.buscarDadosStorage();
      }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>Meu Perfil</Text>
                </View>
                <View style={styles.userImg}>
                    <Image style={styles.img} source={user} />
                </View>
                <View style={styles.infoContent}>
                    <Text style={styles.nome}>{this.state.nome}</Text>
                    <Text style={styles.email}>{this.state.email}</Text>
                </View>
                <TouchableOpacity
                    onPress={this.realizarLogout}
                    style={styles.exitContent}
                >
                    <Text style={styles.sair}>Sair</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      alignSelf: 'center',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    title: {
        fontSize: 36,
        fontWeight: 'bold',
        color: '#83BEDF',
        borderBottomWidth: 2,
        padding: 10,
        borderBottomColor: '#F1F1F1'
    },    
    userImg: {
        flex: 1,
        alignItems: 'center'
    },
    img: {
        width: 100,
        height: 100,
        margin: 'auto'
    },
    infoContent: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    nome: {
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 15
    },
    email: {
        fontSize: 20
    },
    exitContent: {
        flex: 1,
        alignItems: 'center',
        width: '80%',
        borderTopWidth: 2,
        padding: 10,
        borderTopColor: '#F1F1F1'
    },
    sair: {
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold'
    }
  });
  