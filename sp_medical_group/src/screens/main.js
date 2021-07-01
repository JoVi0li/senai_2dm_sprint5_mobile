import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Paciente from './consultaPaciente';
import Medico from './consultaMedico';

const bottomTab = createBottomTabNavigator();

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
          <bottomTab.Navigator>
            <bottomTab.Screen name='Paciente' component={Paciente}/>
            <bottomTab.Screen name='Médico' component={Medico}/>
          </bottomTab.Navigator>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
