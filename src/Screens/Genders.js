import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView,
  ActivityIndicator,
} from 'react-native';
import {StackNavigator,} from 'react-navigation';
import Constants from '../utils/Constants'

class Genders extends Component {
  static navigationOptions = {
    title: 'Genders',
  };

  constructor() {
    super();
    this.state = {
      dataSource: this.listData([{id: "id", name: "null"}]),
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getGendersFromApi();
  }

  listData(data) {
    ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    return ds.cloneWithRows(data);
  }

  
  getGendersFromApi() {
    return fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${Constants.API_KEY}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: this.listData(responseJson.genres),
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const {navigate} = this.props.navigation; 

    if (this.state.isLoading) {
   
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" style={styles.colorLoading} />
        </View>
      )
    } else {
   
      return (
        <ListView
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <TouchableOpacity onPress={() => navigate('movies', {id: rowData.id})}>
              <Text style={styles.item}>{rowData.name}</Text>
            </TouchableOpacity>
          }
        />
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  item: {
    fontSize: 20,
    margin: 2,
    paddingBottom: 4,
    color: '#000000',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  colorLoading: {
    color: "#0000ff",
  },
});

export default Genders;