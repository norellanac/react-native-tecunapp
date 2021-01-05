import React, { Component, useState, useEffect, useRef } from 'react';
import { Image, KeyboardAvoidingView } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import {
	Container,
	List,
	ListItem,
	Content,
	View,
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
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from './../components/HeaderCustom';
import { persistor } from './../App';
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
		confirmPassword: ''
	};

	notificationListener;
	responseListener;

	logout = async () => {
		//await this.props.logoutUser();
		console.log('borró usuario');
		//await this.props.resetAddress();
		await persistor.purge();
		this.props.navigation.navigate('Login');
		console.log('borró direccion');
	};

	componentDidMount() {
		console.log('revisa si tiene el token');
    this.registerForPushNotificationsAsync();
	}

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
			title: 'Original Title',
			body: 'And here is the body!',
			data: { data: 'goes here' }
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

	async registerForPushNotificationsAsync() {
		let token;
		if (Constants.isDevice) {
			const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
			let finalStatus = existingStatus;
			if (existingStatus !== 'granted') {
				const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
				finalStatus = status;
			}
			if (finalStatus !== 'granted') {
				alert('Failed to get push token for push notification!');
				return;
			}
			token = (await Notifications.getExpoPushTokenAsync()).data;
			console.log(token);
		} else {
			alert('Must use physical device for Push Notifications');
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

		return token;
	}

	ponerContenido = () => {
		if (this.props.cargando) {
			return <Spinner color="blue" style={{ flex: 1 }} />;
		}
		return <Grid />;
	};

	handleSubmit = () => {
		if (this.state.password !== this.state.confirmPassword) {
			return (
				<Row>
					<Grid>
						<Col style={{ alignItems: 'center', marginBottom: 15 }}>
							<Text style={{ color: 'white' }}>Las contraseñas no coinsiden</Text>
						</Col>
					</Grid>
				</Row>
			);
		}
	};

	Erroruser = () => {
		if (this.props.error != '') {
			return (
				<Row>
					<Grid>
						<Col style={{ alignItems: 'center', marginBottom: 15 }}>
							<Text style={{ color: 'white' }}>{this.props.error}</Text>
						</Col>
					</Grid>
				</Row>
			);
		}
	};

	render() {
		//const { navigation } = this.props.navigation

		console.log('ajustes: ', this.state);

		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				<Content>
					<View style={{ backgroundColor: '#ed913b' }}>
						<Grid style={{ marginBottom: 30, marginTop: 25 }}>
							<Col style={{ alignItems: 'center' }}>
								<Thumbnail
									large
									source={require('../assets/images/dev.png')}
									style={{ backgroundColor: '#FFFFFF' }}
								/>
							</Col>
							<Col>
								<Text style={{ fontSize: 25, color: 'white', marginBottom: 15 }}>
									<Icon
										type="FontAwesome"
										name="user"
										style={{ color: 'white', fontSize: 25 }}
									/>{' '}
									{'name'}
								</Text>
								<Text style={{ color: 'white', marginBottom: 2 }} note>
									<Icon type="FontAwesome" name="envelope" style={{ color: 'white', fontSize: 18 }} />
									{'  '}
									{'email'}
								</Text>
								<Text style={{ color: 'white' }} note>
									<Icon type="FontAwesome" name="phone" style={{ color: 'white', fontSize: 20 }} />
									{'  '}
									{'phone'}
								</Text>
							</Col>
						</Grid>
					</View>
					<List>
						<ListItem thumbnail>
							<Left>
								<Thumbnail
									square
									source={{
										uri:
											'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRN7USRtFiSwwrfqNMPm_kTcGJ4NkIX7xRy4ztZq4Acm298JkWd'
									}}
								/>
							</Left>
							<Body>
								<Text>{this.props.usuariosReducer.name}</Text>
								<Text> {this.props.usuariosReducer.email}</Text>
							</Body>
							<Right>
								<Button transparent onPress={this.logout}>
									<Text>Salir</Text>
								</Button>
							</Right>
						</ListItem>
					</List>
					<Card transparent>
						<CardItem>
							<Text style={{ fontSize: 22, color: '#1B2853' }}>Mi Perfil</Text>
						</CardItem>
						<CardItem>
							<Grid>
								<Col
									style={{
										backgroundColor: '#F8FAFB',
										borderBottomLeftRadius: 7,
										borderTopLeftRadius: 7,
										borderWidth: 0.5,
										borderColor: '#E6E7E8'
									}}
								>
									<Text
										style={{
											textAlign: 'center',
											fontSize: 20,
											fontWeight: 'bold',
											marginTop: 10,
											color: '#1c5988'
										}}
									>
										{'100 '}
										<Icon
											type="Entypo"
											name="trophy"
											style={{ marginLeft: 15, color: '#1c5988' }}
										/>
									</Text>
									<Text note style={{ textAlign: 'center', marginBottom: 10 }}>
										Ranking
									</Text>
								</Col>
								<Col
									style={{
										backgroundColor: '#F8FAFB',
										borderBottomRightRadius: 7,
										borderTopRightRadius: 7,
										borderWidth: 0.5,
										borderColor: '#E6E7E8'
									}}
								>
									<Text
										style={{
											textAlign: 'center',
											fontSize: 20,
											fontWeight: 'bold',
											marginTop: 10,
											color: '#1c5988'
										}}
									>
										{'50  '}
										<Icon type="Entypo" name="news" style={{ marginLeft: 15, color: '#1c5988' }} />
									</Text>
									<Text note style={{ textAlign: 'center', marginBottom: 10 }}>
										Publicaciones
									</Text>
								</Col>
							</Grid>
						</CardItem>

						<Button
							transparent
							vertical
							onPress={() => this.props.navigation.navigate('AddressProfileRoute')}
						>
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
											type="FontAwesome"
											name="map-marker"
											style={{ marginLeft: 15, color: '#1c5988' }}
										/>
									</Col>
									<Col size={3} style={{ marginTop: 15, marginBottom: 15 }}>
										<Text>Notificaion</Text>
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

						<Button transparent vertical onPress={() => this.registerForPushNotificationsAsync()}>
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
											name="back-in-time"
											style={{ marginLeft: 15, color: '#1c5988' }}
										/>
									</Col>
									<Col size={3} style={{ marginTop: 15, marginBottom: 15 }}>
										<Text>Permisos App</Text>
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
							onPress={() => this.props.navigation.navigate('SettingsProfileRoute')}
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
											name="cog"
											style={{ marginLeft: 15, color: '#1c5988' }}
										/>
									</Col>
									<Col size={3} style={{ marginTop: 15, marginBottom: 15 }}>
										<Text>Ajustes</Text>
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

						<Button transparent vertical onPress={() => this.props.navigation.navigate('HelpPageRoute')}>
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
											type="MaterialIcons"
											name="help"
											style={{ marginLeft: 15, color: '#1c5988' }}
										/>
									</Col>
									<Col size={3} style={{ marginTop: 15, marginBottom: 15 }}>
										<Text>Ayuda</Text>
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
					</Card>

					<Card>
						<View
							style={{
								flex: 1,
								alignItems: 'center',
								justifyContent: 'space-around'
							}}
						>
							<Text>Your expo push token: {this.state.expoPushToken}</Text>
							<View style={{ alignItems: 'center', justifyContent: 'center' }}>
								<Text>
									Title: {this.state.notification &&
										this.state.notification.request.content.title}{' '}
								</Text>
								<Text>
									Body: {this.state.notification && this.state.notification.request.content.body}
								</Text>
								<Text>
									Data:{' '}
									{this.state.notification &&
										JSON.stringify(this.state.notification.request.content.data)}
								</Text>
							</View>
							<Button
								primary
								title="Press to Send Notification"
								onPress={async () => {
									await this.sendPushNotification(this.state.expoPushToken);
								}}
							>
								<Text>Hola</Text>
							</Button>
						</View>
					</Card>
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
	...userActions,
	...loginActions
};

export default withNavigation(connect(mapStateToProps, mapDispatchProps)(UserScreenProfile));
