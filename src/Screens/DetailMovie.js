import React, { Component } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Rating, AirbnbRating } from 'react-native-ratings';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

class DetailMovie extends Component {
  static navigationOptions = {
    title: 'Movie Detail',
  };

  constructor() {
    super();
    this.state = {
      id: '',
      adult: '',
      backdrop_path: '',
      popularity: '',
      budget: '',
      title: '',
      overview: '',
      original_language: '',
      vote_average: '',
      vote_count: '',
      tagline: '',
      runtime: '',
      release_date: '',
      revenue: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    const id = navigation.getParam('id', 'NO-ID');
    this.getMovieFromApi(id);
  }

  getMovieFromApi(id) {
    return fetch('https://api.themoviedb.org/3/movie/' + id + '?api_key=317b43ddb7e19b9eae9f67bcbd4fa317')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          id: responseJson.id,
          adult: responseJson.adult,
          backdrop_path: responseJson.backdrop_path,
          popularity: responseJson.popularity,
          budget: responseJson.budget,
          title: responseJson.title,
          overview: responseJson.overview,
          original_language: responseJson.original_language,
          vote_average: responseJson.vote_average,
          vote_count: responseJson.vote_count,
          tagline: responseJson.tagline,
          runtime: responseJson.runtime,
          release_date: responseJson.release_date,
          revenue: responseJson.revenue,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" style={styles.colorLoading} />
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <View>
            <ImageBackground style={[styles.image, {width: Dimensions.get('window').width}]}
              source={{uri: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + this.state.backdrop_path}}>
                <LinearGradient style={styles.linearGradient} colors={['rgba(0, 0, 0, 0)','rgba(0, 0, 0, 0.5)', 'rgba(0, 0, 0, 0.8)', '#000']}>
                    <Text style={styles.title}>{this.state.title}</Text>
                </LinearGradient>
            </ImageBackground>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: 5, width: '13%', paddingLeft: 4}}>Rating: </Text>
            <Rating
              //showRating
              type="star"
              fractions={1}
              startingValue={this.state.vote_average/2}
              readonly
              imageSize={15}
              style={{marginTop: 8}}
            />    
          </View>
          <View style={styles.overview}>
            <Text>Overview: {this.state.overview}</Text>
          </View>
          <View style={styles.content}>
            <Text>Runtime: {this.state.runtime} minutes</Text>
            <Text>Release date: {this.state.release_date}</Text>
            <Text>Vote: {this.state.vote_count}</Text>
            <Text>Popularity: {this.state.popularity}</Text>
          </View>
          <View style={{}}>

          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  image: {
    height: 300,
  },
  title: {
    padding: 4, 
    color: '#fff',
    fontSize: 22,
  },
  linearGradient: {
    position: 'absolute', 
    bottom: 0,
    left: 0,
    right:0,
  },
  rating: {
   
  },
  overview: {
    padding: 4,
    marginTop: 4,
  },
  content: {
    flex: 1,
    padding: 4,
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

export default DetailMovie;