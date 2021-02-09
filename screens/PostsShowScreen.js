import React, { Component } from 'react';
import { Dimensions, Image, ScrollView } from 'react-native';
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview';
import { withNavigation } from 'react-navigation';
import { Linking } from 'react-native';
import {
	Container,
	Content,
	Thumbnail,
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
	Body
} from 'native-base';
import { connect } from 'react-redux';
import * as postActions from '../src/actions/postActions';
import * as loginActions from '../src/actions/loginActions';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from '../components/HeaderCustom';
import HederPostSection from '../components/HederPostSection';
import { apiUrl, screenWidth } from '../App';

import Loading from './../components/Loading';

class PostsShowScreen extends Component {
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
		pathImage: apiUrl.link + '/storage/posts/',
		message: '',
		showComments: false
	};

	async componentDidMount() {
		//console.log(this.props.getNews(this.props.usuariosReducer.token));
		//this.props.getCategory(this.props.usuariosReducer.token);
		//console.log("posts props", this.props);
		//console.log("posts state: ", this.state);
	}

	loadIcon = () => {
		if (this.state.showComments) {
			return 'arrow-up';
		} else {
			return 'arrow-down';
		}
	};

	loadInfoComment() {
		//console.log("Que trae esto: ",this.props.postReducer.post);
		if (this.props.postReducer.post.comments && this.state.showComments == true) {
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
					onPress={() => this.deleteMessage(commentID, this.props.usuariosReducer.token, this.state.postId)}
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
		this.props.navigation.navigate('PostsShowScreen');
	};

	deleteMessage = async (id, token, post_id) => {
		let deleteObject = { id: id };
		await this.props.deleteMessage(deleteObject, token);
		await this.props.getShowPost(post_id, token);
		this.props.navigation.navigate('PostsShowScreen');
	};

	inputComment() {
		if (this.props.postReducer.post.comments && this.state.showComments == true) {
			return (
				<Form style={{ marginRight: 15, marginLeft: 15, marginTop: 10, marginBottom: 20 }}>
					<Item rounded style={{ marginTop: 25 }}>
						<Input
							onChangeText={(message) => this.setState({ message })}
							value={this.state.message}
							placeholder="Agregar un comentario"
							placeholderTextColor="#000000"
							style={{ color: '#000000' }}
						/>
					</Item>
					<Button
						iconLeft
						info
						rounded
						style={{ alignSelf: 'center', marginTop: 15 }}
						onPress={() =>
							this.uploadComment(this.state.postId, this.state.message, this.props.usuariosReducer.token)}
					>
						<Icon name="comment" type="FontAwesome" />
						<Text>Publicar comentario</Text>
					</Button>
				</Form>
			);
		}
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
					<HeaderCustom navigation={this.props.navigation} />
					<Loading />
					<FooterTabsNavigationIconText navigation={this.props.navigation} />
				</Container>
			);
		}*/

		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				<Content>
					<Card style={{ flex: 0 }} key={post.id}>
						<ListItem thumbnail>
							<Left>
								<Thumbnail
									square
									style={{ backgroundColor: 'transparent' }}
									source={{ uri: `${apiUrl.link}/img/logo.png` }}
								/>
							</Left>
							<Body>
								<Text>{post.title}</Text>
							</Body>
						</ListItem>
						<CardItem>
							<Body>
								<Image
									source={{ uri: this.state.pathImage + post.featured_image }}
									style={{ width: screenWidth - 40, minHeight: 250, maxHeight: 400 }}
								/>
								<Text note>{post.created_at}</Text>
								<Text>{post.description}</Text>
								{/* <Text>{post.content.replace()}</Text> */}
								<ScrollView>
								<HTML
									source={{ html: post.content.replace(/line-height:107%|line-height: 107%;|\n/g, " ") }}
									contentWidth={screenWidth}
								/>
								</ScrollView>
								{/* <View style={{ flex: 1 }}>
									<Text>{post.content.replace(/<\/?[^>]+(>|$)/g, "")}</Text>
								</View> */}
								{(() => {
									if (post.featured_document) {
										return (
											<Grid>
												<Col size={4} style={{ alignItems: 'center' }}>
													<Button
														onPress={() =>
															Linking.openURL(
																this.state.pathImage + post.featured_document
															)}
														style={{ 
															backgroundColor: '#FA8258',
															borderRadius: 20 
														}}
													>
														<Icon name="cloud-download" type="FontAwesome" />
														<Text>Descargar documento adjunto</Text>
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
												html: `<iframe width="100%" height="100%" src="${post.featured_video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>"></iframe>`
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
							onPress={(showComments) => this.setState({ showComments: !this.state.showComments })}
						>
							<Icon name={this.loadIcon()} type="FontAwesome">
								{' '}
							</Icon>
							<Text> Ver Comentarios</Text>
							<Icon name="comments" type="FontAwesome" />
						</Button>
						<ScrollView>
							{this.loadInfoComment()}
							{this.inputComment()}
						</ScrollView>
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
	...loginActions
};

export default withNavigation(connect(mapStateToProps, mapDispatchProps)(PostsShowScreen));
