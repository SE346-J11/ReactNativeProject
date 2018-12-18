import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Constants from '../utils/Constants'
import YouTube from 'react-native-youtube'
export default class VideoPlayer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            play: true,
            fullscreen: false,
            loop:false
        };
    }
    
  render() {
      const {play,fullscreen,loop} = this.state
    return (
      <View style={{flex:1,marginVertical:5}}>
            <YouTube
                videoId={"WDkg3h8PCVU"}   // The YouTube video ID
                play={play}             // control playback of video with true/false
                fullscreen={fullscreen}       // control whether the video should play in fullscreen or inline
                loop={loop}             // control whether the video should loop when ended
                apiKey={Constants.YOUTUBE_API}
                onReady={e => this.setState({ isReady: true })}
                onChangeState={e => this.setState({ status: e.state })}
                onChangeQuality={e => this.setState({ quality: e.quality })}
                onError={e => this.setState({ error: e.error })}
                style={{ alignSelf: 'stretch', height: 300, marginVertical:5}}
            />
      </View>
    )
  }
}
