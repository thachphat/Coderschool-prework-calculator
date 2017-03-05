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
  View,
  Navigator,
  Button
} from 'react-native';

import Calculator from './Apps/calculator.js'
import Settings from './Apps/settings.js'

export default class PreworkCalculator extends Component {
  render() {
    return (
      <Navigator
        initialRoute={{id: 'CalculatorPage', title: 'Tip Calculator Page'}}
        renderScene={(route, navigator) => {
        switch (route.id) {
          case 'CalculatorPage':
            return <Calculator navigator={navigator} />
            break;
          case 'Settings':
            return (
              <View>
                <Button
                  style={{width:10, flex:0.1}}
                  title="Go Back"
                  onPress={() => navigator.pop({id:"CalculatorPage"})}
                />
                <Settings navigator={navigator} />
              </View>
            )
            break;
          default:
        }
      }}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('PreworkCalculator', () => PreworkCalculator);
