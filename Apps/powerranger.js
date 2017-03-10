import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Button,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';

import Calculator from './calculator.js'
import Settings from './settings.js'

export default class PowerRanger extends Component {
  renderScene(route, navigator) {
    switch (route.id) {
      case 'CalculatorPage':
        return (
          <Calculator navigator={navigator} />
        );
      case 'SettingPage':
        return (
          <Settings navigator={navigator} />
        );
      default:
    }
  }

  configureScene(route, routeStack) {
    return Navigator.SceneConfigs.FloatFromRight;
  }

  render(){
    const navigationBar = (
      <Navigator.NavigationBar
        routeMapper={{
          LeftButton: (route, navigator, index, navState) =>{
            return
          },
          RightButton: (route, navigator, index, navState) => {
            if(route.id != 'CalculatorPage'){
              return (
                <TouchableOpacity style={stylesCSS.tabbarHeadr} onPress={() => navigator.pop()}>
                  <Text>Save</Text>
                </TouchableOpacity>
              );
            }else{
              return (
                <TouchableOpacity style={stylesCSS.tabbarHeadr} onPress={() => navigator.push({id: 'SettingPage'})}>
                  <Text style={stylesCSS.headerFontSize}>Setting</Text>
                </TouchableOpacity>
              );
            }
          },
          Title: (route, navigator, index, navState) => {
            return;
          },
        }} />
    )

    return (
      <Navigator
        initialRoute={{id: 'CalculatorPage'}}
        renderScene={this.renderScene.bind(this)}
        configureScene={(route) => {
          if (route.sceneConfig) {
            return route.sceneConfig;
          }
          return Navigator.SceneConfigs.FloatFromRight;
        }}
        navigationBar={navigationBar}
        configureScene={this.configureScene.bind(this)}
        style={{paddingTop:20}}
      />
    );
  }
}

module.exports = PowerRanger;

const stylesCSS = StyleSheet.create({
  tabbarHeadr: {
    flex:1,
    margin:5
  },
  headerFontSize: {
    fontSize: 20
  }
})
