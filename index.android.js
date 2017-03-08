/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import PowerRanger from './Apps/powerranger.js'

export default class PreworkCalculator extends Component {
  render() {
    return (
      <PowerRanger />
    );
  }
}

AppRegistry.registerComponent('PreworkCalculator', () => PreworkCalculator);
