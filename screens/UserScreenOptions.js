import React, { Component } from "react";
import { Image, KeyboardAvoidingView } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
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
class UserScreenOptions extends Component {
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
                Las contraseñas no coinciden
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

    console.log("UserScreenOptions: ", this.props);

    return (
      <Container>
        <HeaderCustom navigation={this.props.navigation} />
        <Content>
          <Card transparent>
            <Button
              transparent
              vertical
              onPress={() =>
                this.props.navigation.navigate("EditPasswordRoute")
              }
            >
              <CardItem>
                <Grid style={{ backgroundColor: "#F8FAFB" }}>
                  <Col size={1} style={{ alignItems: "center", marginTop: 7 }}>
                    <Icon type="Octicons" name="key" />
                  </Col>
                  <Col size={5} style={{ marginBottom: 10, marginTop: 10 }}>
                    <Text style={{ color: "#1c2752" }}>Cambiar Contraseña</Text>
                  </Col>
                </Grid>
              </CardItem>
            </Button>
            <Button
              transparent
              vertical
              onPress={() => this.props.navigation.navigate("EditPhoneRoute")}
            >
              <CardItem>
                <Grid style={{ backgroundColor: "#F8FAFB" }}>
                  <Col size={1} style={{ alignItems: "center", marginTop: 7 }}>
                    <Icon type="AntDesign" name="phone" />
                  </Col>
                  <Col size={5} style={{ marginBottom: 10, marginTop: 10 }}>
                    <Text style={{ color: "#1c2752" }}>
                      Editar mi número teléfono
                    </Text>
                  </Col>
                </Grid>
              </CardItem>
            </Button>
            <CardItem>
              <Grid style={{ backgroundColor: "#F8FAFB" }}>
                <Col size={1} style={{ alignItems: "center", marginTop: 7 }}>
                  <Icon type="MaterialCommunityIcons" name="logout" />
                </Col>
                <Col size={5} style={{ marginBottom: 10, marginTop: 10 }}>
                  <Text onPress={this.logout} style={{ color: "#1c2752" }}>
                    Cerrar sesión
                  </Text>
                </Col>
              </Grid>
            </CardItem>
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

export default connect(mapStateToProps, loginActions)(UserScreenOptions);
