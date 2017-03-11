import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';

import SegmentedControlTab from 'react-native-segmented-control-tab';

export default class Cal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      segmentSelectedIndex : 0,
      billAmount : 0,
      result: 0,
      tipAmount: 0
    }
  }

  componentDidMount() {
    this.getSegmentSelectedIndex()
  }

  async getSegmentSelectedIndex(){
    try{
      let index = await AsyncStorage.getItem("SEGMENT_SELECTED_INDEX");
      index = parseInt(index);
      this.setState({
        segmentSelectedIndex : index
      });
    }catch(error){
      console.log("Hmm, something when wrong when get data..." + error);
    }
  }

  handleSegmentChange(index) {
    this.setState({
      segmentSelectedIndex : index
    })

    this.handleBillAmountChange(this.state.billAmount, index)
  }

  handleBillAmountChange(bill, index) {
    this.setState({
      billAmount : bill
    })

    if (!index && index != 0) {
      index = this.state.segmentSelectedIndex;
    }

    bill = parseFloat(bill);
    var percent = this.segmentValues()[index];
    percent = parseFloat(percent) / 100;

    var result = bill + bill * percent;
    this.setState({
      result: result,
      tipAmount: bill * percent
    })
  }

  segmentValues() {
    return ['10%', '15%', '50%'];
  }

  render() {
    return(
      <View style={{marginTop:50}}>
        <View>
          <Text style={{fontSize:25, fontWeight: 'bold', textAlign: 'center'}}>Tip Calculator</Text>
        </View>

        <View>
          <Text>Bill Amount</Text>
          <TextInput
            onChangeText={(billAmount) => this.handleBillAmountChange(billAmount)}
            keyboardType='numeric'
            maxLength={10}
            style={{borderColor: 'black', borderWidth: 2, height: 50}}
            autoFocus={true}
          />
        </View>

        <View>
          <Text>Tip Amount : 0</Text>
        </View>

        <View>
          <SegmentedControlTab
            values={this.segmentValues()}
            selected={this.state.segmentSelectedIndex}
            onTabPress= {index => this.handleSegmentChange(index)}
          />
        </View>

        <View>
          <Text>Bill input : {this.state.billAmount}</Text>
          <Text>Tip amount : {this.state.tipAmount}</Text>
          <Text>Segment control : {this.segmentValues()[this.state.segmentSelectedIndex]}</Text>
        </View>

        <View>
          <Text>Result : {this.state.result}</Text>
        </View>
      </View>
    )
  }
}

module.exports = Cal
