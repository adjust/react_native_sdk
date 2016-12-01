'use strict';

import React, {
  Component
} from 'react';

import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
} from 'react-native';

export default class Screen2 extends Component {

  constructor(props) {
    super(props);

    this._onPress = this._onPress.bind(this);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>This is Screen 2</Text>
        <TouchableHighlight
          onPress={this._onPress}>
          <Text>Jump to screen 1</Text>
        </TouchableHighlight>
      </View>
    );
  }

  _onPress() {
    this.props.navigator.push({
      name: 'screen_1',
      data: {}
    });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'teal'
  },
});
