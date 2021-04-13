import React, { Component } from 'react';
import { Image, Linking, KeyboardAvoidingView, SafeAreaView, Dimensions, ImageBackground } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Container, Content, Text, Card, CardItem, Button, Icon, Form, Item, Input, Spinner } from 'native-base';

import { apiUrl, myStyles } from './../App';
import { connect } from 'react-redux';
import * as loginActions from '../src/actions/loginActions';
import * as userActions from '../src/actions/userActions';
import PostsScreen from '../screens/PostsScreen';

class LoginScreen extends Component {
	constructor(props) {
		super();
	}
	state = {
		email: '',
		password: '',
		isShowAlert: true,
		errorMessage: ''
	};

	showAlert = () => {
		if (this.state.errorMessage && this.state.isShowAlert) {
			return (
				<Card style={{ marginTop: 0, marginLeft: 0, marginRight: 0 }}>
					<CardItem style={{ backgroundColor: '#1B2853' }}>
						<Image source={{ uri: `${apiUrl.link}/img/not-found.png` }} style={{ width: 25, height: 25 }} />
						<Col size={4}>
							<Text
								style={{
									textAlign: 'center',
									fontSize: 15,
									fontWeight: 'bold',
									color: '#fff'
								}}
							>
								{this.state.errorMessage}
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

	componentDidMount = async () => {
		//this.props.getStates();
		this.setState({ isShowAlert: true });
		this.setState({ errorMessage: '' });
	};

	userData = async () => {
		let Email = this.state.email;
		let Password = this.state.password;
		await this.props.ldapLoginRegister(Email, Password);
		if (this.props.loginReducer.isLdap) {
			await this.props.traerToken(Email, Password);
			await this.props.traerUser(this.props.loginReducer.token);
		}
		this.setState({ password: '' });
		if (this.props.loginReducer.error) {
			this.setState({ isShowAlert: true });
			this.setState({ errorMessage: this.props.loginReducer.error });
		}
	};
	ponerContenido = () => {
		if (this.props.loginReducer.cargando) {
			return <Spinner color="blue" style={{ flex: 1 }} />;
		}
		return (
			<Grid>
				<Col style={{ alignItems: 'center' }}>
					<Button
						onPress={this.userData}
						rounded
						large
						style={{
							backgroundColor: myStyles.bg2,
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
			return <PostsScreen navigation={this.props.navigation} />;
		}

		return (
			<SafeAreaView style={{ flex: 1 }}>
				<Container style={{ flex: 1, backgroundColor: 'transparent' }}>
					<ImageBackground
						style={{ flex: 1, width: screenWidth + 30 }}
						source={require('./../assets/images/img4.png')}
					>
						{this.showAlert()}

						<Content>
							<Form style={{ marginRight: 45, marginLeft: 45, marginTop: screenHeight / 2 + 100 }}>
								<Item rounded>
									<Icon type="FontAwesome" name="user-o" style={{ color: 'white', fontSize: 25 }} />
									<Input
										keyboardType="email-address"
										textContentType="emailAddress"
										onChangeText={(email) => this.setState({ email })}
										value={this.state.email}
										placeholder="Correo"
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
							<Card transparent>
								<CardItem style={{ backgroundColor: 'transparent', marginTop: 20 }}>
									<Grid>
										<Row>{this.ponerError()}</Row>
										<Row>{this.ponerContenido()}</Row>
									</Grid>
								</CardItem>
							</Card>
						</Content>
					</ImageBackground>
				</Container>
			</SafeAreaView>
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
