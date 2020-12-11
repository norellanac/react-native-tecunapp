import React, { Component } from "react";
import { Dimensions, Image } from "react-native";
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

class PodcastScreen extends Component {
  constructor() {
    super();
  }
  state = {
    podcast: null,
    podcastId: null,
    selected: "selectedOptionListPodcastPodcast",
    pathImage: apiUrl.link + "/storage/podcast/",

  };

  onValueChange(value) {
    this.setState({
      selected: value
    });
  }

  setIdPodcastSearch(podcast) {
    //console.log("Array del job: ", jobArray);
    //console.log("Reducer del job: ", this.props.podcastReducer);
    this.props.setIdPodcastSearch(podcast);
    this.props.navigation.navigate("PodcastShowScreen")
  }
  loadContentCategories = () => {
    return this.props.podcastReducer.categories.map((category) => (
      <Picker.Item label={category.name} value={category.id} />
    ))
  }

  loadContent = () => {
    var screenWidth = Dimensions.get("window").width;
    var screenHeight = Dimensions.get("window").height;

    if (this.props.podcastReducer.podcasts) {
      return this.props.podcastReducer.podcasts.map((podcast) => (
        <Card style={{ flex: 0 }} key={podcast.id}>
          <CardItem style={{ backgroundColor: "transparent" }}>
            <Left>
              <Thumbnail
                style={{ backgroundColor: "#000000" }}
                source={require("../assets/images/robot-dev.png")}
              />
              <Body>
                <Text>{podcast.title}</Text>
                <Text note>{podcast.created_at}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem >
            <Body>
              <Image  
                source={{uri: this.state.pathImage + podcast.featured_image }}
                style={{width: screenWidth - 20, height: 150}} 
              />
              <Text >{podcast.description}</Text>

            </Body>
          </CardItem>
          <CardItem>
              <Left>
                <Button transparent textStyle={{ color: "#87838B" }}>
                  <Icon name="like2" type="AntDesign" />
                  <Text>{podcast.likes.length}</Text>
                </Button>
              </Left>
              <Right>
                <Button transparent textStyle={{ color: "#87838B" }} onPress={() => this.setIdPodcastSearch(podcast)}>
                  <Icon name="comment" type="FontAwesome" />
                  <Text>Comentarios</Text>
                </Button>
              </Right>
            </CardItem>
        </Card>


      ))
    } else {
      return <Spinner color="blue" style={{ flex: 1 }} />;
    }
  };


  logout = async () => {
    //await this.props.logoutUser();
    console.log("borró usuario");
    //await this.props.resetAddress();
    await persistor.purge();
    this.props.navigation.navigate("Login");
    console.log("borró direccion");
  };

  async componentDidMount() {

    await this.props.allPodcast(this.props.usuariosReducer.token);
    //console.log("podcast props", this.props);
    //console.log("podcast state: ", this.state);
  }

 

  render() {
    var screenWidth = Dimensions.get("window").width;
    var screenHeight = Dimensions.get("window").height;

    //const { navigation } = this.props.navigation

    if (this.props.podcastReducer.cargando) {
      //console.log("jobsScreen: ", this.props);
      return <Loading />
    }

    console.log(this.props.podcastReducer);

    //console.log("jobsProps: ", this.props);

    return (
      <Container>
        <HeaderCustom navigation={this.props.navigation} />
        <HederPostSection navigation={this.props.navigation}></HederPostSection>
        <Form>
          <Picker
            note
            mode="dropdown"
            style={{ width: "100%" }}
            selectedValue={this.state.selected}
            onValueChange={this.onValueChange.bind(this)}
          >
            <Picker.Item label="Categorias" value="selectedOptionListPodcast" />
            {this.loadContentCategories()}
          </Picker>
        </Form>
        <Content>

          {this.loadContent()}

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
  connect(mapStateToProps, mapDispatchProps)(PodcastScreen)
);