import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import api from '../services/api';
import user from '../../assets/img/user.png';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listaConsultas: [],
      nome: 'Paciente'
    }
  }

  buscarConsulta = async () => {
    const resposta = await api.get('/Consultum');

    this.setState({ listaConsultas: resposta.data });

  }

  componentDidMount() {
    this.buscarConsulta();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Olá, {this.state.nome}!</Text>
          <Image style={styles.headerImg} source={user} />
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
        <Text style={styles.listItemInfo}>Médico: {item.idMedico}</Text>
        <Text style={styles.listItemInfo}>Data: {Intl.DateTimeFormat('pt-BR').format(new Date(item.dataConsulta))}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  header: {
    width: '100%',
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
