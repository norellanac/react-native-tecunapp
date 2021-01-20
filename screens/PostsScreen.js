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
import { SliderBox } from "react-native-image-slider-box";
import { apiUrl } from '../App';

import Loading from "./../components/Loading";

class PostsScreen extends Component {
  constructor() {
    super();
  }
  state = {
    selected: 0,
    pathImage: apiUrl.link + "/storage/posts/",
    idCategory: 0,
  };


  async componentDidMount() {
    await this.props.getNews(this.props.usuariosReducer.token);
  };

  showNews(idPost) {
    this.props.getShowPost(idPost, this.props.usuariosReducer.token);
    this.props.navigation.navigate("PostsShowScreen")
  }

  onValueChange(key) {
    this.state.selected = key;
    this.state.idCategory = key;
    if(this.state.idCategory == 0){
      this.props.getNews(this.props.usuariosReducer.token);
    }else{
      this.props.getCategory(this.state.idCategory, this.props.usuariosReducer.token);
      this.props.navigation.navigate("PostsCategoryScreen");
    }
  }

  loadContentCategories = () => {
    return this.props.postReducer.categories.map((category) => (
      //console.log(category),
      <Picker.Item label={category.name} value={category.id} key={category.id} />
    ))
  }

  async likePost(postID) {
    let token = this.props.usuariosReducer.token;
    await this.props.likeOrDislike(postID, token);
    await this.props.getNews(token);
  }

  loadContent = () => {
    var screenWidth = Dimensions.get("window").width;
    var screenHeight = Dimensions.get("window").height;

    if (this.props.postReducer.posts) {
      return this.props.postReducer.posts.map((news) => (
        //console.log(this.props.postReducer.posts),
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
              <Button transparent textStyle={{ color: "#87838B" }} onPress={() => this.likePost(news.id)}>
                <Icon name="like2" type="AntDesign" />
                <Text>({news.likes.length})</Text>
              </Button>
            </Left>
            <Right>
              <Button transparent textStyle={{ color: "#87838B" }} onPress={() => this.showNews(news.id)}>
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

    if (this.props.postReducer.cargando) {
      return (
        <Container>
          <HeaderCustom navigation={this.props.navigation} />
          <HederPostSection navigation={this.props.navigation}></HederPostSection>
          < Loading />
          <FooterTabsNavigationIconText navigation={this.props.navigation} />
        </Container>
      )
    }

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

          {this.loadContent()}

        </Content>
        <FooterTabsNavigationIconText navigation={this.props.navigation} />
      </Container>
    );
  }
}



const mapStateToProps = ({ postReducer, usuariosReducer, loginReducer }) => {
  //return reducers.postReducer; /*   DE TODOS LOS REDUCERS MAPEAMOS el reducer de usuarios devolvera los suauiros en los props del componente */
  return { postReducer, usuariosReducer, loginReducer };
};

const mapDispatchProps = {
  ...postActions,
  ...loginActions,
};

export default withNavigation(
  connect(mapStateToProps, mapDispatchProps)(PostsScreen)
);