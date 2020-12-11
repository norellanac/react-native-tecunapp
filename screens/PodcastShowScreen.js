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
import * as podcastActions from "../src/actions/podcastActions";
import * as loginActions from "../src/actions/loginActions";
import FooterTabsNavigationIconText from "../components/FooterTaIconTextN-B";
import HeaderCustom from "../components/HeaderCustom";
import HederPostSection from "../components/HederPostSection";
import { persistor } from "../App";
import { SliderBox } from "react-native-image-slider-box";
import { apiUrl } from '../App';

import Loading from "./../components/Loading";

class PodcastShowScreen extends Component {
  constructor() {
    super();
  }
  state = {
    podcast: null,
    jobId: null,
    pathImage: apiUrl.link + "/storage/podcast/"

  };

  async componentDidMount() {
    console.log(this.props.allPodcast(this.props.usuariosReducer.token));
    //console.log("podcasts props", this.props);
    //console.log("podcasts state: ", this.state);
  }


  loadContent = () => {
    var screenWidth = Dimensions.get("window").width;
    var screenHeight = Dimensions.get("window").height;
  }

  render() {
    var screenWidth = Dimensions.get("window").width;
    var screenHeight = Dimensions.get("window").height;

    //const { navigation } = this.props.navigation

    if (this.props.podcastReducer.cargando) {
      //console.log("jobsScreen: ", this.props);
      return <Loading />
    }

    //console.log("jobsProps: ", this.props);

    return (
      <Container>
        <HeaderCustom navigation={this.props.navigation} />
        <Content>
        <Card style={{ flex: 0 }} key={this.props.podcastReducer.podcast.id}>
            <CardItem style={{ backgroundColor: "transparent" }}>
                <Left>
                    <Thumbnail
                        style={{ backgroundColor: "#000000" }}
                        source={require("../assets/images/robot-dev.png")}
                    />
                    <Text>{this.props.podcastReducer.podcast.title}</Text>
                </Left>
            </CardItem>
            <CardItem>
                <Body>
                    <Image  
                        source={{uri: this.state.pathImage + this.props.podcastReducer.podcast.featured_image }}
                        style={{width: screenWidth - 20, height: 150}} 
                    />
                    <Text note>{this.props.podcastReducer.podcast.created_at}</Text>
                    <Text></Text>
                    <Text>{ this.props.podcastReducer.podcast.description }</Text>
                    <ScrollView style={{ flex: 1 }}>
                        <HTML source={{ html: this.props.podcastReducer.podcast.content }} contentWidth={screenWidth} />
                    </ScrollView>
                </Body>
            </CardItem>
        </Card>
        </Content>
        <FooterTabsNavigationIconText navigation={this.props.navigation} />
      </Container>
    );
  }
}



const mapStateToProps = ({ podcastReducer, usuariosReducer }) => {
  //return reducers.podcastReducer; /*   DE TODOS LOS REDUCERS MAPEAMOS el reducer de usuarios devolvera los suauiros en los props del componente */
  return { podcastReducer, usuariosReducer };
};

const mapDispatchProps = {
  ...podcastActions,
  ...loginActions,
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchProps)(PodcastShowScreen)
);