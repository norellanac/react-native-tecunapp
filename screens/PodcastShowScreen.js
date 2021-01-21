import React, { Component } from 'react';
import { Dimensions, Image, ScrollView } from 'react-native';
import HTML from 'react-native-render-html';
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
		showComments: false,
		postId: ''
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
		//console.log("Que trae esto: ",this.props.podcastReducer.podcast);
		if (this.props.podcastReducer.podcast.comments && this.state.showComments == true) {
			//console.log('Que trae el reducer de coment ', this.props.podcastReducer.podcast.comments);
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
		await this.props.getShowPodcast(commentObject.post_id, token);
		this.setState({ message: [] });
		this.props.navigation.navigate('PostsShowScreen');
	};

	deleteMessage = async (id, token, post_id) => {
		let deleteObject = { id: id };
		await this.props.deleteMessage(deleteObject, token);
		await this.props.getShowPodcast(post_id, token);
		this.props.navigation.navigate('PostsShowScreen');
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
							this.uploadComment(this.state.postId, this.state.message, this.props.usuariosReducer.token)}
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
			{ uri: `https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3` },
			{ shouldPlay: true }
		);
		console.log('Playing Sound', sound);
	}

	loadContent = () => {
		var screenWidth = Dimensions.get('window').width;
		var screenHeight = Dimensions.get('window').height;
	};

	render() {
		var screenWidth = Dimensions.get('window').width;
		var screenHeight = Dimensions.get('window').height;

		//const { navigation } = this.props.navigation

		console.log('podcast screen: ', this.props.podcastReducer);

		if (this.props.podcastReducer.cargando) {
			return (
				<Container>
					<HeaderCustom navigation={this.props.navigation} />
					<HederPostSection navigation={this.props.navigation} />
					<Loading />
					<FooterTabsNavigationIconText navigation={this.props.navigation} />
				</Container>
			);
		}

		//console.log("jobsProps: ", this.props);

		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				<Content>
					<Card style={{ flex: 0 }} key={this.props.podcastReducer.podcast.id}>
						<CardItem style={{ backgroundColor: 'transparent' }}>
							<Left>
								<Thumbnail
									style={{ backgroundColor: '#000000' }}
									source={{ uri: `${apiUrl.link}/img/logo.png` }}
								/>
								<Text>{this.props.podcastReducer.podcast.title}</Text>
							</Left>
						</CardItem>
						<CardItem>
							<Body>
								<Image
									source={{
										uri: this.state.pathImage + this.props.podcastReducer.podcast.featured_image
									}}
									style={{ width: screenWidth - 20, height: 150 }}
								/>
								<Text note>{this.props.podcastReducer.podcast.created_at}</Text>
								<Text>{this.props.podcastReducer.podcast.description}</Text>
								<ScrollView style={{ flex: 1 }}>
									<HTML
										source={{ html: this.props.podcastReducer.podcast.content }}
										contentWidth={screenWidth}
									/>
								</ScrollView>
							</Body>
						</CardItem>
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
					<Video
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
					</Button>
					<Button full title="Play Sound" onPress={this.playSound}>
						<Text> Play</Text>
					</Button>
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
