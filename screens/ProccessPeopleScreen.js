import React, { Component } from 'react';
import { Dimensions, Image, Linking, TouchableOpacity, Modal, Alert, Pressable, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { withNavigation } from 'react-navigation';
import {
	Container,
	Content,
	Spinner,
	View,
	Form,
	Picker,
	Input,
	Icon,
	Text,
	CardItem,
	Card,
	ListItem,
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
import { apiUrl, myStyles, screenHeight, screenWidth } from '../App';

class ProccessPeopleScreen extends Component {
	constructor() {
		super();
	}
	state = {
		pathImage: apiUrl.link + '/img/',
		pathDocument: apiUrl.link + '/files/',
		modalVisible: false,
	};

	loadingVacation() {
		this.props.allCompany(this.props.usuariosReducer.token);
		this.props.navigation.navigate('ProccessVacationScreen');
	}

	setModalVisibleOnly = (visible) => {
		this.setState({ modalVisible: visible });
	}

	styles = StyleSheet.create({
		centeredView: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: 'rgba(52, 52, 52, 0.8)'
			//backgroundColor: 'white'
		},

		modalViewText: {
			marginTop: 50,
			width: screenWidth - 30,
			height: screenHeight / 4,
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
			width: screenWidth - 20,
			height: screenHeight / 3,
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
	
		ListCloseMail: {
			alignSelf: 'flex-end',
			width: screenWidth / 1.8,
			//backgroundColor: 'black'
		},
	
		viewMailAccept: {
			flex: 0,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			marginLeft: 20
			//backgroundColor: 'red',
		},
	
		viewMail:{
			flex: 0,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			//backgroundColor: 'blue',
			marginLeft: -30,
			marginRight: 5
		},
	
		buttonIcon: {
			color: myStyles.bg1,
			marginRight: 5,
			width: 28,
		},
	
		textStyleMail: {
			color: myStyles.bg1,
		},
		
		ListClose: {
			alignSelf: 'flex-end',
			width: screenWidth / 2 - 75,
		},

		ListLeft: {
			marginRight: -15,
			alignItems: 'center'
		},
  	});

	async irtra() {
		await Linking.openURL(this.state.pathDocument + 'formularioIrtra.doc');
		this.setState({ modalVisible: true });
	}

	modalStart() {
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
							<Text style={this.styles.modalTextTitle}>Informacion</Text>
							<Text style={this.styles.modalTextDescription}>
							¡Listo! Se ha descargado el formulario del IRTRA a tu celular. Para más información sobre cómo llenarlo comunícate con RR.HH. al (502) 4636-3640
							</Text>
							<ListItem key={2} noBorder style={this.styles.ListCloseMail} icon delayPressIn>
								<Pressable onPress={() => this.setModalVisibleOnly(false)}>
									<View style={this.styles.viewMail}>
										<Icon style={this.styles.buttonIcon} name="closecircleo" type="AntDesign"/>
										<Text style={this.styles.textStyleMail}>CERRAR</Text>
									</View>
								</Pressable>
								<Pressable onPress={() => Linking.openURL(`tel:+502 46363640`)}>
									<View style={this.styles.viewMailAccept}>
										<Icon style={this.styles.buttonIcon} name="call" type="Ionicons"/>
										<Text style={this.styles.textStyleMail}>LLAMAR</Text>
									</View>
								</Pressable>
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

		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				<Content>
				{this.modalStart()}
				<View style={{ backgroundColor: myStyles.bg2, marginBottom: 15 }}>
					<Image
					source={{ uri: apiUrl.link + '/img/app/' + 'bsolicitudes.png' }}
					style={{ 
						width: screenWidth,
						minHeight: screenHeight / 10,
						height: screenHeight / 4
					}}
					/>
				</View>
					<View>
						<Grid>
							<Col>
								<TouchableOpacity onPress={() => this.loadingVacation()}>
									<Card
										style={{
											borderRadius: 10,
											marginVertical: 10,
											marginLeft: 10,
											marginRight: 10,
											marginBottom: 15,
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
										<Image
											source={{
												uri: this.state.pathImage + 'piscina2.png'
											}}
											style={{
												width: screenWidth / 3,
												marginVertical: 5,
												minHeight: 150,
												maxHeight: 200,
												borderRadius: 10,
												alignSelf: 'center'
											}}
										/>
										<CardItem style={{ borderRadius: 10, paddingTop: 0 }}>
											<Text
												style={{
													fontSize: 14,
													fontWeight: 'bold',
													textAlign: 'center',
													color: myStyles.bg1,
													paddingVertical: 8
												}}
											>
												MIS DIAS DE VACACIONES
											</Text>
										</CardItem>
									</Card>
								</TouchableOpacity>
							</Col>

							<Col>
								<TouchableOpacity
									onPress={() => this.props.navigation.navigate('ProccessCertificateScreen')}
								>
									<Card
										style={{
											borderRadius: 10,
											marginVertical: 10,
											marginLeft: 10,
											marginRight: 10,
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
										<Image
											source={{ uri: this.state.pathImage + 'certificado.png' }}
											style={{
												width: screenWidth / 3,
												marginVertical: 5,
												minHeight: 150,
												maxHeight: 200,
												borderRadius: 10,
												alignSelf: 'center'
											}}
										/>
										<CardItem style={{ borderRadius: 10, paddingTop: 0 }}>
											<Text
												style={{
													fontSize: 14,
													fontWeight: 'bold',
													textAlign: 'center',
													color: myStyles.bg1,
													paddingVertical: 8
												}}
											>
												CONSTANCIA LABORAL
											</Text>
										</CardItem>
									</Card>
								</TouchableOpacity>
							</Col>
						</Grid>
						<Grid>
							<Col>
								<TouchableOpacity
									onPress={ () => this.irtra() }
								>
									<Card
										style={{
											borderRadius: 10,
											marginVertical: 10,
											marginLeft: 10,
											marginRight: 10,
											height: screenWidth / 2 + 25,
											shadowColor: "#000",
											shadowOffset: {
												width: 0,
												height: 3,
											},
											shadowOpacity: 0.29,
											shadowRadius: 4.65,

											elevation: 7,
											marginBottom: 50
										}}
									>
										<Image
											source={{
												uri: this.state.pathImage + 'logo-irtra.org_2.png'
											}}
											style={{
												width: screenWidth / 2 - 50,
												marginVertical: 5,
												minHeight: 150,
												maxHeight: 200,
												borderRadius: 10,
												alignSelf: 'center'
											}}
										/>
										<CardItem style={{ borderRadius: 10, paddingTop: 0 }}>
											<Text
												style={{
													fontSize: 14,
													fontWeight: 'bold',
													textAlign: 'center',
													color: myStyles.bg1,
													paddingVertical: 8
												}}
											>
												DESCARGAR FORMULARIO
											</Text>
										</CardItem>
									</Card>
								</TouchableOpacity>
							</Col>
							<Col>
								<TouchableOpacity onPress={() => this.props.navigation.navigate('AsotecsaScreen')}>
									<Card
										style={{
											borderRadius: 10,
											marginVertical: 10,
											marginLeft: 10,
											marginRight: 10,
											height: screenWidth / 2 + 25,
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
										<Image
											source={{
												uri: this.state.pathImage + 'asotecsa.png'
											}}
											style={{
												width: screenWidth / 2 - 45,
												marginVertical: 5,
												minHeight: 150,
												maxHeight: 200,
												borderRadius: 10,
												alignSelf: 'center'
											}}
										/>
										<CardItem style={{ borderRadius: 10, paddingTop: 0, justifyContent: 'center' }}>
											<Text
												style={{
													fontSize: 14,
													fontWeight: 'bold',
													textAlign: 'center',
													color: myStyles.bg1,
													paddingVertical: 8
												}}
											>
												ASOTECSA
											</Text>
										</CardItem>
									</Card>
								</TouchableOpacity>
							</Col>
						</Grid>
					</View>
				</Content>
				<FooterTabsNavigationIconText navigation={this.props.navigation} tab={2} />
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
