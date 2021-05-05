import React, { Component } from 'react';
import { Dimensions, Image, Alert, ImageBackground, Touchable } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Container, Content, Body, Spinner, Icon, Text, CardItem, Card, Button, View } from 'native-base';
import { connect } from 'react-redux';
import * as questionActions from '../src/actions/questionActions';
import * as loginActions from '../src/actions/loginActions';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from '../components/HeaderCustom';
import { persistor } from '../App';
import { withNavigation } from 'react-navigation';
import Loading from './../components/Loading';
import { SliderBox } from 'react-native-image-slider-box';
import { apiUrl, screenHeight, myStyles } from '../App';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

	async componentDidMount() {
		this.state.count++;
	}

	textQuestion() {
		if (this.props.questionReducer.question == undefined) {
			return <Spinner color="blue" style={{ flex: 1 }} />;
		}

		return this.props.questionReducer.question.map((trivia) => (
			<Text
				style={{
					textAlign: 'center',
					fontSize: 25,
					fontWeight: 'bold',
					color: myStyles.light,
					fontSize: 25
				}}
			>
				{trivia.description}
			</Text>
		));
	}

	answerQuestion(answId, flag) {
		let colorAlert;
		let textShow;
		//console.log("Que tiene el answerObject: ",answerObject);
		if (answId == this.props.questionReducer.correcId.id) {
			colorAlert = 'success';
			textShow = '¡Respuesta correcta! ';
		} else {
			colorAlert = 'danger';
			textShow = 'Error, la respesta es: ';
		}

		this.props.answerQuestionAction(flag, this.props.usuariosReducer.token);
		Alert.alert(
			`${textShow}`,
			this.props.questionReducer.correcId.reply,
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				},
				{ text: 'OK', onPress: () => this.props.oneQuestion(this.props.usuariosReducer.token) }
			],
			{ cancelable: false }
		);
		if (this.props.questionReducer.cargando) {
			<Spinner color="blue" style={{ flex: 1 }} />;
		}
	}

	render() {
		var screenWidth = Dimensions.get('window').width - 1;

		if (this.props.questionReducer.cargando || this.props.questionReducer.answerArray == undefined) {
			return (
				<Container>
					<HeaderCustom navigation={this.props.navigation} />
					<Spinner color="blue" style={{ flex: 1 }} />
					<FooterTabsNavigationIconText navigation={this.props.navigation} tab={1} />
				</Container>
			);
		}

		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				<Image
					source={{ uri: apiUrl.link + '/img/app/' + 'b-trivia.png' }}
					style={{
						width: screenWidth,
						minHeight: screenHeight / 10,
						height: screenHeight / 4
					}}
				/>

				<Content>
					<ImageBackground
						style={{ flex: 1, width: screenWidth + 2 }}
						source={{ uri: apiUrl.link + '/img/app/' + 'b-trivia1.png' }}
					>
						<View transparent>
							<Text
								style={{
									textAlign: 'center',
									fontWeight: 'bold',
									color: '#FFBF00',
									paddingTop: 10,
									fontSize: 20
								}}
							>
								PREGUNTA 1:
							</Text>
						</View>
						<CardItem style={{ backgroundColor: 'transparent' }}>
							<Body>{this.textQuestion()}</Body>
						</CardItem>

						<Card transparent>
							{(() => {
								if (this.props.questionReducer.answer1 == undefined) {
									return (
										<Container>
											<HeaderCustom navigation={this.props.navigation} />
											<Spinner color="blue" style={{ flex: 1 }} />
											<FooterTabsNavigationIconText navigation={this.props.navigation} tab={1} />
										</Container>
									);
								} else {
									return (
										<TouchableOpacity
											transparent
											vertical
											onPress={() =>
												this.answerQuestion(
													this.props.questionReducer.answer1.id,
													this.props.questionReducer.answer1.flag
												)}
											style={{
												backgroundColor: myStyles.light,
												marginHorizontal: 30,
												marginVertical: 10,
												borderRadius: 20
											}}
										>
											<Grid>
												<Col
													size={1}
													style={{
														marginTop: 15,
														marginBottom: 15,
														justifyContent: 'center'
													}}
												>
													<Image
														source={{ uri: apiUrl.link + '/img/app/' + 'gamIcon11.png' }}
														style={{
															height: 40,
															width: 40,
															marginHorizontal: 15
														}}
													/>
												</Col>
												<Col
													size={3}
													style={{
														marginTop: 15,
														marginBottom: 15,
														justifyContent: 'center'
													}}
												>
													<Text style={{color: myStyles.bg1}}>{this.props.questionReducer.answer1.reply}</Text>
												</Col>
											</Grid>
										</TouchableOpacity>
									);
								}
							})()}

							{(() => {
								if (this.props.questionReducer.answer2 == undefined) {
									return (
										<Container>
											<HeaderCustom navigation={this.props.navigation} />
											<Loading />
											<FooterTabsNavigationIconText navigation={this.props.navigation} tab={1} />
										</Container>
									);
								} else {
									return (
										<TouchableOpacity
											onPress={() =>
												this.answerQuestion(
													this.props.questionReducer.answer2.id,
													this.props.questionReducer.answer2.flag
												)}
											style={{
												backgroundColor: myStyles.light,
												marginHorizontal: 30,
												marginVertical: 10,
												borderRadius: 20
											}}
										>
											<Grid>
												<Col
													size={1}
													style={{
														marginTop: 15,
														marginBottom: 15,
														justifyContent: 'center'
													}}
												>
													<Image
														source={{ uri: apiUrl.link + '/img/app/' + 'gamIcon12.png' }}
														style={{
															height: 40,
															width: 40,
															marginHorizontal: 15
														}}
													/>
												</Col>
												<Col
													size={3}
													style={{
														marginTop: 15,
														marginBottom: 15,
														justifyContent: 'center'
													}}
												>
													<Text style={{color: myStyles.bg1}}>{this.props.questionReducer.answer2.reply}</Text>
												</Col>
											</Grid>
										</TouchableOpacity>
									);
								}
							})()}

							{(() => {
								if (this.props.questionReducer.answerArray[0] != undefined) {
									return (
										<TouchableOpacity
											transparent
											vertical
											onPress={() =>
												this.answerQuestion(
													this.props.questionReducer.answerArray[0].id,
													this.props.questionReducer.answerArray[0].flag
												)}
											style={{
												backgroundColor: myStyles.light,
												marginHorizontal: 30,
												marginVertical: 10,
												borderRadius: 20
											}}
										>
											<Grid>
												<Col
													size={1}
													style={{
														marginTop: 15,
														marginBottom: 15,
														justifyContent: 'center'
													}}
												>
													<Image
														source={{
															uri: apiUrl.link + '/img/app/' + 'gamIcon13.png'
														}}
														style={{
															height: 40,
															width: 40,
															marginHorizontal: 15
														}}
													/>
												</Col>
												<Col size={3} style={{ marginTop: 15, marginBottom: 15 }}>
													<Text style={{color: myStyles.bg1}}>{this.props.questionReducer.answerArray[0].reply}</Text>
												</Col>
											</Grid>
										</TouchableOpacity>
									);
								}
							})()}

							{(() => {
								if (this.props.questionReducer.answerArray[1] != undefined) {
									return (
										<TouchableOpacity
											onPress={() =>
												this.answerQuestion(
													this.props.questionReducer.answerArray[1].id,
													this.props.questionReducer.answerArray[1].flag
												)}
											style={{
												backgroundColor: myStyles.light,
												marginHorizontal: 30,
												marginVertical: 10,
												borderRadius: 20
											}}
										>
											<Grid>
												<Col
													size={1}
													style={{
														marginTop: 15,
														marginBottom: 15,
														justifyContent: 'center'
													}}
												>
													<Image
														source={{ uri: apiUrl.link + '/img/app/' + 'gamIcon14.png' }}
														style={{
															height: 40,
															width: 40,
															marginHorizontal: 15
														}}
													/>
												</Col>
												<Col
													size={3}
													style={{
														marginTop: 15,
														marginBottom: 15,
														justifyContent: 'center'
													}}
												>
													<Text style={{color: myStyles.bg1}}>{this.props.questionReducer.answerArray[1].reply}</Text>
												</Col>
											</Grid>
										</TouchableOpacity>
									);
								}
							})()}

							{(() => {
								if (this.props.questionReducer.answerArray[2] != undefined) {
									return (
										<TouchableOpacity
											transparent
											vertical
											onPress={() =>
												this.answerQuestion(
													this.props.questionReducer.answerArray[2].id,
													this.props.questionReducer.answerArray[2].flag
												)}
											style={{
												backgroundColor: myStyles.light,
												marginHorizontal: 30,
												marginVertical: 10,
												borderRadius: 20
											}}
										>
											<Grid>
												<Col
													size={1}
													style={{
														marginTop: 15,
														marginBottom: 15,
														justifyContent: 'center'
													}}
												>
													<Image
														source={{ uri: apiUrl.link + '/img/app/' + 'gamIcon14.png' }}
														style={{
															height: 40,
															width: 40,
															marginHorizontal: 15
														}}
													/>
												</Col>
												<Col
													size={3}
													style={{
														marginTop: 15,
														marginBottom: 15,
														justifyContent: 'center'
													}}
												>
													<Text style={{color: myStyles.bg1}}>{this.props.questionReducer.answerArray[2].reply}</Text>
												</Col>
											</Grid>
										</TouchableOpacity>
									);
								}
							})()}

							{(() => {
								if (this.props.questionReducer.answerArray[3] != undefined) {
									return (
										<TouchableOpacity
											transparent
											vertical
											onPress={() =>
												this.answerQuestion(
													this.props.questionReducer.answerArray[3].id,
													this.props.questionReducer.answerArray[3].flag
												)}
											style={{
												backgroundColor: myStyles.light,
												marginHorizontal: 30,
												marginVertical: 10,
												borderRadius: 20
											}}
										>
											<Grid>
												<Col
													size={1}
													style={{
														marginTop: 15,
														marginBottom: 15,
														justifyContent: 'center'
													}}
												>
													<Image
														source={{ uri: apiUrl.link + '/img/app/' + 'gamIcon14.png' }}
														style={{
															height: 40,
															width: 40,
															marginHorizontal: 15
														}}
													/>
												</Col>
												<Col
													size={3}
													style={{
														marginTop: 15,
														marginBottom: 15,
														justifyContent: 'center'
													}}
												>
													<Text style={{color: myStyles.bg1}}>{this.props.questionReducer.answerArray[3].reply}</Text>
												</Col>
											</Grid>
										</TouchableOpacity>
									);
								}
							})()}

							{(() => {
								if (this.props.questionReducer.answerArray[4] != undefined) {
									return (
										<TouchableOpacity
											transparent
											vertical
											onPress={() =>
												this.answerQuestion(
													this.props.questionReducer.answerArray[4].id,
													this.props.questionReducer.answerArray[4].flag
												)}
											style={{
												backgroundColor: myStyles.light,
												marginHorizontal: 30,
												marginVertical: 10,
												borderRadius: 20
											}}
										>
											<Grid>
												<Col
													size={1}
													style={{
														marginTop: 15,
														marginBottom: 15,
														justifyContent: 'center'
													}}
												>
													<Image
														source={{ uri: apiUrl.link + '/img/app/' + 'gamIcon11.png' }}
														style={{
															height: 40,
															width: 40,
															marginHorizontal: 15
														}}
													/>
												</Col>
												<Col
													size={3}
													style={{
														marginTop: 15,
														marginBottom: 15,
														justifyContent: 'center'
													}}
												>
													<Text style={{color: myStyles.bg1}}>{this.props.questionReducer.answerArray[4].reply}</Text>
												</Col>
											</Grid>
										</TouchableOpacity>
									);
								}
							})()}
						</Card>
					</ImageBackground>
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

export default withNavigation(connect(mapStateToProps, mapDispatchProps)(GameShowScreen));
