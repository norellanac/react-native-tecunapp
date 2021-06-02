import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, Modal, TouchableOpacity, Pressable, StyleSheet, Alert } from 'react-native';
import HTML from 'react-native-render-html';
import { withNavigation } from 'react-navigation';
import { Col, Grid, Row } from 'react-native-easy-grid';
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
import * as rrhhActions from '../src/actions/rrhhActions';
import * as loginActions from '../src/actions/loginActions';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from '../components/HeaderCustom';
import HederPostSection from '../components/HederPostSection';
import { apiUrl, myStyles, screenHeight, screenWidth } from '../App';

import Loading from './../components/Loading';

class ProccessVacationScreen extends Component {
	constructor() {
		super();
	}
	state = {
		showData: false,
		newArray: [],
		company: '',
		objectMail: null,
		tokenUser: '',
		objectMailUser: '',
		modalVisible: true,
		modalVisibleMail: false,
		modalVisibleSend: false,
		mail: null,
		departament: null,
		pathImage: apiUrl.link + '/img/'
	};

	setModalVisibleOnly = (visible) => {
		this.setState({ modalVisible: visible });
	}

	setModalVisible = (visible) => {
		this.setState({ modalVisibleMail: visible });
	}

	setModalVisibleSend = (paramsVisibleSend) => {
		this.setState({ modalVisibleSend: paramsVisibleSend });
	}

	componentDidMount() {
	}

	componentDidUpdate() {
	}

	loadingInfoName() {
		const companies = this.props.rrhhReducer.company;
		let count = 0;

		return companies.map((itemName) => (
			//console.log("name ",itemName),
			//console.log(" other ", companies)
			<View>
				<Grid style={{ 
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
					<Col size={4} style={{ alignItems: 'center' }}
					>
						<Text
							style={{
								textAlign: 'center',
								fontSize: 30,
								fontWeight: 'bold',
								color: myStyles.light,
								paddingVertical: 2
							}}
						>
							{itemName[0].name}
						</Text>
					</Col>
				</Grid>

				{(() => {
					return itemName.map((item) => (
						<ListItem key={item.departament} icon onPress={ () => this.mailVacation(item.email, item.departament)}>
							<Body style={{ marginRight: 5, marginLeft: 10 }}>
								<Text>{item.departament}</Text>
							</Body>
							<Right>
								<Thumbnail
									square
									style={{
										marginRight: 50,
										paddingLeft: 50,
										paddingRight: 8,
										minWidth: 2,
										maxWidth: 20,
										maxHeight: 30,
										width: 20
									}}
									source={{ uri: `${apiUrl.link}/img/vacaciones.png` }}
								/>
							</Right>
						</ListItem>
					));
				})()}
			</View>
		));
	}

	viewModalMail(){
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
							<Text style={this.styles.modalTextDescription}>Enviaremos tu solicitud al área encargada y te responderán a través de correo electrónico o WhatsApp.</Text>
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

	mailVacation(emailVacation, message) {
		var mailUser = this.props.usuariosReducer.user.email;
		var token = this.props.usuariosReducer.token;

		var objectMail = { email: emailVacation, emailUser: mailUser, departament: message };

		this.state.objectMailUser = objectMail,
		this.state.tokenUser = token;

		this.setState({modalVisibleMail: true});
	}

	async sendMailVacation(objectMail, token) {
		this.setModalVisible(false)
		
		await this.props.mailVacation(objectMail, token);
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
			height: screenHeight / 5.5,
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
			height: screenHeight / 4.5,
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
			marginLeft: 10,
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
			width: screenWidth / 1.7,
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
			width: 28,
			marginRight: 5,
		},
  	});

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
							<Text style={this.styles.modalTextTitle}>CONSULTAR MIS VACACIONES</Text>
							<Text style={this.styles.modalTextDescription}>
								Elige la empresa a la que perteneces para consultar cuantos días de vacaciones tienes disponibles
							</Text>
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

	render() {
		var screenWidth = Dimensions.get('window').width;
		var screenHeight = Dimensions.get('window').height;
		const companies = this.props.rrhhReducer.company;

		//console.log(this.props.rrhhReducer);
		//console.log(this.state);

		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				<Content>
					{this.loadingInfoName()}
					{this.modalStart()}
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
									<Text style={this.styles.modalTextTitle}>Constancia laboral</Text>
									<Text style={this.styles.modalTextDescription}>Enviaremos tu solicitud al área encargada y te responderán a través de correo electrónico o WhatsApp.</Text>
									<ListItem key={2} noBorder style={this.styles.ListCloseMail} icon delayPressIn>
										<Pressable onPress={() => this.setModalVisible(false)}>
											<View style={this.styles.viewMail}>
												<Icon style={this.styles.buttonIcon} name="closecircleo" type="AntDesign"/>
												<Text style={this.styles.textStyleMail}>CERRAR</Text>
											</View>
										</Pressable>
										<Pressable onPress={() => this.sendMailVacation(this.state.objectMailUser, this.state.tokenUser)}>
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
					{this.modalSend()}
				</Content>
				<FooterTabsNavigationIconText navigation={this.props.navigation} tab={2} />
			</Container>
		);
	}
}

const mapStateToProps = ({ rrhhReducer, usuariosReducer }) => {
	//return reducers.rrhhReducer; /*   DE TODOS LOS REDUCERS MAPEAMOS el reducer de usuarios devolvera los suauiros en los props del componente */
	return { rrhhReducer, usuariosReducer };
};

const mapDispatchProps = {
	...rrhhActions,
	...loginActions
};

export default withNavigation(connect(mapStateToProps, mapDispatchProps)(ProccessVacationScreen));
