import React, { Component } from "react";
import { Dimensions, Image, ScrollView } from "react-native";
import HTML from "react-native-render-html";
import { WebView } from 'react-native-webview';
import { withNavigation } from "react-navigation";
import {
  Container,
  Content,
  Spinner,
  Thumbnail,
  Form,
  Input,
  Icon,
  View,
  Text,
  CardItem,
  Accordion,
  ListItem,
  Card,
  Item,
  Button,
  Left,
  Right,
  Body,
  Title,
  List,
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

class PostsShowCategoryScreen extends Component {
  constructor() {
    super();
  }
  state = {
    postId: '',
    postTitle: '',
    postDescription: '',
    postCreated: '',
    postContent: '',
    postImage: '',
    pathImage: apiUrl.link + "/storage/posts/",
    message: [],
  };


  _renderHeader(item, expanded) {
    //console.log("Que trae el ITEM: ",item);
    return (
      <View style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#A9DAD6"
      }}>
        <Text style={{ fontWeight: "600" }}>
          {" "}{item.title}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
          : <Icon style={{ fontSize: 18 }} name="add-circle" />}
      </View>
    );
  }
  _renderContent(item) {
    return (
      <Content>
        {item.content}
        {item.inputComment}
      </Content>
    )
  }


  async componentDidMount() {
    //this.props.navigation.navigate("PostsShowCategoryScreen")
    //console.log(this.props.getNews(this.props.usuariosReducer.token));
    //this.props.getCategory(this.props.usuariosReducer.token); 
    //console.log("posts props", this.props);
    //console.log("posts state: ", this.state);
  }

  loadContent = () => {
    var screenWidth = Dimensions.get("window").width;
    var screenHeight = Dimensions.get("window").height;
  }

  loadInfoComment() {
    //console.log("Que trae esto: ",this.props.postReducer.post);
    if (this.props.postReducer.post.comments) {
      return this.props.postReducer.post.comments.map((comment) => (
        //console.log("Que trae el postReducer.post: ", this.props.postReducer),
        <List>
          <ListItem avatar itemDivider>
            <Left>
              <Icon name="user" type="FontAwesome" />
            </Left>  
            <Body>
              <Text note>{comment.user.name} {comment.user.lastname}</Text>
              <Text>{comment.message}</Text>
            </Body>
          </ListItem>
        </List>
      ))
    }
  }

  uploadComment(post_id, message, token) {
    let commentObject = {"post_id":post_id, "message":message};

    this.props.uploadMessage(commentObject, token);
    this.props.updatePostAfterComment(commentObject.post_id, token);
    this.state.message = [];
    this.props.navigation.navigate("PostsShowCategoryScreen");
  }

  inputComment() {
    return (
      <Form style={{ marginRight: 45, marginLeft: 45, marginTop: 20, marginBottom: 20 }}>
        <Item rounded style={{ marginTop: 25 }}>
          <Input
            onChangeText={message => this.setState({ message })}
            value={this.state.message}
            placeholder="Comentario"
            placeholderTextColor="#000000"
            style={{ color: "#000000" }}
          />
          <Button transparent onPress={() => this.uploadComment(this.state.postId, this.state.message, this.props.usuariosReducer.token)}>
            <Icon name="search" type="FontAwesome5" />
          </Button>
        </Item>
      </Form>
    );
  }

  render() {
    console.log("Que trae el reducer: ",this.props.postReducer);
    var screenWidth = Dimensions.get("window").width;
    var screenHeight = Dimensions.get("window").height;

    this.state.postId = this.props.postReducer.post.id;
    this.state.postTitle = this.props.postReducer.post.title;
    this.state.postDescription = this.props.postReducer.post.description;
    this.state.postCreated = this.props.postReducer.post.created_at;
    this.state.postContent = this.props.postReducer.post.content;
    this.state.postImage = this.props.postReducer.post.featured_image;

    //console.log("Que trae el reducer:? ",this.props.postReducer);

    const dataArray = [
      { title: `Comentarios (${this.props.postReducer.post.comments.length})`, content: this.loadInfoComment(), inputComment: this.inputComment() }
    ];

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

    //console.log("jobsProps: ", this.props);

    return (
      <Container>
        <HeaderCustom navigation={this.props.navigation} />
        <Content>
          <Card style={{ flex: 0 }} key={this.state.postId}>
            <CardItem style={{ backgroundColor: "transparent" }}>
              <Left>
                <Thumbnail
                  style={{ backgroundColor: "#000000" }}
                  source={require("../assets/images/robot-dev.png")}
                />
                <Text>{this.state.postTitle}</Text>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image
                  source={{ uri: this.state.pathImage + this.state.postImage }}
                  style={{ width: screenWidth - 20, height: 150 }}
                />
                <Text note>{this.state.postCreated}</Text>
                <Text></Text>
                <Text>{this.state.postDescription}</Text>
                <ScrollView style={{ flex: 1 }}>
                  <HTML source={{ html: this.state.postContent }} contentWidth={screenWidth} />
                  <Accordion
                    dataArray={dataArray}
                    animation={true}
                    expanded={true}
                    renderHeader={this._renderHeader}
                    renderContent={this._renderContent}
                  />
                </ScrollView>
              </Body>
            </CardItem>
          </Card>
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
  connect(mapStateToProps, mapDispatchProps)(PostsShowCategoryScreen)
);