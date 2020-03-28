import React, { Component } from "react";
import { Image, KeyboardAvoidingView } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import {
  Container,
  Header,
  Content,
  View,
  Thumbnail,
  Icon,
  Text,
  Left,
  CardItem,
  Card,
  Button
} from "native-base";
import { connect } from "react-redux";
import * as loginActions from "../src/actions/loginActions";
import FooterTabsNavigationIconText from "../components/FooterTaIconTextN-B";
import HeaderCustom from "./../components/HeaderCustom";
import { persistor } from "./../App";
class UserScreenProfile extends Component {
  constructor(props) {
    super();
  }
  state = {
    dpi: "",
    name: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  };

  logout = async () => {
    //await this.props.logoutUser();
    console.log("borró usuario");
    //await this.props.resetAddress();
    await persistor.purge();
    this.props.navigation.navigate("Login");
    console.log("borró direccion");
  };

  componentDidMount() {
    console.log("");
  }

  userData = async () => {
    let Dpi = this.state.dpi;
    let Name = this.state.name;
    let Lastname = this.state.lastname;
    let Email = this.state.email;
    let Phone = this.state.phone;
    await this.props.logoutUser();
    if (this.state.password === this.state.confirmPassword) {
      var Password = this.state.password;
      await this.props.registerUsers(
        Dpi,
        Name,
        Lastname,
        Email,
        Phone,
        Password
      );
    }
    if (this.props.error == "") {
      await this.props.traerToken(Email, Password);
      await this.props.traerUser(this.props.token);
    }
  };

  ponerContenido = () => {
    if (this.props.cargando) {
      return <Spinner color="blue" style={{ flex: 1 }} />;
    }
    return (
      <Grid>
        <Col style={{ alignItems: "center" }}>
          <Button
            onPress={this.userData}
            rounded
            style={{
              backgroundColor: "#1B2853",
              borderBottomLeftRadius: 20,
              borderTopLeftRadius: 20,
              borderBottomRightRadius: 20,
              borderTopRightRadius: 20
            }}
          >
            <Text style={{ fontWeight: "bold" }}> Registrate </Text>
          </Button>
        </Col>
      </Grid>
    );
  };

  handleSubmit = () => {
    if (this.state.password !== this.state.confirmPassword) {
      return (
        <Row>
          <Grid>
            <Col style={{ alignItems: "center", marginBottom: 15 }}>
              <Text style={{ color: "white" }}>
                Las contraseñas no coinsiden
              </Text>
            </Col>
          </Grid>
        </Row>
      );
    }
  };

  Erroruser = () => {
    if (this.props.error != "") {
      return (
        <Row>
          <Grid>
            <Col style={{ alignItems: "center", marginBottom: 15 }}>
              <Text style={{ color: "white" }}>{this.props.error}</Text>
            </Col>
          </Grid>
        </Row>
      );
    }
  };

  render() {
    //const { navigation } = this.props.navigation

    console.log("UserScreenProfile: ", this.props);

    return (
      <Container>
        <HeaderCustom navigation={this.props.navigation} />
        <Content>
          <View style={{ backgroundColor: "#ed913b" }}>
            <Grid style={{ marginBottom: 30, marginTop: 25 }}>
              <Col style={{ alignItems: "center" }}>
                <Thumbnail
                  large
                  source={require("../assets/images/dev.png")}
                  style={{ backgroundColor: "#FFFFFF" }}
                />
              </Col>
              <Col>
                <Text
                  style={{ fontSize: 25, color: "white", marginBottom: 15 }}
                >
                  <Icon
                    type="FontAwesome"
                    name="user"
                    style={{ color: "white", fontSize: 25 }}
                  />{" "}
                  {"name"}
                </Text>
                <Text style={{ color: "white", marginBottom: 2 }} note>
                  <Icon
                    type="FontAwesome"
                    name="envelope"
                    style={{ color: "white", fontSize: 18 }}
                  />
                  {"  "}
                  {"email"}
                </Text>
                <Text style={{ color: "white" }} note>
                  <Icon
                    type="FontAwesome"
                    name="phone"
                    style={{ color: "white", fontSize: 20 }}
                  />
                  {"  "}
                  {"phone"}
                </Text>
              </Col>
            </Grid>
          </View>

          <Card transparent>
            <CardItem>
              <Text style={{ fontSize: 22, color: "#1B2853" }}>Mi Perfil</Text>
            </CardItem>
            <CardItem>
              <Grid>
                <Col
                  style={{
                    backgroundColor: "#F8FAFB",
                    borderBottomLeftRadius: 7,
                    borderTopLeftRadius: 7,
                    borderWidth: 0.5,
                    borderColor: "#E6E7E8"
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      fontWeight: "bold",
                      marginTop: 10,
                      color: "#1c5988"
                    }}
                  >
                    {"100 "}
                    <Icon
                      type="Entypo"
                      name="trophy"
                      style={{ marginLeft: 15, color: "#1c5988" }}
                    />
                  </Text>
                  <Text note style={{ textAlign: "center", marginBottom: 10 }}>
                    Ranking
                  </Text>
                </Col>
                <Col
                  style={{
                    backgroundColor: "#F8FAFB",
                    borderBottomRightRadius: 7,
                    borderTopRightRadius: 7,
                    borderWidth: 0.5,
                    borderColor: "#E6E7E8"
                  }}
                >
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 20,
                      fontWeight: "bold",
                      marginTop: 10,
                      color: "#1c5988"
                    }}
                  >
                    {"50  "}
                    <Icon
                      type="Entypo"
                      name="news"
                      style={{ marginLeft: 15, color: "#1c5988" }}
                    />
                  </Text>
                  <Text note style={{ textAlign: "center", marginBottom: 10 }}>
                    Publicaciones
                  </Text>
                </Col>
              </Grid>
            </CardItem>

            <Button
              transparent
              vertical
              onPress={() =>
                this.props.navigation.navigate("AddressProfileRoute")
              }
            >
              <CardItem style={{ marginTop: 10 }}>
                <Grid
                  style={{
                    backgroundColor: "#F8FAFB",
                    borderBottomLeftRadius: 5,
                    borderTopLeftRadius: 5,
                    borderBottomRightRadius: 5,
                    borderTopRightRadius: 5
                  }}
                >
                  <Col
                    size={1}
                    style={{
                      marginTop: 15,
                      marginBottom: 15,
                      justifyContent: "center"
                    }}
                  >
                    <Icon
                      type="FontAwesome"
                      name="map-marker"
                      style={{ marginLeft: 15, color: "#1c5988" }}
                    />
                  </Col>
                  <Col size={3} style={{ marginTop: 15, marginBottom: 15 }}>
                    <Text>Direcciones</Text>
                  </Col>
                  <Col style={{ marginTop: 15, marginBottom: 15 }}>
                    <Icon
                      type="FontAwesome5"
                      name="arrow-circle-right"
                      style={{ color: "#1c5988" }}
                    />
                  </Col>
                </Grid>
              </CardItem>
            </Button>

            <Button
              transparent
              vertical
              onPress={() =>
                this.props.navigation.navigate("AwardsProfileRoute")
              }
            >
              <CardItem>
                <Grid
                  style={{
                    backgroundColor: "#F8FAFB",
                    borderBottomLeftRadius: 5,
                    borderTopLeftRadius: 5,
                    borderBottomRightRadius: 5,
                    borderTopRightRadius: 5
                  }}
                >
                  <Col
                    size={1}
                    style={{
                      marginTop: 15,
                      marginBottom: 15,
                      justifyContent: "center"
                    }}
                  >
                    <Icon
                      type="Entypo"
                      name="back-in-time"
                      style={{ marginLeft: 15, color: "#1c5988" }}
                    />
                  </Col>
                  <Col size={3} style={{ marginTop: 15, marginBottom: 15 }}>
                    <Text>Historial de premios</Text>
                  </Col>
                  <Col style={{ marginTop: 15, marginBottom: 15 }}>
                    <Icon
                      type="FontAwesome5"
                      name="arrow-circle-right"
                      style={{ color: "#1c5988" }}
                    />
                  </Col>
                </Grid>
              </CardItem>
            </Button>

            <Button
              transparent
              vertical
              onPress={() =>
                this.props.navigation.navigate("SettingsProfileRoute")
              }
            >
              <CardItem>
                <Grid
                  style={{
                    backgroundColor: "#F8FAFB",
                    borderBottomLeftRadius: 5,
                    borderTopLeftRadius: 5,
                    borderBottomRightRadius: 5,
                    borderTopRightRadius: 5
                  }}
                >
                  <Col
                    size={1}
                    style={{
                      marginTop: 15,
                      marginBottom: 15,
                      justifyContent: "center"
                    }}
                  >
                    <Icon
                      type="FontAwesome"
                      name="cog"
                      style={{ marginLeft: 15, color: "#1c5988" }}
                    />
                  </Col>
                  <Col size={3} style={{ marginTop: 15, marginBottom: 15 }}>
                    <Text>Ajustes</Text>
                  </Col>
                  <Col style={{ marginTop: 15, marginBottom: 15 }}>
                    <Icon
                      type="FontAwesome5"
                      name="arrow-circle-right"
                      style={{ color: "#1c5988" }}
                    />
                  </Col>
                </Grid>
              </CardItem>
            </Button>

            <Button
              transparent
              vertical
              onPress={() => this.props.navigation.navigate("HelpPageRoute")}
            >
              <CardItem>
                <Grid
                  style={{
                    backgroundColor: "#F8FAFB",
                    borderBottomLeftRadius: 5,
                    borderTopLeftRadius: 5,
                    borderBottomRightRadius: 5,
                    borderTopRightRadius: 5
                  }}
                >
                  <Col
                    size={1}
                    style={{
                      marginTop: 15,
                      marginBottom: 15,
                      justifyContent: "center"
                    }}
                  >
                    <Icon
                      type="MaterialIcons"
                      name="help"
                      style={{ marginLeft: 15, color: "#1c5988" }}
                    />
                  </Col>
                  <Col size={3} style={{ marginTop: 15, marginBottom: 15 }}>
                    <Text>Ayuda</Text>
                  </Col>
                  <Col style={{ marginTop: 15, marginBottom: 15 }}>
                    <Icon
                      type="FontAwesome5"
                      name="arrow-circle-right"
                      style={{ color: "#1c5988" }}
                    />
                  </Col>
                </Grid>
              </CardItem>
            </Button>
          </Card>
        </Content>
        <FooterTabsNavigationIconText navigation={this.props.navigation} />
      </Container>
    );
  }
}

const mapStateToProps = reducers => {
  return reducers.usuariosReducer;
};

export default connect(mapStateToProps, loginActions)(UserScreenProfile);
