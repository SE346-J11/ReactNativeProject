import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ListView,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
  TouchableHighlight,
} from 'react-native';
import {StackNavigator,} from 'react-navigation';
import Constants from '../utils/Constants';
import Movies from '../Screens/Movies';

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
            <View style={styles.item}>
              <View style={styles.firstRow}>
                <Text style={{fontSize:22, marginLeft: 5, flex:1,justifyContent:'flex-start', color: '#fff',alignItems:'flex-start'}}>{rowData.name}</Text>
                <TouchableHighlight
                  onPress={() => navigate('movies', {id: rowData.id})}
                  style={{flex:1,justifyContent:'flex-end',alignItems:'flex-end'}}
                  >
                  <Text style={{color: '#fff',}}> See all >> </Text>
                </TouchableHighlight>
              </View>
              <View>
                <TouchableOpacity onPress={() => navigate('movies', { id: rowData.id })}>
                  <ImageBackground style={[styles.image, { width: Dimensions.get('window').width }, { marginVertical: 2 }]}
                    source={require("../Avengers.png")} >
                  </ImageBackground>
                </TouchableOpacity>
              </View>
            </View>
          }
        />
      );
      console.error(error);
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#020014',
  },
  item: {
    fontSize: 20,
    margin: 2,
    paddingBottom: 4,
    color: '#fff',
  },
  firstRow: {
    flexDirection: 'row',
    justifyContent:'space-between'
  },
  image: {
    height: 100,
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