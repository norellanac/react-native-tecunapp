import * as React from 'react';
import { Platform, Image, StyleSheet, View, Text, Dimensions, StatusBar, ImageBackground } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { Container, Root, Icon, Item } from 'native-base';
import AppIntroSlider from 'react-native-app-intro-slider';
/*/*******redux persist storage*****/
//*****crear archivo "./src/reducers" from "App.js" */
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './src/reducers';
import reduxThunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import image3 from './assets/images/pi3.png';
import image4 from './assets/images/pi4.png';
//const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//redux persisting
// Middleware: Redux Persist Config
const persistConfig = {
	// Root
	key: 'root',
	// Storage Method (React Native)
	storage: AsyncStorage,
	timeout: null,
	/* Whitelist (Save Specific Reducers)
	whitelist: [
	  'authReducer',
	],*/
	// Blacklist (Don't Save Specific Reducers)

	blacklist: [ 'demo' ]
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, applyMiddleware(reduxThunk));

export const persistor = persistStore(store);

export const apiUrl = {
	link: "http://192.168.1.49:3000"
	//link: "http://tecunapp.com/"
	//link: 'http://192.168.1.49:3000'
};
//http://192.168.50.144:3000
//http://172.18.0.3:3000
//redux persisting
/*/*******redux persist storage*****/

const image2 = apiUrl.link + '/img/app/' + 'pi2.png';

export const myStyles = {
	bg1: '#1D578A',
	bg2: '#E87823',
	bg3: '#181e26',
	light: '#ffffff',
	dark: '#000000',
	grey: '#f0f5f5',
	othergrey: '#fdfdfd',
	blue: '#3749ff',
	textInput:{
		backgroundColor: '#ffffff',
		borderStyle: 'solid',
		fontSize:15,
		borderRadius: 20,
		marginRight: 20, 
		marginLeft: 20
	},
	marginAll:{
		marginRight: 15, 
		marginLeft: 15
	}
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		...Platform.select({
			android: {
				//marginTop: StatusBar.currentHeight
			}
		})
	},
	buttonCircle: {
		width: 50,
		height: 50,
		backgroundColor: myStyles.bg1,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white'
	},
	slide: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'blue'
	},
	image: {
		width: 320,
		marginVertical: 32
	},
	text: {
		color: 'rgba(255, 255, 255, 0.8)',
		textAlign: 'center'
	},
	title: {
		fontSize: 22,
		color: 'white',
		textAlign: 'center'
	},
	text: {
		fontSize: 16,
		color: 'white',
		textAlign: 'center'
	}
});

const slides = [
	{
		key: '1',
		title: 'Novedades',
		text: 'Noticias y Podcast',
		image: apiUrl.link + '/img/app/' + 'bcontacto.png',
		bg: '#E87823',
		/* Se agrego la propiedad img, para ser llamadas las imagenes desde la WEB y no utilizar la palabra reservada image */
		img: apiUrl.link + '/img/app/' + 'pi2.png',
	},
	{
		key: '2',
		title: 'Mejoras',
		text: 'Utiliza tu correo y contraseña para ingresar!',
		image: apiUrl.link + '/img/app/' + 'pi2.png',
		bg: '#181e26',
		/* Se agrego la propiedad img, para ser llamadas las imagenes desde la WEB y no utilizar la palabra reservada image */
		img: apiUrl.link + '/img/app/' + 'pi3.png'
	},
	{
		key: '3',
		title: 'Ingresa al App',
		text: 'Utiliza tu correo y contraseña para ingresar!',
		image: image4,
		bg: '#181e26',
		/* Se agrego la propiedad img, para ser llamadas las imagenes desde la WEB y no utilizar la palabra reservada image */
		img: apiUrl.link + '/img/app/' + 'pi4.png'
	}
];

export const screenWidth = Dimensions.get('window').width;
export const screenHeight = Dimensions.get('window').height;

import MainStackNavigator from './navigation/MainStackNavigator';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isReady: false,
			showSlides: true
		};
	}

	async componentDidMount() {
		await Font.loadAsync({
			Roboto: require('native-base/Fonts/Roboto.ttf'),
			Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
			...Ionicons.font
		});
		this.setState({ isReady: true });
		if (store.getState().usuariosReducer.token) {
			this.setState({ showSlides: false });
		}
	}

	_renderItem = ({ item }: { item: Item }) => {
		return (
			<ImageBackground
				style={{ flex: 1, width: screenWidth }}
				/* source={item.image} para imagenes del assets */
				source={{ uri: item.img }}
			/>
		);
	};
	_renderDoneButton = () => {
		return (
			<View style={styles.buttonCircle}>
				<Icon name="md-checkmark" style={{fontSize: 20, color: myStyles.light}} />
			</View>
		);
	};
	_renderNextButton = () => {
		return (
			<View style={styles.buttonCircle}>
				<Icon name="arrow-forward" type="Ionicons" style={{fontSize: 20, color: myStyles.light}} />
			</View>
		);
	};

	_keyExtractor = (item: Item) => item.title;

	_onDone = () => {
		// User finished the introduction. Show real app through
		// navigation or simply by controlling state
		this.setState({ showSlides: false });
	};

	// Load any resources or data that we need prior to rendering the app
	render() {
		if (!this.state.isReady) {
			return <AppLoading />;
		} else {
			if (!this.state.showSlides) {
				return (
					<Provider store={store}>
						<Container style={styles.container}>
							<Root>
								<PersistGate persistor={persistor} loading={null}>
									<MainStackNavigator />
								</PersistGate>
							</Root>
						</Container>
					</Provider>
				);
			} else {
				return (
					<View style={{ flex: 1 }}>
						<StatusBar translucent backgroundColor="transparent" />
						<AppIntroSlider
							keyExtractor={this._keyExtractor}
							renderItem={this._renderItem}
							renderDoneButton={this._renderDoneButton}
							data={slides}
							renderNextButton={this._renderNextButton}
							onDone={this._onDone}
						/>
					</View>
				);
			}
		}
	}
}

export default App;
