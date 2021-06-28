import axios from 'axios';
import React, { Component } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions } from 'react-native';

import api from './src/services/Api';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaConsultas: [],
      nome: 'João'
    }
  }

  buscarConsultas = async () => {
    const resposta = await axios.get('/Consultum');
    const dadosResposta = resposta.data;
    this.setState({ listaConsultas: dadosResposta });
  }

  componentDidMount() {
    // this.buscarConsultas();
  }


  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>
            Olá, {this.state.nome}!
          </Text>
          <Image style={styles.img} source={require('./assets/img/user.png')} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('screen').width,
  },
  header: {
    width: Dimensions.get('screen').width,
    height: 45,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  img: {
    width: 45,
    height: 45
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Montserrat, sans-serif',
  }
});
