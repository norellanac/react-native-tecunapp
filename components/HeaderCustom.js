import React from "react";
import { View, Image, StyleSheet, SafeAreaView } from "react-native";
import { connect } from "react-redux";
import { Container, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';


function HeaderCustom(props) {
  return (
    <Container>
      <Header>
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right>
            <Button transparent>
              <Icon name='search' />
            </Button>
            <Button transparent>
              <Icon name='heart' />
            </Button>
            <Button transparent>
              <Icon name='more' />
            </Button>
          </Right>
        </Header>
    </Container>
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
