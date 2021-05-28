import React, { Component } from 'react';
import { Share, Image, Linking, TouchableOpacity, Modal, Pressable, StyleSheet, Alert, ImageBackground, Touchable } from 'react-native';
import { WebView } from 'react-native-webview';
import { withNavigation } from 'react-navigation';
import {
	Container,
	Content,
	Spinner,
	Thumbnail,
	List,
	ListItem,
	View,
	Item,
	Input,
	Icon,
	Text,
	CardItem,
	Card,
	Button,
	Left,
	Header,
	Body,
	Right
} from 'native-base';
import { connect } from 'react-redux';
import * as jobsActions from '../src/actions/jobsActions';
import * as loginActions from '../src/actions/loginActions';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from '../components/HeaderCustom';
import { persistor, myStyles, screenHeight, screenWidth, apiUrl } from '../App';
import { SliderBox } from 'react-native-image-slider-box';
import Loading from './../components/Loading';

class JobsScren extends Component {
	constructor() {
		super();
	}
	state = {
		search: '',
		jobId: null
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

		viewMailAccept: {
			flex: 0,
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			marginLeft: 15,
			marginVertical: 15,
			paddingHorizontal: 10,
			paddingVertical: 10,
			backgroundColor: myStyles.bg1,
			borderRadius: 20,
			shadowColor: "#000",
			shadowOffset: {
				width: 0,
				height: 7,
			},
			shadowOpacity: 0.41,
			shadowRadius: 9.11,

			elevation: 14,
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
			alignSelf: 'center',
			marginRight: 15,
			marginVertical: 20
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
			color: myStyles.light,
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
			color: myStyles.bg2,
			marginRight: 3,
			width: 28,
		},
  	});

	shareMesage = async (text) => {
		try {
			const result = await Share.share({
				message: text
			});
			if (result.action === Share.sharedAction) {
				if (result.activityType) {
					// shared with activity type of result.activityType
				} else {
					// shared
				}
			} else if (result.action === Share.dismissedAction) {
				// dismissed
			}
		} catch (error) {
			alert(error.message);
		}
	};

	setIdOneJob(jobArray) {
		//console.log('Array del job: ', jobArray);
		//console.log('Reducer del job: ', this.props.jobsReducer);
		this.props.setIdJobSearch(jobArray);
		//this.props.navigation.navigate('JobShowScreen');
	}

	searchTextJob(search, token) {
		//console.log('Busqueda del job: ', this.props.jobsReducer);
		this.props.searchTextInJobs(search, token);
	}

	loadContent = () => {
		if (this.props.jobsReducer.jobs) {
			//console.log("jobs: ", this.props.jobsReducer.jobs);
			return this.props.jobsReducer.jobs.map((job) => (

				<Card key={job.id} style={{
					borderRadius: 25,
					marginTop: 15,
					width: screenWidth / 1.1,
					shadowColor: "#000",
					shadowOffset: {
						width: 0,
						height: 6,
					},
					shadowOpacity: 0.37,
					shadowRadius: 7.49,

					elevation: 12,
				 }}> 
					<Text style={{
						textAlign: 'center',
						color: myStyles.bg1,
						fontSize: 20,
						fontWeight: 'bold'
					}}>
						{job.title}
					</Text>
					<Content style={{
						marginHorizontal: 20
					}}>
						<Text style={{ fontSize: 15 }} note>{job.description}</Text>
					</Content>
					<View>
						<ListItem key={2} noBorder style={this.styles.ListCloseMail} icon delayPressIn>
							<Pressable onPress={() => Linking.openURL(job.public_link)}>
								<View style={this.styles.viewMailAccept}>
									<Icon style={this.styles.buttonIcon} name="web" type="Foundation"/>
									<Text style={this.styles.textStyleMail}>Ver Detalle</Text>
								</View>
							</Pressable>
							<Pressable onPress={() => this.shareMesage(job.public_link)}>
								<View style={this.styles.viewMailAccept}>
									<Icon style={this.styles.buttonIcon} name="share-alt-square" type="FontAwesome"/>
									<Text style={this.styles.textStyleMail}>Compartir</Text>
								</View>
							</Pressable>
						</ListItem>
					</View>
				</Card>
			));
		} else {
			return <Spinner color="blue" style={{ flex: 1 }} />;
		}
	};

	logout = async () => {
		//await this.props.logoutUser();
		//console.log('borró usuario');
		//await this.props.resetAddress();
		await persistor.purge();
		this.props.navigation.navigate('Login');
		//console.log('borró direccion');
	};

	async componentDidMount() {
		await this.props.getJobs(this.props.usuariosReducer.token);
		//console.log('jobs props', this.props);
		//console.log('jobs state: ', this.state);
	}

	render() {
		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				<Content>
					<View style={{ backgroundColor: myStyles.bg2 }}>
						<Image
							source={{ uri: apiUrl.link + '/img/app/' + 'boportunidad.png' }}
							style={{ 
								width: screenWidth,
								minHeight: screenHeight / 10,
								height: screenHeight / 4
							}}
						/>
					</View>
					<View style={{ alignItems: 'center' }}>
						{this.loadContent()}
					</View>
				</Content>

				<View style={{ 
					backgroundColor: '#f9f9f9', 
					borderBottomLeftRadius: 20, 
					borderBottomRightRadius: 20,
				}}>
					<ListItem noBorder
						style={{ 
							backgroundColor: 'FFFFFF',
							marginTop: 10,
							marginBottom: 10,
							marginLeft: 35,
							width: screenWidth - 60, 
							height: screenHeight / 16,
							borderWidth: 1,
							borderRadius: 30,

						}}
					>
						<Input
							onChangeText={(search) => this.setState({ search })}
							value={this.state.search}
							placeholder="BUSCAR PLAZA"
							placeholderTextColor="#969696"
							style={{ color: 'black', marginLeft: 15 }}
						/>

						<TouchableOpacity
							style={{ alignSelf: 'center', marginHorizontal: 5 }}
							onPress={() => this.searchTextJob(this.state.search, this.props.usuariosReducer.token)}
						>
							<Icon
								name="search"
								type="FontAwesome"
								style={{ color: "#0075b7" }}
							/>
						</TouchableOpacity>
					</ListItem >
				</View>
			</Container>
		);
	}
}

const mapStateToProps = ({ jobsReducer, usuariosReducer }) => {
	//return reducers.jobsReducer; /*   DE TODOS LOS REDUCERS MAPEAMOS el reducer de usuarios devolvera los suauiros en los props del componente */
	return { jobsReducer, usuariosReducer };
};

const mapDispatchProps = {
	...jobsActions,
	...loginActions
};

export default withNavigation(connect(mapStateToProps, mapDispatchProps)(JobsScren));
