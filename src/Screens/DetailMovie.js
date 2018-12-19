import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {Rating, AirbnbRating} from 'react-native-ratings';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Constants from '../utils/Constants';
import VideoPlayer from './VideoPlayer';
// fbshare
import FBSDK,{ ShareDialog, LoginManager } from 'react-native-fbsdk';

const shareLinkContent = {
  contentType: 'link',
  contentUrl: 'https://facebook.com',
  contentDescription: 'Wow, check out this great site!',
};


class DetailMovie extends Component {
  static navigationOptions = {
    title: 'Movie Detail',
  };

  constructor () {
    super ();
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
      shareLinkContent:shareLinkContent
    };
  }

  componentDidMount () {
    const {navigation} = this.props;
    const id = navigation.getParam('id', 'NO-ID');
    this.getMovieFromApi(id);
    this.getVideoUrlFromId(id)
  }
   
  getMovieFromApi (id) {
    return fetch (
      `https://api.themoviedb.org/3/movie/${id}?api_key=${Constants.API_KEY}`
    )
      .then (response => response.json ())
      .then (responseJson => {
        console.log (responseJson);
        this.setState ({
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
        console.log (this.state);
      })
      .catch (error => {
        console.error (error);
      });
  }
  getVideoUrlFromId(id) {
    return fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${Constants.API_KEY}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          videoUrl:responseJson.results[0].key
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  onPressShare = ()=>{
    let tmp = this;
    ShareDialog.canShow(this.state.shareLinkContent).then(
       (canShow) => {
         console.log(canShow)
        if (canShow) {
          return ShareDialog.show(tmp.state.shareLinkContent);
        }
      }
    ).then(
      function (result) {
        if (result.isCancelled) {
          console.log('Share cancelled');
        } else {
          console.log('Share success with postId: '
            + result.postId);
        }
      },
      function (error) {
        console.log('Share fail with error: ' + error);
      }
    );
  }

  onLogin=()=>{
     LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends']).then(
      function (result) {
        if (result.isCancelled) {
          console.log("Login cancelled");
        } else {
          console.log(
            "Login success with permissions: " +
            result.grantedPermissions.toString()
          );
        }
      },
      function (error) {
        console.log("Login fail with error: " + error);
      }
    );
  }
  render() {
    const {videoUrl}= this.state
    if (this.state.isLoading) {
      return (
        <View style={styles.loading}>
          <ActivityIndicator size="large" style={styles.colorLoading} />
        </View>
      );
    } else {
      return (
        <ScrollView style={styles.container}>
          <View>
            <ImageBackground style={[styles.image, {width: Dimensions.get('window').width,marginTop:20}]}
              source={{uri: 'https://image.tmdb.org/t/p/w600_and_h900_bestv2' + this.state.backdrop_path}}>
                <LinearGradient style={styles.linearGradient} colors={['rgba(2, 0, 20, 0)','rgba(2, 0, 20, 0.5)', 'rgba(2, 0, 20, 0.8)', '#020014']}>
                    <Text style={styles.title}>{this.state.title}</Text>
                </LinearGradient>
            </ImageBackground>
            <VideoPlayer videoUrl={videoUrl}></VideoPlayer>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: 5, width: '13%', paddingLeft: 4, color: '#fff'}}>Rating: </Text>
            <Rating
              //showRating
              type="star"
              fractions={1}
              startingValue={this.state.vote_average / 2}
              readonly
              imageSize={15}
              style={{marginTop: 8}}
            />
          </View>
          <View style={styles.overview}>
            <Text style={{color: '#fff'}}>Overview: {this.state.overview}</Text>
          </View>
          <View style={styles.content}>
            <Text style={{color: '#fff'}}>Runtime: {this.state.runtime} minutes</Text>
            <Text style={{color: '#fff'}}>Release date: {this.state.release_date}</Text>
            <Text style={{color: '#fff'}}>Vote: {this.state.vote_count}</Text>
            <Text style={{color: '#fff'}}>Popularity: {this.state.popularity}</Text>
          </View>
          <View style={styles.shareListIcons}>
            <View style={styles.list} >
              <TouchableOpacity onPress={()=>alert('Chức năng chưa hoàn thiện')}>
                <IonIcons
                  name="md-add-circle-outline"
                  color="grey"
                  size={25}
                />
                <Text style={{ padding: 4, color: '#fff' }}>To List</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.share} >
              <TouchableOpacity onPress={() => alert('Chức năng chưa hoàn thiện')}>
                <IonIcons
                  name="md-share"
                  color="grey"
                  size={25}
                />
                <Text style={{ padding: 4, color: '#fff' }}>Share</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#020014',
  },
  image: {
    height: 300,
  },
  title: {
    //padding: 4, 
    color: '#fff',
    fontSize: 25,
    position: 'absolute', 
    bottom: 8,
    left: 4,
  },
  linearGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right:0,
    height: '30%',
  },
  rating: {
   
  },
  rating: {},
  overview: {
    padding: 4,
    marginTop: 4,
  },
  content: {
    padding: 4,
  },
  shareListIcons: {
    marginTop: 15,
    flexDirection: 'row',
    marginLeft: 10,
  },
  list: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  share: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  colorLoading: {
    color: '#0000ff',
  },
  titleText: {
    padding: 4,
    color: 'orange',
    fontSize: 22,
    fontWeight: 'bold',
  },
});

export default DetailMovie;
