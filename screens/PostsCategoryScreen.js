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
    selected: 0,
    pathImage: apiUrl.link + "/storage/posts/",
    idCategory: 0,
  };

  showNews(idPost) {
    this.props.getShowPost(idPost, this.props.usuariosReducer.token);
    this.props.navigation.navigate("PostsShowScreen")
  }

  onValueChange(key) {

    this.state.selected = key;
    this.state.idCategory = key;

    //console.log(key);
    
    if(this.state.idCategory == 0){
      this.props.getNews(this.props.usuariosReducer.token);
      this.props.navigation.navigate("Home");
    }else{
      this.props.getCategory(this.state.idCategory, this.props.usuariosReducer.token);
    }
  }

  async likePost(postID) {
    let token = this.props.usuariosReducer.token;
    await this.props.likeOrDislike(postID, token);

    if (this.state.idCategory == 0) {
      this.props.getNews(this.props.usuariosReducer.token);
      this.props.navigation.navigate("PostsScreen");
    }else{
      this.props.getCategory(this.state.idCategory, this.props.usuariosReducer.token);
    }
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
              {(() => {

                if (news.user_likes_new){
                  return <Icon name="like1" type="AntDesign" />
                }else{
                  return <Icon name="like2" type="AntDesign" />
                }

              })()}
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

    this.state.categoryPostName = this.props.postReducer.categoryPostName;

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