import React, { Component } from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import {
	Container,
	Content,
	CardItem,
	Fab,
	Text,
	Card,
	Button,
	ListItem,
	Left,
	Body,
	Right,
	Badge,
	Icon,
	View
} from 'native-base';
import { connect } from 'react-redux';
import * as loginActions from '../src/actions/loginActions';
import * as questionActions from '../src/actions/questionActions';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from '../components/HeaderCustom';
import { persistor } from '../App';
import Loading from './../components/Loading';
import { SliderBox } from 'react-native-image-slider-box';
import { apiUrl } from '../App';

class GamesScreen extends Component {
	constructor() {
		super();
	}
	state = {
		search: '',
		isDisplay: 0,
		pathImage: apiUrl.link + '/img/game/'
	};

	componentDidMount() {
		this.props.allScoreUser(this.props.usuariosReducer.token);
		console.log('Como viene el path: ', this.state.pathImage);
	}

	oneQuestion() {
		this.props.oneQuestion(this.props.usuariosReducer.token);
		this.props.navigation.navigate('GameShowScreen');
	}

	allScoreTitle() {
		if (this.state.isDisplay == 1 && this.props.questionReducer.score) {
			return (
				<Grid
					style={{
						backgroundColor: '#F8FAFB',
						borderBottomLeftRadius: 5,
						borderTopLeftRadius: 5,
						borderBottomRightRadius: 5,
						borderTopRightRadius: 5,
						marginTop: 15
					}}
				>
					<Col
						size={1}
						style={{
							marginTop: 5,
							marginBottom: 5,
							justifyContent: 'center',
							marginLeft: 15
						}}
					>
						<Text>#</Text>
					</Col>
					<Col size={3} style={{ marginTop: 5, marginBottom: 5 }}>
						<Text>Nombre</Text>
					</Col>
					<Col size={1} style={{ marginTop: 5, marginBottom: 5, marginLeft: 15 }}>
						<Text>Puntos</Text>
					</Col>
				</Grid>
			);
		}
	}

	allScore() {
		//console.log("Que viene en el score?: ",this.state.isDisplay);
		let count = 0;
		let possitionArray = { 1: 'numeric-1', 2: 'numeric-2', 3: 'numeric-3', 4: 'numeric-4', 5: 'numeric-5' };
		if (this.state.isDisplay == 1 && this.props.questionReducer.score) {
			return this.props.questionReducer.score.map(
				(pounts) => (
					count++,
					(
						<Grid
							style={{
								borderBottomLeftRadius: 5,
								borderTopLeftRadius: 5,
								borderBottomRightRadius: 5,
								borderTopRightRadius: 5
							}}
							key={pounts.id}
						>
							<Col
								size={1}
								style={{
									marginTop: 5,
									marginBottom: 5,
									justifyContent: 'center',
									marginLeft: 5
								}}
							>
								<Badge success>
									<Text>{count}</Text>
								</Badge>
							</Col>
							<Col size={3} style={{ marginTop: 5, marginBottom: 5 }}>
								<Text>
									{pounts.user.name} {pounts.user.lastname}
								</Text>
							</Col>
							<Col size={1} style={{ marginTop: 5, marginBottom: 5, marginLeft: 15 }}>
								<Badge primary>
									<Text>{pounts.points}</Text>
								</Badge>
							</Col>
						</Grid>
					)
				)
			);
		}
	}

	onValueChance() {
		if (this.state.isDisplay == 1) {
			this.setState({
				isDisplay: 0
			});
		} else {
			this.setState({
				isDisplay: 1
			});
		}
	}

	render() {
		//const { navigation } = this.props.navigation
		var screenWidth = Dimensions.get('window').width;
		var screenHeight = Dimensions.get('window').height;

		//console.log("Como viene el state2 en el render? ", this.state.isDisplay);
		//console.log("Como viene el state2 en el render? ", this.state.isDisplay2);

		if (this.props.questionReducer.cargando && !this.props.questionReducer) {
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
				<Content>
					<Card transparent>
						<CardItem cardBody>
							<Grid style={{ marginTop: 5 }}>
								<Col size={4} style={{ alignItems: 'center' }}>
									<CardItem cardBody>
										<Grid style={{ marginTop: 20 }}>
											<Col size={4} style={{ alignItems: 'center' }}>
												<TouchableOpacity
													onPress={() => {
														this.onValueChance();
													}}
												>
													<Image
														source={{ uri: this.state.pathImage + 'trophy.png' }}
														style={{ width: screenWidth / 3, height: screenWidth / 3 }}
													/>
												</TouchableOpacity>
												{this.allScoreTitle()}
												{this.allScore()}
											</Col>
										</Grid>
									</CardItem>
								</Col>
							</Grid>
						</CardItem>
						<CardItem cardBody>
							<Grid style={{ marginTop: 10 }}>
								<Col size={4} style={{ alignItems: 'center' }}>
									<CardItem cardBody>
										<Grid style={{ marginTop: 50 }}>
											<Col size={4} style={{ alignItems: 'center' }}>
												<Image
													source={{ uri: this.state.pathImage + 'trivia.png' }}
													style={{ width: screenWidth / 2, height: screenHeight / 4 }}
												/>
												<Button
													onPress={() => this.oneQuestion()}
													style={{
														width: screenWidth / 3,
														height: screenHeight / 13,
														borderRadius: 10,
														alignSelf: 'center'
													}}
												>
													<Icon
														type="Entypo"
														name="game-controller"
														style={{ marginLeft: 13, color: '#ffffff' }}
													/>
													<Text style={{ color: '#ffffff', marginRight: 15 }}>Jugar</Text>
												</Button>
											</Col>
										</Grid>
									</CardItem>
								</Col>
							</Grid>
						</CardItem>
					</Card>
				</Content>
				<FooterTabsNavigationIconText navigation={this.props.navigation} />
			</Container>
		);
	}
}

const mapStateToProps = ({ questionReducer, usuariosReducer }) => {
	return { questionReducer, usuariosReducer };
};

const mapDispatchProps = {
	...questionActions,
	...loginActions
};

export default connect(mapStateToProps, mapDispatchProps)(GamesScreen);
