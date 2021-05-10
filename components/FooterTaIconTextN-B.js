import React, { Component } from 'react';
import { Image } from 'react-native';
import { myStyles } from '../App';
import { View, Footer, FooterTab, Button, Icon, Text } from 'native-base';
class FooterTabsNavigationIconText extends Component {
	constructor(props) {
		super();
	}

	tecunMenu() {
		if (this.props.tab == 2) {
			return <Image source={require('./../assets/images/tecun/tecun2.png')} style={{ height: 50, width: 50 }} />;
		} else {
			return <Image source={require('./../assets/images/tecun/tecun1.png')} style={{ height: 50, width: 50 }} />;
		}
	}

	noticiasMenu() {
		if (this.props.tab == 1) {
			return (
				<Image source={require('./../assets/images/tecun/noticias2.png')} style={{ height: 50, width: 50 }} />
			);
		} else {
			return (
				<Image source={require('./../assets/images/tecun/noticias1.png')} style={{ height: 50, width: 50 }} />
			);
		}
	}

	juegosMenu() {
		if (this.props.tab == 3) {
			return <Image source={require('./../assets/images/tecun/juegos2.png')} style={{ height: 50, width: 50 }} />;
		} else {
			return <Image source={require('./../assets/images/tecun/juegos1.png')} style={{ height: 50, width: 50 }} />;
		}
	}

	render() {
		//const { navigation } = this.props.navigation
		//console.log("footer: ", this.props);

		return (
			<View>
				<Footer>
					<FooterTab style={{ backgroundColor: myStyles.light }}>
						<Button vertical onPress={() => this.props.navigation.navigate('Home')}>
							{this.noticiasMenu()}
						</Button>
						<Button vertical onPress={() => this.props.navigation.navigate('TeamScreen')}>
							{this.tecunMenu()}
						</Button>
						<Button vertical onPress={() => this.props.navigation.navigate('GamesScreen')}>
							{this.juegosMenu()}
						</Button>
					</FooterTab>
				</Footer>
			</View>
		);
	}
}

export default FooterTabsNavigationIconText;
