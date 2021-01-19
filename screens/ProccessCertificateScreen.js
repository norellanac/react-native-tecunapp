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
import * as jobsActions from "../src/actions/jobsActions";
import * as loginActions from "../src/actions/loginActions";
import FooterTabsNavigationIconText from "../components/FooterTaIconTextN-B";
import HeaderCustom from "../components/HeaderCustom";
import Loading from "./../components/Loading";
import { apiUrl } from '../App';

class ProccessCertificateScreen extends Component {
  constructor() {
    super();
  }
  state = {
    pathImage: apiUrl.link + "/img/",
    pathDocuemnt: apiUrl.link
  };

  async componentDidMount() {

    await this.props.getJobs(this.props.usuariosReducer.token);
  }

  test() {
    console.log("Hola mundo desde el boton");
  }

  render() {
    var screenWidth = Dimensions.get("window").width;
    var screenHeight = Dimensions.get("window").height;

    return (
      <Container>
        <HeaderCustom navigation={this.props.navigation} />
        <Content>

          <Card style={{ flex: 0, }}>
            <CardItem style={{ backgroundColor: "white", alignItems: 'center' }}>
              <Body style={{ alignItems: 'center' }}>
                <Image
                  source={{ uri: this.state.pathImage + "guatemala.png" }}
                  style={{ backgroundColor: "#CEF6EC", borderRadius: 20,  width: screenWidth / 3, height: screenHeight / 6 }}
                />
              </Body>
            </CardItem>
            <CardItem style={{ backgroundColor: "white", justifyContent: 'center' }}>
              <Button
                onPress={() => this.test() }
                style={{ backgroundColor: "#5FB404", width: screenWidth / 2, height: screenHeight / 17, borderRadius: 15 }}
              >
                <Icon
                    type="FontAwesome"
                    name="send"
                    style={{ marginLeft: 13, color: "#ffffff" }}
                />
                <Text style={{ color: "#ffffff", marginRight: 50 }}>Enviar</Text>
              </Button>
            </CardItem>
          </Card>

          <Card style={{ flex: 0, }}>
            <CardItem style={{ backgroundColor: "white", alignItems: 'center' }}>
              <Body style={{ alignItems: 'center' }}>
                <Image
                  source={{ uri: this.state.pathImage + "el-salvador.png" }}
                  style={{ backgroundColor: "#CEF6EC", borderRadius: 20, width: screenWidth / 3, height: screenHeight / 6 }}
                />
              </Body>
            </CardItem>
            <CardItem style={{ backgroundColor: "white", justifyContent: 'center' }}>
              <Button
                onPress={() => this.test() }
                style={{ backgroundColor: "#5FB404", width: screenWidth / 2, height: screenHeight / 17, borderRadius: 15 }}
              >
                <Icon
                    type="FontAwesome"
                    name="send"
                    style={{ marginLeft: 13, color: "#ffffff" }}
                />
                <Text style={{ color: "#ffffff", marginRight: 50 }}>Enviar</Text>
              </Button>
            </CardItem>
          </Card>

          <Card style={{ flex: 0, marginBottom: 15 }}>
            <CardItem style={{ backgroundColor: "white", alignItems: 'center' }}>
              <Body style={{ alignItems: 'center' }}>
                <Image
                  source={{ uri: this.state.pathImage + "honduras.png" }}
                  style={{ backgroundColor: "#CEF6EC", borderRadius: 20, width: screenWidth / 3, height: screenHeight / 6 }}
                />
              </Body>
            </CardItem>
            <CardItem style={{ backgroundColor: "white", justifyContent: 'center' }}>
              <Button
                onPress={() => this.test() }
                style={{ backgroundColor: "#5FB404", width: screenWidth / 2, height: screenHeight / 17, borderRadius: 15 }}
              >
                <Icon
                    type="FontAwesome"
                    name="send"
                    style={{ marginLeft: 13, color: "#ffffff" }}
                />
                <Text style={{ color: "#ffffff", marginRight: 50 }}>Enviar</Text>
              </Button>
            </CardItem>
          </Card>
          <Card>

          </Card>

        </Content>
        <FooterTabsNavigationIconText navigation={this.props.navigation} />
      </Container>
    );
  }
}

const mapStateToProps = ({ jobsReducer, usuariosReducer }) => {
  //return reducers.jobsReducer; /*   DE TODOS LOS REDUCERS MAPEAMOS el reducer de usuarios devolvera los suauiros en los props del componente */
  return { jobsReducer, usuariosReducer };
};

const mapDispatchProps = {
  ...jobsActions,
  ...loginActions,
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchProps)(ProccessCertificateScreen)
);