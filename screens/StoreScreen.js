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
import { persistor, apiUrl, myStyles, screenWidth, screenHeight } from '../App';
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
		this.props.navigation.navigate('StoreScreen');
	}

	loadContent = () => {
		let stores = null;
		if (this.props.storeReducer.stores) {
			//console.log('tiendas: ', this.props.storeReducer);
			if (this.props.storeReducer.stores && !this.props.storeReducer.searchStores) {
				stores = this.props.storeReducer.stores	
			} else {
				stores = this.props.storeReducer.searchStores
			}
				return stores.map((store) => (	
				<Card
					style={{
						flex: 0,
						borderRadius: 15,
						marginVertical: 10,
						marginLeft: 15,
						marginRight: 15,
						marginTop: 10,
						backgroundColor: '#f9f9f9', 
						borderBottomLeftRadius: 20, 
						borderBottomRightRadius: 20,  
						shadowColor: "#000",
						shadowOffset: {
							width: 0,
							height: 5,
						},
						shadowOpacity: 0.34,
						shadowRadius: 6.27,

						elevation: 10,
					}}
					key={store.id}
				>
					<Image
						source={{ uri: apiUrl.link + '/img/bg/' + 'bg-2.jpg' }}
						style={{ 
							borderTopLeftRadius: 15,
							borderTopRightRadius: 15,
							minHeight: screenHeight / 8, 
							maxHeight: 90 
						}}
					/>
					<Text
						style={{
							fontSize: 18,
							fontWeight: 'bold',
							color: myStyles.bg1,
							paddingVertical: 8,
							textAlignVertical: "center",
							textAlign: "center"
						}}
					>
						{store.name}
					</Text>
					<Content style={{ marginRight: screenWidth / 10, marginLeft: screenWidth / 20 }}>
						<Text style={{ fontSize: 15 }} note>{store.address}</Text>
					</Content>
					<Content style={{ marginRight: screenWidth / 10, marginLeft: screenWidth / 20 }}>
						<Text style={{ fontSize: 15 }} note>{store.schedule}</Text>
					</Content>
					<Content style={{ marginRight: screenWidth / 10, marginLeft: screenWidth / 20 }}>
						<Text style={{ fontSize: 15 }} note>{store.description}</Text>
					</Content>
					<Content style={{ marginRight: screenWidth / 10, marginLeft: screenWidth / 20 }}>
						<Text style={{ fontSize: 15 }} note>Telefono: {store.number}</Text>
					</Content>
					<ListItem>
						<Button
							transparent
							style={{ 
								alignSelf: 'center',
								backgroundColor: '#f9f9f9', 
								borderWidth: 2, 
								borderRadius: 15, 
								marginHorizontal: 3,
								shadowColor: myStyles.bg1,
								shadowOffset: {
									width: 0,
									height: 6,
								},
								shadowOpacity: 0.39,
								shadowRadius: 8.30,

								elevation: 8,
							}}
							onPress={() => Linking.openURL(store.maps)}
						>
							<Text>
								<Icon name="waze" type="MaterialCommunityIcons" /> waze
							</Text>
						</Button>
						<Button
							transparent
							style={{ 
								alignSelf: 'center',
								backgroundColor: '#f9f9f9', 
								borderWidth: 2, 
								borderRadius: 15, 
								marginHorizontal: 3,
								shadowColor: myStyles.bg1,
								shadowOffset: {
									width: 0,
									height: 6,
								},
								shadowOpacity: 0.39,
								shadowRadius: 8.30,

								elevation: 8, 
							}}
							onPress={() => Linking.openURL(store.maps)}
						>
							<Text>
								<Icon name="google-maps" type="MaterialCommunityIcons" /> Maps
							</Text>
						</Button>
						<Button
							transparent
							style={{ 
								alignSelf: 'center',
								backgroundColor: '#f9f9f9', 
								borderWidth: 2, 
								borderRadius: 15, 
								marginHorizontal: 2,
								 marginRight: 5,
								 shadowColor: myStyles.bg1,
								shadowOffset: {
									width: 0,
									height: 6,
								},
								shadowOpacity: 0.39,
								shadowRadius: 8.30,

								elevation: 8,
							}}
							onPress={() => Linking.openURL(`tel:${store.number}`)}
						>
							<Text>
								<Icon name="phone" type="FontAwesome" style={{ color: myStyles.bg1 }} /> LLAMA
							</Text>
						</Button>
						<Right />
					</ListItem>
				</Card>
			));
		} else {
			
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
					<Image
						source={{ uri: apiUrl.link + '/img/bg/' + 'bg-1.jpg' }}
						style={{ width: screenWidth, minHeight: 200, maxHeight: 400 }}
					/>

					{this.loadContent()}
				</Content>
				{/* #f9f9f9 */}
				<View style={{ 
					backgroundColor: '#f9f9f9', 
					borderBottomLeftRadius: 20, 
					borderBottomRightRadius: 20,
				}}>
					<ListItem noBorder
						style={{ 
							backgroundColor: 'FFFFFF',
							marginTop: 10,
							marginBottom: 10,
							marginLeft: 35,
							width: screenWidth - 60, 
							height: screenHeight / 16,
							borderWidth: 1,
							borderRadius: 30,

						}}
					>
						<Input
							onChangeText={(search) => this.setState({ search })}
							value={this.state.search}
							placeholder="BUSCAR UBICACION"
							placeholderTextColor="#969696"
							style={{ color: 'black', marginLeft: 15 }}
						/>

						<TouchableOpacity
							style={{ alignSelf: 'center', marginHorizontal: 5 }}
							onPress={() => this.searchStores(this.state.search, this.props.usuariosReducer.token)}
						>
							<Icon
								name="search"
								type="FontAwesome"
								style={{ color: "#0075b7" }}
							/>
						</TouchableOpacity>
					</ListItem >
				</View>
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
