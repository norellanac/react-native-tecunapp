import React, { Component, useEffect } from 'react';
import { Dimensions, Linking, Image, TouchableOpacity } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import {
	Container,
	Content,
	Spinner,
	Item,
	Icon,
	Text,
	Thumbnail,
	View,
	CardItem,
	Body,
	Card,
	Button,
	ListItem,
	Left,
	Right
} from 'native-base';
import { connect } from 'react-redux';
import * as loginActions from '../src/actions/loginActions';
import * as contactsActions from '../src/actions/contactsActions';
import * as userActions from '../src/actions/userActions';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from '../components/HeaderCustom';
import { screenHeight, apiUrl, screenWidth, myStyles } from '../App';
import { withNavigation } from 'react-navigation';
import Loading from './../components/Loading';

class ContactCallScreen extends Component {
	constructor() {
		super();
	}
	state = {
		isShowAlert: true,
		pathImage: apiUrl.link + '/img/'
	};

	showError = () => {
		if (this.props.contactsReducer.error && this.state.isShowAlert) {
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
									fontSize: 15,
									fontWeight: 'bold',
									color: '#fff'
								}}
							>
								{this.props.contactsReducer.error}
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

	loadContent = () => {
		var screenWidth = Dimensions.get('window').width;
		var screenHeight = Dimensions.get('window').height;
		//console.log('====================================');
		//console.log(this.props.contactsReducer);
		//console.log('====================================');
		if (this.props.contactsReducer.favorites) {
			//console.log("posts: ", this.props.postReducer.posts);
			return this.props.contactsReducer.favorites.pbx.map((record) => (
				<ListItem avatar key={record.id} onPress={() => Linking.openURL(`tel:${record.phone_one}`)}>
					<Body style={{ marginLeft: 25 }}>
						<Text
							style={{
								fontSize: 15,
								fontWeight: 'bold',
								color: myStyles.bg1,
								paddingVertical: 8,
							}}
						>
							{record.name}
						</Text>
						<Text note>
							{record.phone_one}
						</Text>
					</Body>
					<Right>
						<Thumbnail
							style={{ backgroundColor: '#000000', marginRight: 25, height: 50, width:50 }}
							source={{ uri: apiUrl.link + '/img/bg/' + 'bg-4.png' }}
						/>
					</Right>
				</ListItem>
			));
		} else {
			return <Spinner color="blue" style={{ flex: 1 }} />;
		}
	};

	async componentDidMount() {
		await this.props.getFavorites(this.props.usuariosReducer.token);
	}

	render() {
		if (this.props.usuariosReducer.cargando) {
			return (
				<Container>
					<HeaderCustom navigation={this.props.navigation} />
					<Loading />
					<FooterTabsNavigationIconText navigation={this.props.navigation} tab={2} />
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

					<View style={{ marginTop: 7 }} />
					{this.loadContent()}
				</Content>
				<FooterTabsNavigationIconText navigation={this.props.navigation} tab={2} />
			</Container>
		);
	}
}

const mapStateToProps = ({ usuariosReducer, loginReducer, contactsReducer }) => {
	return { usuariosReducer, loginReducer, contactsReducer };
};

const mapDispatchProps = {
	...loginActions,
	...userActions,
	...contactsActions
};

export default withNavigation(connect(mapStateToProps, mapDispatchProps)(ContactCallScreen));
