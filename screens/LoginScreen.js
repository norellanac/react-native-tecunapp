import React, { Component } from 'react';
import { Image, Linking, KeyboardAvoidingView } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import a from '../components/HeaderCustom';
import { Container, Content, Text, Card, CardItem, Button, Icon, Form, Item, Input, Spinner } from 'native-base';

import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import * as loginActions from '../src/actions/loginActions';

class LoginScreen extends Component {
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
		await this.props.traerUser(this.props.usuariosReducer.token);
		console.log('revision de token: ', this.props.usuariosReducer);
		//await this.props.getAddress(this.props.usuariosReducer.token);
		//await this.props.getAddress(this.props.usuariosReducer.token);
		if (this.props.usuariosReducer.user.address_id) {
			await this.props.getAddress(this.props.usuariosReducer.token);
			console.log('trajo direccion');
		}
		this.state.email='';
		this.state.password='';
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
							borderTopRightRadius: 20
						}}
					>
						<Text style={{ fontWeight: 'bold' }}> Ingreso </Text>
					</Button>
				</Col>
			</Grid>
		);
	};

	ponerError = () => {
		if (this.props.usuariosReducer.error) {
			return (
				<Col style={{ alignItems: 'center', marginBottom: 15 }}>
					<Text style={{ color: 'white' }}>Correo o Contraseña incorrecta intenta de nuevo</Text>
				</Col>
			);
		}
	};

	render() {

		return (
			<Container style={{ backgroundColor: '#EF5F2F' }}>
				<KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
					<Content>
						<Card transparent>
							<CardItem style={{ backgroundColor: '#EF5F2F' }}>
								<Grid style={{ marginTop: 60 }}>
									<Col style={{ alignItems: 'center' }}>
										<Image
											source={require('./../assets/images/robot-prod.png')}
											style={{ width: 165, height: 165 }}
										/>
									</Col>
								</Grid>
							</CardItem>
							<CardItem style={{ backgroundColor: '#EF5F2F' }}>
								<Grid>
									<Col style={{ alignItems: 'center' }}>
										<Text style={{ fontSize: 30, color: 'white', fontWeight: 'bold' }}>
											Bienvenido
										</Text>
									</Col>
								</Grid>
							</CardItem>
						</Card>
						<Form style={{ marginRight: 45, marginLeft: 45, marginTop: 20 }}>
							<Item rounded>
								<Icon type="FontAwesome" name="user-o" style={{ color: 'white', fontSize: 25 }} />
								<Input
									keyboardType="email-address"
									textContentType="emailAddress"
									onChangeText={email => this.setState({ email })}
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
									onChangeText={password => this.setState({ password })}
									value={this.state.password}
									placeholder="Contraseña"
									placeholderTextColor="#FFFFFF"
									style={{ color: 'white' }}
								/>
							</Item>
						</Form>
						<Card transparent>
							<CardItem style={{ backgroundColor: '#EF5F2F', marginTop: 20 }}>
								<Grid>
									<Row>
										{this.ponerError()}
									</Row>
									<Row>
										{this.ponerContenido()}
									</Row>
								</Grid>
							</CardItem>
							<CardItem style={{ backgroundColor: '#EF5F2F' }}>
								<Grid>
									<Col style={{ alignItems: 'center' }}>
										<Button
											transparent
											vertical
											onPress={() => Linking.openURL('http://app.canjeaton.com/password/reset')}
										>
											<Text
												style={{
													fontSize: 13,
													color: 'white',
													fontWeight: 'bold',
													textDecorationLine: 'underline',
													textTransform: 'capitalize'
												}}
											>
												Recuperar Contraseña
											</Text>
										</Button>
									</Col>
								</Grid>
							</CardItem>
							<CardItem style={{ backgroundColor: '#EF5F2F' }}>
								<Grid>
									<Col style={{ alignItems: 'center' }}>
										<Button
											transparent
											vertical
											onPress={() => this.props.navigation.navigate('RegisterRoute')}
										>
											<Text
												style={{
													fontSize: 20,
													color: 'white',
													fontWeight: 'bold',
													textDecorationLine: 'underline'
												}}
											>
												o registrate
											</Text>
										</Button>
										<Button
											transparent
											vertical
											onPress={() => this.props.navigation.navigate('HelpRoute')}
										>
											<Text
												style={{
													fontSize: 15,
													color: 'white',
													fontWeight: 'bold',
													textDecorationLine: 'underline'
												}}
											>
												Ayuda
											</Text>
										</Button>
									</Col>
								</Grid>
							</CardItem>
						</Card>
					</Content>
				</KeyboardAvoidingView>
			</Container>
		);
	}
}

const mapStateToProps = ({ addressReducer, usuariosReducer }) => {
	//return reducers.addressReducer; /*   DE TODOS LOS REDUCERS MAPEAMOS el reducer de usuarios devolvera los suauiros en los props del componente */
	return { addressReducer, usuariosReducer };
};

const mapDispatchProps = {
	...loginActions
};
export default connect(mapStateToProps, mapDispatchProps)(LoginScreen);
