import React, { Component } from "react";
import { TouchableOpacity, Image, ScrollView } from "react-native";
import HTML from "react-native-render-html";
import { WebView } from "react-native-webview";
import { withNavigation } from "react-navigation";
import { Linking } from "react-native";
import {
  Container,
  Content,
  Footer,
  Header,
  Form,
  Input,
  List,
  Icon,
  View,
  ListItem,
  Grid,
  Col,
  Item,
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
import { apiUrl, screenWidth, myStyles } from "../App";

import Loading from "./../components/Loading";

class PostsShowScreen extends Component {
  constructor() {
    super();
  }
  state = {
    postId: "",
    postTitle: "",
    postDescription: "",
    postCreated: "",
    postContent: "",
    postImage: "",
    pathImage: apiUrl.link + "/storage/posts/",
    message: "",
    showComments: false,
  };

  async componentDidMount() {
    //console.log(this.props.getNews(this.props.usuariosReducer.token));
    //this.props.getCategory(this.props.usuariosReducer.token);
    //console.log("posts props", this.props);
    //console.log("posts state: ", this.state);
  }

  loadIcon = () => {
    if (this.state.showComments) {
      return "arrow-up";
    } else {
      return "arrow-down";
    }
  };

  loadInfoComment() {
    //console.log("Que trae esto: ",this.props.postReducer.post);
    if (
      this.props.postReducer.post.comments &&
      this.state.showComments == true
    ) {
      //console.log('Que trae el reducer de coment ', this.props.postReducer.post.comments);
      return this.props.postReducer.post.comments.map((comment) => (
        <List key={comment.id}>
          <ListItem avatar>
            <Left>
              <Icon name="user" type="FontAwesome" />
            </Left>
            <Body>
              <Text>
                {comment.user.name} {comment.user.lastname}
              </Text>
              <Text note>{comment.message}</Text>
            </Body>
            <Right>{this.deleteComment(comment.user_id, comment.id)}</Right>
          </ListItem>
        </List>
      ));
    }
  }

  deleteComment(user_id, commentID) {
    //console.log("Si vino algo por cabecera? ",user_id);
    if (user_id === this.props.usuariosReducer.user.id) {
      return (
        <Button
          danger
          transparent
          onPress={() =>
            this.deleteMessage(
              commentID,
              this.props.usuariosReducer.token,
              this.state.postId
            )
          }
        >
          <Icon name="delete" type="AntDesign" />
        </Button>
      );
    }
  }

  uploadComment = async (post_id, message, token) => {
    let commentObject = { post_id: post_id, message: message };
    await this.props.uploadMessage(commentObject, token);
    await this.props.getShowPost(commentObject.post_id, token);
    this.setState({ message: [] });
    this.props.navigation.navigate("PostsShowScreen");
  };

  deleteMessage = async (id, token, post_id) => {
    let deleteObject = { id: id };
    await this.props.deleteMessage(deleteObject, token);
    await this.props.getShowPost(post_id, token);
    this.props.navigation.navigate("PostsShowScreen");
  };

  inputComment() {
    if (
      this.props.postReducer.post.comments &&
      this.state.showComments == true
    ) {
      //solo queda de ejemplo, ya no se utiliza esta funcion
      return (
        <Form
          style={{
            marginRight: 15,
            marginLeft: 15,
            marginTop: 10,
            marginBottom: 20,
          }}
        >
          <Item rounded style={{ marginTop: 25 }}>
            <Input
              onChangeText={(message) => this.setState({ message })}
              value={this.state.message}
              placeholder="Agregar un comentario"
              placeholderTextColor="#000000"
              style={{ color: myStyles.dark }}
            />
          </Item>
          <Button
            iconLeft
            info
            rounded
            style={{ alignSelf: "center", marginTop: 15 }}
            onPress={() =>
              this.uploadComment(
                this.state.postId,
                this.state.message,
                this.props.usuariosReducer.token
              )
            }
          >
            <Icon name="comment" type="FontAwesome" />
            <Text>Publicar comentario</Text>
          </Button>
        </Form>
      );
    }
  }

  async likePost(postID) {
    let token = this.props.usuariosReducer.token;
    await this.props.likeOrDislike(postID, token);
    await this.props.getShowPost(postID, token);
  }

  showUserNameLikes(post) {
    if (post.user_likes_new) {
      return <Text style={{ color: "#000000" }}>{post.likes.length}</Text>;
    } else {
      return <Text style={{ color: "#000000" }}>{post.likes.length}</Text>;
    }
  }

  titleUpper(title) {
    return title.toUpperCase();
  }

  render() {
    this.state.postId = this.props.postReducer.post.id;

    const post = Object.assign({}, this.props.postReducer.post);
    /* const classText = `class="MsoNormal"`;
		const styleText = `style="text-align:justify"`;
		const styleText2 = `style="font-size: 12pt; line-height: 107%;`;
		console.log(post.content.replace(/line-height:107%|line-height: 107%;|\n/g, " ")); */
    /* post.content.replace(/class="MsoNormal"|style="text-align:justify"|line-height:107%|line-height: 107%;|\n/g, "") */

    /*if (this.props.postReducer.cargando || this.props.postReducer.post.comments == undefined) {
			return (
				<Container>
					<HederPostSection navigation={this.props.navigation} screen={1} />
					<Loading />
					<FooterTabsNavigationIconText navigation={this.props.navigation} tab={1} />
				</Container>
			);
		}*/

    ///console.log('Que trae post', post);

    return (
      <Container>
        <HederPostSection navigation={this.props.navigation} screen={1} />
        <Content>
          <View>
            <Image
              source={{ uri: this.state.pathImage + post.featured_image }}
              style={{ width: screenWidth, minHeight: 250, maxHeight: 400 }}
            />
            <View style={{ backgroundColor: myStyles.bg2 }}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 20,
                  fontWeight: "bold",
                  color: myStyles.light,
                  paddingVertical: 8,
                  fontSize: 25,
                }}
              >
                {this.titleUpper(post.title)}
              </Text>
            </View>
            <View
              style={{ flex: 0, marginTop: 0 }}
              style={myStyles.marginAll}
              key={post.id}
            >
              <CardItem>
                <Left>
                  <Text note>{post.created_at}</Text>
                </Left>
                <Right>
                  <Button
                    textStyle={{ color: "#87838B" }}
                    style={{
                      backgroundColor: "#fbf4ff",
                      borderRadius: 20,
                      shadowColor: "#08ff00",
                      shadowOffset: {
                        width: 0,
                        height: 3,
                      },
                      shadowOpacity: 0.27,
                      shadowRadius: 4.65,

                      elevation: 6,
                    }}
                    onPress={() => this.likePost(post.id)}
                  >
                    {(() => {
                      if (post.user_likes_new) {
                        return (
                          <Icon
                            name="star"
                            type="AntDesign"
                            style={{ color: "#ffcc00" }}
                          />
                        );
                      } else {
                        return (
                          <Icon
                            name="staro"
                            type="AntDesign"
                            style={{ color: "#ffcc00" }}
                          />
                        );
                      }
                    })()}
                    {this.showUserNameLikes(post)}
                  </Button>
                </Right>
              </CardItem>
              <CardItem>
                <Body>
                  <Text>{post.description}</Text>
                  {/* <Text>{post.content.replace()}</Text> */}
                  <ScrollView>
                    {(() => {
                      if (post.content) {
                        return (
                          <HTML
                            source={{
                              html: post.content.replace(
                                /line-height:107%|line-height: 107%;|\n/g,
                                " "
                              ),
                            }}
                            contentWidth={screenWidth}
                          />
                        );
                      }
                    })()}
                  </ScrollView>
                  {/* <View style={{ flex: 1 }}>
									<Text>{post.content.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
								</View> */}
                  {(() => {
                    if (post.featured_document) {
                      return (
                        <Grid>
                          <Col size={4} style={{ alignItems: "center" }}>
                            <Button
                              onPress={() =>
                                Linking.openURL(
                                  this.state.pathImage + post.featured_document
                                )
                              }
                              style={{
                                backgroundColor: myStyles.bg1,
                                borderRadius: 20,
                                alignSelf: "center",
                              }}
                            >
                              <Icon name="cloud-download" type="FontAwesome" />
                              <Text>Documento</Text>
                            </Button>
                          </Col>
                        </Grid>
                      );
                    }
                  })()}
                </Body>
              </CardItem>
              {(() => {
                if (post.featured_video) {
                  return (
                    <ScrollView style={{ flex: 1 }}>
                      <WebView
                        source={{
                          html: `<iframe width="100%" height="100%" src="${post.featured_video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>"></iframe>`,
                        }}
                        scalesPageToFit={true}
                        bounces={false}
                        allowsFullscreenVideo={true}
                        javaScriptEnabled
                        style={{ height: 250, marginBottom: 30 }}
                      />
                    </ScrollView>
                  );
                }
              })()}
              <Button
                iconLeft
                info
                block
                onPress={(showComments) =>
                  this.setState({ showComments: !this.state.showComments })
                }
              >
                <Icon name={this.loadIcon()} type="FontAwesome" />
                <Text> Ver Comentarios</Text>
                <Icon name="comments" type="FontAwesome" />
              </Button>
              <ScrollView>{this.loadInfoComment()}</ScrollView>
            </View>
          </View>
        </Content>
        <View style={{ backgroundColor: '#f9f9f9', padding: 3 }}>
          <Item style={ myStyles.textInput }>
            <Input
              onChangeText={(message) => this.setState({ message })}
              value={this.state.message}
              placeholder="COMENTA"
              placeholderTextColor="#000000"
			  style={{ paddingRight: 20 }}
			  style={ myStyles.dark }
            />
            <TouchableOpacity
              style={{
				alignSelf: 'center',
                marginHorizontal: 15,
              }}
              onPress={() =>
                this.uploadComment(
                  this.state.postId,
                  this.state.message,
                  this.props.usuariosReducer.token
                )
              }
            >
              <Icon
                name="send-o"
                type="FontAwesome"
                style={{ color: "#0075b7" }}
              />
            </TouchableOpacity>
          </Item>
        </View>
        {/* <Header searchBar  style={{ backgroundColor: myStyles.othergrey, borderRadius: 15 }} > */}
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
