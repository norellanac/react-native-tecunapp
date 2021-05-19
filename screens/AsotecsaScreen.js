import React, { Component, useEffect } from 'react';
import { ScrollView, Linking, Image, Modal, Alert, TouchableOpacity, Pressable, StyleSheet } from 'react-native';
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
		name1Error: '',
		name2: '',
		lastname1: '',
		lastname1Error: '',
		lastname2: '',
		lastname2Error: '',
		personalid: '',
		personalidError: '',
		idDpi: '',
		idDpiError: '',
		nit: '',
		nitError: '',
		birthday: '',
		birthdayError: '',
		jobdate: '',
		jobdateError: '',
		startDate: '',
		startDateError: '',
		mobilePhone: '',
		mobilePhoneError: '',
		email: '',
		emailError: '',
		bankAcount: '',
		bankAcountError: '',
		bankName: '',
		bankNameError: '',
		monthPercent: '',
		monthPercentError: '',
		bankFees: '',
		bankFeesError: '',
		famName1: '',
		famName1Error: '',
		famName2: '',
		famName2Error: '',
		famLastname1: '',
		famLastname1Error: '',
		famLastname2: '',
		famLastname2Error: '',
		famMobile: '',
		famMobileError: '',
		fam: '',
		famError: '',
		modalVisibleMail: false,
		pathImage: apiUrl.link + '/img/'
	};

	setModalVisible = (paramsVisible) => {
		this.setState({ modalVisibleMail: paramsVisible });
	}

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

	styles = StyleSheet.create({
		centeredView: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: 'rgba(52, 52, 52, 0.8)'
			//backgroundColor: 'white'
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
			width: screenWidth / 2,
			//backgroundColor: 'black'
		},
	
		viewMailAccept: {
			flex: 0,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
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
	
		buttonIcon: {
			color: myStyles.bg1,
			width: 28,
		},
	
		textStyleMail: {
			color: myStyles.bg1,
		},	
  	});

	async componentDidMount() {}

	async sendInfo(){
		var token = this.props.usuariosReducer.token;
		var object = {
			'name1': this.state.name1, 
			'name2': this.state.name2, 
			'lastname1': this.state.lastname1,
			'lastname2': this.state.lastname2,
			'personalid': this.state.personalid,
			'idDpi': this.state.idDpi,
			'nit': this.state.nit,
			'birthday': this.state.birthday,
			'jobdate': this.state.jobdate,
			'startDate': this.state.startDate,
			'mobilePhone': this.state.mobilePhone,
			'email': this.state.email,
			'bankAcount': this.state.bankAcount,
			'bankName': this.state.bankName,
			'monthPercent': this.state.monthPercent,
			'bankFees': this.state.bankFees,
			'famName1': this.state.famName1,
			'famName2': this.state.famName2,
			'famLastname1': this.state.famLastname1,
			'famLastname2': this.state.famLastname2,
			'famMobile': this.state.famMobile,
			'fam': this.state.fam
		};

		this.setModalVisible(false);
		await this.props.AsocTec(object, token);
	}

	validateName1(){
		if (this.state.name1 == "") {
			this.setState({ name1Error: "*El campo es requerido*" });
		} else {
			this.setState({ name1Error: "" });
		}
	}

	validateLastName1(){
		if (this.state.lastname1 == "") {
			this.setState({ lastname1Error: "*El campo es requerido*" });
		} else {
			this.setState({ lastname1Error: '' });
		}
	}

	validateLastName2(){
		if (this.state.lastname2 == "") {
			this.setState({ lastname2Error: "*El campo es requerido*" });
		} else {
			this.setState({ lastname2Error: '' });
		}
	}

	validateIdDpi(){
		if (this.state.idDpi == "") {
			this.setState({ idDpiError: "*El campo es requerido*" });
		} else {
			this.setState({ idDpiError: '' });
		}
	}

	validateNit(){
		if (this.state.nit == "") {
			this.setState({ nitError: "*El campo es requerido*" });
		} else {
			this.setState({ nitError: '' });
		}
	}

	validateBirthday(){
		if (this.state.birthday == "") {
			this.setState({ birthdayError: "*El campo es requerido*" });
		} else {
			this.setState({ birthdayError: '' });
		}
	}

	validateStartDate(){
		if (this.state.startDate == "") {
			this.setState({ startDateError: "*El campo es requerido*" });
		} else {
			this.setState({ startDateError: '' });
		}
	}

	validateMobilPhone(){
		if (this.state.mobilePhone == "") {
			this.setState({ mobilePhoneError: "*El campo es requerido*" });
		} else {
			this.setState({ mobilePhoneError: '' });
		}
	}

	validateEmail(){
		if (this.state.email == "") {
			this.setState({ emailError: "*El campo es requerido*" });
		} else {
			this.setState({ emailError: '' });
		}
	}

	validateBankAcount(){
		if (this.state.bankAcount == "") {
			this.setState({ bankAcountError: "*El campo es requerido*" });
		} else {
			this.setState({ bankAcountError: '' });
		}
	}

	validateBankName(){
		if (this.state.bankName == "") {
			this.setState({ bankNameError: "*El campo es requerido*" });
		} else {
			this.setState({ bankNameError: '' });
		}
	}

	validateMonthPercent(){
		if (this.state.monthPercent == "") {
			this.setState({ monthPercentError: "*El campo es requerido*" });
		} else {
			this.setState({ monthPercentError: '' });
		}
	}

	validatebankFees(){
		if (this.state.bankFees == "") {
			this.setState({ bankFeesError: "*El campo es requerido*" });
		} else {
			this.setState({ bankFeesError: '' });
		}
	}

	validateFamName1(){
		if (this.state.famName1 == "") {
			this.setState({ famName1Error: "*El campo es requerido*" });
		} else {
			this.setState({ famName1Error: '' });
		}
	}

	validateFamLastName1(){
		if (this.state.famLastname1 == "") {
			this.setState({ famLastname1Error: "*El campo es requerido*" });
		} else {
			this.setState({ famLastname1Error: '' });
		}
	}

	validateFamLastName2(){
		if (this.state.famLastname2 == "") {
			this.setState({ famLastname2Error: "*El campo es requerido*" });
		} else {
			this.setState({ famLastname2Error: '' });
		}
	}

	validateFamMobile(){
		if (this.state.famMobile == "") {
			this.setState({ famMobileError: "*El campo es requerido*" });
		} else {
			this.setState({ famMobileError: '' });
		}
	}

	validateFam(){
		if (this.state.fam == "") {
			this.setState({ famError: "*El campo es requerido*" });
		} else {
			this.setState({ famError: '' });
		}
	}

	sendAlert() {
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
							<Text style={this.styles.modalTextTitle}>Enviar solicitud</Text>
							<Text style={this.styles.modalTextDescription}>Por este medio solicito a la Asociación Solidarista de Trabajadores Empresas Tecun, S.A. - ASOTECSA se me acepte como asociado de dicha entidad, por lo que me comprometo a respetar y acatar sus estatutos y reglamentos, así como las disposiciones que emanen de su organismo director.</Text>
							<ListItem key={2} noBorder style={this.styles.ListCloseMail} icon delayPressIn>
								<Pressable onPress={() => this.setModalVisible(false)}>
									<View style={this.styles.viewMail}>
										<Icon style={this.styles.buttonIcon} name="closecircleo" type="AntDesign"/>
										<Text style={this.styles.textStyleMail}>CERRAR</Text>
									</View>
								</Pressable>
								<Pressable onPress={ () =>  this.sendInfo()}>
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
	};

	submit(){
		//console.log(this.state);
		if((this.state.name1 != '') && (this.state.lastname1 != '') && (this.state.lastname2 != '') && (this.state.idDpi != '') && (this.state.nit != '') && (this.state.birthday != '') && (this.state.startDate != '') && (this.state.mobilePhone != '') && (this.state.email != '') && (this.state.bankAcount != '') && (this.state.bankName != '') && (this.state.monthPercent != '') && (this.state.bankFees != '') && (this.state.famName1 != '') && (this.state.famLastname1 != '') && (this.state.famLastname2 != '') && (this.state.famMobile != '') && (this.state.fam != '')){
			return (
				<View style={{ marginVertical: 20, paddingBottom: 30, paddingTop: -10 }}>
					<Body>
						<Button
							onPress={this.sendAlert(), (modalVisibleMail) => this.setState({ modalVisibleMail: true})}
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
			);
		}
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
					{this.sendAlert()}
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
									onBlur={() => this.validateName1()}
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{(() => {
								if ((this.state.name1Error != '')) {
									return (
										<Text style={{ color: 'red', textAlign: 'center' }}>{this.state.name1Error}</Text>
									);
								}
							})()}

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
									onBlur={() => this.validateLastName1()}
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{(() => {
								if ((this.state.lastname1Error != '')) {
									return (
										<Text style={{ color: 'red', textAlign: 'center' }}>{this.state.lastname1Error}</Text>
									);
								}
							})()}

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
									onBlur={() => this.validateLastName2()}
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{(() => {
								if ((this.state.lastname2Error != '')) {
									return (
										<Text style={{ color: 'red', textAlign: 'center' }}>{this.state.lastname2Error}</Text>
									);
								}
							})()}

							{/* Identificacion */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon type="FontAwesome" name="vcard" style={{ color: myStyles.bg1, fontSize: 25 }} />
								<Input
									onChangeText={(idDpi) => this.setState({ idDpi })}
									value={this.state.idDpi}
									placeholder="DPI"
									onBlur={() => this.validateIdDpi()}
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{(() => {
								if ((this.state.idDpiError != '')) {
									return (
										<Text style={{ color: 'red', textAlign: 'center' }}>{this.state.idDpiError}</Text>
									);
								}
							})()}

							{/* NIT */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon type="FontAwesome" name="vcard" style={{ color: myStyles.bg1, fontSize: 25 }} />
								<Input
									maxLength={13}
									onChangeText={(nit) => this.setState({ nit })}
									value={this.state.nit}
									placeholder="NIT"
									onBlur={() => this.validateNit()}
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{(() => {
								if ((this.state.nitError != '')) {
									return (
										<Text style={{ color: 'red', textAlign: 'center' }}>{this.state.nitError}</Text>
									);
								}
							})()}

							{/* Fecha de Nacimiento */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon
									type="FontAwesome5"
									name="calendar"
									style={{ color: myStyles.bg1, fontSize: 25 }}
								/>
								<Input
									underlineColorAndroid="transparent"
									onChangeText={(birthday) => this.setState({ birthday })}
									value={this.state.birthday}
									placeholder="Fecha de Nacimiento"
									onBlur={() => this.validateBirthday()}
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1, outline: 'none' }}
								/>
							</Item>
							{(() => {
								if ((this.state.birthdayError != '')) {
									return (
										<Text style={{ color: 'red', textAlign: 'center' }}>{this.state.birthdayError}</Text>
									);
								}
							})()}

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
									onBlur={() => this.validateStartDate()}
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1, outline: 'none' }}
								/>
							</Item>
							{(() => {
								if ((this.state.startDateError != '')) {
									return (
										<Text style={{ color: 'red', textAlign: 'center' }}>{this.state.startDateError}</Text>
									);
								}
							})()}

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
									onBlur={() => this.validateMobilPhone()}
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1, outline: 'none' }}
								/>
							</Item>
							{(() => {
								if ((this.state.mobilePhoneError != '')) {
									return (
										<Text style={{ color: 'red', textAlign: 'center' }}>{this.state.mobilePhoneError}</Text>
									);
								}
							})()}

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
									onBlur={() => this.validateEmail()}
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1, outline: 'none' }}
								/>
							</Item>
							{(() => {
								if ((this.state.emailError != '')) {
									return (
										<Text style={{ color: 'red', textAlign: 'center' }}>{this.state.emailError}</Text>
									);
								}
							})()}

							{/* cuenta banco */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon type="FontAwesome" name="bank" style={{ color: myStyles.bg1, fontSize: 25 }} />
								<Input
									underlineColorAndroid="transparent"
									onChangeText={(bankAcount) => this.setState({ bankAcount })}
									value={this.state.bankAcount}
									placeholder="No. De cuenta"
									onBlur={() => this.validateBankAcount()}
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1, outline: 'none' }}
								/>
							</Item>
							{(() => {
								if ((this.state.bankAcountError != '')) {
									return (
										<Text style={{ color: 'red', textAlign: 'center' }}>{this.state.bankAcountError}</Text>
									);
								}
							})()}

							{/* Entidad bancaria: */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon type="FontAwesome" name="bank" style={{ color: myStyles.bg1, fontSize: 25 }} />
								<Input
									underlineColorAndroid="transparent"
									onChangeText={(bankName) => this.setState({ bankName })}
									value={this.state.bankName}
									placeholder="Entidad bancaria:"
									onBlur={() => this.validateBankName()}
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1, outline: 'none' }}
								/>
							</Item>
							{(() => {
								if ((this.state.bankNameError != '')) {
									return (
										<Text style={{ color: 'red', textAlign: 'center' }}>{this.state.bankNameError}</Text>
									);
								}
							})()}

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
									onBlur={() => this.validateMonthPercent()}
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1, outline: 'none' }}
								/>
							</Item>
							{(() => {
								if ((this.state.monthPercentError != '')) {
									return (
										<Text style={{ color: 'red', textAlign: 'center' }}>{this.state.monthPercentError}</Text>
									);
								}
							})()}

							{/* Incluir comisiones en el ahorro: */}
							<Item rounded style={{ marginTop: 15 }}>
								<Icon type="FontAwesome" name="bank" style={{ color: myStyles.bg1, fontSize: 25 }} />
								<Input
									underlineColorAndroid="transparent"
									onChangeText={(bankFees) => this.setState({ bankFees })}
									value={this.state.bankFees}
									onBlur={() => this.validatebankFees()}
									placeholder="Incluir comisiones en el ahorro:"
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1, outline: 'none' }}
								/>
							</Item>
							{(() => {
								if ((this.state.bankFeesError != '')) {
									return (
										<Text style={{ color: 'red', textAlign: 'center' }}>{this.state.bankFeesError}</Text>
									);
								}
							})()}

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
									onBlur={() => this.validateFamName1()}
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{(() => {
								if ((this.state.famName1Error != '')) {
									return (
										<Text style={{ color: 'red', textAlign: 'center' }}>{this.state.famName1Error}</Text>
									);
								}
							})()}

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
									onBlur={() => this.validateFamLastName1()}
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{(() => {
								if ((this.state.famLastname1Error != '')) {
									return (
										<Text style={{ color: 'red', textAlign: 'center' }}>{this.state.famLastname1Error}</Text>
									);
								}
							})()}

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
									onBlur={() => this.validateFamLastName2()}
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{(() => {
								if ((this.state.famLastname2Error != '')) {
									return (
										<Text style={{ color: 'red', textAlign: 'center' }}>{this.state.famLastname2Error}</Text>
									);
								}
							})()}

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
									onBlur={() => this.validateFamMobile()}
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{(() => {
								if ((this.state.famMobileError != '')) {
									return (
										<Text style={{ color: 'red', textAlign: 'center' }}>{this.state.famMobileError}</Text>
									);
								}
							})()}

							{/* Parentesco */}
							<Item rounded style={{ marginTop: 15, marginBottom: 15 }}>
								<Icon type="FontAwesome" name="users" style={{ color: myStyles.bg1, fontSize: 25 }} />
								<Input
									maxLength={13}
									onChangeText={(fam) => this.setState({ fam })}
									value={this.state.fam}
									placeholder="Parentesco"
									onBlur={() => this.validateFam()}
									placeholderTextColor={myStyles.bg1}
									style={{ color: myStyles.bg1 }}
								/>
							</Item>
							{(() => {
								if ((this.state.famError != '')) {
									return (
										<Text style={{ color: 'red', textAlign: 'center' }}>{this.state.famError}</Text>
									);
								}
							})()}

							{this.submit()}

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
