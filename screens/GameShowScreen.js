import React, { Component } from 'react';
import { Dimensions, Image, Alert } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Container, Content, Body, Thumbnail, Icon, Text, CardItem, Card, Button } from 'native-base';
import { connect } from 'react-redux';
import * as questionActions from '../src/actions/questionActions';
import * as loginActions from '../src/actions/loginActions';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from '../components/HeaderCustom';
import { persistor } from '../App';
import { withNavigation } from 'react-navigation';
import Loading from './../components/Loading';
import { SliderBox } from 'react-native-image-slider-box';
import { apiUrl } from '../App';

class GameShowScreen extends Component {
	constructor() {
		super();
	}

	state = {
		pathImage: apiUrl.link + '/storage/questions/',
		token: '',
		userID: '',
		count: 0
	};

	logout = async () => {
		//await this.props.logoutUser();
		console.log('borró usuario');
		//await this.props.resetAddress();
		await persistor.purge();
		this.props.navigation.navigate('Login');
		console.log('borró direccion');
	};

	async componentDidMount() {
		this.state.count++;
		console.log('Como va CountDidMount?: ', this.state.count);
	}

	textQuestion() {
		if (this.props.questionReducer.question == undefined) {
			return (
				<Container>
					<HeaderCustom navigation={this.props.navigation} />
					<Loading />
					<FooterTabsNavigationIconText navigation={this.props.navigation} />
				</Container>
			);
		}

		return this.props.questionReducer.question.map((trivia) => <Text>{trivia.description}</Text>);
	}

	answerQuestion(question_id, flag) {
		this.state.token = this.props.usuariosReducer.token;
		this.state.userID = this.props.usuariosReducer.user.id;
		let answerObject = { item: 1, questionID: question_id, flag: flag, user_id: this.state.userID };

		//console.log("Que tiene el answerObject: ",answerObject);

		if (this.props.questionReducer.status != 'F' || this.props.questionReducer.status != '') {
			this.props.answerQuestion(answerObject, this.state.token);

			if (this.props.questionReducer.cargando) {
				<Loading />;
			}

			this.props.oneQuestion(this.state.token);
		}
	}

	forceExit(status) {
		if (status === 'F') {
			Alert.alert(
				'Resultados',
				`Has respondido correctamente ${this.props.questionReducer.info.questionTrue} preguntas de 3`,
				[
					{ text: 'OK', onPress: () => console.log('OK Pressed') }
				],
				{ cancelable: false }
			);

			//alert(`${this.props.questionReducer.info.questionTrue} correctas de 3`);
			this.props.questionReducer.status = '';
			this.props.oneQuestion(this.state.token);
			this.props.allScoreUser(this.props.usuariosReducer.token);
			this.props.navigation.navigate('GamesScreen');
		}
	}

	render() {
		var screenWidth = Dimensions.get('window').width - 1;
		var hg = Dimensions.get('window').width - 150;

		{
			this.forceExit(this.props.questionReducer.status);
		}

		if (this.props.questionReducer.cargando || this.props.questionReducer.answerArray == undefined) {
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
					<CardItem style={{ backgroundColor: '#181e26' }}>
						<Body>
							<Image
								source={require('../assets/images/robot-dev.png')}
								style={{ width: screenWidth - 20, height: 150 }}
							/>
						</Body>
					</CardItem>
					<CardItem>
						<Body>{this.textQuestion()}</Body>
					</CardItem>

					<Card transparent>
						{(() => {
							if (this.props.questionReducer.answer1 == undefined) {
								return (
									<Container>
										<HeaderCustom navigation={this.props.navigation} />
										<Loading />
										<FooterTabsNavigationIconText navigation={this.props.navigation} />
									</Container>
								);
							} else {
								return (
									<Button
										transparent
										vertical
										onPress={() =>
											this.answerQuestion(
												this.props.questionReducer.answer1.question_id,
												this.props.questionReducer.answer1.flag
											)}
									>
										<CardItem style={{ marginTop: 0 }}>
											<Grid
												style={{
													backgroundColor: '#F8FAFB',
													borderBottomLeftRadius: 5,
													borderTopLeftRadius: 5,
													borderBottomRightRadius: 5,
													borderTopRightRadius: 5
												}}
											>
												<Col
													size={1}
													style={{
														marginTop: 15,
														marginBottom: 15,
														justifyContent: 'center'
													}}
												>
													<Icon
														type="FontAwesome"
														name="question-circle"
														style={{ marginLeft: 15, color: '#1c5988' }}
													/>
												</Col>
												<Col size={3} style={{ marginTop: 15, marginBottom: 15 }}>
													<Text>{this.props.questionReducer.answer1.reply}</Text>
												</Col>
											</Grid>
										</CardItem>
									</Button>
								);
							}
						})()}

						{(() => {
							if (this.props.questionReducer.answer2 == undefined) {
								return (
									<Container>
										<HeaderCustom navigation={this.props.navigation} />
										<Loading />
										<FooterTabsNavigationIconText navigation={this.props.navigation} />
									</Container>
								);
							} else {
								return (
									<Button
										transparent
										vertical
										onPress={() =>
											this.answerQuestion(
												this.props.questionReducer.answer2.question_id,
												this.props.questionReducer.answer2.flag
											)}
									>
										<CardItem style={{ marginTop: 0 }}>
											<Grid
												style={{
													backgroundColor: '#F8FAFB',
													borderBottomLeftRadius: 5,
													borderTopLeftRadius: 5,
													borderBottomRightRadius: 5,
													borderTopRightRadius: 5
												}}
											>
												<Col
													size={1}
													style={{
														marginTop: 15,
														marginBottom: 15,
														justifyContent: 'center'
													}}
												>
													<Icon
														type="FontAwesome"
														name="question-circle"
														style={{ marginLeft: 15, color: '#1c5988' }}
													/>
												</Col>
												<Col size={3} style={{ marginTop: 15, marginBottom: 15 }}>
													<Text>{this.props.questionReducer.answer2.reply}</Text>
												</Col>
											</Grid>
										</CardItem>
									</Button>
								);
							}
						})()}

						{(() => {
							if (this.props.questionReducer.answerArray[0] != undefined) {
								return (
									<Button
										transparent
										vertical
										onPress={() =>
											this.answerQuestion(
												this.props.questionReducer.answerArray[0].question_id,
												this.props.questionReducer.answerArray[0].flag
											)}
									>
										<CardItem>
											<Grid
												style={{
													backgroundColor: '#F8FAFB',
													borderBottomLeftRadius: 5,
													borderTopLeftRadius: 5,
													borderBottomRightRadius: 5,
													borderTopRightRadius: 5
												}}
											>
												<Col
													size={1}
													style={{
														marginTop: 15,
														marginBottom: 15,
														justifyContent: 'center'
													}}
												>
													<Icon
														type="FontAwesome"
														name="question-circle"
														style={{ marginLeft: 15, color: '#1c5988' }}
													/>
												</Col>
												<Col size={3} style={{ marginTop: 15, marginBottom: 15 }}>
													<Text>{this.props.questionReducer.answerArray[0].reply}</Text>
												</Col>
											</Grid>
										</CardItem>
									</Button>
								);
							}
						})()}

						{(() => {
							if (this.props.questionReducer.answerArray[1] != undefined) {
								return (
									<Button
										transparent
										vertical
										onPress={() =>
											this.answerQuestion(
												this.props.questionReducer.answerArray[1].question_id,
												this.props.questionReducer.answerArray[1].flag
											)}
									>
										<CardItem>
											<Grid
												style={{
													backgroundColor: '#F8FAFB',
													borderBottomLeftRadius: 5,
													borderTopLeftRadius: 5,
													borderBottomRightRadius: 5,
													borderTopRightRadius: 5
												}}
											>
												<Col
													size={1}
													style={{
														marginTop: 15,
														marginBottom: 15,
														justifyContent: 'center'
													}}
												>
													<Icon
														type="FontAwesome"
														name="question-circle"
														style={{ marginLeft: 15, color: '#1c5988' }}
													/>
												</Col>
												<Col size={3} style={{ marginTop: 15, marginBottom: 15 }}>
													<Text>{this.props.questionReducer.answerArray[1].reply}</Text>
												</Col>
											</Grid>
										</CardItem>
									</Button>
								);
							}
						})()}

						{(() => {
							if (this.props.questionReducer.answerArray[2] != undefined) {
								return (
									<Button
										transparent
										vertical
										onPress={() =>
											this.answerQuestion(
												this.props.questionReducer.answerArray[2].question_id,
												this.props.questionReducer.answerArray[2].flag
											)}
									>
										<CardItem>
											<Grid
												style={{
													backgroundColor: '#F8FAFB',
													borderBottomLeftRadius: 5,
													borderTopLeftRadius: 5,
													borderBottomRightRadius: 5,
													borderTopRightRadius: 5
												}}
											>
												<Col
													size={1}
													style={{
														marginTop: 15,
														marginBottom: 15,
														justifyContent: 'center'
													}}
												>
													<Icon
														type="FontAwesome"
														name="question-circle"
														style={{ marginLeft: 15, color: '#1c5988' }}
													/>
												</Col>
												<Col size={3} style={{ marginTop: 15, marginBottom: 15 }}>
													<Text>{this.props.questionReducer.answerArray[2].reply}</Text>
												</Col>
											</Grid>
										</CardItem>
									</Button>
								);
							}
						})()}

						{(() => {
							if (this.props.questionReducer.answerArray[3] != undefined) {
								return (
									<Button
										transparent
										vertical
										onPress={() =>
											this.answerQuestion(
												this.props.questionReducer.answerArray[3].question_id,
												this.props.questionReducer.answerArray[3].flag
											)}
									>
										<CardItem>
											<Grid
												style={{
													backgroundColor: '#F8FAFB',
													borderBottomLeftRadius: 5,
													borderTopLeftRadius: 5,
													borderBottomRightRadius: 5,
													borderTopRightRadius: 5
												}}
											>
												<Col
													size={1}
													style={{
														marginTop: 15,
														marginBottom: 15,
														justifyContent: 'center'
													}}
												>
													<Icon
														type="FontAwesome"
														name="question-circle"
														style={{ marginLeft: 15, color: '#1c5988' }}
													/>
												</Col>
												<Col size={3} style={{ marginTop: 15, marginBottom: 15 }}>
													<Text>{this.props.questionReducer.answerArray[3].reply}</Text>
												</Col>
											</Grid>
										</CardItem>
									</Button>
								);
							}
						})()}

						{(() => {
							if (this.props.questionReducer.answerArray[4] != undefined) {
								return (
									<Button
										transparent
										vertical
										onPress={() =>
											this.answerQuestion(
												this.props.questionReducer.answerArray[4].question_id,
												this.props.questionReducer.answerArray[4].flag
											)}
									>
										<CardItem>
											<Grid
												style={{
													backgroundColor: '#F8FAFB',
													borderBottomLeftRadius: 5,
													borderTopLeftRadius: 5,
													borderBottomRightRadius: 5,
													borderTopRightRadius: 5
												}}
											>
												<Col
													size={1}
													style={{
														marginTop: 15,
														marginBottom: 15,
														justifyContent: 'center'
													}}
												>
													<Icon
														type="FontAwesome"
														name="question-circle"
														style={{ marginLeft: 15, color: '#1c5988' }}
													/>
												</Col>
												<Col size={3} style={{ marginTop: 15, marginBottom: 15 }}>
													<Text>{this.props.questionReducer.answerArray[4].reply}</Text>
												</Col>
											</Grid>
										</CardItem>
									</Button>
								);
							}
						})()}
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

export default withNavigation(connect(mapStateToProps, mapDispatchProps)(GameShowScreen));
