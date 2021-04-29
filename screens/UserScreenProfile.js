import React, { Component, useState, useEffect, useRef } from 'react';
import { Image, Linking, KeyboardAvoidingView } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import {
	Container,
	List,
	ListItem,
	Content,
	Badge,
	Thumbnail,
	Icon,
	Text,
	Left,
	CardItem,
	Card,
	Button,
	Body,
	Right
} from 'native-base';
import { connect } from 'react-redux';
import * as loginActions from '../src/actions/loginActions';
import * as userActions from '../src/actions/userActions';
import * as questionActions from '../src/actions/questionActions';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from './../components/HeaderCustom';
import { persistor, apiUrl } from './../App';
import { withNavigation } from 'react-navigation';
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

class UserScreenProfile extends Component {
	constructor(props) {
		super();
	}
	state = {
		expoPushToken: '',
		setExpoPushToken: '',
		notification: false,
		setNotification: false,
		phone: '',
		password: '',
		confirmPassword: '',
		errorMessage: null,
		isShowAlert: true
	};

	async componentDidMount() {
		await this.props.allScoreActions(this.props.usuariosReducer.token);
		if (Platform.OS === 'android' && !Constants.isDevice) {
			this.setState({
				errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!'
			});
		} else {
			this.getTokenExpoNotificationsPush();
		}
	}

	allScoreTitle() {
		if (this.state.isDisplay == 1 && this.props.questionReducer.score) {
			return (
				<Grid
					style={{
						backgroundColor: '#F8FAFB',
						borderBottomLeftRadius: 5,
						borderTopLeftRadius: 5,
						borderBottomRightRadius: 5,
						borderTopRightRadius: 5,
						marginTop: 15
					}}
				>
					<Col
						size={1}
						style={{
							marginTop: 5,
							marginBottom: 5,
							justifyContent: 'center',
							marginLeft: 15
						}}
					>
						<Text>#</Text>
					</Col>
					<Col size={3} style={{ marginTop: 5, marginBottom: 5 }}>
						<Text>Nombre</Text>
					</Col>
					<Col size={1} style={{ marginTop: 5, marginBottom: 5, marginLeft: 15 }}>
						<Text>Puntos</Text>
					</Col>
				</Grid>
			);
		}
	}

	allScore() {
		//console.log("Que viene en el score?: ",this.state.isDisplay);
		let count = 0;
		let color = '#F8FAFB';
		if (this.props.questionReducer.userScore) {
			let idUserScore = this.props.questionReducer.userScore.id;
		}
		if (this.state.isDisplay == 1 && this.props.questionReducer.score) {
			return this.props.questionReducer.score.map(
				(pounts) => (
					count++,
					(
						<Grid
							style={{
								backgroundColor: idUserScore==pounts.id? '#E87823' : 'transparent',
								borderBottomLeftRadius: 5,
								borderTopLeftRadius: 5,
								borderBottomRightRadius: 5,
								borderTopRightRadius: 5
							}}
							key={pounts.id}
						>
							<Col
								size={1}
								style={{
									marginTop: 5,
									marginBottom: 5,
									justifyContent: 'center',
									marginLeft: 5
								}}
							>
								<Badge success>
									<Text>{count}</Text>
								</Badge>
							</Col>
							<Col size={3} style={{ marginTop: 5, marginBottom: 5 }}>
								<Text>
									{pounts.user.name} {pounts.user.lastname}
								</Text>
							</Col>
							<Col size={1} style={{ marginTop: 5, marginBottom: 5, marginLeft: 15 }}>
								<Badge primary>
									<Text>{pounts.points}</Text>
								</Badge>
							</Col>
						</Grid>
					)
				)
			);
		}
	}

	async onPressChange() {
		await this.props.topScoreAction(this.props.usuariosReducer.token);
		if (this.state.isDisplay == 1) {
			this.setState({
				isDisplay: 0
			});
		} else {
			this.setState({
				isDisplay: 1
			});
		}
	}

	logout = async () => {
		//await this.props.logoutUser();
		console.log('borró usuario');
		//await this.props.resetAddress();
		await persistor.purge();
		this.props.navigation.navigate('Login');
		console.log('borró direccion');
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
	showTokenAlert = () => {
		if (this.state.expoPushToken && this.state.isShowAlert) {
			return (
				<Card style={{ marginTop: 0, marginLeft: 0, marginRight: 0 }}>
					<CardItem style={{ backgroundColor: '#EB0101' }}>
						<Image
							source={{ uri: `${apiUrl.link}/img/game/trivia.png` }}
							style={{ width: 25, height: 25 }}
						/>
						<Col size={4}>
							<Text
								style={{
									textAlign: 'center',
									fontSize: 15,
									fontWeight: 'bold',
									color: '#fff'
								}}
							>
								{this.state.expoPushToken}
							</Text>
						</Col>
						<Button onPress={(isShowAlert) => this.setState({ isShowAlert: false })} transparent rounded>
							<Icon name="close" />
						</Button>
					</CardItem>
				</Card>
			);
		}
	};

	showError = () => {
		if (this.state.errorMessage && this.state.isShowAlert) {
			return (
				<Card style={{ marginTop: 0, marginLeft: 0, marginRight: 0 }}>
					<CardItem style={{ backgroundColor: '#00B9D3' }}>
						<Image
							source={{ uri: `${apiUrl.link}/img/game/trivia.png` }}
							style={{ width: 25, height: 25 }}
						/>
						<Col size={4}>
							<Text
								style={{
									textAlign: 'center',
									fontSize: 15,
									fontWeight: 'bold',
									color: '#fff'
								}}
							>
								{this.state.errorMessage}
							</Text>
						</Col>
						<Button onPress={(isShowAlert) => this.setState({ isShowAlert: false })} transparent rounded>
							<Icon name="close" />
						</Button>
					</CardItem>
				</Card>
			);
		}
	};

	render() {
		console.log('perfil: ', this.props.questionReducer);

		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				<Content>
					<List>
						<ListItem thumbnail>
							<Left>
								<Thumbnail square source={{ uri: `${apiUrl.link}/img/logo.png` }} />
							</Left>
							<Body>
								<Text note>{this.props.usuariosReducer.user.name}</Text>
								<Text note> {this.props.usuariosReducer.user.email}</Text>
							</Body>
						</ListItem>
					</List>
					<Card transparent>
						<CardItem>
							<Text style={{ fontSize: 22, color: '#1B2853' }}>Mi Perfil</Text>
						</CardItem>
						
						<Button transparent vertical onPress={this.logout}>
							<CardItem style={{ marginTop: 10 }}>
								<Grid
									style={{
										backgroundColor: '#F8FAFB',
										borderBottomLeftRadius: 5,
										borderTopLeftRadius: 5,
										borderBottomRightRadius: 5,
										borderTopRightRadius: 5
									}}
								>
									<Col
										size={1}
										style={{
											marginTop: 15,
											marginBottom: 15,
											justifyContent: 'center'
										}}
									>
										<Icon
											type="Entypo"
											name="log-out"
											style={{ marginLeft: 15, color: '#1c5988' }}
										/>
									</Col>
									<Col size={3} style={{ marginTop: 15, marginBottom: 15 }}>
										<Text>Salir</Text>
									</Col>
									<Col style={{ marginTop: 15, marginBottom: 15 }}>
										<Icon
											type="FontAwesome5"
											name="arrow-circle-right"
											style={{ color: '#1c5988' }}
										/>
									</Col>
								</Grid>
							</CardItem>
						</Button>

						<Button
							transparent
							vertical
							onPress={() => Linking.openURL('http://www.denunciagrupotecun.com/')}
						>
							<CardItem>
								<Grid
									style={{
										backgroundColor: '#F8FAFB',
										borderBottomLeftRadius: 5,
										borderTopLeftRadius: 5,
										borderBottomRightRadius: 5,
										borderTopRightRadius: 5
									}}
								>
									<Col
										size={1}
										style={{
											marginTop: 15,
											marginBottom: 15,
											justifyContent: 'center'
										}}
									>
										<Icon
											type="FontAwesome"
											name="warning"
											style={{ marginLeft: 15, color: '#1c5988' }}
										/>
									</Col>
									<Col size={3} style={{ marginTop: 15, marginBottom: 15 }}>
										<Text>Línea de denuncia</Text>
									</Col>
									<Col style={{ marginTop: 15, marginBottom: 15 }}>
										<Icon
											type="FontAwesome5"
											name="arrow-circle-right"
											style={{ color: '#1c5988' }}
										/>
									</Col>
								</Grid>
							</CardItem>
						</Button>

						<Button
							transparent
							vertical
							onPress={() => {
								this.onPressChange();
							}}
						>
							<CardItem>
								<Grid
									style={{
										backgroundColor: '#F8FAFB',
										borderBottomLeftRadius: 5,
										borderTopLeftRadius: 5,
										borderBottomRightRadius: 5,
										borderTopRightRadius: 5
									}}
								>
									<Col
										size={1}
										style={{
											marginTop: 15,
											marginBottom: 15,
											justifyContent: 'center'
										}}
									>
										<Icon
											type="Entypo"
											name="trophy"
											style={{ marginLeft: 15, color: '#1c5988' }}
										/>
									</Col>
									<Col size={3} style={{ marginTop: 15, marginBottom: 15 }}>
										<Text>Puntuacion General</Text>
									</Col>
									<Col style={{ marginTop: 15, marginBottom: 15 }}>
										<Icon
											type="FontAwesome5"
											name="arrow-circle-right"
											style={{ color: '#1c5988' }}
										/>
									</Col>
								</Grid>
							</CardItem>
						</Button>
						{this.allScoreTitle()}
						{this.allScore()}
					</Card>
				</Content>
				<FooterTabsNavigationIconText navigation={this.props.navigation} tab={1} />
			</Container>
		);
	}
}

const mapStateToProps = ({ questionReducer, usuariosReducer, loginReducer }) => {
	//return reducers.questionReducer; /*   DE TODOS LOS REDUCERS MAPEAMOS el reducer de usuarios devolvera los suauiros en los props del componente */
	return { questionReducer, usuariosReducer, loginReducer };
};

const mapDispatchProps = {
	...userActions,
	...questionActions,
	...loginActions
};

export default withNavigation(connect(mapStateToProps, mapDispatchProps)(UserScreenProfile));
