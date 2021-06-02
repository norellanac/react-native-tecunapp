import React from 'react';
import { Linking, BackHandler, TouchableOpacity, Image, Alert, Pressable, TouchableHighlight } from "react-native";
import { connect } from 'react-redux';
import { Text, Header, Left, Body, Right, Thumbnail, Button, Icon, View, Badge } from 'native-base';
import Constants from 'expo-constants';
import { logoutUser } from '../src/actions/loginActions';
import { persistor, myStyles, apiUrl, screenHeight, screenWidth } from '../App';

function HeaderOnlyProfile(props) {
	/* logout = async () => {
		//await this.props.logoutUser();
		console.log('borró usuario');
		//await this.props.resetAddress();
		await persistor.purge();
		props.navigation.navigate('Login');
		console.log('borró direccion');
	}; */

	exitApp = () => {
		Alert.alert(
			'Salir',
			'Cerrar aplicación',
			[
				{
					text: 'No',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				},
				{ text: 'Si', onPress: () => BackHandler.exitApp() }
			],
			{ cancelable: false }
		);
	};

	handleGoBack = () => {
		if (props.navigation.canGoBack()) {
			props.navigation.goBack();
		} else {
			exitApp();
		}
	};
	return (
		<Header style={{ backgroundColor: '#2c95c6' }}>
			<Left>
				<TouchableOpacity
					onPress={() => handleGoBack()}
				>
					<View style={{ backgroundColor: myStyles.light, borderRadius: 60, marginLeft: 10, padding: 3 }}>
						<Icon style={{ color: myStyles.bg2 }} name="arrow-back" />
					</View>
				</TouchableOpacity>
			</Left>
			<Right style={{alignItems: 'flex-start' }}>
				<TouchableOpacity transparent style={{ marginTop: 6 }} onPress={() => props.navigation.navigate('SettingsScreen')}>
					<Text uppercase={false} style={{ color: myStyles.light }}>
						Hola{' '}
						<Text uppercase={false} style={{ color: myStyles.light, fontWeight: 'bold', marginLeft: -10 }}>
							{props.usuariosReducer.user.name}
						</Text>
					</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => props.navigation.navigate('SettingsScreen')}>
					<View
						style={{
							backgroundColor: myStyles.light,
							borderRadius: 60,
							marginLeft: 10,
							alignSelf: 'center',
							alignItems: 'center',
							height: 35,
							width: 35
						}}
					>
						{(() => {
							if (props.usuariosReducer.user.url_image != null) {
								return(
									<Image
										source={{ uri: `${apiUrl.link}/img/${props.usuariosReducer.user.url_image}` }}
										style={{
											borderRadius: 60,
											height: 35,
											width: 35
										}}
									/>
								);
							} else {
								return(
									<Icon
										style={{ color: myStyles.bg1, fontSize: 25, marginLeft: 8, paddingVertical: 5 }}
										name="user"
										type="FontAwesome"
									/>
								);
							}
						})()}
					</View>
				</TouchableOpacity>
			</Right>
		</Header>
	);
}

const MapStateToProps = ({ usuariosReducer }) => {
	return {
		usuariosReducer
	};
};

export default connect(MapStateToProps)(HeaderOnlyProfile);
