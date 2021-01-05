import React, { Component } from "react";
import { Dimensions, Image } from "react-native";
import { WebView } from 'react-native-webview';
import { withNavigation } from "react-navigation";
import {
  Container,
  Content,
  Spinner,
  Thumbnail,
  Icon,
  Text,
  CardItem,
  Card,
  Button,
  Left,
  Right,
  Body,
  View,
} from "native-base";
import { connect } from "react-redux";
import * as userActions from "../src/actions/userActions";
import * as pictureActions from "../src/actions/pictureActions";
import FooterTabsNavigationIconText from "../components/FooterTaIconTextN-B";
import HeaderCustom from "../components/HeaderCustom";
import HederPostSection from "../components/HederPostSection";
import { persistor, apiUrl } from "../App";
import { SliderBox } from "react-native-image-slider-box";
import Loading from "./../components/Loading";

class FlashImagesScreen extends Component {
  constructor() {
    super();
  }
  state = {
    search: "",
    jobId: null,
    selected: "key1",
  };

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

  


  loadContent = (screenWidth, screenHeight) => {
    
    if (this.props.picturesReducer.pictures) {
      //console.log("pictures: ", this.props.picturesReducer.pictures);
      return this.props.picturesReducer.pictures.map((picture) => (
        <Card style={{ flex: 0 }}>
                <View>
                <Image
                  source={{ uri: `${apiUrl.link}/storage/pictures/${picture.featured_image}` }}
                  style={{ width: screenWidth -4 , height: screenHeight-250, alignItems: "center" }}
                />
                </View>
            <CardItem>
              <Left>
                <Button transparent textStyle={{ color: "#87838B" }}>
                  <Icon name="calendar" type="FontAwesome5" />
                  <Text>28-12-2020 </Text>
                </Button>
              </Left>
              <Right>
                <Button transparent textStyle={{ color: "#87838B" }}>
                  <Icon name="clock" type="FontAwesome5" />
                  <Text>18:30</Text>
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

    await this.props.getPicturesAction(this.props.usuariosReducer.token);
    console.log("pictures props", this.props);
    console.log("pictures state: ", this.state);
  }


  render() {
    var screenWidth = Dimensions.get("window").width;
    var screenHeight = Dimensions.get("window").height;

    //const { navigation } = this.props.navigation

    if (this.props.picturesReducer.cargando) {
      console.log("picturesScreen: ", this.props);
      return (
        <Container>
          <HeaderCustom navigation={this.props.navigation} />
          <HederPostSection navigation={this.props.navigation}></HederPostSection>
          < Loading />
          <FooterTabsNavigationIconText navigation={this.props.navigation} />
        </Container>
      )
    }

    console.log("picturesProps: ", this.props);

    return (
      <Container>
        <HeaderCustom navigation={this.props.navigation} />
        <HederPostSection navigation={this.props.navigation}></HederPostSection>
        <Content>
          
          {this.loadContent(screenWidth, screenHeight)}
          
        </Content>
        <FooterTabsNavigationIconText navigation={this.props.navigation} />
      </Container>
    );
  }
}



const mapStateToProps = ({ picturesReducer, usuariosReducer }) => {
  //return reducers.picturesReducer; /*   DE TODOS LOS REDUCERS MAPEAMOS el reducer de usuarios devolvera los suauiros en los props del componente */
  return { picturesReducer, usuariosReducer };
};

const mapDispatchProps = {
  ...pictureActions,
  ...userActions,
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchProps)(FlashImagesScreen)
);