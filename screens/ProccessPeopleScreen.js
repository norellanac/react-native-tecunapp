import React, { Component } from 'react';
import { Dimensions, Image, Linking, TouchableOpacity } from 'react-native';
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
import { apiUrl, myStyles } from '../App';

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
					<View style={{ backgroundColor: myStyles.bg2 }}>
						<Text
							style={{
								textAlign: 'center',
								fontSize: 30,
								fontWeight: 'bold',
								color: myStyles.light,
								paddingVertical: 8
							}}
						>
							Gestiones de recursos humanos
						</Text>
					</View>
					<View>
						<Grid>
							<Col>
								<TouchableOpacity
									onPress={() =>
										Linking.openURL(this.state.pathDocument + 'InstructivoSeguromédicoGyT.pdf')}
								>
									<Card
										style={{
											borderRadius: 10,
											marginVertical: 10,
											marginLeft: 10,
											marginRight: 10
										}}
									>
										<Image
											source={{
												uri: this.state.pathImage + 'seguro.jpg'
											}}
											style={{
												width: screenWidth / 2 - 30,
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
												Instructivo de seguro medico GyT
											</Text>
										</CardItem>
									</Card>
								</TouchableOpacity>
							</Col>
							<Col>
								<TouchableOpacity
									onPress={() => Linking.openURL(this.state.pathDocument + 'formularioIrtra.doc')}
								>
									<Card
										style={{
											borderRadius: 10,
											marginVertical: 10,
											marginLeft: 10,
											marginRight: 10
										}}
									>
										<Image
											source={{
												uri: this.state.pathImage + 'logo-irtra.org_.png'
											}}
											style={{
												width: screenWidth / 2 - 30,
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
												Descargar Formulario IRTRA
											</Text>
										</CardItem>
									</Card>
								</TouchableOpacity>
							</Col>
						</Grid>
						<Grid>
							<Col>
								<TouchableOpacity onPress={() => this.loadingVacation()}>
									<Card
										style={{
											borderRadius: 10,
											marginVertical: 10,
											marginLeft: 10,
											marginRight: 10
										}}
									>
										<Image
											source={{
												uri: this.state.pathImage + 'piscina.jpg'
											}}
											style={{
												width: screenWidth / 2 - 30,
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
												Consultar mis días de vacaciones
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
											marginRight: 10
										}}
									>
										<Image
											source={{ uri: this.state.pathImage + 'certificado.jpg' }}
											style={{
												width: screenWidth / 2 - 30,
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
												Solicitar constancia laboral
											</Text>
										</CardItem>
									</Card>
								</TouchableOpacity>
							</Col>
						</Grid>
						<Grid>
							<Col>
								<TouchableOpacity onPress={() => this.loadingVacation()}>
									<Card
										style={{
											borderRadius: 10,
											marginVertical: 10,
											marginLeft: 10,
											marginRight: 10
										}}
									>
										<Image
											source={{
												uri: this.state.pathImage + 'piscina.jpg'
											}}
											style={{
												width: screenWidth / 2 - 30,
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
												Asotecsa
											</Text>
										</CardItem>
									</Card>
								</TouchableOpacity>
							</Col>
							<Col>
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
