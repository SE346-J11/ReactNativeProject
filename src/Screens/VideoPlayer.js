import React, {Component} from 'react';
import { Text, View, Platform, Button, Dimensions, StyleSheet} from 'react-native';
import Constants from '../utils/Constants';
import YouTube from 'react-native-youtube';
export default class VideoPlayer extends Component {
  constructor (props) {
    super (props);
    this.state = {
      play: true,
      fullscreen: false,
      loop: false,
    };
  }

  render () {
    const {play, fullscreen, loop} = this.state;
    return (
      <View style={{flex:1,marginVertical: 5}}>
        <YouTube
          videoId={'WDkg3h8PCVU'}
          play={
            play
          }
          hidden={false}
          apiKey={Constants.YOUTUBE_API}
          fullscreen={fullscreen}
          onReady={e => this.setState ({isReady: true})}
          onChangeState={e =>
            this.setState ({
              status: e.state,
            })}
          onChangQuality={e =>
            this.setState ({
              quality: e.quality,
            })}
          onError={e =>
            this.setState ({
              error: e.error,
            })}
          style={{alginSelf: 'stretch', height: 250, marginVertical: 5}}
          ref={component => (this._root = component)}
        />
      </View>
    );
  }
}
