import React, { Component } from 'react';
import { Dimensions, Image } from 'react-native';
import { WebView } from 'react-native-webview';
import { withNavigation } from 'react-navigation';
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
	View
} from 'native-base';
import { connect } from 'react-redux';
import * as postActions from '../src/actions/postActions';
import * as loginActions from '../src/actions/loginActions';
import * as userActions from '../src/actions/userActions';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from '../components/HeaderCustom';
import HederPostSection from '../components/HederPostSection';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import { apiUrl, screenHeight, screenWidth } from '../App';

import Loading from './../components/Loading';

class PostsScreen extends Component {
	constructor() {
		super();
	}
	state = {
		selected: 0,
		pathImage: apiUrl.link + '/storage/posts/',
		idCategory: 0
	};

	/**+++++++++++++NOTIFICACIONES+++++++++++++ */
	getTokenExpoNotificationsPush = async () => {
		let token;
		if (Constants.isDevice) {
			let { status } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
			if (status !== 'granted') {
				status = await Permissions.askAsync(Permissions.NOTIFICATIONS);
			}
			if (status !== 'granted') {
				this.setState({
					errorMessage: 'Failed to get push token for push notification!'
				});
				return;
			}
			token = (await Notifications.getExpoPushTokenAsync()).data;
			this.props.sendPushTokenAction(token, this.props.usuariosReducer.user.id, this.props.usuariosReducer.token);
			console.log('push token: ', token);
		} else {
			this.setState({
				errorMessage: 'Must use physical device for Push Notifications'
			});
		}

		if (Platform.OS === 'android') {
			Notifications.setNotificationChannelAsync('default', {
				name: 'default',
				importance: Notifications.AndroidImportance.MAX,
				vibrationPattern: [ 0, 250, 250, 250 ],
				lightColor: '#FF231F7C'
			});
		}

		this.setState({ expoPushToken: token });
		this.setState({
			errorMessage: 'Debe tener token y error'
		});
		return token;
	};

	setNotification() {
		Notifications.setNotificationHandler({
			handleNotification: async () => ({
				shouldShowAlert: true,
				shouldPlaySound: false,
				shouldSetBadge: false
			})
		});
	}

	async sendPushNotification(expoPushToken) {
		this.setNotification();
		const message = {
			to: expoPushToken,
			sound: 'default',
			title: 'Nuevo Contenido en la app',
			body: 'Escucha este increible podcast!',
			data: { data: 'Podcast de seguridad indistrial' }
		};
		await fetch('https://exp.host/--/api/v2/push/send', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Accept-encoding': 'gzip, deflate',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(message)
		});
	}
	/**+++++++++++++NOTIFICACIONES+++++++++++++ */

	async componentDidMount() {
		await this.props.getNews(this.props.loginReducer.token);
		if (Platform.OS === 'android' && !Constants.isDevice) {
			this.setState({
				errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
			});
		} else {
			this.getTokenExpoNotificationsPush();
		}
	}

	

	showNews(idPost) {
		this.props.getShowPost(idPost, this.props.usuariosReducer.token);
		this.props.navigation.navigate('PostsShowScreen');
	}

	async onValueChange(key) {
		this.state.selected = key;
		this.state.idCategory = key;

		if (this.state.idCategory == 0) {
			await this.props.getNews(this.props.usuariosReducer.token);
		} else {
			await this.props.getCategory(this.state.idCategory, this.props.usuariosReducer.token);
			this.props.navigation.navigate('PostsCategoryScreen');
		}
	}

	loadContentCategories = () => {
		return this.props.postReducer.categories.map((category) => (
			//console.log(category),
			<Picker.Item label={category.name} value={category.id} key={category.id} />
		));
	};

	async likePost(postID) {
		let token = this.props.usuariosReducer.token;
		await this.props.likeOrDislike(postID, token);
		await this.props.getNews(token);
	}

	showUserNameLikes(news) {
		if (news.user_likes_new) {
			return <Text>Tú y ({news.likes.length}) más</Text>
		} else {
			return (<Text>({news.likes.length})</Text>)
		}
	}

	loadContent = () => {
		if (this.props.postReducer.posts) {
			return this.props.postReducer.posts.map((news) => (
				//console.log(this.props.postReducer.posts),
				<Card style={{ flex: 0 }} key={news.id}>
					<CardItem style={{ backgroundColor: 'transparent' }}>
						<Left>
							<Thumbnail
								style={{ backgroundColor: '#000000' }}
								source={{ uri: `${apiUrl.link}/img/logo.png` }}
							/>
							<Body>
								<Text>{news.title}</Text>
								<Text note>{news.created_at}</Text>
							</Body>
						</Left>
					</CardItem>
					<CardItem>
						<Body>
							<Image
								source={{ uri: this.state.pathImage + news.featured_image }}
								style={{ width: screenWidth - 40, minHeight: 250, maxHeight: 500 }}
							/>
							<Text>{news.description}</Text>
						</Body>
					</CardItem>
					<CardItem>
						<Left>
							<Button transparent textStyle={{ color: '#87838B' }} onPress={() => this.likePost(news.id)}>
								{(() => {
									if (news.user_likes_new) {
										return <Icon name="like1" type="AntDesign" />
									} else {
										return <Icon name="like2" type="AntDesign" />
									}
								})()}
								{this.showUserNameLikes(news)}
							</Button>
						</Left>
						<Right>
							<Button transparent textStyle={{ color: '#87838B' }} onPress={() => this.showNews(news.id)}>
								<Icon name="book-reader" type="FontAwesome5" />
								<Text>Leer más</Text>
							</Button>
						</Right>
					</CardItem>
				</Card>
			));
		} else {
			return <Spinner color="blue" style={{ flex: 1 }} />;
		}
	};

	render() {
		if (this.props.postReducer.posts == undefined || this.props.postReducer.posts == null ) {
			return (
				<Container>
					<HeaderCustom navigation={this.props.navigation} />
					<HederPostSection navigation={this.props.navigation} />
					<Spinner color="blue" style={{ flex: 1 }} />
					<FooterTabsNavigationIconText navigation={this.props.navigation} />
				</Container>
			);
		}

		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				<HederPostSection navigation={this.props.navigation} />
				<Form>
					<Picker
						note
						mode="dropdown"
						style={{ width: '100%' }}
						selectedValue={this.state.selected}
						onValueChange={this.onValueChange.bind(this)}
					>
						<Picker.Item label="Categorias" value="0" />
						{this.loadContentCategories()}
					</Picker>
				</Form>
				<Content>{this.loadContent()}</Content>
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
	...userActions,
	...postActions,
	...loginActions
};

export default withNavigation(connect(mapStateToProps, mapDispatchProps)(PostsScreen));
