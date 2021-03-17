import React, { Component } from 'react';
import { Share, Image, Linking, TouchableOpacity } from 'react-native';
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
import { persistor, myStyles } from '../App';
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
		console.log('Array del job: ', jobArray);
		console.log('Reducer del job: ', this.props.jobsReducer);
		this.props.setIdJobSearch(jobArray);
		this.props.navigation.navigate('JobShowScreen');
	}

	searchTextJob(search, token) {
		console.log('Busqueda del job: ', this.props.jobsReducer);
		this.props.searchTextInJobs(search, token);
	}

	loadContent = () => {
		if (this.props.jobsReducer.jobs) {
			//console.log("jobs: ", this.props.jobsReducer.jobs);
			return this.props.jobsReducer.jobs.map((job) => (
				<TouchableOpacity onPress={() => Linking.openURL(job.public_link)}>
					<ListItem thumbnail onPress={() => Linking.openURL(job.public_link)} key={job.id}>
						<Body>
							<Text
								style={{
									fontSize: 15,
									fontWeight: 'bold',
									color: myStyles.bg1,
									paddingVertical: 8
								}}
							>
								{job.title}
							</Text>
							<Text note numberOfLines={5}>
								{job.description}
							</Text>
						</Body>
						<Right>
							<Button transparent onPress={() => this.shareMesage(job.public_link)}>
								<Icon name="share-alt-square" type="FontAwesome" />
							</Button>
						</Right>
					</ListItem>
				</TouchableOpacity>
			));
		} else {
			return <Spinner color="blue" style={{ flex: 1 }} />;
		}
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
		await this.props.getJobs(this.props.usuariosReducer.token);
		console.log('jobs props', this.props);
		console.log('jobs state: ', this.state);
	}

	render() {
		//const { navigation } = this.props.navigation
		/*
		if (this.props.jobsReducer.cargando) {
			console.log('jobsScreen: ', this.props);
			return (
				<Container>
					<HeaderCustom navigation={this.props.navigation} />
					<Loading />
					<FooterTabsNavigationIconText navigation={this.props.navigation} tab={1} />
				</Container>
			);
		}*/

		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				<Content>
					<View style={{ backgroundColor: myStyles.bg2 }}>
						<Text
							style={{
								textAlign: 'center',
								fontSize: 30,
								fontWeight: 'bold',
								color: myStyles.light,
								paddingVertical: 8
							}}
						>
							Oportunidades de crecimiento
						</Text>
					</View>
					<List>{this.loadContent()}</List>
				</Content>

				<Header searchBar rounded style={{ backgroundColor: myStyles.grey, borderRadius: 15 }}>
					<Item>
						<Input
							onChangeText={(search) => this.setState({ search })}
							value={this.state.search}
							placeholder="Plaza o Descripcion"
							placeholderTextColor="#000000"
							style={{ color: '#000000' }}
						/>

						<TouchableOpacity
							style={{ alignSelf: 'center', marginHorizontal: 5 }}
							onPress={() => this.searchTextJob(this.state.search, this.props.usuariosReducer.token)}
						>
							<Text>Buscar</Text>
						</TouchableOpacity>
					</Item>
				</Header>
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
