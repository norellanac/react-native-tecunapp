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
  Picker,
  Input,
  Icon,
  View,
  Text,
  CardItem,
  Accordion,
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

class PostsShowScreen extends Component {
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


  _renderHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center" ,
        backgroundColor: "#A9DAD6" }}>
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
      <Text
        style={{
          backgroundColor: "#e3f1f1",
          padding: 10,
          fontStyle: "italic",
        }}
      >
        {item.content}
      </Text>
    );
  }


  async componentDidMount() {
    //console.log(this.props.getNews(this.props.usuariosReducer.token));
    //this.props.getCategory(this.props.usuariosReducer.token); 
    //console.log("posts props", this.props);
    //console.log("posts state: ", this.state);
  }


  loadContent = () => {
    var screenWidth = Dimensions.get("window").width;
    var screenHeight = Dimensions.get("window").height;
  }

  render() {
    var screenWidth = Dimensions.get("window").width;
    var screenHeight = Dimensions.get("window").height;

    //console.log("Vista del post Show Desde la Category");
    //console.log("Que trae el reducer: ", this.props.postReducer.post);

    const post = Object.assign({}, this.props.postReducer.post);

    console.log("Que trae post?: ", post);

    //console.log("Que trae el reducer: ", this.props.postReducer);

    const dataArray = [
      { title: `Comentarios (${this.props.postReducer.post.comments.length}) `, content: "Lorem ipsum dolor sit amet" }
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
        <Card style={{ flex: 0 }} key={post.id}>
            <CardItem style={{ backgroundColor: "transparent" }}>
                <Left>
                    <Thumbnail
                        style={{ backgroundColor: "#000000" }}
                        source={require("../assets/images/robot-dev.png")}
                    />
                    <Text>{post.title}</Text>
                </Left>
            </CardItem>
            <CardItem>
                <Body>
                    <Image  
                        source={{uri: this.state.pathImage + post.featured_image }}
                        style={{width: screenWidth - 20, height: 150}} 
                    />
                    <Text note>{post.created_at}</Text>
                    <Text></Text>
                    <Text>{ post.description }</Text>
                    <ScrollView style={{ flex: 1 }}>
                        <HTML source={{ html: post.content }} contentWidth={screenWidth} />
                        <Text></Text>
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
  connect(mapStateToProps, mapDispatchProps)(PostsShowScreen)
);