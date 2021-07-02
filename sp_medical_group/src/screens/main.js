import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

import Paciente from './consultaPaciente';
import Medico from './consultaMedico';
import Perfil from './perfil';

import user from '../../assets/img/user.png';
import medico from '../../assets/img/medico.png'

import consulta from '../../assets/img/consulta.png'

const bottomTab = createBottomTabNavigator();

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      idTipoUsuario: ''
    }
  }


  buscarDadosStorage = async () => {
    try {
      const valorToken = await AsyncStorage.getItem('userToken');

      jwtDecode(valorToken);

      if (valorToken != null) {
        this.setState({ idTipoUsuario: jwtDecode(valorToken).Role})
      }
    } catch (error) {
      console.warn(error);
      console.log("Deu erro, doidão")
    }
  }

  componentDidMount() {
    this.buscarDadosStorage();
  }

  render() {

    return (
      <View style={styles.container}>
        <bottomTab.Navigator
          tabBarOptions={{
            showLabel: false,
            showIcon: true,
            activeBackgroundColor: '#F1F1F1',
            inactiveBackgroundColor: '#fff',
            style: { width: '100%', height: 50 }
          }}

          screenOptions={({ route }) => ({
            tabBarIcon: () => {
              if (route.name === 'Medico') {
                return (
                  <Image
                    source={consulta}
                    style={styles.tabIcon}
                  />
                )
              }
              if (route.name === 'Paciente') {
                return (
                  <Image
                    source={consulta}
                    style={styles.tabIcon}
                  />
                )
              }
   

              if (route.name === 'Perfil') {
                return (
                  <Image
                    source={user}
                    style={styles.tabIcon}
                  />
                )
              }

            }
          })}
        >
          {this.state.idTipoUsuario === '3' ? <bottomTab.Screen name='Paciente' component={Paciente}/>
          : <bottomTab.Screen name='Medico' component={Medico} />}
          <bottomTab.Screen name='Perfil' component={Perfil} />
        </bottomTab.Navigator>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'red',
    margin: 'auto'
  },
  tabIcon: {
    width: 25,
    height: 25
  }
});
