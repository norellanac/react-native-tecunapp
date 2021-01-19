import React, { Component } from "react";
import { Dimensions, Image, ScrollView } from "react-native";
import HTML from "react-native-render-html";
import { withNavigation } from "react-navigation";
import { Col, Grid, Row } from "react-native-easy-grid";
import {
  Container,
  Content,
  Thumbnail,
  Form,
  Input,
  List,
  Icon,
  View,
  ListItem,
  Item,
  Text,
  CardItem,
  Card,
  Button,
  Left,
  Right,
  Body,
} from "native-base";
import { connect } from "react-redux";
import * as rrhhActions from "../src/actions/rrhhActions";
import * as loginActions from "../src/actions/loginActions";
import FooterTabsNavigationIconText from "../components/FooterTaIconTextN-B";
import HeaderCustom from "../components/HeaderCustom";
import HederPostSection from "../components/HederPostSection";
import { apiUrl } from "../App";

import Loading from "./../components/Loading";

class ProccessVacationScreen extends Component {
  constructor() {
    super();
  }
  state = {
    showComments: false,
    newArray: [],
    company: "",
  };

  loadingInfoName() {
    const companies = this.props.rrhhReducer.company;
    let count = 0;

    return companies.map((itemName) => (
      //console.log("name ",itemName),
      //console.log(" other ", companies),
      <View>
        <Text>{itemName[0].name}</Text>
        {(() => {
                return itemName.map((item) => <Text>{item.departament}</Text>);
              })()}
      </View>
    ));
  }

  departament(objectDepartament) {
    //console.log("object ",objectDepartament.departament);

    return objectDepartament.map((item) => {
      console.log("item ", item.departament);
      <Text>{item.departament}</Text>;
    });
  }

  render() {
    var screenWidth = Dimensions.get("window").width;
    var screenHeight = Dimensions.get("window").height;
    const companies = this.props.rrhhReducer.company;

    if (this.props.rrhhReducer.cargando) {
      return (
        <Container>
          <HeaderCustom navigation={this.props.navigation} />
          <HederPostSection navigation={this.props.navigation} />
          <Loading />
          <FooterTabsNavigationIconText navigation={this.props.navigation} />
        </Container>
      );
    }

    return (
      <Container>
        <HeaderCustom navigation={this.props.navigation} />
        <Content>
          {this.loadingInfoName()}

         {/*  {(() => {
            return companies.map((itemName) => (
              //console.log("name ",itemName),
              //console.log(" other ", companies),
              <View>
                <Text>{itemName[0].name}</Text>
                <Text>----------------------------</Text>
                {(() => {
                  return itemName.map((item) => (
                    <Text>{item.departament}</Text>
                  ));
                })()}
              </View>
            ));
          })()} */}
        </Content>
        <FooterTabsNavigationIconText navigation={this.props.navigation} />
      </Container>
    );
  }
}

const mapStateToProps = ({ rrhhReducer, usuariosReducer }) => {
  //return reducers.rrhhReducer; /*   DE TODOS LOS REDUCERS MAPEAMOS el reducer de usuarios devolvera los suauiros en los props del componente */
  return { rrhhReducer, usuariosReducer };
};

const mapDispatchProps = {
  ...rrhhActions,
  ...loginActions,
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchProps)(ProccessVacationScreen)
);
