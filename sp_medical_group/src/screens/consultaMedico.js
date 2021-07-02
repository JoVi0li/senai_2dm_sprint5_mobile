import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';

import api from '../services/api';
import doctor from '../../assets/img/medico.png';

export default class Medico extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaConsultas: [],
      nome: '',
      email: '',
      idMedico: 0
    }
  }

  buscarConsulta = async () => {
    const valorToken = await AsyncStorage.getItem('userToken')

    const resposta = await api.get('/Consultum/GetByIdDoctor/'+ this.state.idMedico, {
      headers: {
        'Authorization' : 'Bearer ' + valorToken
      }
    });

    this.setState({ listaConsultas: resposta.data });
  }

  buscarDadosStorage = async () =>{
    try {
      const valorToken = await AsyncStorage.getItem('userToken');

      jwtDecode(valorToken);

      if (valorToken != null) {
        this.setState({nome: jwtDecode(valorToken).name})
        this.setState({idMedico: jwtDecode(valorToken).jti})
      }
    } catch (error) {
      console.warn(error)
    }
  }

  componentDidMount() {
    this.buscarDadosStorage();
    this.buscarConsulta();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Olá, {this.state.nome}!</Text>
          <Image style={styles.headerImg} source={doctor} />
        </View>

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Minhas consultas</Text>
        </View>

        <View style={styles.mainBody}>
          <FlatList
            contentContainerStyle={styles.listContainer}
            data={this.state.listaConsultas}
            keyExtractor={item => item.idConsulta.toString()}
            renderItem={this.renderItem}
          />
        </View>
      </View>
    );
  }

  renderItem = ({ item }) => (
    <View style={styles.listItemRow}>
      <View style={styles.listItemContainer}>
        <Text style={styles.listItemSituacao}>Situação: {item.situacao}</Text>
        <Text style={styles.listItemInfo}>Médico: {item.idMedicoNavigation.nome}</Text>
        <Text style={styles.listItemInfo}>Paciente: {item.idProntuarioNavigation.nome}</Text>
        <Text style={styles.listItemInfo}>Data: {Intl.DateTimeFormat('pt-BR').format(new Date(item.dataConsulta))}</Text>
      </View>
    </View>
  )
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
    width: '95%',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  headerText: {
    fontSize: 24
  },
  headerImg: {
    width: 45,
    height: 45
  },
  titleContainer: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 36,
    color: '#83BEDF',
    fontWeight: 'bold'
  },
  mainBody: {
    width: '95%',
    height:'80%',
    marginBottom: 10
  },
  listContainer: {
    flex: 1,
  },
  listItemRow: {
    width: '100%',
    height: 120,
    marginBottom: 30,
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 30,
  },
  listItemContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  listItemSituacao: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  listItemInfo: {
    fontSize: 18
  }

});
