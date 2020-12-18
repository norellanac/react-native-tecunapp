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
    selected: '',
    more: 1,
    pathImage: apiUrl.link + "/storage/posts/",
    idCategory: '',
    category: '',
    categoryPostName: '',
    comment: []
  };

  logout = async () => {
    //await this.props.logoutUser();
    console.log("borró usuario");
    //await this.props.resetAddress();
    await persistor.purge();
    this.props.navigation.navigate("Login");
    console.log("borró direccion");posts
  };

  async componentDidMount() {
    //await this.props.getCategory(this.props.usuariosReducer.token);
    //console.log("posts props", this.props.postReducer);
    //console.log("posts state: ", this.state);
  };

  showNew(idNew) {
    //console.log("Que trae idNew: ", idNew);
    this.props.navigation.navigate("PostsShowCategoryScreen")
    this.props.navigation.navigate("PostsShowCategoryScreen")
    this.props.navigation.navigate("PostsShowCategoryScreen")
    this.props.getShowPostCategory(idNew, this.props.usuariosReducer.token);
    
  }

  setIdOneRecord(oneRecordArray, commentPost) {
    /*console.log("Array del registro: ", oneRecordArray);
    console.log("Reducer del registro: ", this.props.jobsReducer);*/
    this.props.setIdOneRecordAction(oneRecordArray, commentPost);
    this.props.navigation.navigate("PostsShowCategoryScreen")
    
  }

  onValueChange(key) {

    this.state.selected = key;
    this.state.idCategory = key;
    this.props.getCategory(this.state.idCategory, this.props.usuariosReducer.token);
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

    //console.log("Que trae el reducer?: ", this.props.postReducer);

    if (this.props.postReducer.posts) {
      //console.log("map posts largo: ", this.props.postReducer.post);
      return this.props.postReducer.posts.map((news) => (
        //console.log("El objecto como tal de news: ", news),
        this.state.comment = this.props.postReducer.comment,
        console.log("Que trae el comentario: ", this.state.comment),
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
                source={{ uri: this.state.pathImage + news.featured_image }}
                style={{ width: screenWidth - 20, height: 150 }}
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
              <Button transparent textStyle={{ color: "#87838B" }} onPress={() => this.setIdOneRecord(news, this.state.comment)}>
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
    //console.log(this.props);

    this.state.categoryPostName = this.props.postReducer.categoryPostName;

    //console.log(this.state.idCategory);

    //const { navigation } = this.props.navigation

    //console.log("Vista del post Category");

    if (this.props.postReducer.cargando) {
      //console.log("jobsScreen: ", this.props);
      return (
        <Container>
          <HeaderCustom navigation={this.props.navigation} />
          <HederPostSection navigation={this.props.navigation}></HederPostSection>
          < Loading />
          <FooterTabsNavigationIconText navigation={this.props.navigation} />
        </Container>
      )
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