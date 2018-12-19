import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ListView,
} from 'react-native';

import {createStackNavigator, createAppContainer,HeaderBarItem} from 'react-navigation';
import Genders from './src/Screens/Genders';
import Movies from './src/Screens/Movies';
import DetailMovie from './src/Screens/DetailMovie';
import VideoPlayer from './src/Screens/VideoPlayer';
export default class App extends Component {
  render() {
    console.disableYellowBox = true;
    return <MoviesApp/>;
  }
}

const RootStack = createStackNavigator(
  {
    genders: {screen: Genders},
    movies: {screen: Movies},
    detailMovie: {screen: DetailMovie},
  },
  {
    initialRouteName: 'genders',
  }
);

const MoviesApp = createAppContainer(RootStack);
