import React, { Component } from 'react';
import { Image, KeyboardAvoidingView } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import {
  Container,
  Switch,
  ListItem,
  Content,
  List,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text
} from "native-base";import { connect } from 'react-redux';
import * as loginActions from '../src/actions/loginActions';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B'
import HeaderCustom from './../components/HeaderCustom'

class SettingsScreen extends Component {
	constructor(props) {
		super();
	  }
	state = {
		dpi: '',
		name: '',
		lastname: '',
		email: '',
		phone: '',
		password: '',
		confirmPassword: ''
	};

	componentDidMount() {
		console.log('');
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
						<Text style={{ fontWeight: 'bold' }}> Registrate </Text>
					</Button>
				</Col>
			</Grid>
		);
	};

	handleSubmit = () => {
		if (this.state.password !== this.state.confirmPassword) {
			return (
				<Row>
					<Grid>
						<Col style={{ alignItems: 'center', marginBottom: 15 }}>
							<Text style={{ color: 'white' }}>Las contraseñas no coinciden</Text>
						</Col>
					</Grid>
				</Row>
			);
		}
	};

	Erroruser = () => {
		if (this.props.error != '') {
			return (
				<Row>
					<Grid>
						<Col style={{ alignItems: 'center', marginBottom: 15 }}>
							<Text style={{ color: 'white' }}>
								{this.props.error}
							</Text>
						</Col>
					</Grid>
				</Row>
			);
		}
	};

	render() {
		//const { navigation } = this.props.navigation
		

		console.log('SettingsScreen: ', this.props);

		return (
      <Container>
          <HeaderCustom navigation={this.props.navigation} />
          <Content>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: "#FF9501" }}>
                  <Icon active name="airplane" />
                </Button>
              </Left>
              <Body>
                <Text>Airplane Mode</Text>
              </Body>
              <Right>
                <Switch value={false} />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: "#007AFF" }}>
                  <Icon active name="wifi" />
                </Button>
              </Left>
              <Body>
                <Text>Wi-Fi</Text>
              </Body>
              <Right>
                <Text>GeekyAnts</Text>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
            <ListItem icon>
              <Left>
                <Button style={{ backgroundColor: "#007AFF" }}>
                  <Icon active name="bluetooth" />
                </Button>
              </Left>
              <Body>
                <Text>Bluetooth</Text>
              </Body>
              <Right>
                <Text>On</Text>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
          </Content>
          <FooterTabsNavigationIconText navigation={this.props.navigation} />
        </Container>
    );
	}
}

const mapStateToProps = reducers => {
	return reducers.usuariosReducer;
};

export default connect(mapStateToProps, loginActions)(SettingsScreen);
