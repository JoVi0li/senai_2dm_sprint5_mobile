import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import Login from './src/screens/login';
import Paciente from './src/screens/consultaPaciente';

const AuthStack = createStackNavigator();

export default function Stack(){
  return(
    <NavigationContainer>
      <AuthStack.Navigator
        headerMode = 'none'
      >
        <AuthStack.Screen name='Login' component={Login}/>
        <AuthStack.Screen name='Paciente' component={Paciente}/>
      </AuthStack.Navigator>
    </NavigationContainer>
  )
}