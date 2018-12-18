import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableWithoutFeedback,Button,Dimensions} from 'react-native';
import Video from 'react-native-video';
import YouTube from 'react-native-youtube';
import VideoPlayer from 'react-native-video-controls';
import Orientation from 'react-native-orientation';
import Constants from '../utils/Constants';

export default class PlayVideo extends Component {
  // static navigationOptions = {
  //   title: 'Play video',
  // };
  constructor (props) {
    super (props);
    this.state = {
      isPlaying:false,
      isFullScreen:false,
      videoUrl:''
    };
  }

  render () {
    const {videoUrl}=this.props
    return (
      <View style={{flex: 1}}>
        <YouTube
          videoId={"WDkg3h8PCVU"}   // The YouTube video ID
          play={this.state.isPlaying}             // control playback of video with true/false
          fullscreen={this.state.isFullScreen}       // control whether the video should play in fullscreen or inline
          loop={false}             // control whether the video should loop when ended
          apiKey={Constants.YOUTUBE_API}
          onReady={e => this.setState({ isReady: true })}
          onChangeState={e => this.setState({ status: e.state })}
          onChangeQuality={e => this.setState({ quality: e.quality })}
          onError={e => this.setState({ error: e.error })}
          style={{ alignSelf: 'stretch', height: 300,position:'relative'}}
          lightboxMode ={true}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create ({
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});
