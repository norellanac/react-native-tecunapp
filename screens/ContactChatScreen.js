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
import { screenHeight, apiUrl, screenWidth } from '../App';
import { withNavigation } from 'react-navigation';
import Loading from './../components/Loading';

class ContactChatScreen extends Component {
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
		if (this.props.contactsReducer.favorites.whatsapp) {
			//console.log("posts: ", this.props.postReducer.posts);
			return this.props.contactsReducer.favorites.whatsapp.map((record) => (
				<ListItem
                key={record.id}
					thumbnail
					onPress={() => Linking.openURL(`https://api.whatsapp.com/send?phone=${record.mobile_one}&text=`)}
				>
					<Left>
						<Thumbnail
							square
							style={{ backgroundColor: 'transparent' }}
							source={{ uri: `${apiUrl.link}/img/whatsapp.png` }}
						/>
					</Left>
					<Body>
						<Text>{record.name}</Text>
						<Text note>{record.description}</Text>
					</Body>
					<Right>
						<Icon active name="whatsapp" type="FontAwesome" />
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
					<FooterTabsNavigationIconText navigation={this.props.navigation} />
				</Container>
			);
		}

		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				{this.showError()}
				<Content>
					<Grid style={{ backgroundColor: 'transparent', marginTop: 15 }}>
						<Col style={{ alignItems: 'center' }}>
							<Text
								style={{
									fontSize: 30,
									color: '#3490dc',
									fontWeight: 'bold'
								}}
							>
								Whatsapp
							</Text>
						</Col>
					</Grid>

					<View style={{ marginTop: 20 }} />
					{this.loadContent()}
				</Content>
				<FooterTabsNavigationIconText navigation={this.props.navigation} />
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

export default withNavigation(connect(mapStateToProps, mapDispatchProps)(ContactChatScreen));
