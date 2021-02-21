import React, { Component } from "react";
import { Dimensions, Image, ScrollView } from "react-native";
import HTML from "react-native-render-html";
import { WebView } from 'react-native-webview';
import { withNavigation } from "react-navigation";
import {
  Container,
  Content,
  Spinner,
  Thumbnail,
  Form,
  Picker,
  Input,
  Icon,
  Text,
  CardItem,
  Card,
  Button,
  Left,
  Right,
  Body,
} from "native-base";
import { connect } from "react-redux";
import * as postActions from "../src/actions/postActions";
import * as loginActions from "../src/actions/loginActions";
import FooterTabsNavigationIconText from "../components/FooterTaIconTextN-B";
import HeaderCustom from "../components/HeaderCustom";
import HederPostSection from "../components/HederPostSection";
import { persistor } from "../App";
import { SliderBox } from "react-native-image-slider-box";
import { apiUrl } from '../App';

import Loading from "./../components/Loading";

class HomeScreen extends Component {
  constructor() {
    super();
  }
  state = {
    posts: null,
    jobId: null,
    pathImage: apiUrl.link + "/storage/posts/"

  };

  async componentDidMount() {
    console.log(this.props.getNews(this.props.usuariosReducer.token));
    //console.log("posts props", this.props);
    //console.log("posts state: ", this.state);
  }


  loadContent = () => {
    var screenWidth = Dimensions.get("window").width;
    var screenHeight = Dimensions.get("window").height;
  }

  render() {
    var screenWidth = Dimensions.get("window").width;
    var screenHeight = Dimensions.get("window").height;

    //const { navigation } = this.props.navigation

    if (this.props.postReducer.cargando) {
      //console.log("jobsScreen: ", this.props);
      return (
        <Container>
          <HeaderCustom navigation={this.props.navigation} />
          <HederPostSection navigation={this.props.navigation}></HederPostSection>
          < Loading />
          <FooterTabsNavigationIconText navigation={this.props.navigation} tab={1} />
        </Container>
      )
    }

    //console.log("jobsProps: ", this.props);

    return (
      <Container>
        <HeaderCustom navigation={this.props.navigation} />
        <Content>
          <Card style={{ flex: 0 }} key={this.props.postReducer.post.id}>
            <CardItem style={{ backgroundColor: "transparent" }}>
              <Left>
                <Thumbnail
                  style={{ backgroundColor: "#000000" }}
                  source={require("../assets/images/robot-dev.png")}
                />
                <Text>{this.props.postReducer.post.title}</Text>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image
                  source={{ uri: this.state.pathImage + this.props.postReducer.post.featured_image }}
                  style={{ width: screenWidth - 20, height: 150 }}
                />
                <Text note>{this.props.postReducer.post.created_at}</Text>
                <Text></Text>
                <Text>{this.props.postReducer.post.description}</Text>
                <ScrollView style={{ flex: 1 }}>
                  <HTML source={{ html: this.props.postReducer.post.content }} contentWidth={screenWidth} />
                </ScrollView>
              </Body>
            </CardItem>
          </Card>
        </Content>
        <FooterTabsNavigationIconText navigation={this.props.navigation} tab={1} />
      </Container>
    );
  }
}



const mapStateToProps = ({ postReducer, usuariosReducer }) => {
  //return reducers.postReducer; /*   DE TODOS LOS REDUCERS MAPEAMOS el reducer de usuarios devolvera los suauiros en los props del componente */
  return { postReducer, usuariosReducer };
};

const mapDispatchProps = {
  ...postActions,
  ...loginActions,
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchProps)(HomeScreen)
);