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
  constructor(props) {
    super(props);
    this.state = {
      sceneTransition: Navigator.SceneConfigs.FloatFromRight
    };
  }

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

  async getSceneTransition(){
    try{
      let sceneTransitionValue = await AsyncStorage.getItem("SCENE_SELECTED");
      // Store value to State
      switch (sceneTransitionValue) {
        case "FloatFromLeft":
          this.setState({
            sceneTransition : Navigator.SceneConfigs.FloatFromLeft
          });
          break;
        case "FloatFromBottom":
          this.setState({
            sceneTransition : Navigator.SceneConfigs.FloatFromBottom
          });
          break;
        case "FloatFromBottomAndroid":
          this.setState({
            sceneTransition : Navigator.SceneConfigs.FloatFromBottomAndroid
          });
          break;
        case "SwipeFromLeft":
          this.setState({
            sceneTransition : Navigator.SceneConfigs.SwipeFromLeft
          });
          break;
        case "HorizontalSwipeJump":
          this.setState({
            sceneTransition : Navigator.SceneConfigs.HorizontalSwipeJump
          });
          break;
        case "HorizontalSwipeJumpFromRight":
          this.setState({
            sceneTransition : Navigator.SceneConfigs.HorizontalSwipeJumpFromRight
          });
          break;
        default:
          this.setState({
            sceneTransition : Navigator.SceneConfigs.FloatFromRight
          });
          break;
      }
    }catch(error){
      console.log("Hmm, something when wrong when get data..." + error);
    }
  }

  configureScene(route, routeStack) {
    this.getSceneTransition();
    return this.state.sceneTransition;
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
                  <Text style={stylesCSS.headerFontSize}>Save</Text>
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
