'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  TouchableHighlight
} from 'react-native';

import Screen1 from './Screen1';
import Screen2 from './Screen2';

class Example extends Component {

  _renderScene(route, navigator) {
    switch (route.name) {
      case 'screen_1':
        return <Screen1 
          navigator={navigator}/>;
      case 'screen_2':
        return <Screen2 
          navigator={navigator}/>;
      default:
        console.error('Encountered unexpected route: ' + route.name);
    }

    return <Screen1 />;
  }

  render() {
    return (
      <Navigator
        initialRoute={{name: 'screen_1'}}
        renderScene={this._renderScene} />
    );
  }
}

const styles = StyleSheet.create({
});

AppRegistry.registerComponent('Example', () => Example);
