import React, { Component } from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import {
	Container,
	Content,
	View,
	Spinner,
	Thumbnail,
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
import * as awardActions from '../src/actions/awardActions';
import * as loginActions from '../src/actions/loginActions';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from '../components/HeaderCustom';
import { persistor, apiUrl, myStyles } from '../App';
import { withNavigation } from 'react-navigation';
import Loading from './../components/Loading';
import { SliderBox } from 'react-native-image-slider-box';

class TeamScreen extends Component {
	constructor() {
		super();
	}
	state = {
		dpi: '',
		name: '',
		lastname: '',
		email: '',
		phone: '',
		password: '',
		confirmPassword: '',
		pathImage: apiUrl.link + '/storage/awards/'
	};

	async componentDidMount() {
		await this.props.getAwards(this.props.usuariosReducer.token);
		this.setState({
			awards: await this.props.getAwards(this.props.usuariosReducer.token)
		});
	}

	userData = async () => {
		let Dpi = this.state.dpi;
		let Name = this.state.name;
		let Lastname = this.state.lastname;
		let Email = this.state.email;
		let Phone = this.state.phone;
		await this.props.logoutUser();
		if (this.state.password === this.state.confirmPassword) {
			var Password = this.state.password;
			await this.props.registerUsers(Dpi, Name, Lastname, Email, Phone, Password);
		}
		if (this.props.error == '') {
			await this.props.traerToken(Email, Password);
			await this.props.traerUser(this.props.token);
		}
	};

	loadContent = () => {
		var screenWidth = Dimensions.get('window').width - 1;
		var hg = Dimensions.get('window').width - 150;
		if (this.props.awardReducer.cargando) {
			return <Spinner color="blue" style={{ flex: 1 }} />;
		} else {
			return (
				<View style={{ margin: 0 }}>
					<SliderBox
						style={{ height: hg, width: screenWidth }}
						images={this.awardsUrlImageActive()}
						autoplay
						circleLoop
					/>
				</View>
			);
		}
	};

	awardsUrlImageActive() {
		const pathImage = this.state.pathImage;
		var sliderImages = [];
		var url = '';
		this.props.awardReducer.awards.map((award) => {
			if (award.active === 1) {
				url = award.url_image;
				sliderImages.push(pathImage + url);
			}
			//console.log("array imagenes: ",sliderImages);
		});
		return sliderImages;
	}

	render() {
		//const { navigation } = this.props.navigation
		var screenWidth = Dimensions.get('window').width - 1;
		var hg = Dimensions.get('window').width - 150;

		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				<Content>
					{this.loadContent()}
					<View>
						<Grid>
							<Col>
								<TouchableOpacity onPress={() => this.props.navigation.navigate('JobsScreen')}>
									<Card
										style={{
											borderRadius: 10,
											marginVertical: 10,
											marginLeft: 10,
											marginRight: 10
										}}
									>
										<Image
											source={{ uri: 'https://image.freepik.com/vector-gratis/smm-promocion-internet-publicidad-online-anuncio-investigacion-mercado-crecimiento-ventas-comercializador-personaje-dibujos-animados-portatil-altavoz-ilustracion-metafora-concepto-aislado-vector_335657-2849.jpg' }}
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
												OPORTUNIDADES
											</Text>
										</CardItem>
									</Card>
								</TouchableOpacity>
							</Col>
							<Col>
								<TouchableOpacity onPress={() => this.props.navigation.navigate('StoreScreen')}>
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
												uri:
													'https://image.freepik.com/vector-gratis/mensajero-profesional-que-entrega-pedido-ilustracion-plana-scooter_74855-14494.jpg'
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
												UBICACIONES
											</Text>
										</CardItem>
									</Card>
								</TouchableOpacity>
							</Col>
						</Grid>
						<Grid>
							<Col>
								<TouchableOpacity onPress={() => this.props.navigation.navigate('ContactScreen')}>
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
												uri:
													'https://image.freepik.com/vector-gratis/ilustracion-concepto-llamando_114360-1823.jpg'
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
												DIRECTORIO
											</Text>
										</CardItem>
									</Card>
								</TouchableOpacity>
							</Col>
							<Col>
								<TouchableOpacity onPress={() => this.props.navigation.navigate('ProccessPeopleScreen')}>
									<Card
										style={{
											borderRadius: 10,
											marginVertical: 10,
											marginLeft: 10,
											marginRight: 10
										}}
									>
										<Image
											source={{ uri: apiUrl.link + '/img/bg/' + 'bg-1.jpg' }}
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
												SOLICITUDES
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

const mapStateToProps = ({ awardReducer, usuariosReducer }) => {
	return { awardReducer, usuariosReducer };
};

const mapDispatchProps = {
	...awardActions,
	...loginActions
};

export default withNavigation(connect(mapStateToProps, mapDispatchProps)(TeamScreen));
