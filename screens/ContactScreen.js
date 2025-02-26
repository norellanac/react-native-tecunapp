import React, { Component, useEffect } from 'react';
import {
	ScrollView,
	Linking,
	Modal,
	Pressable,
	StyleSheet,
	Image,
	TouchableOpacity,
	Alert,
	LogBox
} from 'react-native';
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
		searchPuesto: '',
		isShowAlert: true,
		isShowResult: false,
		showFavorites: false,
		modalVisibleSend: false,
		activeSections: [],
		pathImage: apiUrl.link + '/img/'
	};

	styles = StyleSheet.create({
		centeredView: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: 'rgba(52, 52, 52, 0.8)'
			//backgroundColor: 'white'
		},

		modalViewSendMail: {
			marginTop: 50,
			width: screenWidth / 1.4,
			height: screenHeight / 4.5,
			//margin: 20,
			backgroundColor: 'white',
			borderRadius: 20,
			//padding: 35,
			//backgroundColor: 'black',
			shadowColor: '#000',
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
			backgroundColor: 'white',
			borderRadius: 20,
			//padding: 35,
			//backgroundColor: 'black',
			shadowColor: '#000',
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
			backgroundColor: 'white',
			borderRadius: 20,
			//padding: 35,
			//backgroundColor: 'black',
			shadowColor: '#000',
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
			alignItems: 'center'
			//backgroundColor: 'red',
		},

		viewMail: {
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
			backgroundColor: 'white',
			borderRadius: 20,
			//padding: 35,
			flexDirection: 'row',
			justifyContent: 'flex-end',
			//backgroundColor: 'black',
			shadowColor: '#000',
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
			width: screenWidth / 2
			//backgroundColor: 'black'
		},

		ListClose: {
			alignSelf: 'flex-end',
			width: screenWidth / 2.9,
		},

		textStyle: {
			color: myStyles.bg1,
			marginRight: 10
		},

		textStyleMail: {
			color: myStyles.bg1
		},

		modalTextTitle: {
			marginBottom: 15,
			fontSize: 18,
			textAlign: 'center',
			marginTop: 20,
			fontWeight: 'bold',
			color: myStyles.bg1
		},

		modalTextDescription: {
			marginBottom: 15,
			textAlign: 'center',
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
			width: 28
		}
	});

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
		//console.log(favorite);
	}

	loadFAvorites() {
		//console.log('Entro aqui? ', this.state.showFavorites);
		if (this.state.showFavorites == true) {
			return (
				<CardItem
					style={{
						backgroundColor: 'red',
						marginTop: 90
					}}
				>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.navigate('ContactCallScreen');
						}}
					>
						<Image
							source={{ uri: this.state.pathImage + 'telephone.png' }}
							style={{ width: screenWidth / 4, height: screenWidth / 4 }}
						/>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => {
							this.props.navigation.navigate('ContactChatScreen');
						}}
					>
						<Image
							source={{ uri: this.state.pathImage + 'whatsapp.png' }}
							style={{ width: screenWidth / 4, height: screenWidth / 4 }}
						/>
					</TouchableOpacity>
				</CardItem>
			);
		}
	}

	setModalVisibleSend = (paramsVisibleSend) => {
		this.setState({ modalVisibleSend: paramsVisibleSend });
	};

	showContacts = () => {
		if (this.props.contactsReducer.cargando) {
			return <Spinner color="blue" style={{ flex: 1 }} />;
		}
		//console.log('state: ', this.state);
		if (this.props.contactsReducer.contacts.length > 0) {
			return (
				<Accordion
					sections={this.props.contactsReducer.contacts}
					activeSections={this.state.activeSections}
					renderSectionTitle={this._renderSectionTitle}
					renderHeader={this._renderHeader}
					renderContent={this._renderContent}
					onChange={this._updateSections}
				/>
			);
		} else {
			if (this.state.isShowResult && !this.props.contactsReducer.cargando) {
				return (
					<View style={this.styles.centeredView} key={3}>
						<Modal
							animationType="fade"
							transparent={true}
							visible={true}
							onRequestClose={() => {
								Alert.alert('Modal has been closed.');

								this.setModalVisibleSend(false);
							}}
						>
							<View style={this.styles.centeredView}>
								<View style={this.styles.modalViewSendMail}>
									<Text style={this.styles.modalTextTitle}>No hay coincidencias</Text>
									<Text style={this.styles.modalTextDescription}>Realiza una nueva busqueda.</Text>
									<ListItem
										key={3}
										noBorder
										style={this.styles.ListClose}
										icon
										delayPressIn
										onPress={
											(() => this.setModalVisibleSend(false),
											() => this.setState({ isShowResult: false }))
										}
									>
										<Left style={this.styles.ListLeft}>
											<Icon style={this.styles.buttonIcon} name="closecircleo" type="AntDesign" />
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
				/* Alert.alert(
          `No hay coincidencias`,
          `Realiza una nueva busqueda`,
          [
            {
              text: "Cerrar",
              onPress: () => this.setState({ isShowResult: false }),
            },
          ],
          { cancelable: false }
        ); */
			}
		}
	};

	_renderHeader = (section) => {
		return (
			<View
				style={{
					flexDirection: 'row',
					padding: 10,
					justifyContent: 'space-between',
					alignItems: 'center',
					backgroundColor: '#F7F7F7'
				}}
			>
				<Text style={{ fontWeight: '600', color: myStyles.bg1 }}> {section.nombre}</Text>
				{1 ? (
					<Icon style={{ fontSize: 18 }} name="caret-down" type="FontAwesome" />
				) : (
					<Icon style={{ fontSize: 18 }} name="add-circle" />
				)}
			</View>
		);
	};

	_renderContent = (record) => {
		return (
			<ListItem thumbnail>
				<Left>
					<Thumbnail
						square
						style={{ backgroundColor: 'transparent' }}
						source={{ uri: `${apiUrl.link}/img/logo.png` }}
					/>
				</Left>
				<Body>
					<Text note>
						{record.subDepartamento} - {record.puesto} Ext: {record.extension}
					</Text>
					<Button transparent onPress={() => Linking.openURL(`tel:${record.numeroDirecto}`)}>
						<Icon name="phone" type="FontAwesome" />
						<Text>{record.numeroDirecto}</Text>
					</Button>
					<Button transparent onPress={() => Linking.openURL(`tel:${record.celular}`)}>
						<Icon name="mobile-phone" type="FontAwesome" />
						<Text>{record.celular}</Text>
					</Button>
					<Button transparent onPress={() => Linking.openURL(`mailto:${record.correo}`)}>
						<Icon name="email-send" type="MaterialCommunityIcons" />
						<Text>{record.correo}</Text>
					</Button>
				</Body>
			</ListItem>
		);
	};

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
				{/* {this.showError()} */}
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

					<Content
						style={{
							borderWidth: 2,
							marginLeft: 20,
							marginRight: 20,
							borderColor: myStyles.bg1,
							borderRadius: 30,
							marginTop: 15,
							padding: -20,
							minHeight: 20
						}}
					>
						<TouchableOpacity onPress={() => this.setState({ showFavorites: !this.state.showFavorites })}>
							<ListItem
								icon
								noBorder
								onPress={() => this.setState({ showFavorites: !this.state.showFavorites })}
								style={{ marginBottom: -20, paddingTop: 5 }}
							>
								<Left style={{ marginLeft: 5 }}>
									<Icon
										onPress={() => this.setState({ showFavorites: !this.state.showFavorites })}
										active
										name="address-book"
										type="FontAwesome5"
										style={{ marginLeft: 5, color: '#007AFF' }}
									/>
								</Left>
								<Body style={{ marginLeft: 5 }}>
									<Text
										style={{ color: '#898989' }}
										onPress={() => this.setState({ showFavorites: !this.state.showFavorites })}
									>
										NUMEROS IMPORTANTES
									</Text>
								</Body>
								<Right>
									<Icon
										active
										name="caret-down"
										type="FontAwesome"
										onPress={() => this.setState({ showFavorites: !this.state.showFavorites })}
									/>
								</Right>
							</ListItem>
							<ListItem noBorder>
								{(() => {
									if (this.state.showFavorites == true) {
										return (
											<Content>
												<ListItem noBorder delayPressIn>
													<Grid
														style={{
															backgroundColor: myStyles.bg1,
															borderBottomLeftRadius: 15,
															borderTopLeftRadius: 15,
															marginLeft: -15,
															marginRight: 5,
															height: screenHeight / 10
														}}
													>
														<Col
															size={0}
															onPress={() => {
																this.props.navigation.navigate('ContactCallScreen');
															}}
															style={{
																justifyContent: 'center'
															}}
														>
															<View
																style={{ alignSelf: 'center' }}
															>
																<ListItem
																	noBorder
																	onPress={() => {
																		this.props.navigation.navigate(
																			'ContactCallScreen'
																		);
																	}}
																>
																	<Image
																		source={{
																			uri:
																				apiUrl.link +
																				'/img/app/' +
																				'telefono.png'
																		}}
																		style={{
																			height: 50,
																			width: 50
																		}}
																	/>
																	<Text
																		style={{
																			color: myStyles.light,
																			fontWeight: 'bold',
																			marginLeft: 5
																		}}
																	>
																		LLAMAR
																	</Text>
																</ListItem>
															</View>
														</Col>
													</Grid>

													<Grid
														style={{
															backgroundColor: myStyles.bg1,
															borderBottomRightRadius: 15,
															borderTopRightRadius: 15,
															marginLeft: 1,
															marginRight: -20,
															height: screenHeight / 10
														}}
													>
														<Col
															size={0}
															onPress={() => {
																this.props.navigation.navigate('ContactChatScreen');
															}}
															style={{
																justifyContent: 'center'
															}}
														>
															<View
																style={{
																	alignSelf: 'center'
																}}
															>
																<ListItem
																	noBorder
																	onPress={() => {
																		this.props.navigation.navigate(
																			'ContactChatScreen'
																		);
																	}}
																>
																	<Image
																		source={{
																			uri:
																				apiUrl.link +
																				'/img/app/' +
																				'whatsap.png'
																		}}
																		style={{
																			height: 40,
																			width: 40
																		}}
																	/>
																	<Text
																		style={{
																			color: myStyles.light,
																			fontWeight: 'bold',
																			marginLeft: 5
																		}}
																	>
																		WHATSAPP
																	</Text>
																</ListItem>
															</View>
														</Col>
													</Grid>
												</ListItem>
											</Content>
										);
									}
								})()}
							</ListItem>
						</TouchableOpacity>
					</Content>

					<Grid style={{ backgroundColor: 'transparent', marginTop: 5 }}>
						<Col style={{ alignItems: 'center' }}>
							<Text
								style={{
									fontSize: 20,
									color: myStyles.bg1,
									fontWeight: 'bold',
									marginBottom: 5
								}}
							>
								BUSCAR
							</Text>
						</Col>
					</Grid>
					<View>
						<Form style={{ marginRight: 20, marginLeft: 20 }}>
							<Item rounded style={{ marginTop: 15 }}>
								<Icon type="FontAwesome" name="user-o" style={{ color: myStyles.bg1, fontSize: 25 }} />
								<Input
									onChangeText={(searchNombre) => this.setState({ searchNombre })}
									value={this.state.searchNombre}
									placeholder="Nombres"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							<Item rounded style={{ marginTop: 15 }}>
								<Icon type="FontAwesome" name="user-o" style={{ color: myStyles.bg1, fontSize: 25 }} />
								<Input
									onChangeText={(searchApellido) => this.setState({ searchApellido })}
									value={this.state.searchApellido}
									placeholder="Apellidos"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							<Item rounded style={{ marginTop: 15 }}>
								<Icon
									type="SimpleLineIcons"
									name="people"
									style={{ color: myStyles.bg1, fontSize: 25 }}
								/>
								<Input
									onChangeText={(searchDepartamento) => this.setState({ searchDepartamento })}
									value={this.state.searchDepartamento}
									placeholder="Departamento o área"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
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
									placeholder="País"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
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
									placeholder="Plaza o puesto"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1, outline: 'none' }}
								/>
							</Item>
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
											backgroundColor: myStyles.bg2,
											marginBottom: 10
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
								{this.showContacts()}
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
