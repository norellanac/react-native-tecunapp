import React from "react";
import { View, Image, StyleSheet, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import {
  Text,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title
} from "native-base";
import Constants from "expo-constants";
import { logoutUser } from "../src/actions/loginActions";
import { persistor } from "../App";

function HeaderCustom(props) {

  logout = async () => {
    //await this.props.logoutUser();
    console.log("borró usuario");
    //await this.props.resetAddress();
    await persistor.purge();
    props.navigation.navigate("Login");
    console.log("borró direccion");
  };

  console.log("header: ", );
  return (
    <Header style={{ backgroundColor: '#ed913b' }}>
      <Left>
        <Button transparent onPress={() => props.navigation.goBack()}>
          <Icon name="arrow-back" />
        </Button>
      </Left>
      <Body>
        <Title></Title>
      </Body>
      <Right>
        <Button transparent onPress={() => props.navigation.navigate("SettingsScreen")}>
          <Icon name="user" type="FontAwesome" />
          <Text style={{ color: "#ffffff" }}>{props.usuariosReducer.user.name} </Text>
        </Button>

        <Button
          transparent
          onPress={() => logout()}
        >
          <Icon name="sign-out-alt" type="FontAwesome5" />
        </Button>
      </Right>
    </Header>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 15,
    paddingBottom: 8,
    elevation: 2
  },
  iconContainer: {
    flexDirection: "row"
  },
  logo: {
    width: 41,
    height: 35,
    resizeMode: "contain"
  },
  textPoints: {
    fontSize: 20,
    color: "#EC4C17",
    fontWeight: "bold",
    paddingVertical: 5
  },
  statusBar: {
    height: Constants.statusBarHeight
  }
});

const MapStateToProps = ({ usuariosReducer }) => {
  return {
    usuariosReducer
  };
};

export default connect(MapStateToProps)(HeaderCustom);
