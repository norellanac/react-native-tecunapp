import React, { Component } from "react";
import { Dimensions, Image } from "react-native";
import { WebView } from 'react-native-webview';
import { withNavigation } from "react-navigation";
import {
  Container,
  Content,
  Spinner,
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
import * as jobsActions from "../src/actions/jobsActions";
import * as loginActions from "../src/actions/loginActions";
import FooterTabsNavigationIconText from "../components/FooterTaIconTextN-B";
import HeaderCustom from "../components/HeaderCustom";
import { persistor } from "../App";
import { SliderBox } from "react-native-image-slider-box";
import Loading from "./../components/Loading";

class JobsScren extends Component {
  constructor() {
    super();
  }
  state = {
    search: "",
    jobId: null,
  };

  setIdSearchJob(jobArray) {
    console.log("Array del job: ", jobArray);
    console.log("Reducer del job: ", this.props.jobsReducer);
    this.props.setIdJobSearch(jobArray);
    this.props.navigation.navigate("JobShowScreen")
  }


  loadContent = () => {
    if (this.props.jobsReducer.jobs) {
      //console.log("jobs: ", this.props.jobsReducer.jobs);
      return this.props.jobsReducer.jobs.map((job) => (
        <Card style={{ flex: 0 }} key={job.id}>
          <CardItem style={{ backgroundColor: "transparent" }}>
            <Left>
              <Thumbnail
                style={{ backgroundColor: "#000000" }}
                source={require("../assets/images/robot-dev.png")}
              />
              <Body>
                <Text>{job.title}</Text>
                <Text note>{job.created_at}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem >
            <Body>
              <Text >{job.description}</Text>

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
    console.log("jobs state: ", this.state);
  }





  render() {
    //const { navigation } = this.props.navigation

    if (this.props.jobsReducer.cargando) {
      console.log("jobsScreen: ", this.props);
      return <Loading />
    }

    console.log("jobsProps: ", this.props);

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

          {this.loadContent()}

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

export default withNavigation(
  connect(mapStateToProps, mapDispatchProps)(JobsScren)
);