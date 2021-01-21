import React, { Component } from 'react';
import { Dimensions, Image, ScrollView } from 'react-native';
import HTML from 'react-native-render-html';
import { WebView } from 'react-native-webview';
import { Linking } from "react-native";
import { Audio } from 'expo-av';
import { withNavigation } from 'react-navigation';
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
import * as podcastActions from '../src/actions/podcastActions';
import * as loginActions from '../src/actions/loginActions';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from '../components/HeaderCustom';
import HederPostSection from '../components/HederPostSection';
import { persistor } from '../App';
import { Video } from 'expo-av';
import { apiUrl } from '../App';

import Loading from './../components/Loading';

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
		podcastId: ''
	};

	async componentDidMount() {
		console.log(this.props.getPodcasts(this.props.usuariosReducer.token));
		console.log('podcasts reducer', this.props.podcastReducer);
		//console.log("podcasts state: ", this.state);
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
					onPress={() => this.deleteMessage(commentID, this.props.usuariosReducer.token, this.state.podcastId)}
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
							this.uploadComment(this.state.podcastId, this.state.message, this.props.usuariosReducer.token)}
					>
						<Icon name="comment" type="FontAwesome" />
						<Text>Publicar comentario</Text>
					</Button>
				</Form>
			);
		}
	}

	async playSound() {
		console.log('Loading Sound');
		let sound = await Audio.Sound.createAsync(
			{ uri: this.state.pathImage + this.props.podcastReducer.podcast.featured_audio },
			{ shouldPlay: true }
		);
		console.log('Playing Sound', sound);
	}

	inputSpotify() {
		if (this.props.podcastReducer.podcast.featured_spotify && this.state.showSpotify == true) {
			return (<WebView
				source={{ html: `<iframe src="${this.props.podcastReducer.podcast.featured_spotify}" width="100%" height="100%" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>` }}
				scalesPageToFit={true}
				bounces={false}
				javaScriptEnabled
				style={{ height: 140 }}
			/> )
		}
	}

	inputAudio() {
		if (this.props.podcastReducer.podcast.featured_audio && this.state.showAudio == true) {
			return (<Button full title="Play Sound"  onPress={this.playSound()}>
				<Text> Play</Text>
			</Button>)
		}
	}

	render() {
		var screenWidth = Dimensions.get('window').width;
		var screenHeight = Dimensions.get('window').height;

		//const { navigation } = this.props.navigation

		this.state.podcastId = this.props.podcastReducer.podcast.id;

		const podcast = Object.assign({}, this.props.podcastReducer.podcast);

		if (this.props.podcastReducer.cargando || this.props.podcastReducer.podcast.comments == undefined) {
			return (
				<Container>
					<HeaderCustom navigation={this.props.navigation} />
					<HederPostSection navigation={this.props.navigation} />
					<Loading />
					<FooterTabsNavigationIconText navigation={this.props.navigation} />
				</Container>
			);
		}

		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				<Content>
					<Card style={{ flex: 0 }} key={podcast.id}>
						<CardItem style={{ backgroundColor: 'transparent' }}>
							<Left>
								<Thumbnail
									style={{ backgroundColor: '#000000' }}
									source={{ uri: `${apiUrl.link}/img/logo.png` }}
								/>
								<Text>{podcast.title}</Text>
							</Left>
						</CardItem>
						<CardItem>
							<Body>
								<Image
									source={{
										uri: this.state.pathImage + podcast.featured_image
									}}
									style={{ width: screenWidth - 20, height: 150 }}
								/>
								<Text note>{podcast.created_at}</Text>
							</Body>
						</CardItem>
						<CardItem>
							<Left>
								{(() => {
									if (podcast.featured_spotify) {
										return (<Button transparent textStyle={{ color: "#87838B" }}
													onPress={(showSpotify) => this.setState({ showSpotify: !this.state.showSpotify })}
												>
													<Icon name="spotify" type="FontAwesome"></Icon>
													<Text>Spotify</Text>
												</Button>)
									}
								})()}
							</Left>
							<Body>
								{(() => {
									if (podcast.featured_audio) {
										return (<Button transparent textStyle={{ color: "#87838B" }}
													onPress={() =>
														Linking.openURL(this.state.pathImage + podcast.featured_audio)
										  }
												>
													<Icon name="file-download" type="FontAwesome5"></Icon>
													<Text>Descargar</Text>
												</Button>)
									}
								})()}
							</Body>
							<Right>
							{(() => {
									if (podcast.featured_audio) {
										return (<Button transparent textStyle={{ color: "#87838B" }}
													onPress={(showAudio) => this.setState({ showAudio: !this.state.showAudio })}
												>
													<Icon name="file-audio" type="FontAwesome5"></Icon>
													<Text>Audio</Text>
												</Button>)
									}
								})()}
							</Right>
						</CardItem>
						<ScrollView>
							{this.inputSpotify()}
							{this.inputAudio()}
						</ScrollView>
						<CardItem>
							<Body>
								<Text>{podcast.description}</Text>
								<ScrollView style={{ flex: 1 }}>
									<HTML
										source={{ html: podcast.content }}
										contentWidth={screenWidth}
									/>
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
														style={{ backgroundColor: '#0B0B61' }}
													>
														<Icon name="cloud-download" type="FontAwesome" />
														<Text note>Descargar documento adjunto</Text>
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
							{this.inputComment()}
						</ScrollView>
					</Card>
					{/* <Video
						source={{ uri: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
						rate={1.0}
						volume={1.0}
						isMuted={true}
						resizeMode="cover"
						shouldPlay
						isLooping
						style={{ width: screenWidth, height: 300 }}
					/>

					<Button full>
						<Text>Hola mundo</Text>
					</Button> */}
					{/* <Button full title="Play Sound" onPress={this.playSound}>
						<Text> Play</Text>
					</Button> */}
				</Content>
				<FooterTabsNavigationIconText navigation={this.props.navigation} />
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
