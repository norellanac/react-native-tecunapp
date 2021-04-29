import React, { Component, useEffect } from 'react';
import { ScrollView, Linking, Image, TouchableOpacity, Alert, LogBox } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import {
	Container,
	Content,
	Form,
	Item,
	Icon,
	Text,
	Input,
	View,
	CardItem,
	Body,
	Card,
	Button,
	ListItem,
	TextInput,
	Left,
	Right,
	Thumbnail,
	Spinner,
	List
} from 'native-base';
import Accordion from 'react-native-collapsible/Accordion';
import { connect } from 'react-redux';
import * as loginActions from '../src/actions/loginActions';
import * as contactsActions from '../src/actions/contactsActions';
import * as userActions from '../src/actions/userActions';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from '../components/HeaderCustom';
import { myStyles, apiUrl, screenWidth, screenHeight } from '../App';
import { withNavigation } from 'react-navigation';
import Loading from './../components/Loading';

class ContactScreen extends Component {
	constructor() {
		super();
	}
	state = {
		searchNombre: '',
		searchApellido: '',
		searchDepartamento: '',
		searchPais: '',
		mobilePhone: '',
        startDate: '',
		isShowAlert: true,
		isShowResult: false,
		showFavorites: false,
		activeSections: [],
		pathImage: apiUrl.link + '/img/'
	};

	showError = () => {
		if (this.props.contactsReducer.error && this.state.isShowAlert) {
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
								{this.props.contactsReducer.error}
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

	changeStateShowFavorites(favorite) {
		console.log(favorite);
	}

	_updateSections = (activeSections) => {
		this.setState({ activeSections });
	};

	async componentDidMount() {
		await this.props.clearContactsAction();
	}
	async searchContactData(token) {
		await this.props.searchContactsAction(
			this.state.searchNombre,
			this.state.searchApellido,
			this.state.searchDepartamento,
			this.state.searchPais,
			this.state.searchPuesto,
			token
		);
		//await this.props.
		//console.log('entra a buscar en la pantalla: ', this.props.contactsReducer.contacts);
		//this.props.navigation.navigate('ContactScreen');
	}

	render() {
		if (this.props.usuariosReducer.cargando) {
			return (
				<Container>
					<HeaderCustom navigation={this.props.navigation} />
					<Loading />
					<FooterTabsNavigationIconText navigation={this.props.navigation} tab={2} />
				</Container>
			);
		}

		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				{this.showError()}
				<ScrollView ref={(scrollView) => (this.scrollView = scrollView)}>
					<View style={{ backgroundColor: myStyles.bg2 }}>
						<Image
							source={{ uri: apiUrl.link + '/img/app/' + 'bcontacto.png' }}
							style={{
								width: screenWidth,
								minHeight: screenHeight / 10,
								height: screenHeight / 4
							}}
						/>
					</View>

					<Grid style={{ backgroundColor: 'transparent', marginTop: 15 }}>
						<Col style={{ alignItems: 'center' }}>
							<Text
								style={{
									fontSize: 20,
									color: myStyles.bg1,
									fontWeight: 'bold'
								}}
							>
								DATOS PERSONALES
							</Text>
						</Col>
					</Grid>
					<View>
						<Form style={{ marginRight: 20, marginLeft: 20 }}>
							{/* primer nombre */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon type="FontAwesome" name="user-o" style={{ color: myStyles.bg1, fontSize: 25 }} />
								<Input
									onChangeText={(searchNombre) => this.setState({ searchNombre })}
									value={this.state.searchNombre}
									placeholder="Primer Nombre"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{/* segundo nombre */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon type="FontAwesome" name="user-o" style={{ color: myStyles.bg1, fontSize: 25 }} />
								<Input
									onChangeText={(searchNombre) => this.setState({ searchNombre })}
									value={this.state.searchNombre}
									placeholder="Segundo Nombre"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{/* Primer Apellido */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon type="FontAwesome" name="user-o" style={{ color: myStyles.bg1, fontSize: 25 }} />
								<Input
									onChangeText={(searchApellido) => this.setState({ searchApellido })}
									value={this.state.searchApellido}
									placeholder="Primer Apellido"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{/* Segundo Apellido */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon type="FontAwesome" name="user-o" style={{ color: myStyles.bg1, fontSize: 25 }} />
								<Input
									onChangeText={(searchApellido) => this.setState({ searchApellido })}
									value={this.state.searchApellido}
									placeholder="Segundo Apellido"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{/* Identificacion */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon
									type="SimpleLineIcons"
									name="people"
									style={{ color: myStyles.bg1, fontSize: 25 }}
								/>
								<Input
									onChangeText={(searchDepartamento) => this.setState({ searchDepartamento })}
									value={this.state.searchDepartamento}
									placeholder="DPI"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{/* NIT */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon
									type="MaterialCommunityIcons"
									name="map"
									style={{ color: myStyles.bg1, fontSize: 25 }}
								/>
								<Input
									maxLength={13}
									onChangeText={(searchPais) => this.setState({ searchPais })}
									value={this.state.searchPais}
									placeholder="NIT"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{/* Fecha de Nacimiento */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon
									type="MaterialCommunityIcons"
									name="email-outline"
									style={{ color: myStyles.bg1, fontSize: 25 }}
								/>
								<Input
									underlineColorAndroid="transparent"
									onChangeText={(searchPuesto) => this.setState({ searchPuesto })}
									value={this.state.searchPuesto}
									placeholder="Fecha de Nacimiento"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1, outline: 'none' }}
								/>
							</Item>
							{/* Fecha de Ingreso */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon
									type="FontAwesome5"
									name="calendar"
									style={{ color: myStyles.bg1, fontSize: 25 }}
								/>
								<Input
									underlineColorAndroid="transparent"
									onChangeText={(startDate) => this.setState({ startDate })}
									value={this.state.startDate}
									placeholder="Fecha de Ingreso"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1, outline: 'none' }}
								/>
							</Item>

							{/* celular */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon
									type="FontAwesome"
									name="mobile-phone"
									style={{ color: myStyles.bg1, fontSize: 25 }}
								/>
								<Input
									underlineColorAndroid="transparent"
									onChangeText={(mobilePhone) => this.setState({ mobilePhone })}
									value={this.state.mobilePhone}
									placeholder="No. De celular"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1, outline: 'none' }}
								/>
							</Item>

							{/* BTN */}
							<Content style={{ marginTop: 20 }}>
								<Body>
									<Button
										onPress={() => {
											this.setState({ isShowResult: true });
											this.searchContactData(this.props.usuariosReducer.token);
										}}
										rounded
										style={{
											fontSize: 44,
											backgroundColor: myStyles.bg2
										}}
									>
										<Text
											style={{
												textAlign: 'center',
												color: '#ffffff',
												fontSize: 20,
												marginRight: 30,
												marginLeft: 30,
												paddingBottom: 35,
												paddingTop: 35
											}}
										>
											Buscar
										</Text>
									</Button>
								</Body>
							</Content>

							<Content
								style={{ marginTop: 20 }}
								onContentSizeChange={() => {
									this.scrollView.scrollToEnd();
								}}
							>
							</Content>
						</Form>
					</View>
				</ScrollView>
				<FooterTabsNavigationIconText navigation={this.props.navigation} tab={2} />
			</Container>
		);
	}
}

const mapStateToProps = ({ usuariosReducer, loginReducer, contactsReducer }) => {
	return { usuariosReducer, loginReducer, contactsReducer };
};

const mapDispatchProps = {
	...loginActions,
	...userActions,
	...contactsActions
};

export default withNavigation(connect(mapStateToProps, mapDispatchProps)(ContactScreen));
