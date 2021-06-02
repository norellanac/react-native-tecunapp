import {
	Body, Button, Card, CardItem, Container,
	Content,
	Icon,
	Left, Text, Thumbnail,
	ListItem,
	View,
	Right
} from 'native-base';
import React, { Component } from 'react';
import { Alert, Dimensions, Image, Modal, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { apiUrl, myStyles, screenHeight, screenWidth } from '../App';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from '../components/HeaderCustom';
import * as loginActions from '../src/actions/loginActions';
import * as rrhhActions from '../src/actions/rrhhActions';

class ProccessCertificateScreen extends Component {
	constructor() {
		super();
	}
	state = {
		pathImage: apiUrl.link + '/img/',
		pathDocuemnt: apiUrl.link,
		modalVisible: true,
		modalVisibleMail: false,
		modalVisibleSend: false,
		contry: null,
		pais: null,
	};

	setModalVisibleOnly = (visible) => {
		this.setState({ modalVisible: visible });
	}

	setModalVisible = (paramsVisible) => {
		this.setState({ modalVisibleMail: paramsVisible });
	}

	setModalVisibleSend = (paramsVisibleSend) => {
		this.setState({ modalVisibleSend: paramsVisibleSend });
	}

	componentDidMount() {
	}

	test() {
		//console.log('Hola mundo desde el boton');
	}

	mailCertificate(contry, pais) {

		let mailUser = this.props.usuariosReducer.user.email;
		var token = this.props.usuariosReducer.token;
		//const { modalVisibleMail } = this.state;

		//console.log(pais);
		//console.log("Entro");

		var objectMail = { country: contry, emailUser: mailUser, pais: pais };

		//this.setModalVisible(!modalVisibleMail)

		return(
			<View style={this.styles.centeredView} key={2}>
				<Modal
					animationType="fade"
					transparent={this.state.modalVisibleMail}
					visible={this.state.modalVisibleMail}
					onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					
					this.setModalVisible(false);
					}}
				>
					<View style={this.styles.centeredView}>
						<View style={this.styles.modalViewMail}>
							<Text style={this.styles.modalTextTitle}>Constancia laboral {this.state.pais}</Text>
							<Text style={this.styles.modalTextDescription}>Haz click en acepta y enviaremos tu solicitud al área encargada y te responderán a través de correo electrónico o WhatsApp.</Text>
							<ListItem key={2} noBorder style={this.styles.ListCloseMail} icon delayPressIn>
								<Pressable onPress={() => this.setModalVisible(false)}>
									<View style={this.styles.viewMail}>
										<Icon style={this.styles.buttonIcon} name="closecircleo" type="AntDesign"/>
										<Text style={this.styles.textStyleMail}>CERRAR</Text>
									</View>
								</Pressable>
								<Pressable onPress={() => this.sendMailCertificate(objectMail, token)}>
									<View style={this.styles.viewMailAccept}>
										<Icon style={this.styles.buttonIcon} name="checkcircleo" type="AntDesign"/>
										<Text style={this.styles.textStyleMail}>ACEPTAR</Text>
									</View>
								</Pressable>
							</ListItem>
						</View>
					</View>
				</Modal>
			</View>
		);
	}

	async sendMailCertificate(onlyObject, token) {
		this.setModalVisible(false)
		//console.log("Aqui se envia el correo");
		await this.props.mailCertificate(onlyObject, token);
		this.setState({ modalVisibleSend: true });
	}

	modalSend() {
		return(
			<View style={this.styles.centeredView} key={3}>
				<Modal
					animationType="fade"
					transparent={this.state.modalVisibleSend}
					visible={this.state.modalVisibleSend}
					onRequestClose={() => {
					Alert.alert("Modal has been closed.");
					
					this.setModalVisibleSend(false);
					}}
				>
					<View style={this.styles.centeredView}>
						<View style={this.styles.modalViewSendMail}>
							<Text style={this.styles.modalTextTitle}>Solicitud enviada!!!</Text>
							<ListItem key={3} noBorder style={this.styles.ListClose} icon delayPressIn onPress={() => this.setModalVisibleSend(false)}>
								<Left style={this.styles.ListLeft}>
									<Icon style={this.styles.buttonIcon} name="closecircleo" type="AntDesign"/>
								</Left>
								<Body>
									<Text style={this.styles.textStyle}>CERRAR</Text>
								</Body>
							</ListItem>
						</View>
					</View>
				</Modal>
			</View>
		);
	}

	modalStart() {
		//modalVisible = this.state;
		return(
			<View style={this.styles.centeredView} key={1}>
				<Modal
					animationType="fade"
					transparent={this.state.modalVisible}
					visible={this.state.modalVisible}
					onRequestClose={() => {
					Alert.alert("Modal has been closed.");
						this.setModalVisibleOnly(false);
					}}
				>
					<View style={this.styles.centeredView}>
						<View style={this.styles.modalViewText}>
							<Text style={this.styles.modalTextTitle}>CONSTANCIA LABORAL</Text>
							<Text style={this.styles.modalTextDescription}>Enviaremos tu solicitud para que sea atendida por correo electronico.</Text>
							<ListItem key={1} noBorder style={this.styles.ListClose} icon delayPressIn onPress={() => this.setModalVisibleOnly(false)}>
								<Left style={this.styles.ListLeft}>
									<Icon style={this.styles.buttonIcon} name="closecircleo" type="AntDesign"/>
								</Left>
								<Body>
									<Text style={this.styles.textStyle}>CERRAR</Text>
								</Body>
							</ListItem>
						</View>
					</View>
				</Modal>
			</View>
		);
	}


	styles = StyleSheet.create({
		centeredView: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: 'rgba(52, 52, 52, 0.8)'
			//backgroundColor: 'white'
		},

		modalViewSendMail: {
			marginTop: 50,
			width: screenWidth - 30,
			height: screenHeight / 6,
			//margin: 20,
			backgroundColor: "white",
			borderRadius: 20,
			//padding: 35,
			//backgroundColor: 'black',
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2
			},
			shadowOpacity: 0.25,
			shadowRadius: 4,
			elevation: 5
		},

		modalViewMail: {
			marginTop: 50,
			width: screenWidth - 30,
			height: screenHeight / 5 + 25,
			//margin: 20,
			backgroundColor: "white",
			borderRadius: 20,
			//padding: 35,
			//backgroundColor: 'black',
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2
			},
			shadowOpacity: 0.25,
			shadowRadius: 4,
			elevation: 5
		},

		modalViewText: {
			marginTop: 50,
			width: screenWidth - 30,
			height: screenHeight / 5,
			//margin: 20,
			backgroundColor: "white",
			borderRadius: 20,
			//padding: 35,
			//backgroundColor: 'black',
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2
			},
			shadowOpacity: 0.25,
			shadowRadius: 4,
			elevation: 5
		},

		viewMailAccept: {
			flex: 0,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			marginLeft: 10
			//backgroundColor: 'red',
		},

		viewMail:{
			flex: 0,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			//backgroundColor: 'blue',
			marginLeft: -15,
			marginRight: 5
		},

		modalViewButton: {
			marginTop: 50,
			width: screenWidth - 30,
			height: screenHeight / 4,
			//margin: 20,
			backgroundColor: "white",
			borderRadius: 20,
			//padding: 35,
			flexDirection: 'row',
			justifyContent: 'flex-end',
			//backgroundColor: 'black',
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2
			},
			shadowOpacity: 0.25,
			shadowRadius: 4,
			elevation: 5
		},

		ListCloseMail: {
			alignSelf: 'flex-end',
			width: screenWidth / 1.6,
			//backgroundColor: 'black'
		},

		ListClose: {
			alignSelf: 'flex-end',
			width: screenWidth / 2 - 75,
		},

		textStyle: {
			color: myStyles.bg1,
			marginRight: 10
		},

		textStyleMail: {
			color: myStyles.bg1,
		},

		modalTextTitle: {
			marginBottom: 15,
			fontSize: 18,
			textAlign: "center",
			marginTop: 20,
			fontWeight: "bold",
			color: myStyles.bg1
		},

		modalTextDescription: {
			marginBottom: 15,
			textAlign: "center",
			color: '#858585'
		},

		ListbodyMail: {
			backgroundColor: 'black'
		},

		ListLeftMail: {
			backgroundColor: 'blue',
			width: 2,
			marginLeft: -100
		},

		ListLeft: {
			marginRight: -15,
			alignItems: 'center'
		},

		buttonIcon: {
			color: myStyles.bg1,
			marginRight: 5,
			width: 28,
		},
  	});

	render() {
		/* var screenWidth = Dimensions.get('window').width;
		var screenHeight = Dimensions.get('window').height; */

		let gt = 'gtm';
		let paisGT = 'Guatemala';
		let sv = 'sv';
		let paisSV = 'El Salvador';
		let hn = 'hnd';
		let paisHn = 'Honduras';

		let algo = null;
		let algo1 = null;

		//console.log(this.props.rrhhReducer);
		//console.log(this.state);

		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				<Content>
					{this.modalStart()}
					{this.mailCertificate(algo, algo1)}
					{this.modalSend()}
					<View style={{ 
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
					<TouchableOpacity onPress={() => this.mailCertificate(gt, paisGT), (modalVisibleMail) => this.setState({ modalVisibleMail: true}) }>
						<Card
							style={{
								flex: 0,
								borderRadius: 15,
								//height: screenHeight / 4,
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
							<CardItem style={{ backgroundColor: 'white', borderRadius: 15 }} onPress={() => this.mailCertificate(gt, paisGT)}>
								<Body style={{ alignItems: 'center' }}>
									<Image
										source={{ uri: this.state.pathImage + 'guatemala.png' }}
										style={{
											borderRadius: 20,
											width: screenWidth / 1.7,
											height: screenHeight / 6
										}}
									/>
								</Body>
							</CardItem>
							<TouchableOpacity onPress={() => this.mailCertificate(gt, paisGT), (modalVisibleMail) => this.setState({ modalVisibleMail: true}) }>
								<CardItem 
									style={{ 
										//backgroundColor: '#81cbff',
										marginLeft: 65,
										marginRight: 65,
									}} onPress={() => this.mailCertificate(gt, paisGT)}>
									<Image
										source={{ uri: this.state.pathImage + 'consLaboral.png' }}
										style={{
											//backgroundColor: 'black',
											marginTop: -10,
											borderRadius: 10,
											width: screenWidth / 2,
											height: 50,
											maxWidth: 600,
											maxHeight: 400,
										}}
									/>
								</CardItem>
							</TouchableOpacity>
						</Card>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => this.mailCertificate(sv, paisSV), (modalVisibleMail) => this.setState({ modalVisibleMail: true}) }>
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
											width: screenWidth / 1.7,
											height: screenHeight / 6
										}}
									/>
								</Body>
							</CardItem>
							<TouchableOpacity onPress={() => this.mailCertificate(sv, paisSV), (modalVisibleMail) => this.setState({ modalVisibleMail: true}) }>
								<CardItem 
									style={{ 
										//backgroundColor: '#81cbff',
										marginLeft: 65,
										marginRight: 65,
										//marginBottom: 10,
									}} onPress={() => this.mailCertificate(sv, paisSV)}>
									<Image
										source={{ uri: this.state.pathImage + 'consLaboral.png' }}
										style={{
											//backgroundColor: 'black',
											marginTop: -10,
											borderRadius: 10,
											width: screenWidth / 2,
											height: 50,
											maxWidth: 600,
											maxHeight: 400,
										}}
									/>
								</CardItem>
							</TouchableOpacity>
						</Card>
					</TouchableOpacity>

					<TouchableOpacity onPress={() => this.mailCertificate(hn, paisHn), (modalVisibleMail) => this.setState({ modalVisibleMail: true}) }>
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
											width: screenWidth / 1.7,
											height: screenHeight / 6
										}}
									/>
								</Body>
							</CardItem>
							<TouchableOpacity onPress={() => this.mailCertificate(hn, paisHn), (modalVisibleMail) => this.setState({ modalVisibleMail: true}) }>
								<CardItem 
									style={{ 
										//backgroundColor: '#81cbff',
										marginLeft: 65,
										marginRight: 65,
										//marginBottom: 10,
									}} onPress={() => this.mailCertificate(hn, paisHn)}>
									<Image
										source={{ uri: this.state.pathImage + 'consLaboral.png' }}
										style={{
											//backgroundColor: 'black',
											marginTop: -10,
											borderRadius: 10,
											width: screenWidth / 2,
											height: 50,
											maxWidth: 600,
											maxHeight: 400,
										}}
									/>
								</CardItem>
							</TouchableOpacity>
						</Card>
					</TouchableOpacity>
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
