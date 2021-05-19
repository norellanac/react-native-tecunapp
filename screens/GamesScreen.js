import React, { Component } from 'react';
import { Dimensions, Image, TouchableOpacity, ImageBackground } from 'react-native';
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
	List,
	View
} from 'native-base';
import { connect } from 'react-redux';
import * as loginActions from '../src/actions/loginActions';
import * as questionActions from '../src/actions/questionActions';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from '../components/HeaderCustom';
import { persistor, myStyles } from '../App';
import Loading from './../components/Loading';
import { SliderBox } from 'react-native-image-slider-box';
import { apiUrl, screenWidth, screenHeight } from '../App';

class GamesScreen extends Component {
	constructor() {
		super();
	}
	state = {
		search: '',
		isDisplay: 0,
		pathImage: apiUrl.link + '/img/game/'
	};

	async componentDidMount() {
		await this.props.topScoreAction(this.props.usuariosReducer.token);
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
								<Text style={{ color: myStyles.light }}>{pounts.user.name}</Text>
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

	bestPlayers() {
		//console.log("Que viene en el score?: ",this.state.isDisplay);
		let count = 0;
		let possitionArray = { 1: 'numeric-1', 2: 'numeric-2', 3: 'numeric-3', 4: 'numeric-4', 5: 'numeric-5' };
		if (this.state.isDisplay == 1 && this.props.questionReducer.score) {
			return (
				<Grid>
					<Col size={4} style={{ alignItems: 'center' }}>
						<ImageBackground
							style={{ flex: 1, width: screenWidth - 110, height: screenWidth / 2 + 50 }}
							source={{ uri: apiUrl.link + '/img/app/' + 'juegos-4.png' }}
						>
							<View>
								<Grid style={{ marginTop: 160, marginLeft: 25 }}>
									<Col>
										<Text
											style={{
												color: myStyles.light,
												textAlign: 'center',
												marginLeft: -35
											}}
										>
											{this.props.questionReducer.score[1].user.name.split(' ', 1)}
										</Text>
										<Text
											style={{
												color: myStyles.light,
												textAlign: 'center',
												marginLeft: -35
											}}
										>
											{this.props.questionReducer.score[1].user.lastname.split(' ', 1)}
										</Text>
										<Badge success>
											<Text> {this.props.questionReducer.score[1].points } </Text>
										</Badge>
									</Col>
									<Col>
										<Text
											style={{
												color: myStyles.light,
												textAlign: 'center',
												marginLeft: -35
											}}
										>
											{this.props.questionReducer.score[0].user.name.split(' ', 1)}
										</Text>
										<Text
											style={{
												color: myStyles.light,
												textAlign: 'center',
												marginLeft: -35
											}}
										>
											{this.props.questionReducer.score[0].user.lastname.split(' ', 1)}
										</Text>
										<Badge warning>
											<Text> {this.props.questionReducer.score[0].points} </Text>
										</Badge>
									</Col>
									<Col>
										<Text
											style={{
												color: myStyles.light,
												textAlign: 'center',
												marginLeft: -35
											}}
										>
											{this.props.questionReducer.score[2].user.name.split(' ', 1)}
										</Text>
										<Text
											style={{
												color: myStyles.light,
												textAlign: 'center',
												marginLeft: -35
											}}
										>
											{this.props.questionReducer.score[2].user.lastname.split(' ', 1)}
										</Text>

										<Badge danger>
											<Text> {this.props.questionReducer.score[2].points } </Text>
										</Badge>
									</Col>
								</Grid>
							</View>

							{/* <View>
							<ListItem noBorder>
								<Left>
									<Badge primary>
										<Text> {this.props.questionReducer.score[0].points} </Text>
									</Badge>
								</Left>
								<Body>
									<Badge primary>
										<Text> primary </Text>
									</Badge>
								</Body>
								<Right>
									<Badge primary>
										<Text> primary </Text>
									</Badge>
								</Right>
							</ListItem>
						</View> */}
						</ImageBackground>
					</Col>
				</Grid>
			);
		}
	}

	async onValueChance() {
		await this.props.topScoreAction(this.props.usuariosReducer.token);
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
		//console.log('====================================');
		//console.log(this.props.questionReducer.score[0]);
		//console.log('====================================');
		//const { navigation } = this.props.navigation

		if (this.props.questionReducer.cargando && !this.props.questionReducer) {
			return (
				<Container>
					<HeaderCustom navigation={this.props.navigation} />
					<Loading />
					<FooterTabsNavigationIconText navigation={this.props.navigation} tab={3} />
				</Container>
			);
		}

		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				<Content>
					<Image
						source={{ uri: apiUrl.link + '/img/app/' + 'bjuegos.png' }}
						style={{
							width: screenWidth,
							minHeight: screenHeight / 10,
							height: screenHeight / 4
						}}
					/>
					<Card
						style={{
							borderRadius: 10,
							marginVertical: 10,
							marginLeft: 10,
							marginRight: 10,
							marginBottom: 25,
							shadowColor: '#000',
							shadowOffset: {
								width: 0,
								height: 4
							},
							shadowOpacity: 0.32,
							shadowRadius: 5.46,

							elevation: 9
						}}
					>
						<Grid style={{ marginVertical: 20 }}>
							<Col size={4} style={{ alignItems: 'center' }}>
								<CardItem cardBody>
									<Grid style={{ marginTop: 5 }}>
										<Col size={4} style={{ alignItems: 'center' }}>
											<Image
												source={{ uri: apiUrl.link + '/img/app/' + 'juegos-1.png' }}
												style={{ width: screenWidth / 2, height: screenWidth / 3 }}
											/>
											<Button
												onPress={() => this.oneQuestion()}
												style={{
													width: screenWidth / 3,
													borderRadius: 10,
													alignSelf: 'center',
													backgroundColor: myStyles.bg2,
													justifyContent: 'center'
												}}
											>
												<Text
													style={{
														color: myStyles.light,
														textAlign: 'center',
														fontWeight: 'bold',
														fontSize: 20
													}}
												>
													Trivia
												</Text>
											</Button>
										</Col>
									</Grid>
								</CardItem>
							</Col>
						</Grid>
					</Card>

					<Card
						style={{
							borderRadius: 10,
							marginVertical: 10,
							marginLeft: 10,
							marginRight: 10,
							marginBottom: 25,
							shadowColor: '#000',
							shadowOffset: {
								width: 0,
								height: 4
							},
							shadowOpacity: 0.32,
							shadowRadius: 5.46,

							elevation: 9
						}}
					>
						<Grid style={{ marginVertical: 20 }}>
							<Col size={2} style={{ alignItems: 'center' }}>
								<Grid style={{ marginTop: 20 }}>
									<Col size={4} style={{ alignItems: 'center' }}>
										<TouchableOpacity
											onPress={() => {
												this.onValueChance();
											}}
										>
											<Image
												source={{ uri: apiUrl.link + '/img/app/' + 'juegos-2.png' }}
												style={{ width: screenWidth / 3, height: screenWidth / 3 }}
											/>
										</TouchableOpacity>
									</Col>
								</Grid>
							</Col>
							<Col size={2} style={{ alignItems: 'center' }}>
								<Button
									iconLeft
									info
									onPress={() => {
										this.onValueChance();
									}}
									style={{
										width: screenWidth / 3,
										borderRadius: 10,
										alignSelf: 'center',
										justifyContent: 'center',
										marginTop: 90
									}}
								>
									<Icon type="Entypo" name="star" style={{ marginLeft: 13, color: '#ffffff' }} />
									<Text
										style={{
											color: myStyles.light,
											textAlign: 'center',
											fontWeight: 'bold',
											fontSize: 20
										}}
									>
										TOP 3
									</Text>
								</Button>
							</Col>
						</Grid>
						{this.bestPlayers()}
					</Card>
				</Content>
				<FooterTabsNavigationIconText navigation={this.props.navigation} tab={3} />
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
