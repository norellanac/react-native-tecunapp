import React, { Component } from 'react';
import { Dimensions, Image } from 'react-native';
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
import { persistor } from '../App';
import { SliderBox } from 'react-native-image-slider-box';
import { apiUrl } from '../App';

import Loading from './../components/Loading';
import { loadingPodcast } from '../src/types/podcastType';

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
		category: '',
		isWaitingMap: 0
	};

	showPodcast(idPodcast) {
		this.props.getShowPodcast(idPodcast, this.props.usuariosReducer.token);
		this.props.navigation.navigate('PodcastShowScreen');
	}

	onValueChange(key) {
		this.state.selected = key;
		this.state.idCategory = key;

		if (this.state.idCategory == 0) {
			this.props.getPodcasts(this.props.usuariosReducer.token);
		} else {
			this.props.getCategory(this.state.idCategory, this.props.usuariosReducer.token);
			this.props.navigation.navigate('PodcastsCategoryScreen');
		}
	}

	loadContentCategories = () => {
		return this.props.podcastReducer.categories.map((category) => (
			<Picker.Item label={category.name} value={category.id} />
		));
	};

	async likePodcast(id) {
		let token = this.props.usuariosReducer.token;
		await this.props.likeOrDislike(id, token);
		if (this.state.idCategory == 0) {
			this.props.getPodcasts(this.props.usuariosReducer.token);
			this.props.navigation.navigate('PodcastScreen');
		} else {
			this.props.getCategory(this.state.idCategory, this.props.usuariosReducer.token);
		}
	}

	loadContent = () => {
		var screenWidth = Dimensions.get('window').width;
		var screenHeight = Dimensions.get('window').height;

		if (this.props.podcastReducer.podcasts) {
			return this.props.podcastReducer.podcasts.map((podcast) => (
				<Card style={{ flex: 0 }} key={podcast.id}>
					<CardItem style={{ backgroundColor: 'transparent' }}>
						<Left>
							<Thumbnail
								style={{ backgroundColor: '#000000' }}
								source={{ uri: `${apiUrl.link}/img/logo.png` }}
							/>
							<Body>
								<Text>{podcast.title}</Text>
								<Text note>{podcast.created_at}</Text>
							</Body>
						</Left>
					</CardItem>
					<CardItem>
						<Body>
							<Image
								source={{ uri: this.state.pathImage + podcast.featured_image }}
								style={{ width: screenWidth - 20, height: 150 }}
							/>
							<Text>{podcast.description}</Text>
						</Body>
					</CardItem>
					<CardItem>
						<Button
							transparent
							textStyle={{ color: '#87838B' }}
							onPress={() => this.likePodcast(podcast.id)}
						>
							{(() => {
								if (podcast.user_likes_new) {
									return <Icon name="like1" type="AntDesign" />;
								} else {
									return <Icon name="like2" type="AntDesign" />;
								}
							})()}
							<Text>({podcast.likes.length})</Text>
						</Button>
						<Right>
							<Button
								transparent
								textStyle={{ color: '#87838B' }}
								onPress={() => this.showPodcast(podcast.id)}
							>
								<Icon name="comment" type="FontAwesome" />
								<Text>Comentarios</Text>
							</Button>
						</Right>
					</CardItem>
				</Card>
			));
		} else {
			return <Spinner color="blue" style={{ flex: 1 }} />;
		}
	};

	render() {
		var screenWidth = Dimensions.get('window').width;
		var screenHeight = Dimensions.get('window').height;

		//const { navigation } = this.props.navigation

		if (this.props.podcastReducer.cargando || this.state.isWaitingMap == 1) {
			//console.log("jobsScreen: ", this.props);
			return (
				<Container>
					<HeaderCustom navigation={this.props.navigation} />
					<HederPostSection navigation={this.props.navigation} />
					<Loading />
					<FooterTabsNavigationIconText navigation={this.props.navigation} />
				</Container>
			);
		}

		//console.log(this.props.podcastReducer);

		//console.log("jobsProps: ", this.props);

		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				<HederPostSection navigation={this.props.navigation} />
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
				<FooterTabsNavigationIconText navigation={this.props.navigation} />
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
