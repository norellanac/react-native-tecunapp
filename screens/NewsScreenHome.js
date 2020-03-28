import React, { Component } from "react";
import { Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import {
  Container,
  Content,
  Card,
  CardItem,
  List,
  ListItem,
  Thumbnail,
  Icon,
  Text,
  Left,
  Body,
  Right,
  Button
} from "native-base";
import { connect } from "react-redux";
import * as loginActions from "../src/actions/loginActions";
import FooterTabsNavigationIconText from "../components/FooterTaIconTextN-B";
import HeaderCustom from "./../components/HeaderCustom";
import { persistor } from "./../App";
var screenWidth = Dimensions.get("window").width;
var screenHeight = Dimensions.get("window").height;

class NewsScreenHome extends Component {
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

    console.log("NewsScreenHome: ", this.props);

    return (
      <Container>
        <HeaderCustom navigation={this.props.navigation} />
        <Content>
        <Grid style={{ margin: 2, width: screenWidth, elevation: 1 }}>
              <Row>
              <Col>
                  <Card>
                    <CardItem style={{ backgroundColor: "transparent" }}>
                      <Image
                        source={require("../assets/images/dev.png")}
                        style={{ width: screenWidth / 3, height: 150 }}
                      />
                    </CardItem>
                    <CardItem footer bordered>
                      <Grid>
                        <Row>
                          <Col>
                            <Body>
                              <Text
                                style={{
                                  alignItems: "center",
                                  alignSelf: "center",
                                  alignContent: "center",
                                  fontWeight: "bold",
                                  color: "#1B2853"
                                }}
                              >
                                {"Cupon De Descuento"} ...
                              </Text>
                            </Body>
                          </Col>
                        </Row>
                        <Col>
                          <Body>
                            <Text
                              style={{
                                color: "#EF5F2F",
                                fontSize: 18,
                                marginLeft: 10
                              }}
                            >
                              <Icon
                                type="MaterialCommunityIcons"
                                name="sale"
                                style={{ color: "blue", fontSize: 25 }}
                              />
                              {" 100"}
                            </Text>
                          </Body>
                        </Col>
                      </Grid>
                    </CardItem>
                  </Card>
                </Col>
              <Col>
                  <Card>
                    <CardItem style={{ backgroundColor: "transparent" }}>
                      <Image
                        source={require("../assets/images/dev.png")}
                        style={{ width: screenWidth / 3, height: 150 }}
                      />
                    </CardItem>
                    <CardItem footer bordered>
                      <Grid>
                        <Row>
                          <Col>
                            <Body>
                              <Text
                                style={{
                                  alignItems: "center",
                                  alignSelf: "center",
                                  alignContent: "center",
                                  fontWeight: "bold",
                                  color: "#1B2853"
                                }}
                              >
                                {"Cupon De Descuento"} ...
                              </Text>
                            </Body>
                          </Col>
                        </Row>
                        <Col>
                          <Body>
                            <Text
                              style={{
                                color: "#EF5F2F",
                                fontSize: 18,
                                marginLeft: 10
                              }}
                            >
                              <Icon
                                type="MaterialCommunityIcons"
                                name="sale"
                                style={{ color: "blue", fontSize: 25 }}
                              />
                              {" 100"}
                            </Text>
                          </Body>
                        </Col>
                      </Grid>
                    </CardItem>
                  </Card>
                </Col>
              </Row>
            </Grid>
            <Grid style={{ margin: 2, width: screenWidth, elevation: 1 }}>
              <Row>
              <Col>
                  <Card>
                    <CardItem style={{ backgroundColor: "transparent" }}>
                      <Image
                        source={require("../assets/images/dev.png")}
                        style={{ width: screenWidth / 3, height: 150 }}
                      />
                    </CardItem>
                    <CardItem footer bordered>
                      <Grid>
                        <Row>
                          <Col>
                            <Body>
                              <Text
                                style={{
                                  alignItems: "center",
                                  alignSelf: "center",
                                  alignContent: "center",
                                  fontWeight: "bold",
                                  color: "#1B2853"
                                }}
                              >
                                {"Cupon De Descuento"} ...
                              </Text>
                            </Body>
                          </Col>
                        </Row>
                        <Col>
                          <Body>
                            <Text
                              style={{
                                color: "#EF5F2F",
                                fontSize: 18,
                                marginLeft: 10
                              }}
                            >
                              <Icon
                                type="MaterialCommunityIcons"
                                name="sale"
                                style={{ color: "blue", fontSize: 25 }}
                              />
                              {" 100"}
                            </Text>
                          </Body>
                        </Col>
                      </Grid>
                    </CardItem>
                  </Card>
                </Col>
              <Col>
                  <Card>
                    <CardItem style={{ backgroundColor: "transparent" }}>
                      <Image
                        source={require("../assets/images/dev.png")}
                        style={{ width: screenWidth / 3, height: 150 }}
                      />
                    </CardItem>
                    <CardItem footer bordered>
                      <Grid>
                        <Row>
                          <Col>
                            <Body>
                              <Text
                                style={{
                                  alignItems: "center",
                                  alignSelf: "center",
                                  alignContent: "center",
                                  fontWeight: "bold",
                                  color: "#1B2853"
                                }}
                              >
                                {"Cupon De Descuento"} ...
                              </Text>
                            </Body>
                          </Col>
                        </Row>
                        <Col>
                          <Body>
                            <Text
                              style={{
                                color: "#EF5F2F",
                                fontSize: 18,
                                marginLeft: 10
                              }}
                            >
                              <Icon
                                type="MaterialCommunityIcons"
                                name="sale"
                                style={{ color: "blue", fontSize: 25 }}
                              />
                              {" 100"}
                            </Text>
                          </Body>
                        </Col>
                      </Grid>
                    </CardItem>
                  </Card>
                </Col>
              </Row>
            </Grid>
            <Grid style={{ margin: 2, width: screenWidth, elevation: 1 }}>
              <Row>
              <Col>
                  <Card>
                    <CardItem style={{ backgroundColor: "transparent" }}>
                      <Image
                        source={require("../assets/images/dev.png")}
                        style={{ width: screenWidth / 3, height: 150 }}
                      />
                    </CardItem>
                    <CardItem footer bordered>
                      <Grid>
                        <Row>
                          <Col>
                            <Body>
                              <Text
                                style={{
                                  alignItems: "center",
                                  alignSelf: "center",
                                  alignContent: "center",
                                  fontWeight: "bold",
                                  color: "#1B2853"
                                }}
                              >
                                {"Cupon De Descuento"} ...
                              </Text>
                            </Body>
                          </Col>
                        </Row>
                        <Col>
                          <Body>
                            <Text
                              style={{
                                color: "#EF5F2F",
                                fontSize: 18,
                                marginLeft: 10
                              }}
                            >
                              <Icon
                                type="MaterialCommunityIcons"
                                name="sale"
                                style={{ color: "blue", fontSize: 25 }}
                              />
                              {" 100"}
                            </Text>
                          </Body>
                        </Col>
                      </Grid>
                    </CardItem>
                  </Card>
                </Col>
              <Col>
                  <Card>
                    <CardItem style={{ backgroundColor: "transparent" }}>
                      <Image
                        source={require("../assets/images/dev.png")}
                        style={{ width: screenWidth / 3, height: 150 }}
                      />
                    </CardItem>
                    <CardItem footer bordered>
                      <Grid>
                        <Row>
                          <Col>
                            <Body>
                              <Text
                                style={{
                                  alignItems: "center",
                                  alignSelf: "center",
                                  alignContent: "center",
                                  fontWeight: "bold",
                                  color: "#1B2853"
                                }}
                              >
                                {"Cupon De Descuento"} ...
                              </Text>
                            </Body>
                          </Col>
                        </Row>
                        <Col>
                          <Body>
                            <Text
                              style={{
                                color: "#EF5F2F",
                                fontSize: 18,
                                marginLeft: 10
                              }}
                            >
                              <Icon
                                type="MaterialCommunityIcons"
                                name="sale"
                                style={{ color: "blue", fontSize: 25 }}
                              />
                              {" 100"}
                            </Text>
                          </Body>
                        </Col>
                      </Grid>
                    </CardItem>
                  </Card>
                </Col>
              </Row>
            </Grid>
          <List>
            <ListItem thumbnail>
              <Left>
                <Thumbnail
                  square
                  source={{
                    uri:
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRN7USRtFiSwwrfqNMPm_kTcGJ4NkIX7xRy4ztZq4Acm298JkWd"
                  }}
                />
              </Left>
              <Body>
                <Text>{this.props.user.name}</Text>
                <Text> {this.props.user.email}</Text>
              </Body>
              <Right>
                <Button transparent onPress={this.logout}>
                  <Text>Salir</Text>
                </Button>
              </Right>
            </ListItem>
          </List>
        </Content>
        <FooterTabsNavigationIconText navigation={this.props.navigation} />
      </Container>
    );
  }
}

const mapStateToProps = reducers => {
  return reducers.usuariosReducer;
};

export default connect(mapStateToProps, loginActions)(NewsScreenHome);
