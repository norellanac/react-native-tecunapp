import React, { Component } from 'react';
import { Dimensions, Image, Linking } from 'react-native';
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
	Body
} from 'native-base';
import { connect } from 'react-redux';
import * as rrhhActions from '../src/actions/rrhhActions';
import * as loginActions from '../src/actions/loginActions';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from '../components/HeaderCustom';
import Loading from './../components/Loading';
import { apiUrl } from '../App';

class ProccessPeopleScreen extends Component {
	constructor() {
		super();
	}
	state = {
		pathImage: apiUrl.link + '/img/',
		pathDocument: apiUrl.link + '/files/'
	};

	loadingVacation() {
		this.props.allCompany(this.props.usuariosReducer.token);
		this.props.navigation.navigate('ProccessVacationScreen');
	}

	render() {
		var screenWidth = Dimensions.get('window').width;
		var screenHeight = Dimensions.get('window').height;

		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				<Content>
					<Card style={{ flex: 0 }}>
						<CardItem style={{ backgroundColor: 'white', alignItems: 'center' }}>
							<Body style={{ alignItems: 'center' }}>
								<Image
									source={{ uri: this.state.pathImage + 'seguro.jpg' }}
									style={{
										borderRadius: 20,
										width: screenWidth / 2,
										height: screenHeight / 4,
										resizeMode:'center',
									}}
								/>
								<Text>
									Instructivo de seguro medico GyT
								</Text>
							</Body>
						</CardItem>
						<CardItem style={{ backgroundColor: 'white', justifyContent: 'center' }}>
							<Button
								iconLeft
								onPress={() => Linking.openURL(this.state.pathDocument + 'InstructivoSeguromédicoGyT.pdf')}
								style={{
									backgroundColor: '#FA8258',
									width: screenWidth / 2,
									height: screenHeight / 17,
									borderRadius: 15
								}}
							>
								<Icon
									type="FontAwesome"
									name="cloud-download"
									style={{ marginLeft: 13, color: '#ffffff' }}
								/>
								<Text style={{ color: '#ffffff', marginRight: 15 }}>Descargar</Text>
							</Button>
						</CardItem>
					</Card>

					<Card style={{ flex: 0 }}>
						<CardItem style={{ backgroundColor: 'white', alignItems: 'center' }}>
							<Body style={{ alignItems: 'center' }}>
								<Image
									source={{ uri: this.state.pathImage + 'logo-irtra.org_.png' }}
									style={{
										borderRadius: 20,
										width: screenWidth / 2,
										height: screenHeight / 4,
										resizeMode:'center',
									}}
								/>
								<Text>
									Formulario IRTRA
								</Text>
							</Body>
						</CardItem>
						<CardItem style={{ backgroundColor: 'white', justifyContent: 'center' }}>
							<Button
								iconLeft
								onPress={() => Linking.openURL(this.state.pathDocument + 'formularioIrtra.doc')}
								style={{
									backgroundColor: '#FA8258',
									width: screenWidth / 2,
									height: screenHeight / 17,
									borderRadius: 15
								}}
							>
								<Icon
									type="FontAwesome"
									name="cloud-download"
									style={{ marginLeft: 13, color: '#ffffff' }}
								/>
								<Text style={{ color: '#ffffff', marginRight: 15 }}>Descargar</Text>
							</Button>
						</CardItem>
					</Card>

					<Card style={{ flex: 0 }}>
						<CardItem style={{ backgroundColor: 'white', alignItems: 'center' }}>
							<Body style={{ alignItems: 'center' }}>
								<Image
									source={{ uri: this.state.pathImage + 'piscina.jpg' }}
									style={{
										borderRadius: 20,
										width: screenWidth / 2,
										height: screenHeight / 4,
										resizeMode:'center',
									}}
								/>
								<Text>
									Mis días de vacaciones
								</Text>
							</Body>
						</CardItem>
						<CardItem style={{ backgroundColor: 'white', justifyContent: 'center' }}>
							<Button
								iconLeft
								onPress={() => this.loadingVacation()}
								style={{
									backgroundColor: '#FA8258',
									width: screenWidth - 190,
									height: screenHeight / 17,
									borderRadius: 15
								}}
							>
								<Icon type="MaterialCommunityIcons" name="email-send" style={{ color: '#ffffff' }} />
								<Text style={{ color: '#ffffff', marginRight: 50 }}>Consultar</Text>
							</Button>
						</CardItem>
					</Card>

					<Card style={{ flex: 0 }}>
						<CardItem style={{ backgroundColor: 'white', alignItems: 'center' }}>
							<Body style={{ alignItems: 'center' }}>
								<Image
									source={{ uri: this.state.pathImage + 'certificado.jpg' }}
									style={{
										borderRadius: 20,
										width: screenWidth / 2,
										height: screenHeight / 4,
										resizeMode:'center',
									}}
								/>
								<Text>
									Constancia laboral
								</Text>
							</Body>
						</CardItem>
						<CardItem style={{ backgroundColor: 'white', justifyContent: 'center' }}>
							<Button
								iconLeft
								onPress={() => this.props.navigation.navigate('ProccessCertificateScreen')}
								style={{
									backgroundColor: '#FA8258',
									width: screenWidth / 2,
									height: screenHeight / 17,
									borderRadius: 15
								}}
							>
								<Icon type="MaterialCommunityIcons" name="email-send" style={{ color: '#ffffff' }} />
								<Text style={{ color: '#ffffff', marginRight: 50 }}>Solicitar</Text>
							</Button>
						</CardItem>
					</Card>
				</Content>
				<FooterTabsNavigationIconText navigation={this.props.navigation} />
			</Container>
		);
	}
}

const mapStateToProps = ({ jobsReducer, usuariosReducer }) => {
	//return reducers.jobsReducer; /*   DE TODOS LOS REDUCERS MAPEAMOS el reducer de usuarios devolvera los suauiros en los props del componente */
	return { jobsReducer, usuariosReducer };
};

const mapDispatchProps = {
	...rrhhActions,
	...loginActions
};

export default withNavigation(connect(mapStateToProps, mapDispatchProps)(ProccessPeopleScreen));
