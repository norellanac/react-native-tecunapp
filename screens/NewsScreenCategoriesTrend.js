import React, {Component} from 'react';
import {Dimensions} from 'react-native';
import { withNavigation } from 'react-navigation';
//import { Card, CardItem, Text, Left, Body } from 'native-base';
import { View } from "react-native";
import { SliderBox } from "react-native-image-slider-box";



class NewsScreenCategoriesTrend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        "https://app.canjeaton.com/storage/users/cajeaton1.png",
        "https://app.canjeaton.com/storage/users/cajeaton2.png",
        "https://app.canjeaton.com/storage/users/cajeaton3.png",
      ]
    };
  }
  render() {
    var screenWidth = Dimensions.get("window").width - 20;
    var hg = Dimensions.get("window").width - 120;
    return (
      <View style={{margin: 0}}>
        <SliderBox style={{ height: hg, width: screenWidth }}
          images={this.state.images}
          autoplay
          circleLoop
        />
      </View>
    );
  }
}

export default withNavigation(NewsScreenCategoriesTrend);