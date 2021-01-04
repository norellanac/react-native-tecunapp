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
    posts: null,
    postId: null,
    selected: 0,
    more: 1,
    pathImage: apiUrl.link + "/storage/posts/",
    idCategory: 0,
    category: ''
  };


  async componentDidMount() {
      await this.props.getNews(this.props.loginReducer.token);
    //await this.props.getIdCategory(this.state.idCategory);
    console.log("posts props", this.props);
    //console.log("posts state: ", this.state);
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

  setIdSearchNew(news) {
    //console.log("Array del job: ", jobArray);
    //console.log("Reducer del job: ", this.props.postReducer);
    this.props.setIdNewSearch(news);
    this.props.navigation.navigate("PostsShowScreen")
  }

  async showPosts(idPost) {
    await this.props.getShowPost(idPost);
    this.props.navigation.navigate("PostsShowScreen")
  }

  loadContentCategories = () => {
    return this.props.postReducer.categories.map((category) => (
      //console.log(category),
      <Picker.Item label={category.name} value={category.id} key={category.id} />
    ))
  }

  likePost(likeObject, token) {
    let userID = this.props.usuariosReducer.user.id;
    //console.log("Esto es lo que trae el objecto: ",likeObject);

    if(userID != likeObject.userID){
      this.props.likeOrDislike(likeObject, token);
      this.props.getNews(token);
      this.props.getNews(token);

    }else{
      if(userID == likeObject.userID && likeObject.reactionActive == 1){
        this.props.likeOrDislike(likeObject, token);
        this.props.getNews(token);
        this.props.getNews(token);

      }else{
        this.props.likeOrDislike(likeObject, token);
        this.props.getNews(token);
        this.props.getNews(token);

      }
    }
  }

  buttonLike(news) {
    let active = [];
    let postID = news.id;
    let user_id = '';
    let token = this.props.usuariosReducer.token;
    let userID = this.props.usuariosReducer.user.id;
    let count = 0;
    let likeObject = {};

    news.likes.map((like) => {
      user_id = like.user_id;
      
      if(like.user_id == userID){
        likeObject = {"reactionActive":like.active, "postID":like.post_id, "userID":userID};
        //console.log("Que es lo que trae esto cuando estra: ", likeObject);
      }else{
        likeObject = {"reactionActive":1, "postID":postID, "userID":userID};
      }

      if(like.active == 1){
        count++
      }
    })

    return(
      <Button transparent textStyle={{ color: "#87838B" }} onPress={() => this.likePost(likeObject, token)}>
        <Icon name="like2" type="AntDesign" />
        <Text>({count})</Text>
      </Button>
    )
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
              {this.buttonLike(news)}
              
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
    if (this.props.postReducer.posts.likes) {
      var likeActive=this.props.postReducer.posts.likes.filter((record)=> {
        
      })
      
    }
    //console.log(this.state.idCategory);

    //const { navigation } = this.props.navigation

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