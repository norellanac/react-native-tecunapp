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
		name1: '',
		name2: '',
		lastname1: '',
		lastname2: '',
		personalid: '',
		taxid: '',
		birthday: '',
		jobdate: '',
		mobile: '',
		email: '',
		bankAcount: '',
		bankName: '',
		monthPercent: '',
		bankFees: '',
		famName1: '',
		famName2: '',
		famLastname1: '',
		famLastname2: '',
		famMobile: '',
		fam: '',

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

	async componentDidMount() {}

	sendAlert = () => {
		Alert.alert(
			'Enviar solicitud',
			'Por este medio solicito a la Asociación Solidarista de Trabajadores Empresas Tecun, S.A. - ASOTECSA se me acepte como asociado de dicha entidad, por lo que me comprometo a respetar y acatar sus estatutos y reglamentos, así como las disposiciones que emanen de su organismo director.',
			[
				{
					text: 'No',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				},
				{ text: 'Si', onPress: () => BackHandler.exitApp() }
			],
			{ cancelable: false }
		);
	};

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
							source={{ uri: apiUrl.link + '/img/app/' + 'basotecsa.png' }}
							style={{
								width: screenWidth,
								minHeight: screenHeight / 10,
								height: screenHeight / 4
							}}
						/>
					</View>

					<View
						style={{ backgroundColor: myStyles.bg1, borderRadius: 20, marginHorizontal: 10, marginTop: 25 }}
					>
						<Text
							style={{
								textAlign: 'center',
								fontWeight: 'bold',
								color: myStyles.light,
								paddingVertical: 8,
								fontSize: 20,
								borderRadius: 20
							}}
						>
							DATOS PERSONALES
						</Text>
					</View>
					<View>
						<Form style={{ marginRight: 20, marginLeft: 20 }}>
							{/* primer nombre */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon
									type="FontAwesome"
									name="user-circle"
									style={{ color: myStyles.bg1, fontSize: 25 }}
								/>
								<Input
									onChangeText={(name1) => this.setState({ name1 })}
									value={this.state.name1}
									placeholder="Primer Nombre"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{/* segundo nombre */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon
									type="FontAwesome"
									name="user-circle"
									style={{ color: myStyles.bg1, fontSize: 25 }}
								/>
								<Input
									onChangeText={(name2) => this.setState({ name2 })}
									value={this.state.name2}
									placeholder="Segundo Nombre"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{/* Primer Apellido */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon
									type="FontAwesome5"
									name="user-circle"
									style={{ color: myStyles.bg1, fontSize: 25 }}
								/>
								<Input
									onChangeText={(lastname1) => this.setState({ lastname1 })}
									value={this.state.lastname1}
									placeholder="Primer Apellido"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{/* Segundo Apellido */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon
									type="FontAwesome5"
									name="user-circle"
									style={{ color: myStyles.bg1, fontSize: 25 }}
								/>
								<Input
									onChangeText={(lastname2) => this.setState({ lastname2 })}
									value={this.state.lastname2}
									placeholder="Segundo Apellido"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{/* Identificacion */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon type="FontAwesome" name="vcard" style={{ color: myStyles.bg1, fontSize: 25 }} />
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
								<Icon type="FontAwesome" name="vcard" style={{ color: myStyles.bg1, fontSize: 25 }} />
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
									type="FontAwesome5"
									name="calendar"
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

							{/* email */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon
									type="FontAwesome5"
									name="mail-bulk"
									style={{ color: myStyles.bg1, fontSize: 25 }}
								/>
								<Input
									underlineColorAndroid="transparent"
									onChangeText={(email) => this.setState({ email })}
									value={this.state.email}
									placeholder="Correo electrónico"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1, outline: 'none' }}
								/>
							</Item>

							{/* cuenta banco */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon type="FontAwesome" name="bank" style={{ color: myStyles.bg1, fontSize: 25 }} />
								<Input
									underlineColorAndroid="transparent"
									onChangeText={(bankAcount) => this.setState({ bankAcount })}
									value={this.state.bankAcount}
									placeholder="No. De cuenta"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1, outline: 'none' }}
								/>
							</Item>

							{/* Entidad bancaria: */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon type="FontAwesome" name="bank" style={{ color: myStyles.bg1, fontSize: 25 }} />
								<Input
									underlineColorAndroid="transparent"
									onChangeText={(bank) => this.setState({ bank })}
									value={this.state.bank}
									placeholder="Entidad bancaria:"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1, outline: 'none' }}
								/>
							</Item>

							<View
								style={{
									backgroundColor: myStyles.bg1,
									borderRadius: 20,
									marginHorizontal: 20,
									marginTop: 25
								}}
							>
								<Text
									style={{
										textAlign: 'center',
										fontWeight: 'bold',
										color: myStyles.light,
										paddingVertical: 8,
										fontSize: 20,
										borderRadius: 20
									}}
								>
									{'         DATOS DEL AHORRO    '}
								</Text>
							</View>
							<View />

							{/* Porcentaje de ahorro mensual: */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon type="FontAwesome" name="percent" style={{ color: myStyles.bg1, fontSize: 25 }} />
								<Input
									underlineColorAndroid="transparent"
									onChangeText={(monthPercent) => this.setState({ monthPercent })}
									value={this.state.monthPercent}
									placeholder="% de ahorro mensual"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1, outline: 'none' }}
								/>
							</Item>

							{/* Incluir comisiones en el ahorro: */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon type="FontAwesome" name="bank" style={{ color: myStyles.bg1, fontSize: 25 }} />
								<Input
									underlineColorAndroid="transparent"
									onChangeText={(bankFees) => this.setState({ bankFees })}
									value={this.state.bankFees}
									placeholder="Incluir comisiones en el ahorro:"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1, outline: 'none' }}
								/>
							</Item>

							<View
								style={{
									backgroundColor: myStyles.bg1,
									borderRadius: 20,
									marginHorizontal: 10,
									marginTop: 25
								}}
							>
								<Text
									style={{
										textAlign: 'center',
										fontWeight: 'bold',
										color: myStyles.light,
										paddingVertical: 8,
										fontSize: 20,
										borderRadius: 20
									}}
								>
									{'        DATOS DE BENEFICIARIO   '}
								</Text>
							</View>

							{/* primer nombre */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon
									type="FontAwesome"
									name="user-circle"
									style={{ color: myStyles.bg1, fontSize: 25 }}
								/>
								<Input
									onChangeText={(famName1) => this.setState({ famName1 })}
									value={this.state.famName1}
									placeholder="Primer Nombre"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{/* segundo nombre */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon
									type="FontAwesome"
									name="user-circle"
									style={{ color: myStyles.bg1, fontSize: 25 }}
								/>
								<Input
									onChangeText={(famName2) => this.setState({ famName2 })}
									value={this.state.famName2}
									placeholder="Segundo Nombre"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{/* Primer Apellido */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon
									type="FontAwesome5"
									name="user-circle"
									style={{ color: myStyles.bg1, fontSize: 25 }}
								/>
								<Input
									onChangeText={(famLastname1) => this.setState({ famLastname1 })}
									value={this.state.famLastname1}
									placeholder="Primer Apellido"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{/* Segundo Apellido */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon
									type="FontAwesome5"
									name="user-circle"
									style={{ color: myStyles.bg1, fontSize: 25 }}
								/>
								<Input
									onChangeText={(famLastname2) => this.setState({ famLastname2 })}
									value={this.state.famLastname2}
									placeholder="Segundo Apellido"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{/* No. De teléfono: */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon
									type="FontAwesome"
									name="mobile-phone"
									style={{ color: myStyles.bg1, fontSize: 25 }}
								/>
								<Input
									onChangeText={(famMobile) => this.setState({ famMobile })}
									value={this.state.famMobile}
									placeholder="No. De teléfono"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{/* NIT */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon type="FontAwesome" name="users" style={{ color: myStyles.bg1, fontSize: 25 }} />
								<Input
									maxLength={13}
									onChangeText={(searchPais) => this.setState({ searchPais })}
									value={this.state.searchPais}
									placeholder="Parentesco"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{/* BTN */}
							<View style={{ marginVertical: 20, paddingBottom: 30 }}>
								<Body>
									<Button
										onPress={() => {
											this.sendAlert();
										}}
										rounded
										iconLeft
										style={{
											fontSize: 44,
											backgroundColor: myStyles.bg2,
											paddingVertical: 35,
											borderRadius: 20,
											shadowColor: `#9400d3`,
											shadowOffset: {
												width: 0,
												height: 3
											},
											shadowOpacity: 0.27,
											shadowRadius: 4.65,

											elevation: 6
										}}
									>
										<Icon
											type="MaterialCommunityIcons"
											name="email-send"
											style={{
												color: myStyles.light,
												fontSize: 25,
												marginLeft: 30
											}}
										/>
										<Text
											style={{
												textAlign: 'center',
												color: '#ffffff',
												fontSize: 20,
												marginRight: 30,
												paddingBottom: 35,
												paddingTop: 35
											}}
										>
											ENVIAR SOLICITUD
										</Text>
									</Button>
								</Body>
							</View>

							<Content />
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
