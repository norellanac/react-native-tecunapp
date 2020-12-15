import React, { Component } from "react";
import { Dimensions } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import {
  Container,
  Content,
  View,
  Thumbnail,
  Icon,
  Text,
  CardItem,
  Card,
  Button
} from "native-base";
import { connect } from "react-redux";
import * as awardActions from "../src/actions/awardActions";
import * as loginActions from "../src/actions/loginActions";
import FooterTabsNavigationIconText from "../components/FooterTaIconTextN-B";
import HeaderCustom from "../components/HeaderCustom";
import { persistor } from "../App";
import { withNavigation } from "react-navigation";
import Loading from "./../components/Loading";
import { SliderBox } from "react-native-image-slider-box";

class TeamScreen extends Component {
  constructor() {
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

  async componentDidMount() {
    await this.props.getAwards(this.props.usuariosReducer.token);
    this.setState({
      awards: await this.props.getAwards(this.props.usuariosReducer.token),
    });
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

  awardsUrlImageActive() {
    const pathImage = "http://157.55.181.102/storage/awards/";
    var sliderImages = [];
    var url = "";
    this.props.awardReducer.awards.map((award) => {
      if (award.active === 1) {
        url = award.url_image
        sliderImages.push(pathImage + url);
      }
      //console.log("array imagenes: ",sliderImages);


    })
    return sliderImages;
  }

  render() {
    //const { navigation } = this.props.navigation
    var screenWidth = Dimensions.get("window").width - 1;
    var hg = Dimensions.get("window").width - 150;

    if (this.props.awardReducer.cargando) {
      return (
        <Container>
          <HeaderCustom navigation={this.props.navigation} />
          < Loading />
          <FooterTabsNavigationIconText navigation={this.props.navigation} />
        </Container>
      )
    }

    return (
      <Container>
        <HeaderCustom navigation={this.props.navigation} />
        <Content>
          <View style={{ margin: 0 }}>
            <SliderBox style={{ height: hg, width: screenWidth }}
              images={this.awardsUrlImageActive()}
              autoplay
              circleLoop
            />
          </View>

          <Card transparent>
            <Button
              transparent
              vertical
              onPress={() => this.props.navigation.navigate("JobsScreen")}
            >
              <CardItem style={{ marginTop: 0 }}>
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
                      type="FontAwesome5"
                      name="rocket"
                      style={{ marginLeft: 15, color: "#1c5988" }}
                    />
                  </Col>
                  <Col size={3} style={{ marginTop: 15, marginBottom: 15 }}>
                    <Text>Oportunidades de crecimiento</Text>
                  </Col>
                </Grid>
              </CardItem>
            </Button>

            <Button
              transparent
              vertical
              onPress={() => this.props.navigation.navigate("StoreScreen")}
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
                      type="FontAwesome5"
                      name="map-marked-alt"
                      style={{ marginLeft: 15, color: "#1c5988" }}
                    />
                  </Col>
                  <Col size={3} style={{ marginTop: 15, marginBottom: 15 }}>
                    <Text>Ubicación de agencias</Text>
                  </Col>
                </Grid>
              </CardItem>
            </Button>

            <Button
              transparent
              vertical
              onPress={() =>
                this.props.navigation.navigate("SpecialTeamScreen")
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
                      type="FontAwesome5"
                      name="medal"
                      style={{ marginLeft: 15, color: "#1c5988" }}
                    />
                  </Col>
                  <Col size={3} style={{ marginTop: 15, marginBottom: 15 }}>
                    <Text>Colaboradores destacados</Text>
                  </Col>
                </Grid>
              </CardItem>
            </Button>

            <Button
              transparent
              vertical
              onPress={() => this.props.navigation.navigate("ProccessPeopleScreen")}
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
                      type="FontAwesome5"
                      name="phone"
                      style={{ marginLeft: 15, color: "#1c5988" }}
                    />
                  </Col>
                  <Col size={3} style={{ marginTop: 15, marginBottom: 15 }}>
                    <Text>Llama directo</Text>
                  </Col>
                </Grid>
              </CardItem>
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
                      type="FontAwesome5"
                      name="mail-bulk"
                      style={{ marginLeft: 15, color: "#1c5988" }}
                    />
                  </Col>
                  <Col size={3} style={{ marginTop: 15, marginBottom: 15 }}>
                    <Text>Gestiones RRHH</Text>
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

const mapStateToProps = ({ awardReducer, usuariosReducer }) => {
  return { awardReducer, usuariosReducer };
}

const mapDispatchProps = {
  ...awardActions,
  ...loginActions,
}

export default withNavigation(
  connect(mapStateToProps, mapDispatchProps)(TeamScreen)
);
