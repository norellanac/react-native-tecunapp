import React, { Component } from 'react';
import { Dimensions, Image, TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import { withNavigation } from 'react-navigation';
import {
	Container,
	Content,
	Spinner,
	Thumbnail,
	Form,
	Picker,
	Input,
	Icon,
	Text,
	CardItem,
	Card,
	Button,
	Left,
	Right,
	Body,
	View
} from 'native-base';
import { connect } from 'react-redux';
import * as podcastActions from '../src/actions/podcastActions';
import * as loginActions from '../src/actions/loginActions';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from '../components/HeaderCustom';
import HederPostSection from '../components/HederPostSection';
import { apiUrl, screenHeight, screenWidth, myStyles } from '../App';

import Loading from './../components/Loading';

class PodcastScreen extends Component {
	constructor() {
		super();
	}
	state = {
		podcast: null,
		podcastId: null,
		selected: 0,
		pathImage: apiUrl.link + '/storage/podcast/',
		idCategory: 0,
		category: ''
	};

	async componentDidMount() {
		await this.props.getPodcasts(this.props.usuariosReducer.token);
	}

	showPodcast(podcast) {
		this.props.passOneRecord(podcast);
		this.props.getShowPodcast(podcast.id, this.props.usuariosReducer.token);
		this.props.navigation.navigate('PodcastShowScreen');
	}

	onValueChange(key) {
		this.state.selected = key;
		this.state.idCategory = key;

		if (this.state.idCategory == 0) {
			this.props.getPodcasts(this.props.usuariosReducer.token);
		} else {
			this.props.getCategory(this.state.idCategory, this.props.usuariosReducer.token);
			//this.props.navigation.navigate('PodcastsCategoryScreen');
		}
	}

	loadContentCategories = () => {
		return this.props.podcastReducer.categories.map((category) => (
			<Picker.Item label={category.name} value={category.id} key={category.id} />
		));
	};

	async likePodcast(id) {
		let token = this.props.usuariosReducer.token;
		await this.props.likeOrDislike(id, token);
		//await this.props.getPodcasts(token);

		if (this.state.idCategory == 0) {
			this.props.getPodcasts(this.props.usuariosReducer.token);
		} else {
			this.props.getCategory(this.state.idCategory, this.props.usuariosReducer.token);
			//this.props.navigation.navigate('PodcastsCategoryScreen');
		}
	}

	showUserNameLikes(podcast) {
		if (podcast.user_likes_new) {
			return <Text>{podcast.likes.length}</Text>;
		} else {
			return <Text>{podcast.likes.length}</Text>;
		}
	}

	loadContent = () => {
		if (this.props.podcastReducer.podcasts) {
			return this.props.podcastReducer.podcasts.map((podcast) => (
				<TouchableOpacity onPress={() => this.showPodcast(podcast)} key={podcast.id} >
					<Card
						style={{
							flex: 0,
							borderRadius: 15,
							marginVertical: 10,
							marginLeft: 10,
							marginRight: 10
						}}
					>
						<CardItem style={{ borderRadius: 15 }}>
							<Body>
								<Image
									source={{ uri: this.state.pathImage + podcast.featured_image }}
									style={{ borderRadius: 15, width: screenWidth - 50, minHeight: 250, maxHeight: 500 }}
								/>
								<Text
									style={{
										fontSize: 20,
										fontWeight: 'bold',
										color: myStyles.bg1,
										paddingVertical: 8
									}}
								>
									{podcast.title}
								</Text>
							</Body>
						</CardItem>
						<CardItem style={{ marginTop: -25, borderRadius: 15 }}>
							<Left>
								<Text note>{podcast.created_at}</Text>
							</Left>
							<Right>
								<Button
									transparent
									textStyle={{ color: '#87838B' }}
									onPress={() => this.likePodcast(podcast.id)}
								>
									{(() => {
										if (podcast.user_likes_new) {
											return <Icon name="star" type="AntDesign" style={{ color: '#ffcc00' }} />;
										} else {
											return <Icon name="staro" type="AntDesign" style={{ color: '#ffcc00' }} />;
										}
									})()}
									{this.showUserNameLikes(podcast)}
								</Button>
							</Right>
						</CardItem>
					</Card>
				</TouchableOpacity>
			));
		} else {
			return <Spinner color="blue" style={{ flex: 1 }} />;
		}
	};

	render() {
		var screenWidth = Dimensions.get('window').width;
		var screenHeight = Dimensions.get('window').height;

		//const { navigation } = this.props.navigation

		if (this.props.podcastReducer.podcasts == undefined || this.props.podcastReducer.podcasts == null) {
			//console.log("jobsScreen: ", this.props);
			return (
				<Container>
					<HederPostSection navigation={this.props.navigation} screen={2} />
					<Loading />
					<FooterTabsNavigationIconText navigation={this.props.navigation} tab={1} />{' '}
				</Container>
			);
		}

		return (
			<Container>
				<HederPostSection navigation={this.props.navigation} screen={2} />
				<Image
					source={{ uri: apiUrl.link + '/img/app/' + 'bcontacto.png' }}
					style={{ 
						width: screenWidth,
						minHeight: screenHeight / 10,
						height: screenHeight / 4
					}}
				/>
				<Form>
					<Picker
						note
						mode="dropdown"
						style={{ width: '100%' }}
						selectedValue={this.state.selected}
						onValueChange={this.onValueChange.bind(this)}
					>
						<Picker.Item label="Categorias" value="0" />
						{this.loadContentCategories()}
					</Picker>
				</Form>
				<Content>{this.loadContent()}</Content>
				<FooterTabsNavigationIconText navigation={this.props.navigation} tab={1} />
			</Container>
		);
	}
}

const mapStateToProps = ({ podcastReducer, usuariosReducer }) => {
	//return reducers.podcastReducer; /*   DE TODOS LOS REDUCERS MAPEAMOS el reducer de usuarios devolvera los suauiros en los props del componente */
	return { podcastReducer, usuariosReducer };
};

const mapDispatchProps = {
	...podcastActions,
	...loginActions
};

export default withNavigation(connect(mapStateToProps, mapDispatchProps)(PodcastScreen));
