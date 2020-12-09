import React, { Component } from "react";
import { Dimensions, Image } from "react-native";
import { WebView } from 'react-native-webview';
import { withNavigation } from "react-navigation";
import {
  Container,
  Content,
  View,
  Thumbnail,
  Form,
  Item,
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
import * as loginActions from "../src/actions/loginActions";
import * as storeActions from '../src/actions/storeActions'
import FooterTabsNavigationIconText from "../components/FooterTaIconTextN-B";
import HeaderCustom from "../components/HeaderCustom";
import { persistor } from "../App";
import { SliderBox } from "react-native-image-slider-box";
import Loading from "./../components/Loading";

class StoreScreen extends Component {
  constructor() {
    super();
  }
  state = {
    search: "",
    stores: [],
    store: []
  };


  /*storesItem = () => (

    this.props.storeReducer.stores.map((store) => (
      <Card style={{ flex: 0 }} key={store.id}>
        <CardItem style={{ backgroundColor: "transparent" }}>
          <Left>
            <Thumbnail
              style={{ backgroundColor: "#000000" }}
              source={require("../assets/images/robot-dev.png")}
            />
            <Body>
              <Text>{store.title}</Text>
              <Text note>{store.created_at}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem >
          <Body>
            <Text >{store.description}</Text>

          </Body>
        </CardItem>
        <CardItem style={{justifyContent: "center"}}>
          <Button transparent textStyle={{ color: "#87838B" }}>
            <Icon name="user-tie" type="FontAwesome5" />
            <Text>Aplicar </Text>
          </Button>
        </CardItem>
      </Card>


    ))
  )
  */

  async componentDidMount() {
    await this.props.getStores(this.props.usuariosReducer.token);
    this.setState({
        stores: await this.props.getStores(this.props.usuariosReducer.token)
    });
  }

  loadContent = () => {
    if (this.props.storeReducer.stores) {
      console.log("jobs: ", this.props.storeReducer.stores);
      return this.props.storeReducer.stores.map((store) => (
        <Card style={{ flex: 0 }} key={store.id}>
          <CardItem style={{ backgroundColor: "transparent" }}>
            <Left>
              <Thumbnail
                style={{ backgroundColor: "#000000" }}
                source={require("../assets/images/robot-dev.png")}
              />
              <Body>
                <Text>{store.title}</Text>
                <Text note>{store.created_at}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem >
            <Body>
              <Text >{store.description}</Text>

            </Body>
          </CardItem>
          <CardItem style={{ justifyContent: "center" }}>
            <Button transparent textStyle={{ color: "#87838B" }} onPress={() => this.setIdSearchJob(job)}>
              <Icon name="user-tie" type="FontAwesome5" />
              <Text>Aplicar </Text>
            </Button>
          </CardItem>
        </Card>


      ))
    } else {
      return <Spinner color="blue" style={{ flex: 1 }} />;
    }
  };

  render() {

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
                placeholderTextColor="#000000"
                style={{ color: "#000000" }}
              />
              <Button transparent onPress={() => this.props.navigation.navigate("JobsScreen")}>
                <Icon name="search" type="FontAwesome5" />
              </Button>
            </Item>

          </Form>

            { this.loadContent() }

        </Content>
        <FooterTabsNavigationIconText navigation={this.props.navigation} />
      </Container>
    );
  }
}



const mapStateToProps = ({ storeReducer, usuariosReducer }) => {
  //return reducers.storeReducer; /*   DE TODOS LOS REDUCERS MAPEAMOS el reducer de usuarios devolvera los suauiros en los props del componente */
  return { storeReducer, usuariosReducer };
};

const mapDispatchProps = {
  ...storeActions,
  ...loginActions,
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchProps)(StoreScreen)
);