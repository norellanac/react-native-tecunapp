import React, { Component } from 'react';
import { Dimensions, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native';
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview';
import { Linking } from 'react-native';
import { Audio } from 'expo-av';
import { SoundPlayer } from 'react-native-sound-player';
import { withNavigation } from 'react-navigation';
import {
	Container,
	Content,
	Thumbnail,
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
	Body
} from 'native-base';
import { connect } from 'react-redux';
import * as podcastActions from '../src/actions/podcastActions';
import * as loginActions from '../src/actions/loginActions';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from '../components/HeaderCustom';
import HederPostSection from '../components/HederPostSection';
import { persistor } from '../App';
import { Video } from 'expo-av';
import { apiUrl, screenHeight, screenWidth, myStyles } from '../App';

import Loading from './../components/Loading';
import { searchTextInJobs } from '../src/actions/jobsActions';

const sound = new Audio.Sound();

class PodcastShowScreen extends Component {
	constructor() {
		super();
	}
	state = {
		podcast: null,
		jobId: null,
		pathImage: apiUrl.link + '/storage/podcast/',
		link: apiUrl.link,
		showComments: false,
		showSpotify: false,
		showAudio: false,
		showPause: false,
		podcastId: '',
		sound1: null,
		message: null
	};

	async componentDidMount() {
		//console.log(this.props.getPodcasts(this.props.usuariosReducer.token));
		//console.log('podcasts reducer', this.props.podcastReducer);
		this.loadSound();
	}

	loadIcon = () => {
		if (this.state.showComments) {
			return 'arrow-up';
		} else {
			return 'arrow-down';
		}
	};

	loadInfoComment() {
		//console.log("Que trae esto: ",this.props.podcastReducer.post);
		if (this.props.podcastReducer.podcast.comments && this.state.showComments == true) {
			//console.log('Que trae el reducer de coment ', this.props.podcastReducer.post.comments);
			return this.props.podcastReducer.podcast.comments.map((comment) => (
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
						this.deleteMessage(commentID, this.props.usuariosReducer.token, this.state.podcastId)}
				>
					<Icon name="delete" type="AntDesign" />
				</Button>
			);
		}
	}

	uploadComment = async (podcast_id, message, token) => {
		let commentObject = { podcast_id: podcast_id, message: message };
		await this.props.uploadMessage(commentObject, token);
		await this.props.getShowPodcast(commentObject.podcast_id, token);
		this.setState({ message: [] });
		this.props.navigation.navigate('PodcastShowScreen');
	};

	deleteMessage = async (id, token, podcast_id) => {
		let deleteObject = { id: id };
		await this.props.deleteMessage(deleteObject, token);
		await this.props.getShowPodcast(podcast_id, token);
		this.props.navigation.navigate('PodcastShowScreen');
	};

	inputComment() {
		if (this.props.podcastReducer.podcast.comments && this.state.showComments == true) {
			return (
				<Form
					style={{
						marginRight: 15,
						marginLeft: 15,
						marginTop: 10,
						marginBottom: 20
					}}
				>
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
							this.uploadComment(
								this.state.podcastId,
								this.state.message,
								this.props.usuariosReducer.token
							)}
					>
						<Icon name="comment" type="FontAwesome" />
						<Text>Publicar comentario</Text>
					</Button>
				</Form>
			);
		}
	}

	async loadSound() {
		//console.log('Loading Sound', sound);
		await sound.loadAsync(
			{
				uri: this.state.pathImage + this.props.podcastReducer.podcast.featured_audio
			},
			{ shouldPlay: false }
		);
		//console.log('Playing Sound', sound);
	}

	async playSound() {
		await sound.playAsync();
	}

	async stopSound() {
		await sound.stopAsync();
	}

	async pauseSound() {
		await sound.pauseAsync();
		

	}

	inputSpotify() {
		if (this.props.podcastReducer.podcast.featured_spotify && this.state.showSpotify == true) {
			return (
				<WebView
					source={{
						html: `<iframe src="${this.props.podcastReducer.podcast
							.featured_spotify}" width="100%" height="100%" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`
					}}
					scalesPageToFit={true}
					bounces={false}
					javaScriptEnabled
					style={{ height: 140 }}
				/>
			);
		}
	}

	changeIconPause() {
		console.log("Entro aqui en el await");
		this.setState({ showPause: !this.state.showPause });
	}

	playTouchable() {
		return (
			<TouchableOpacity style={{ backgroundColor: myStyles.grey, borderRadius: 50 }} onPress={ this.playSound }>
				<View>
					<Icon name="play-circle" type="FontAwesome5" style={{padding: 40}} />
				</View>
				<Text>Play</Text>
			</TouchableOpacity>
		);
	}

	pauseTouchable() {
		return(
			<TouchableOpacity onPress={ this.pauseSound } style={{ backgroundColor: myStyles.grey, borderRadius: 50 }}>					
				<View>
					<Icon name="pause-circle" type="FontAwesome5" style={{padding: 40}} />
				</View>
				<Text>Pause</Text>
			</TouchableOpacity>	
		);
	}

	inputAudio() {
		if (this.props.podcastReducer.podcast.featured_audio && this.state.showAudio == true) {
			return (
				/* this.playSound, this.stopSound, this.pauseSound */
				<ListItem avatar noBorder style={{ width: screenWidth, marginLeft: -5, backgroundColor: myStyles.grey}}>

					<Left style={{ marginLeft: 35, marginRight: 35, marginTop: 5 }}>
						<TouchableOpacity onPress={ this.pauseSound } style={{ backgroundColor: myStyles.bg1, borderRadius: 50 }}>					
							<View>
								<Icon name="pause-circle" type="FontAwesome5" style={{padding: 20, color: myStyles.light}} />
							</View>
						</TouchableOpacity>	
					</Left>
					<Body style={{ marginRight: 50, alignItems: 'center'}}>
						<TouchableOpacity style={{ backgroundColor: myStyles.bg1, borderRadius: 50 }} onPress={ this.playSound }>
							<View>
								<Icon name="play-circle" type="FontAwesome5" style={{padding: 30, color: myStyles.light}} />
							</View>
						</TouchableOpacity>
					</Body>
					<Right style={{ marginTop: 7,  }}>
						<TouchableOpacity onPress={() =>Linking.openURL(this.state.pathImage + this.props.podcastReducer.podcast.featured_audio)}>
							<View style={{ backgroundColor: myStyles.bg1, borderRadius: 50 }}>
								<Icon name="cloud-download" type="FontAwesome" style={{padding: 20, color: myStyles.light}} />
							</View>
						</TouchableOpacity>
					</Right>
				</ListItem>
				
			);
		}
	}

	async likePost(podcastID) {
		let token = this.props.usuariosReducer.token;
		await this.props.likeOrDislike(podcastID, token);
		await this.props.getShowPodcast(podcastID, token);
	}

	showUserNameLikes(podcast) {
		if (podcast.user_likes_new) {
			return <Text style={{ color: '#000000' }}>{podcast.likes.length}</Text>;
		} else {
			return <Text style={{ color: '#000000' }}>{podcast.likes.length}</Text>;
		}
	}

	titleUpper(title) {
		return title.toUpperCase();
	}

	render() {
		//const { navigation } = this.props.navigation

		this.state.podcastId = this.props.podcastReducer.podcast.id;

		const podcast = Object.assign({}, this.props.podcastReducer.podcast);

		if (this.props.podcastReducer.cargando && this.props.podcastReducer.podcast.comments == undefined) {
			return (
				<Container>
					<HederPostSection navigation={this.props.navigation} screen={2} />
					<Loading />
					<FooterTabsNavigationIconText navigation={this.props.navigation} />
				</Container>
			);
		}

		//console.log("State ", this.state);

		return (
			<Container>
				<HederPostSection navigation={this.props.navigation} screen={2} />
				<Content>

					<View>
						<Image
							source={{ uri: this.state.pathImage + podcast.featured_image }}
							style={{ width: screenWidth, minHeight: 250, maxHeight: 400 }}
						/>
						<View style={{ backgroundColor: myStyles.bg2 }}>
							<Text
								style={{
									textAlign: 'center',
									fontSize: 20,
									fontWeight: 'bold',
									color: myStyles.light,
									paddingVertical: 8,
									fontSize: 25
								}}
							>
								{this.titleUpper(podcast.title)}
							</Text>
						</View>
						<Card style={{ flex: 0, marginTop: 0 }} key={podcast.id}>
							<ListItem style={{ width: screenWidth, marginLeft: -5}}>
								<Left style={{ marginLeft: 11, marginRight: -(screenWidth / 5) }}>
									{(() => {
										if (podcast.featured_spotify) {
											return(
												<Button
													iconLeft
													transparent
													style={{
														alignSelf: 'center',
														backgroundColor: '#f9f9f9',
														borderWidth: 2,
														borderRadius: 15,
														shadowColor: myStyles.bg1,
														shadowOffset: {
															width: 0,
															height: 6
														},
														shadowOpacity: 0.39,
														shadowRadius: 8.3,

														elevation: 8
													}}
													onPress={(showSpotify) => this.setState({ showSpotify: !this.state.showSpotify })}
												>
													<Icon name="music" type="FontAwesome" />
													<Text style={{ marginLeft: -10,  color: myStyles.bg1, fontSize: 12 }}>ESCUCHAR</Text>
												</Button>
											);
										} else {
											if (podcast.featured_audio) {
												return (<Button
													iconLeft
													transparent
													style={{
														alignSelf: 'center',
														backgroundColor: '#f9f9f9',
														borderWidth: 2,
														borderRadius: 15,
														shadowColor: myStyles.bg1,
														shadowOffset: {
															width: 0,
															height: 6
														},
														shadowOpacity: 0.39,
														shadowRadius: 8.3,
	
														elevation: 8
													}}
													onPress={(showAudio) => this.setState({ showAudio: !this.state.showAudio })}
												>
													<Icon name="cloud-download" type="FontAwesome" />
													<Text style={{ marginLeft: -10,  color: myStyles.bg1, fontSize: 12 }}>DESCARGAR</Text>
												</Button> );
											}
										}
									})()}
								</Left>
								<Body style={{ marginRight: -(screenWidth / 19) }}>
									{(() => {
										if (podcast.featured_spotify && podcast.featured_audio) {
											return (<Button
												iconLeft
												transparent
												style={{
													alignSelf: 'center',
													backgroundColor: '#f9f9f9',
													borderWidth: 2,
													marginLeft: -(screenWidth / 10),
													borderRadius: 15,
													shadowColor: myStyles.bg1,
													shadowOffset: {
														width: 0,
														height: 6
													},
													shadowOpacity: 0.39,
													shadowRadius: 8.3,

													elevation: 8
												}}
												onPress={(showAudio) => this.setState({ showAudio: !this.state.showAudio })}
											>
												<Icon name="cloud-download" type="FontAwesome" />
												<Text style={{ marginLeft: -10,  color: myStyles.bg1, fontSize: 12 }}>DESCARGAR</Text>
											</Button> );
										}
									})()}
								</Body>
								<Right style={{  marginLeft: -10, marginRight: 5}}>
									<Button
										iconLeft
										textStyle={{ color: '#87838B' }}
										style={{ 
											backgroundColor: '#fbf4ff', 
											borderRadius: 20,
											marginRight: -(screenWidth / 27),
											shadowColor: `#9400d3`,
											shadowOffset: {
												width: 0,
												height: 3,
											},
											shadowOpacity: 0.27,
											shadowRadius: 4.65,

											elevation: 6,
										}}
										
										onPress={() => this.likePost(podcast.id)}
									>
										{(() => {
											if (podcast.user_likes_new) {
												return <Icon name="star" type="AntDesign" style={{ color: '#ffcc00' }} />;
											} else {
												return <Icon name="staro" type="AntDesign" style={{ color: '#ffcc00' }} />;
											}
										})()}
										{this.showUserNameLikes(podcast)}
									</Button>
								</Right>
							</ListItem>

							{/* <CardItem>
								<Left>
									{(() => {
										if (podcast.featured_spotify) {
											return (
												<Button
													transparent
													textStyle={{ color: '#87838B' }}
													onPress={(showSpotify) =>
														this.setState({
															showSpotify: !this.state.showSpotify
														})}
												>
													<Icon name="music" type="FontAwesome" />
													<Text>ESCUCHAR</Text>
												</Button>
											);
										}
									})()}
								</Left>
								<Body>
									{(() => {
										if (podcast.featured_audio) {
											return (
												<Button
													transparent
													textStyle={{ color: '#87838B' }}
													onPress={() =>
														Linking.openURL(this.state.pathImage + podcast.featured_audio)}
												>
													<Icon name="file-download" type="FontAwesome5" />
													<Text>Descargar</Text>
												</Button>
											);
										}
									})()}
								</Body>
								<Right>
									{(() => {
										if (podcast.featured_audio) {
											return (
												<Button
													transparent
													textStyle={{ color: '#87838B' }}
													onPress={(showAudio) =>
														this.setState({ showAudio: !this.state.showAudio })}
												>
													<Icon name="file-audio" type="FontAwesome5" />
													<Text>Audio</Text>
												</Button>
											);
										}
									})()}
								</Right>
							</CardItem> */}
							<ScrollView>{this.inputSpotify()}</ScrollView>
								{this.inputAudio()}
							<CardItem>
								<Body>
									<Text>{podcast.description}</Text>
									<ScrollView>
										{(() => {
											if (podcast.featured_document) {
												return (
													<HTML
														source={{
															html: podcast.content.replace(
																/line-height:107%|line-height: 107%;|\n/g,
																' '
															)
														}}
														contentWidth={screenWidth}
													/>
												);
											}
										})()}
									</ScrollView>
									{(() => {
										if (podcast.featured_document) {
											return (
												<Grid>
													<Col size={4} style={{ alignItems: 'center' }}>
														<Button
															onPress={() =>
																Linking.openURL(
																	this.state.pathImage + podcast.featured_document
																)}
															style={{ borderRadius: 20, backgroundColor: '#FA8258' }}
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
								if (podcast.featured_video) {
									return (
										<ScrollView style={{ flex: 1 }}>
											<WebView
												source={{
													html: `<iframe width="100%" height="100%" src="${podcast.featured_video}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>"></iframe>`
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
							</ScrollView>
						</Card>
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
							style={{ alignSelf: 'center', marginHorizontal: 5 }}
							onPress={() =>
								this.uploadComment(
									this.state.podcastId,
									this.state.message,
									this.props.usuariosReducer.token
								)}
						>
							<Icon
								name="send-o"
								type="FontAwesome"
								style={{ color: "#0075b7" }}
							/>
						</TouchableOpacity>
					</Item>
				</View>
			</Container>
		);
	}
}

const mapStateToProps = ({ podcastReducer, usuariosReducer }) => {
	//return reducers.podcastReducer; /*   DE TODOS LOS REDUCERS MAPEAMOS el reducer de usuarios devolvera los suauiros en los props del componente */
	return { podcastReducer, usuariosReducer };
};

const mapDispatchProps = {
	...podcastActions,
	...loginActions
};

export default withNavigation(connect(mapStateToProps, mapDispatchProps)(PodcastShowScreen));

/* <WebView
		source={{ html: '<iframe src="https://open.spotify.com/embed-podcast/episode/40Ga1hhr0RDO0dvLhqbvM3" width="100%" height="100%" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>' }}
		scalesPageToFit={true}
		bounces={false}
		javaScriptEnabled
		style={{ height: 140 }}
	/> 
*/
