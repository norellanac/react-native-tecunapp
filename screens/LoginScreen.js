import React, { Component } from 'react';
import { Image, Linking, KeyboardAvoidingView, Dimensions } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Container, Content, Text, Card, CardItem, Button, Icon, Form, Item, Input, Spinner } from 'native-base';

import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import * as loginActions from '../src/actions/loginActions';
import * as userActions from '../src/actions/userActions';

class LoginScreen extends Component {
	constructor(props) {
		super();
	}
	state = {
		email: '',
		password: ''
	};

	componentDidMount = async () => {
		//this.props.getStates();
	};

	userData = async () => {
		let Email = this.state.email;
		let Password = this.state.password;
		await this.props.traerToken(Email, Password);
		await this.props.traerUser(this.props.loginReducer.token);
		this.state.email = '';
		this.state.password = '';
	};
	ponerContenido = () => {
		if (this.props.cargando) {
			return <Spinner color="blue" style={{ flex: 1 }} />;
		}
		return (
			<Grid>
				<Col style={{ alignItems: 'center' }}>
					<Button
						onPress={this.userData}
						rounded
						style={{
							backgroundColor: '#1B2853',
							borderBottomLeftRadius: 20,
							borderTopLeftRadius: 20,
							borderBottomRightRadius: 20,
							borderTopRightRadius: 20,
							alignSelf: 'center'
						}}
					>
						<Text style={{ fontWeight: 'bold' }}> Ingresar </Text>
					</Button>
				</Col>
			</Grid>
		);
	};

	ponerError = () => {
		if (this.props.loginReducer.error) {
			return (
				<Col style={{ alignItems: 'center', marginBottom: 15 }}>
					<Text style={{ color: 'white' }}>Correo o Contraseña incorrecta intenta de nuevo</Text>
				</Col>
			);
		}
	};

	render() {
		let screenWidth = Dimensions.get('window').width;
		let screenHeight = Dimensions.get('window').height;
		if (this.props.loginReducer.isAuth) {
			this.props.navigation.navigate('Home');
		}
		return (
			<Container style={{ backgroundColor: '#ed913b' }}>
				<Content>
					<Card transparent>
						<CardItem style={{ backgroundColor: '#ed913b' }}>
							<Grid style={{ marginTop: 60 }}>
								<Col style={{ alignItems: 'center' }}>
									<Image
										source={require('./../assets/images/robot-prod.png')}
										style={{ width: screenWidth - 20, height: 165 }}
									/>
								</Col>
							</Grid>
						</CardItem>
						<CardItem style={{ backgroundColor: '#ed913b' }}>
							<Grid>
								<Col style={{ alignItems: 'center' }}>
									<Text
										style={{
											fontSize: 30,
											color: 'white',
											fontWeight: 'bold'
										}}
									>
										Bienvenido
									</Text>
								</Col>
							</Grid>
						</CardItem>
					</Card>
					<KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
						<Form style={{ marginRight: 45, marginLeft: 45, marginTop: 20 }}>
							<Item rounded>
								<Icon type="FontAwesome" name="user-o" style={{ color: 'white', fontSize: 25 }} />
								<Input
									keyboardType="email-address"
									textContentType="emailAddress"
									onChangeText={(email) => this.setState({ email })}
									value={this.state.email}
									placeholder="Correo ó Telefono"
									placeholderTextColor="#FFFFFF"
									style={{ color: 'white' }}
								/>
							</Item>
							<Item rounded style={{ marginTop: 25 }}>
								<Icon
									type="MaterialCommunityIcons"
									name="lock-open-outline"
									style={{ color: 'white', fontSize: 25 }}
								/>
								<Input
									textContentType="password"
									secureTextEntry={true}
									onChangeText={(password) => this.setState({ password })}
									value={this.state.password}
									placeholder="Contraseña"
									placeholderTextColor="#FFFFFF"
									style={{ color: 'white' }}
								/>
							</Item>
						</Form>
					</KeyboardAvoidingView>
					<Card transparent>
						<CardItem style={{ backgroundColor: '#ed913b', marginTop: 20 }}>
							<Grid>
								<Row>{this.ponerError()}</Row>
								<Row>{this.ponerContenido()}</Row>
							</Grid>
						</CardItem>
					</Card>
				</Content>
			</Container>
		);
	}
}

const mapStateToProps = ({ loginReducer, usuariosReducer }) => {
	//return reducers.loginReducer; /*   DE TODOS LOS REDUCERS MAPEAMOS el reducer de usuarios devolvera los suauiros en los props del componente */
	return { loginReducer, usuariosReducer };
};

const mapDispatchProps = {
	...loginActions,
	...userActions
};
export default connect(mapStateToProps, mapDispatchProps)(LoginScreen);
