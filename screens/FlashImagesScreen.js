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
  Picker,
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
import HederPostSection from "../components/HederPostSection";
import { persistor } from "../App";
import { SliderBox } from "react-native-image-slider-box";
import Loading from "./../components/Loading";

class PodcastScreen extends Component {
  constructor() {
    super();
  }
  state = {
    search: "",
    jobId: null,
    selected: "key1",
  };

  onValueChange(value: string) {
    this.setState({
      selected: value
    });
  }

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
    var screenWidth = Dimensions.get("window").width;
    var screenHeight = Dimensions.get("window").height;

    //const { navigation } = this.props.navigation

    if (this.props.jobsReducer.cargando) {
      console.log("jobsScreen: ", this.props);
      return <Loading />
    }

    console.log("jobsProps: ", this.props);

    return (
      <Container>
        <HeaderCustom navigation={this.props.navigation} />
        <HederPostSection navigation={this.props.navigation}></HederPostSection>
        <Content>
          <Card style={{ flex: 0 }}>
            <CardItem style={{ backgroundColor: "transparent" }}>
              <Left>
                <Thumbnail
                  style={{ backgroundColor: "#000000" }}
                  source={require("../assets/images/robot-dev.png")}
                />
                <Body>
                  <Text>Nueva FlashImagesScreen</Text>
                  <Text note>April 15, 2020</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem style={{ backgroundColor: "#181e26" }}>
              <Body>
                <Image
                  source={require("../assets/images/robot-dev.png")}
                  style={{ width: screenWidth - 20, height: 150 }}
                />
                <Text style={{ color: "white" }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam eos nostrum delectus omnis...s</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{ color: "#87838B" }}>
                  <Icon name="heart" type="FontAwesome" />
                  <Text>1,926 </Text>
                </Button>
              </Left>
              <Right>
                <Button transparent textStyle={{ color: "#87838B" }}>
                  <Icon name="comment" type="FontAwesome" />
                  <Text>1,926 Comentarios</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>

          <Card style={{ flex: 0 }}>
            <CardItem style={{ backgroundColor: "transparent" }}>
              <Left>
                <Thumbnail
                  style={{ backgroundColor: "#000000" }}
                  source={require("../assets/images/robot-dev.png")}
                />
                <Body>
                  <Text>Nueva Publicación</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem style={{ backgroundColor: "#181e26" }}>
              <Body>
                <Image
                  source={require("../assets/images/robot-dev.png")}
                  style={{ width: screenWidth - 20, height: 150 }}
                />
                <Text style={{ color: "white" }}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam eos nostrum delectus omnis...s</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{ color: "#87838B" }}>
                  <Icon name="heart" type="FontAwesome" />
                  <Text>1,926 </Text>
                </Button>
              </Left>
              <Right>
                <Button transparent textStyle={{ color: "#87838B" }}>
                  <Icon name="comment" type="FontAwesome" />
                  <Text>1,926 Comentarios</Text>
                </Button>
              </Right>
            </CardItem>
          </Card>

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
  connect(mapStateToProps, mapDispatchProps)(PodcastScreen)
);