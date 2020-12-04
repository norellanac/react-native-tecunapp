import React, { Component } from "react";
import { Dimensions } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import {
  Container,
  Content,
  View,
  Form,
  Item,
  Input,
  Icon,
  Text,
  CardItem,
  Card,
  Button
} from "native-base";
import { connect } from "react-redux";
import * as loginActions from "../src/actions/loginActions";
import FooterTabsNavigationIconText from "../components/FooterTaIconTextN-B";
import HeaderCustom from "../components/HeaderCustom";
import { persistor } from "../App";
import { SliderBox } from "react-native-image-slider-box";

class JobsScren extends Component {
  constructor() {
    super();
  }
  state = {
    search: "",
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




  render() {
    //const { navigation } = this.props.navigation
    var screenWidth = Dimensions.get("window").width - 2;
    var hg = Dimensions.get("window").width - 120;

    console.log("UserScreenProfile: ", this.props);

    return (
      <Container>
        <HeaderCustom navigation={this.props.navigation} />
        <Content>

          <Form style={{ marginRight: 45, marginLeft: 45, marginTop: 20 }}>
            <Item rounded style={{ marginTop: 25 }}>
              <Icon
                type="MaterialCommunityIcons"
                name="lock-open-outline"
                style={{ color: "white", fontSize: 25 }}
              />
              <Input
                onChangeText={search => this.setState({ search })}
                value={this.state.search}
                placeholder="Plaza o Descripcion"
                placeholderTextColor="black"
                style={{ color: "Black" }}
              />
              <Button transparent onPress={() => this.props.navigation.navigate("JobsScreen")}>
                <Icon name="search" type="FontAwesome5" />
              </Button>
            </Item>

          </Form>


        </Content>
        <FooterTabsNavigationIconText navigation={this.props.navigation} />
      </Container>
    );
  }
}

const mapStateToProps = reducers => {
  return reducers.usuariosReducer;
};

export default connect(mapStateToProps, loginActions)(JobsScren);
