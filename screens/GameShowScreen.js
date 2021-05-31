import React, { Component } from 'react';
import { Dimensions, Image, Modal, Pressable, StyleSheet, Alert, ImageBackground, Touchable } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Container, Content, Body, Spinner, Icon, Text, CardItem, Card, Button, View, ListItem, Left } from 'native-base';
import { connect } from 'react-redux';
import * as questionActions from '../src/actions/questionActions';
import * as loginActions from '../src/actions/loginActions';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from '../components/HeaderCustom';
import { persistor } from '../App';
import { withNavigation } from 'react-navigation';
import Loading from './../components/Loading';
import { SliderBox } from 'react-native-image-slider-box';
import { apiUrl, screenHeight, myStyles, screenWidth } from '../App';
import { TouchableOpacity } from 'react-native-gesture-handler';

class GameShowScreen extends Component {
	constructor() {
		super();
	}

	state = {
		pathImage: apiUrl.link + '/storage/questions/',
		token: '',
		modalVisible: false,
		userID: '',
		textShow: null,
		count: 0
	};

	styles = StyleSheet.create({
		centeredView: {
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
			backgroundColor: 'rgba(52, 52, 52, 0.8)'
			//backgroundColor: 'white'
		},

		modalViewSendMail: {
			marginTop: 50,
			width: screenWidth - 30,
			height: screenHeight / 5.5,
			//margin: 20,
			backgroundColor: "white",
			borderRadius: 20,
			//padding: 35,
			//backgroundColor: 'black',
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2
			},
			shadowOpacity: 0.25,
			shadowRadius: 4,
			elevation: 5
		},

		modalViewMail: {
			marginTop: 50,
			width: screenWidth - 30,
			height: screenHeight / 5 + 25,
			//margin: 20,
			backgroundColor: "white",
			borderRadius: 20,
			//padding: 35,
			//backgroundColor: 'black',
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2
			},
			shadowOpacity: 0.25,
			shadowRadius: 4,
			elevation: 5
		},

		modalViewText: {
			marginTop: 50,
			width: screenWidth - 80,
			height: screenHeight / 4,
			//margin: 20,
			backgroundColor: "white",
			borderRadius: 20,
			//padding: 35,
			//backgroundColor: 'black',
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2
			},
			shadowOpacity: 0.25,
			shadowRadius: 4,
			elevation: 5
		},

		viewMailAccept: {
			flex: 0,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			//backgroundColor: 'red',
		},

		viewMail:{
			flex: 0,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			//backgroundColor: 'blue',
			marginLeft: -15,
			marginRight: 5
		},

		modalViewButton: {
			marginTop: 50,
			width: screenWidth - 30,
			height: screenHeight / 4,
			//margin: 20,
			backgroundColor: "white",
			borderRadius: 20,
			//padding: 35,
			flexDirection: 'row',
			justifyContent: 'flex-end',
			//backgroundColor: 'black',
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 2
			},
			shadowOpacity: 0.25,
			shadowRadius: 4,
			elevation: 5
		},

		ListCloseMail: {
			//backgroundColor: 'black',
			alignSelf: 'flex-end',
			marginRight: 15,
			marginBottom: 5
			//backgroundColor: 'black'
		},

		ListClose: {
			alignSelf: 'flex-end',
			width: screenWidth / 2 - 90,
		},

		textStyle: {
			color: myStyles.bg1,
			marginRight: 10
		},

		textStyleMail: {
			color: myStyles.bg1,
		},

		modalTextTitle: {
			marginBottom: 15,
			fontSize: 18,
			textAlign: "center",
			marginTop: 20,
			fontWeight: "bold",
			color: myStyles.bg1
		},

		modalTextDescription: {
			marginBottom: 15,
			textAlign: "center",
			color: '#858585'
		},

		ListbodyMail: {
			backgroundColor: 'black'
		},

		ListLeftMail: {
			backgroundColor: 'blue',
			width: 2,
			marginLeft: -100
		},

		ListLeft: {
			marginRight: -15,
			alignItems: 'center'
		},

		buttonIcon: {
			color: myStyles.bg1,
			width: 28,
			marginRight: 5,
		},
  	});

	async componentDidMount() {
		this.state.count++;
	}

	setModalVisibleOnly = (visible) => {
		this.setState({ modalVisible: visible });
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

	closeModalAndRequest() {
		this.setState({ modalVisible: false})
		this.props.oneQuestion(this.props.usuariosReducer.token)
	}

	showModal() {
		if (this.state.textShow != null || this.state.textShow != undefined) {
			return(
				<View style={this.styles.centeredView} key={1}>
					<Modal
						animationType="fade"
						transparent={this.state.modalVisible}
						visible={this.state.modalVisible}
						onRequestClose={() => {
						Alert.alert("Modal has been closed.");
							this.setModalVisibleOnly(false);
						}}
					>
						<View style={this.styles.centeredView}>
							<View style={this.styles.modalViewText}>
								<Text style={this.styles.modalTextTitle}>{this.state.textShow}</Text>
								<Text style={this.styles.modalTextDescription}>
									{this.props.questionReducer.correcId.reply}
								</Text>
								<ListItem key={2} noBorder style={this.styles.ListCloseMail} icon delayPressIn>
									<Pressable onPress={() => this.closeModalAndRequest()}>
										<View style={this.styles.viewMailAccept}>
											<Icon style={this.styles.buttonIcon} name="checkcircleo" type="AntDesign"/>
											<Text style={this.styles.textStyleMail}>Aceptar</Text>
										</View>
									</Pressable>
								</ListItem>
							</View>
						</View>
					</Modal>
				</View>
			);	
		}
	}

	answerQuestion(answId, flag) {console.log
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

		this.setState({ textShow: textShow });
		//console.log("Tendria que entrar solo una vez y es cuando se apacha");
		this.props.answerQuestionAction(flag, this.props.usuariosReducer.token);
		this.setState({ modalVisible: true});
		if (this.props.questionReducer.cargando) {
			<Spinner color="blue" style={{ flex: 1 }} />;
		}
		/* Alert.alert(
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
		); */
	}

	render() {
		var screenWidth = Dimensions.get('window').width - 1;
		//console.log(this.props.questionReducer.answerArray);

		var obj = this.props.questionReducer.answerArray;
		var result = Object.keys(obj).map((key) => [Number(key), obj[key]]);
		//console.log(result[1]);

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
								PREGUNTA:
							</Text>
						</View>
						<CardItem style={{ backgroundColor: 'transparent' }}>
							<Body>{this.textQuestion()}</Body>
						</CardItem>

						{this.showModal()}

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
								if ((this.props.questionReducer.answerArray[0] != undefined)) {
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
														source={{ uri: apiUrl.link + '/img/app/' + 'gamIcon13.png' }}
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
