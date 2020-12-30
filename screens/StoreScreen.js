import React, { Component } from 'react';
import { Dimensions, Image, Linking } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { withNavigation } from 'react-navigation';
import {
	Container,
	Content,
	View,
	Thumbnail,
	Form,
	Item,
	Input,
	Icon,
	Text,
	CardItem,
	Card,
	Button,
	Left,
	Right,
	Spinner,
	Body,
	TouchableHighlight
} from 'native-base';
import { connect } from 'react-redux';
import * as loginActions from '../src/actions/loginActions';
import * as storeActions from '../src/actions/storeActions';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from '../components/HeaderCustom';
import NotificationHeader from '../components/NotificationHeader';
import { persistor, apiUrl } from '../App';
import { SliderBox } from 'react-native-image-slider-box';
import Loading from './../components/Loading';

class StoreScreen extends Component {
	constructor() {
		super();
	}

	state = {
		search: '',
		isShowAlert: true,
	};
	

	async componentDidMount() {
		await this.props.getAllStoresAction(this.props.usuariosReducer.token);
	}

	async searchStores(search, token) {
		await this.props.getSearchStores(search, token);
		this.props.navigation.navigate('StoreShowScreen');
	}

	loadContent = () => {
		if (this.props.storeReducer.stores) {
			console.log('tiendas: ', this.props.storeReducer);
			return this.props.storeReducer.stores.map((store) => (
				<Card style={{ flex: 0 }} key={store.id}>
					<CardItem style={{ backgroundColor: 'transparent' }}>
						<Left>
							<Thumbnail
								style={{ backgroundColor: '#000000' }}
								source={require('../assets/images/robot-dev.png')}
							/>
							<Body>
								<Text>{store.name}</Text>
								<Text note>{store.address}</Text>
								<Text />
								<Text note>{store.schedule}</Text>
							</Body>
						</Left>
					</CardItem>
					<CardItem>
						<Body>
							<Text>{store.description}</Text>
						</Body>
					</CardItem>
					<CardItem style={{ justifyContent: 'space-around' }}>
						<Button
							primary
							rounded
							textStyle={{ color: '#87838B' }}
							onPress={() => Linking.openURL(store.maps)}
						>
							<Icon name="waze" type="MaterialCommunityIcons" />
							<Text>Waze</Text>
						</Button>
						<Button
							success
							rounded
							textStyle={{ color: '#87838B' }}
							onPress={() => Linking.openURL(`tel:${store.number}`)}
						>
							<Icon name="phone" type="FontAwesome" />
							<Text>{store.number}</Text>
						</Button>
					</CardItem>
				</Card>
			));
		} else {
			return <Spinner color="blue" style={{ flex: 1 }} />;
		}
	};
	showError = () => {
		if (this.props.storeReducer.error && this.state.isShowAlert) {
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
									fontSize: 18,
									fontWeight: 'bold',
									color: '#fff'
								}}
							>
								{this.props.storeReducer.error}
							</Text>
						</Col>
						<Button onPress={isShowAlert => this.setState({ isShowAlert:false })} transparent rounded>
							<Icon name="close" />
						</Button>
					</CardItem>
				</Card>
			);
		}
	};

	render() {
		if (this.props.storeReducer.cargando) {
			return (
				<Container>
					<HeaderCustom navigation={this.props.navigation} />
					<Loading />
					<FooterTabsNavigationIconText navigation={this.props.navigation} />
				</Container>
			);
		}

		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				{this.showError()}
				<Content>
					<Form style={{ marginRight: 45, marginLeft: 45, marginTop: 20 }}>
						<Item rounded style={{ marginTop: 25 }}>
							<Icon
								type="MaterialCommunityIcons"
								name="lock-open-outline"
								style={{ color: 'white', fontSize: 25 }}
							/>
							<Input
								onChangeText={(search) => this.setState({ search })}
								value={this.state.search}
								placeholder="Dirección o agencia"
								placeholderTextColor="#000000"
								style={{ color: '#000000' }}
							/>
							<Button
								transparent
								onPress={() => this.searchStores(this.state.search, this.props.usuariosReducer.token)}
							>
								<Icon name="search" type="FontAwesome5" />
							</Button>
						</Item>
					</Form>

					{this.loadContent()}
				</Content>
				<FooterTabsNavigationIconText navigation={this.props.navigation} />
			</Container>
		);
	}
}

const mapStateToProps = ({ storeReducer, usuariosReducer }) => {
	//return reducers.storeReducer; /*   DE TODOS LOS REDUCERS MAPEAMOS el reducer de usuarios devolvera los suauiros en los props del componente */
	return { storeReducer, usuariosReducer };
};

const mapDispatchProps = {
	...storeActions,
	...loginActions
};

export default withNavigation(connect(mapStateToProps, mapDispatchProps)(StoreScreen));
