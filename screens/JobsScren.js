import React, { Component } from "react";
import { Dimensions } from "react-native";
import { withNavigation } from "react-navigation";
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
import * as jobsActions from "../src/actions/jobsActions";
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
    jobs: "",
    job: "",
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
    
    await this.props.getJobs(this.props.usuariosReducer.token);
    console.log("jobs props", this.props);
    this.setState({
      jobs: await this.props.getJobs(this.props.usuariosReducer.token)
    });
    console.log("jobs state: ", this.state);
  }





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



const mapStateToProps = ({ jobsReducer, usuariosReducer }) => {
  //return reducers.jobsReducer; /*   DE TODOS LOS REDUCERS MAPEAMOS el reducer de usuarios devolvera los suauiros en los props del componente */
  return { jobsReducer, usuariosReducer };
};

const mapDispatchProps = {
  ...jobsActions,
  ...loginActions,
};

export default  withNavigation(
  connect(mapStateToProps, mapDispatchProps)(JobsScren)
);