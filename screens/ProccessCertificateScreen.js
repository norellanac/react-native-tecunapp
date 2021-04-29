import React, { Component } from 'react';
import { Dimensions, Image, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { withNavigation } from 'react-navigation';
import {
	Container,
	Content,
	Spinner,
	Thumbnail,
	Form,
	View,
	Input,
	ListItem,
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
import HederPostSection from '../components/HederPostSection';
import Loading from './../components/Loading';
import { apiUrl, myStyles } from '../App';

class ProccessCertificateScreen extends Component {
	constructor() {
		super();
	}
	state = {
		pathImage: apiUrl.link + '/img/',
		pathDocuemnt: apiUrl.link
	};

	componentDidMount() {
		Alert.alert(
			`Constancia laboral`,
			`Enviaremos tu solicitud para que sea atendida por correo electronico`,
			[
				{
					text: 'Cerrar'
				}
			],
			{ cancelable: false }
		);
	}

	test() {
		console.log('Hola mundo desde el boton');
	}

	mailCertificate(contry, pais) {
		let mailUser = this.props.usuariosReducer.user.email;
		let token = this.props.usuariosReducer.token;

		console.log(pais);

		let objectMail = { country: contry, emailUser: mailUser, pais: pais };

		Alert.alert(
			`Constancia laboral ${pais}`,
			`Se enviará un correo electronico con su solicitud, Al momento de seleccionar "Aceptar" se enviara un correo electronico al encargado de procesar su solicitud. Pronto se contactaran contigo`,
			[
				{
					text: 'Cancelar',
					//onPress: () => console.log("Cancelar Pressed"),
					style: 'Cancelar'
				},
				{
					text: 'Aceptar',
					onPress: () => this.sendMailCertificate(objectMail, token)
				}
			],
			{ cancelable: false }
		);
	}

	sendMailCertificate(onlyObject, token) {
		this.props.mailCertificate(onlyObject, token);

		if (this.props.rrhhReducer.cargando) {
			Alert.alert(
				'Correo enviado exitosamente',
				`Constancia solicitada correctamente, pronto llegara un correo electronico a su bandeja de entradas para corroborar dicha informacion. `,
				[
					{
						text: 'Aceptar',
						onPress: () => this.props.navigation.navigate('ProccessCertificateScreen')
					}
				],
				{ cancelable: false }
			);
		}
	}

	render() {
		var screenWidth = Dimensions.get('window').width;
		var screenHeight = Dimensions.get('window').height;

		let gt = 'gtm';
		let paisGT = 'Guatemala';
		let sv = 'sv';
		let paisSV = 'El Salvador';
		let hn = 'hnd';
		let paisHn = 'Honduras';

		/* if (this.props.rrhhReducer.cargando) {
      return (
        <Container>
          <HeaderCustom navigation={this.props.navigation} />
          <HederPostSection navigation={this.props.navigation} />
          <Loading />
          <FooterTabsNavigationIconText navigation={this.props.navigation} tab={1} />
        </Container>
      );
    } */

		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				<Content>
					<View style={{ 
						backgroundColor: myStyles.bg2,
						backgroundColor: myStyles.bg2,
						borderBottomLeftRadius: 20,
						borderBottomRightRadius: 20,
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
						marginTop: 7,
						marginBottom: 7,
						marginLeft: 20,
						marginRight: 20,
						paddingTop: 5,
						paddingBottom: 5,
						maxHeight: 100
					}}>
						<Text
							style={{
								textAlign: 'center',
								fontSize: 30,
								fontWeight: 'bold',
								color: myStyles.light,
								paddingVertical: 8
							}}
						>
							CONSTANCIA LABORAL
						</Text>
					</View>
					<Card
						style={{
							flex: 0,
							borderRadius: 15,
							marginVertical: 10,
							marginLeft: 20,
							marginRight: 20,
							shadowColor: "#000",
							shadowOffset: {
								width: 0,
								height: 3,
							},
							shadowOpacity: 0.29,
							shadowRadius: 4.65,

							elevation: 7,
						}}
					>
						<CardItem style={{ backgroundColor: 'white', borderRadius: 15 }}>
							<Body style={{ alignItems: 'center' }}>
								<Image
									source={{ uri: this.state.pathImage + 'guatemala.png' }}
									style={{
										borderRadius: 20,
										width: screenWidth / 2,
										height: screenHeight / 6
									}}
								/>
							</Body>
						</CardItem>
						<CardItem 
							style={{ 
								backgroundColor: '#81cbff',
								marginLeft: 65,
								marginRight: 65,
								marginBottom: 10,
								height: screenHeight / 15
							}} onPress={() => this.mailCertificate(gt, paisGT)}>
							<Left>
								<Thumbnail
									square
									style={{
										minWidth: 2,
										maxWidth: 80,
										maxHeight: 30,
										marginLeft: 10,
										
									}}
									source={{ uri: `${apiUrl.link}/img/vacaciones.png` }}
								/>
								
							</Left>
							<Text style={{ marginLeft: 55, color: myStyles.bg1 }}>SOLICITA AQUI</Text>
							<Body>

							</Body>
						</CardItem>
					</Card>

					<Card
						style={{
							flex: 0,
							borderRadius: 15,
							marginVertical: 10,
							marginLeft: 20,
							marginRight: 20,
							shadowColor: "#000",
							shadowOffset: {
								width: 0,
								height: 3,
							},
							shadowOpacity: 0.29,
							shadowRadius: 4.65,

							elevation: 7,
						}}
					>
						<CardItem style={{ backgroundColor: 'white', borderRadius: 15 }}>
							<Body style={{ alignItems: 'center' }}>
								<Image
									source={{ uri: this.state.pathImage + 'el-salvador.png' }}
									style={{
										borderRadius: 20,
										width: screenWidth / 2,
										height: screenHeight / 6
									}}
								/>
							</Body>
						</CardItem>
						<CardItem 
							style={{ 
								backgroundColor: '#81cbff',
								marginLeft: 65,
								marginRight: 65,
								marginBottom: 10,
								height: screenHeight / 15
							}} onPress={() => this.mailCertificate(sv, paisSV)}>
							<Left>
								<Thumbnail
									square
									style={{
										minWidth: 2,
										maxWidth: 80,
										maxHeight: 30,
										marginLeft: 10,
										
									}}
									source={{ uri: `${apiUrl.link}/img/vacaciones.png` }}
								/>
								
							</Left>
							<Text style={{ marginLeft: 55, color: myStyles.bg1 }}>SOLICITA AQUI</Text>
							<Body>

							</Body>
						</CardItem>
					</Card>

					<Card
						style={{
							flex: 0,
							borderRadius: 15,
							marginVertical: 10,
							marginLeft: 20,
							marginRight: 20,
							shadowColor: "#000",
							shadowOffset: {
								width: 0,
								height: 3,
							},
							shadowOpacity: 0.29,
							shadowRadius: 4.65,

							elevation: 7,
						}}
					>
						<CardItem style={{ backgroundColor: 'white', borderRadius: 15 }}>
							<Body style={{ alignItems: 'center' }}>
								<Image
									source={{ uri: this.state.pathImage + 'honduras.png' }}
									style={{
										borderRadius: 20,
										width: screenWidth / 2,
										height: screenHeight / 6
									}}
								/>
							</Body>
						</CardItem>
						<CardItem 
							style={{ 
								backgroundColor: '#81cbff',
								marginLeft: 65,
								marginRight: 65,
								marginBottom: 10,
								height: screenHeight / 15
							}} onPress={() => this.mailCertificate(hn, paisHn)}>
							<Left>
								<Thumbnail
									square
									style={{
										minWidth: 2,
										maxWidth: 80,
										maxHeight: 30,
										marginLeft: 10,
										
									}}
									source={{ uri: `${apiUrl.link}/img/vacaciones.png` }}
								/>
								
							</Left>
							<Text style={{ marginLeft: 55, color: myStyles.bg1 }}>SOLICITA AQUI</Text>
							<Body>

							</Body>
						</CardItem>
					</Card>
				</Content>
				<FooterTabsNavigationIconText navigation={this.props.navigation} tab={2} />
			</Container>
		);
	}
}

const mapStateToProps = ({ rrhhReducer, usuariosReducer }) => {
	//return reducers/*   DE TODOS LOS REDUCERS MAPEAMOS el reducer de usuarios devolvera los suauiros en los props del componente */
	return { rrhhReducer, usuariosReducer };
};

const mapDispatchProps = {
	...rrhhActions,
	...loginActions
};

export default withNavigation(connect(mapStateToProps, mapDispatchProps)(ProccessCertificateScreen));
