import React, { Component } from 'react';
import { TouchableOpacity, Image, Linking } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { withNavigation } from 'react-navigation';
import {
	Container,
	Content,
	View,
	Header,
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
	ListItem
} from 'native-base';
import { connect } from 'react-redux';
import * as loginActions from '../src/actions/loginActions';
import * as storeActions from '../src/actions/storeActions';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from '../components/HeaderCustom';
import NotificationHeader from '../components/NotificationHeader';
import { persistor, apiUrl, myStyles } from '../App';
import { SliderBox } from 'react-native-image-slider-box';
import Loading from './../components/Loading';

class StoreScreen extends Component {
	constructor() {
		super();
	}

	state = {
		search: '',
		isShowAlert: true
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
				<Card
					style={{
						flex: 0,
						borderRadius: 15,
						marginVertical: 10,
						marginLeft: 10,
						marginRight: 10
					}}
					key={store.id}
				>
					<CardItem style={{ backgroundColor: 'transparent', borderRadius: 15 }}>
						<Left>
							<Thumbnail
								style={{ backgroundColor: '#000000' }}
								source={{ uri: `${apiUrl.link}/img/logo.png` }}
							/>
							<Body>
								<Text
									style={{
										fontSize: 18,
										fontWeight: 'bold',
										color: myStyles.bg1,
										paddingVertical: 8
									}}
								>
									{store.name}
								</Text>
								<Text note>{store.address}</Text>
								<Text note>{store.schedule}</Text>
								<Text note>{store.description}</Text>
							</Body>
						</Left>
					</CardItem>
					<ListItem>
						<TouchableOpacity
							transparent
							iconLeft
							style={{ alignSelf: 'center', marginHorizontal: 5 }}
							onPress={() => Linking.openURL(store.maps)}
						>
							<Text>
								<Icon name="waze" type="MaterialCommunityIcons" /> waze
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							transparent
							iconLeft
							style={{ alignSelf: 'center', marginHorizontal: 5 }}
							onPress={() => Linking.openURL(store.maps)}
						>
							<Text>
								<Icon name="google-maps" type="MaterialCommunityIcons" /> Maps
							</Text>
						</TouchableOpacity>
						<TouchableOpacity
							iconLeft
							transparent
							style={{ alignSelf: 'center', marginHorizontal: 20 }}
							onPress={() => Linking.openURL(`tel:${store.number}`)}
						>
							<Text>
								<Icon name="phone" type="FontAwesome" /> {store.number}
							</Text>
						</TouchableOpacity>
						<Right />
					</ListItem>
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
						<Button onPress={(isShowAlert) => this.setState({ isShowAlert: false })} transparent rounded>
							<Icon name="close" />
						</Button>
					</CardItem>
				</Card>
			);
		}
	};

	render() {
		if (this.props.storeReducer.cargando && !this.props.storeReducer) {
			return (
				<Container>
					<HeaderCustom navigation={this.props.navigation} />
					<Loading />
					<FooterTabsNavigationIconText navigation={this.props.navigation} tab={1} />
				</Container>
			);
		}

		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				{this.showError()}
				<Content>
					<View style={{ backgroundColor: myStyles.bg2 }}>
						<Text
							style={{
								textAlign: 'center',
								fontSize: 30,
								fontWeight: 'bold',
								color: myStyles.light,
								paddingVertical: 8
							}}
						>
							Ubicación de agencias
						</Text>
					</View>

					{this.loadContent()}
				</Content>
				<Header searchBar rounded style={{ backgroundColor: myStyles.grey, borderRadius: 15 }}>
					<Item>
						<Input
							onChangeText={(search) => this.setState({ search })}
							value={this.state.search}
							placeholder="Dirección o agencia"
							placeholderTextColor="#000000"
							style={{ color: '#000000' }}
						/>

						<TouchableOpacity
							style={{ alignSelf: 'center', marginHorizontal: 5 }}
							onPress={() => this.searchStores(this.state.search, this.props.usuariosReducer.token)}
						>
							<Text>Buscar</Text>
						</TouchableOpacity>
					</Item>
				</Header>
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
