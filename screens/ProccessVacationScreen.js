import React, { Component } from 'react';
import { Dimensions, Image, ScrollView, Alert } from 'react-native';
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
		pathImage: apiUrl.link + '/img/'
	};

	componentDidMount() {
		Alert.alert(
			`Consultar mis vacaciones`,
			`Elige la empresa a la que perteneces para consultar cuantos días de
      vacaciones tienes disponibles`,
			[
				{
					text: 'Cerrar'
				}
			],
			{ cancelable: false }
		);
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
						<ListItem key={item.id} icon onPress={() => this.mailVacation(item.email, item.departament)}>
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

	mailVacation(emailVacation, message) {
		//console.log("Que viene aqui? ", emailVacation, message);

		let mailUser = this.props.usuariosReducer.user.email;
		let token = this.props.usuariosReducer.token;

		let objectMail = { email: emailVacation, emailUser: mailUser, departament: message };

		Alert.alert(
			message,
			`Al aceptar, el encargado recibirá tu información y se pondrán en contacto contigo, lo antes posible.`,
			[
				{
					text: 'Cancelar',
					//onPress: () => console.log("Cancelar Pressed"),
					style: 'cancelar'
				},
				{ text: 'Aceptar', onPress: () => this.sendMailVacation(objectMail, token) }
			],
			{ cancelable: false }
		);
	}

	sendMailVacation(objectMail, token) {
		this.props.mailVacation(objectMail, token);
		Alert.alert(
			'Solicitud enviada',
			`Constancia solicitada correctamente. `,
			[ { text: 'Aceptar', onPress: () => this.props.navigation.navigate('ProccessVacationScreen') } ],
			{ cancelable: false }
		);
	}

	render() {
		var screenWidth = Dimensions.get('window').width;
		var screenHeight = Dimensions.get('window').height;
		const companies = this.props.rrhhReducer.company;

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
				<Content>{this.loadingInfoName()}</Content>
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
