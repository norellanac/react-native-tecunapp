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
import * as rrhhActions from '../src/actions/rrhhActions';
import * as loginActions from "../src/actions/loginActions";
import FooterTabsNavigationIconText from "../components/FooterTaIconTextN-B";
import HeaderCustom from "../components/HeaderCustom";
import Loading from "./../components/Loading";
import { apiUrl } from '../App';

class ProccessPeopleScreen extends Component {
  constructor() {
    super();
  }
  state = {
    pathImage: apiUrl.link + "/img/",
    pathDocuemnt: apiUrl.link
  };

  loadingVacation () {
    this.props.allCompany(this.props.usuariosReducer.token);
    this.props.navigation.navigate("ProccessVacationScreen")
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
                  source={{ uri: this.state.pathImage + "seguro.png" }}
                  style={{ backgroundColor: "#CEF6EC", borderRadius: 20,  width: screenWidth / 3, height: screenHeight / 6 }}
                />
                <Text note style={{ marginBottom: 8, marginTop: 8 }}> Instructivo de seguro medico GyT </Text>
              </Body>
            </CardItem>
            <CardItem style={{ backgroundColor: "white", justifyContent: 'center' }}>
              <Button
                onPress={() => this.test() }
                style={{ backgroundColor: "#5FB404", width: screenWidth / 2, height: screenHeight / 17, borderRadius: 15 }}
              >
                <Icon
                    type="FontAwesome"
                    name="cloud-download"
                    style={{ marginLeft: 13, color: "#ffffff" }}
                />
                <Text style={{ color: "#ffffff", marginRight:15 }}>Descargar</Text>
              </Button>
            </CardItem>
          </Card>

          <Card style={{ flex: 0, }}>
            <CardItem style={{ backgroundColor: "white", alignItems: 'center' }}>
              <Body style={{ alignItems: 'center' }}>
                <Image
                  source={{ uri: this.state.pathImage + "logo-irtra.org_.png" }}
                  style={{ backgroundColor: "#CEF6EC", borderRadius: 20, width: screenWidth / 3, height: screenHeight / 6 }}
                />
                <Text note style={{ marginBottom: 8, marginTop: 8 }}> Formulario IRTRA </Text>
              </Body>
            </CardItem>
            <CardItem style={{ backgroundColor: "white", justifyContent: 'center' }}>
              <Button
                onPress={() => this.test() }
                style={{ backgroundColor: "#5FB404", width: screenWidth / 2, height: screenHeight / 17, borderRadius: 15 }}
              >
                <Icon
                    type="FontAwesome"
                    name="cloud-download"
                    style={{ marginLeft: 13, color: "#ffffff" }}
                />
                <Text style={{ color: "#ffffff", marginRight:15 }}>Descargar</Text>
              </Button>
            </CardItem>
          </Card>

          <Card style={{ flex: 0, }}>
            <CardItem style={{ backgroundColor: "white", alignItems: 'center' }}>
              <Body style={{ alignItems: 'center' }}>
                <Image
                  source={{ uri: this.state.pathImage + "piscina.png" }}
                  style={{ backgroundColor: "#CEF6EC", borderRadius: 20, width: screenWidth / 3, height: screenHeight / 6 }}
                />
                <Text note style={{ marginBottom: 8, marginTop: 8 }}> Constacia de vacaciones </Text>
              </Body>
            </CardItem>
            <CardItem style={{ backgroundColor: "white", justifyContent: 'center' }}>
              <Button
                onPress={() => this.loadingVacation() }
                style={{ backgroundColor: "#5FB404", width: screenWidth - 190, height: screenHeight / 17, borderRadius: 15 }}
              >
                <Icon
                    type="AntDesign"
                    name="enter"
                    style={{ color: "#ffffff" }}
                />
                <Text style={{ color: "#ffffff", marginRight: 50 }}>Ingresar</Text>
              </Button>
            </CardItem>
          </Card>

          <Card style={{ flex: 0, }}>
            <CardItem style={{ backgroundColor: "white", alignItems: 'center' }}>
              <Body style={{ alignItems: 'center' }}>
                <Image
                  source={{ uri: this.state.pathImage + "entrevista.png" }}
                  style={{ backgroundColor: "#CEF6EC", borderRadius: 20, width: screenWidth / 3, height: screenHeight / 6 }}
                />
                <Text note style={{ marginBottom: 8, marginTop: 8 }}> Otros procesos de Recursos Humanos </Text>
              </Body>
            </CardItem>
            <CardItem style={{ backgroundColor: "white", justifyContent: 'center' }}>
              <Button
                onPress={() => this.props.navigation.navigate("ProccessCertificateScreen") }
                style={{ backgroundColor: "#5FB404", width: screenWidth / 2, height: screenHeight / 17, borderRadius: 15 }}
              >
                <Icon
                    type="AntDesign"
                    name="enter"
                    style={{ marginLeft: 13, color: "#ffffff" }}
                />
                <Text style={{ color: "#ffffff", marginRight: 50 }}>Ingresar</Text>
              </Button>
            </CardItem>
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
  ...rrhhActions,
  ...loginActions,
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchProps)(ProccessPeopleScreen)
);