import React from "react";
import { View, Image, StyleSheet, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';


function HeaderCustom(props) {
  return (
      <Header>
          <Left>
            <Button transparent onPress={() =>
                props.navigation.navigate('Home')
              }>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title></Title>
          </Body>
          <Right>
            <Button transparent onPress={() =>
                props.navigation.navigate('User')
              }>
              <Icon name='user' type="FontAwesome" />
            </Button>
            <Button transparent onPress={() =>
                props.navigation.navigate('Settings')
              }>
              <Icon name='notifications' type="MaterialIcons" />
            </Button>
            <Button transparent onPress={() =>
                props.navigation.navigate('Settings')
              }>
              <Icon name='more' />
            </Button>
          </Right>
        </Header>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15
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
  }
});

const MapStateToProps = ({ usuariosReducer }) => {
  return {
    usuariosReducer
  };
};

export default connect(MapStateToProps)(HeaderCustom);
