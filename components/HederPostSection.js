import React from 'react';
import { View, Image, StyleSheet, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { Text, Header, Left, Body, Right, Button, Icon, Title } from 'native-base';
import Constants from 'expo-constants';

function HederPostSection(props) {
	if (props.screen === 1) {
		return (
			<Header noShadow style={{ backgroundColor: 'transparent' }}>
				<Button
					transparent
					onPress={() => props.navigation.navigate('Home')}
					style={{
						borderBottomColor: '#E87823',
						borderBottomWidth: 2
					}}
				>
					<Text style={{ color: '#E87823' }}>Noticias</Text>
				</Button>
				<Button transparent onPress={() => props.navigation.navigate('PodcastScreen')}>
					<Text style={{ color: '#E87823' }}>Podcast</Text>
				</Button>
				<Button transparent onPress={() => props.navigation.navigate('FlashImagesScreen')}>
					<Text style={{ color: '#E87823' }}>¿Sabías que?</Text>
				</Button>
			</Header>
		);
	}
	if (props.screen === 2) {
		return (
			<Header noShadow style={{ backgroundColor: 'transparent' }}>
				<Button transparent onPress={() => props.navigation.navigate('Home')}>
					<Text style={{ color: '#E87823' }}>Noticias</Text>
				</Button>
				<Button
					transparent
					style={{
						borderBottomColor: '#E87823',
						borderBottomWidth: 2
					}}
					onPress={() => props.navigation.navigate('PodcastScreen')}
				>
					<Text style={{ color: '#E87823' }}>Podcast</Text>
				</Button>
				<Button transparent onPress={() => props.navigation.navigate('FlashImagesScreen')}>
					<Text style={{ color: '#E87823' }}>¿Sabías que?</Text>
				</Button>
			</Header>
		);
	}
	if (props.screen === 3) {
		return (
			<Header noShadow style={{ backgroundColor: 'transparent' }}>
				<Button transparent onPress={() => props.navigation.navigate('Home')}>
					<Text style={{ color: '#E87823' }}>Noticias</Text>
				</Button>
				<Button transparent onPress={() => props.navigation.navigate('PodcastScreen')}>
					<Text style={{ color: '#E87823' }}>Podcast</Text>
				</Button>
				<Button
					transparent
					style={{
						borderBottomColor: '#E87823',
						borderBottomWidth: 2
					}}
					onPress={() => props.navigation.navigate('FlashImagesScreen')}
				>
					<Text style={{ color: '#E87823' }}>¿Sabías que?</Text>
				</Button>
			</Header>
		);
	}
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
