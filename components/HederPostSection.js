import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Text, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import Constants from 'expo-constants';
import { myStyles } from '../App';

function HederPostSection(props) {
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
		<Header noShadow style={{ backgroundColor: myStyles.bg1 }}>
			<Left>
				<TouchableOpacity onPress={() => handleGoBack()}>
					<View style={{ backgroundColor: myStyles.light, borderRadius: 60, marginLeft: 0, padding: 3 }}>
						<Icon style={{ color: myStyles.bg2 }} name="arrow-back" />
					</View>
				</TouchableOpacity>
			</Left>
			<Right>
				<TouchableOpacity
					transparent
					onPress={() => props.navigation.navigate('Home')}
					style={{
						borderBottomColor: props.screen == 1 ? myStyles.bg2 : 'transparent',
						borderBottomWidth: 2
					}}
				>
					<Text
						style={{ color: myStyles.light, margin: 10, fontWeight: props.screen == 1 ? 'bold' : 'normal' }}
					>
						TECUento{' '}
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						borderBottomColor: props.screen == 2 ? myStyles.bg2 : 'transparent',
						borderBottomWidth: 2
					}}
					onPress={() => props.navigation.navigate('PodcastScreen')}
				>
					<Text
						style={{ color: myStyles.light, margin: 10, fontWeight: props.screen == 2 ? 'bold' : 'normal' }}
					>
						Podcast
					</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={{
						borderBottomColor: props.screen == 3 ? myStyles.bg2 : 'transparent',
						borderBottomWidth: 2
					}}
					onPress={() => props.navigation.navigate('FlashImagesScreen')}
				>
					<Text
						style={{ color: myStyles.light, margin: 10, fontWeight: props.screen == 3 ? 'bold' : 'normal' }}
					>
						Actualizate
					</Text>
				</TouchableOpacity>
			</Right>
		</Header>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: 15,
		paddingBottom: 8,
		elevation: 2
	},
	iconContainer: {
		flexDirection: 'row'
	},
	logo: {
		width: 41,
		height: 35,
		resizeMode: 'contain'
	},
	textPoints: {
		fontSize: 20,
		color: '#EC4C17',
		fontWeight: 'bold',
		paddingVertical: 5
	},
	statusBar: {
		height: Constants.statusBarHeight
	}
});

const MapStateToProps = ({ usuariosReducer }) => {
	return {
		usuariosReducer
	};
};

export default connect(MapStateToProps)(HederPostSection);
