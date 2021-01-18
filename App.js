import * as React from 'react';
import { Platform, Image, StyleSheet, View, Text, SafeAreaView, StatusBar } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';

import { Container, Root, Icon } from 'native-base';
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

import image1 from './assets/images/tecun/logoColor.png';
import image2 from './assets/images/tecun/logoBlanco.png';
import image3 from './assets/images/tecun/logoColor.png';
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
	link: "http://192.168.1.44:3000"
	//link: "http://192.168.1.44:3000"
};
//http://192.168.50.144:3000
//http://172.18.0.3:3000
//redux persisting
/*/*******redux persist storage*****/

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
		width: 40,
		height: 40,
		backgroundColor: 'rgba(255, 255, 255, .2)',
		borderRadius: 20,
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
		title: 'Bienvenido',
		text: 'NUEVA APP TECUN',
		image: image1,
		bg: '#1D578A'
	},
	{
		key: '2',
		title: 'Novedades',
		text: 'Noticias y Podcast',
		image: image2,
		bg: '#E87823'
	},
	{
		key: '3',
		title: 'Ingresa al App',
		text: 'Utiliza tu correo y contraseña para ingresar!',
		image: image3,
		bg: '#181e26'
	}
];

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
			<View
				style={[
					styles.slide,
					{
						backgroundColor: item.bg
					}
				]}
			>
				<Text style={styles.title}>{item.title}</Text>
				<Image source={item.image} style={styles.image} />
				<Text style={styles.text}>{item.text}</Text>
			</View>
		);
	};
	_renderDoneButton = () => {
		return (
			<View style={styles.buttonCircle}>
				<Icon name="md-checkmark" color="rgba(255, 255, 255, .9)" size={24} />
			</View>
		);
	};
	_renderNextButton = () => {
		return (
			<View style={styles.buttonCircle}>
				<Icon name="arrow-forward" type="Ionicons" color="rgba(255, 255, 255, .9)" size={24} />
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
