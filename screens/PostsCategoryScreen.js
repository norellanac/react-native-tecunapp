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
import * as postActions from "../src/actions/postActions";
import * as loginActions from "../src/actions/loginActions";
import FooterTabsNavigationIconText from "../components/FooterTaIconTextN-B";
import HeaderCustom from "../components/HeaderCustom";
import HederPostSection from "../components/HederPostSection";
import { persistor } from "../App";
import { apiUrl } from '../App';

import Loading from "./../components/Loading";

class PostsCategoryScreen extends Component {
  constructor() {
    super();
  }
  state = {
    posts: null,
    postId: null,
    selected: 0,
    more: 1,
    pathImage: apiUrl.link + "/storage/posts/",
    idCategory: 0,
    category: '',
    categoryPostName: ''
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
    await this.props.getCategory(this.props.usuariosReducer.token);
    console.log("posts props", this.props.postReducer);
    //console.log("posts state: ", this.state);
  };

  onValueChange(key) {

    this.state.selected = key;
    this.state.idCategory = key;
    this.props.getCategory(this.state.idCategory, this.props.usuariosReducer.token);
  }

  setIdSearchNew(post) {
    //console.log("Array del job: ", jobArray);
    //console.log("Reducer del job: ", this.props.postReducer);
    this.props.setIdNewSearch(post);
    this.props.navigation.navigate("PostsShowScreen")
  }

  async showPostsCategory(idPost) {
    await this.props.getShowPostCategory(idPost, this.props.usuariosReducer.token);
    this.props.navigation.navigate("PostsShowScreen")
  }

  loadContentCategories = () => {
    return this.props.postReducer.categories.map((categories) => (
      //console.log(categories),
      <Picker.Item label={categories.name} value={categories.id} key={categories.id} />
    ))
  }

  loadContent = () => {
    var screenWidth = Dimensions.get("window").width;
    var screenHeight = Dimensions.get("window").height;

    if (this.props.postReducer.post) {
        console.log("map posts: ", this.props.postReducer.post);
      return this.props.postReducer.post.map((news) => (
        console.log("El objecto como tal de news: ",news),
        <Card style={{ flex: 0 }} key={news.id}>
          <CardItem style={{ backgroundColor: "transparent" }}>
            <Left>
              <Thumbnail
                style={{ backgroundColor: "#000000" }}
                source={require("../assets/images/robot-dev.png")}
              />
              <Body>
                <Text>{news.title}</Text>
                <Text note>{news.created_at}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem >
            <Body>
              <Image  
                source={{uri: this.state.pathImage + news.featured_image }}
                style={{width: screenWidth - 20, height: 150}} 
              />
              <Text >{news.description}</Text>

            </Body>
          </CardItem>
          <CardItem>
              <Left>
                <Button transparent textStyle={{ color: "#87838B" }}>
                  <Icon name="like2" type="AntDesign" />
                  <Text>{news.likes.length}</Text>
                </Button>
              </Left>
              <Right>
                <Button transparent textStyle={{ color: "#87838B" }} onPress={() => this.showPostsCategory(news.id)}>
                  <Icon name="comment" type="FontAwesome" />
                  <Text>Comentarios</Text>
                </Button>
              </Right>
            </CardItem>
        </Card>


      ))
    } else {
      return <Spinner color="blue" style={{ flex: 1 }} />;
    }
  };
 
  render() {
    var screenWidth = Dimensions.get("window").width;
    var screenHeight = Dimensions.get("window").height;
    console.log(this.props);

    this.state.categoryPostName = this.props.postReducer.categoryPostName;

    //console.log(this.state.idCategory);

    //const { navigation } = this.props.navigation

    if (this.props.postReducer.cargando) {
      //console.log("jobsScreen: ", this.props);
      return <Loading />
    }

    //console.log(this.props.postReducer);

    //console.log("jobsProps: ", this.props);

    return (
      <Container>
        <HeaderCustom navigation={this.props.navigation} />
        <HederPostSection navigation={this.props.navigation}></HederPostSection>
        <Form>
          <Picker
            note
            mode="dropdown"
            style={{ width: "100%" }}
            selectedValue={this.state.selected}
            onValueChange={this.onValueChange.bind(this)}
          >
            <Picker.Item label="Categorias" value='0' />
            {this.loadContentCategories()}
          </Picker>
        </Form>
        <Content>

            <Text>{this.state.categoryPostName}</Text>
            {this.loadContent()}

        </Content>
        <FooterTabsNavigationIconText navigation={this.props.navigation} />
      </Container>
    );
  }
}



const mapStateToProps = ({ postReducer, usuariosReducer }) => {
  //return reducers.postReducer; /*   DE TODOS LOS REDUCERS MAPEAMOS el reducer de usuarios devolvera los suauiros en los props del componente */
  return { postReducer, usuariosReducer };
};

const mapDispatchProps = {
  ...postActions,
  ...loginActions,
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchProps)(PostsCategoryScreen)
);