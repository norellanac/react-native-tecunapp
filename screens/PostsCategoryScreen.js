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
	Body
} from 'native-base';
import { connect } from 'react-redux';
import * as postActions from '../src/actions/postActions';
import * as loginActions from '../src/actions/loginActions';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from '../components/HeaderCustom';
import HederPostSection from '../components/HederPostSection';
import { apiUrl, persistor, myStyles } from '../App';

import Loading from './../components/Loading';

class PostsCategoryScreen extends Component {
	constructor() {
		super();
	}
	state = {
		selected: 0,
		pathImage: apiUrl.link + '/storage/posts/',
		idCategory: 0
	};

	showNews(idPost) {
		this.props.getShowPost(idPost, this.props.usuariosReducer.token);
		this.props.navigation.navigate('PostsShowScreen');
	}

	onValueChange(key) {
		this.state.selected = key;
		this.state.idCategory = key;

		//console.log(key);

		if (this.state.idCategory == 0) {
			this.props.getNews(this.props.usuariosReducer.token);
			this.props.navigation.navigate('Home');
		} else {
			this.props.getCategory(this.state.idCategory, this.props.usuariosReducer.token);
		}
	}

	async likePost(postID) {
		let token = this.props.usuariosReducer.token;
		await this.props.likeOrDislike(postID, token);

		if (this.state.idCategory == 0) {
			this.props.getNews(this.props.usuariosReducer.token);
			this.props.navigation.navigate('Home');
		} else {
			this.props.getCategory(this.state.idCategory, this.props.usuariosReducer.token);
		}
	}

	loadContentCategories = () => {
		return this.props.postReducer.categories.map((categories) => (
			//console.log(categories),
			<Picker.Item label={categories.name} value={categories.id} key={categories.id} />
		));
	};

	showUserNameLikes(news) {
		if (news.user_likes_new) {
			return <Text>Tú y ({news.likes.length}) más</Text>;
		} else {
			return <Text>({news.likes.length})</Text>;
		}
	}

	loadContent = () => {
		var screenWidth = Dimensions.get('window').width;
		var screenHeight = Dimensions.get('window').height;

		if (this.props.postReducer.posts) {
			return this.props.postReducer.posts.map((news) => (
				<TouchableOpacity onPress={() => this.showNews(news.id)} key={news.id}>
					<Card style={{ flex: 0 }}>
						<CardItem>
							<Body>
								<Image
									source={{ uri: this.state.pathImage + news.featured_image }}
									style={{ width: screenWidth - 40, minHeight: 250, maxHeight: 500 }}
								/>
								<Text
									style={{
										fontSize: 20,
										fontWeight: 'bold',
										color: myStyles.bg1,
										paddingVertical: 8
									}}
								>
									{news.title}
								</Text>
							</Body>
						</CardItem>
						<CardItem style={{ marginTop: -25 }}>
							<Left>
								<Text note>{news.created_at}</Text>
							</Left>
							<Right>
								<Button
									transparent
									textStyle={{ color: '#87838B' }}
									onPress={() => this.likePost(news.id)}
								>
									{(() => {
										if (news.user_likes_new) {
											return <Icon name="like1" type="AntDesign" />;
										} else {
											return <Icon name="like2" type="AntDesign" />;
										}
									})()}
									{this.showUserNameLikes(news)}
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

		this.state.categoryPostName = this.props.postReducer.categoryPostName;

		if (this.props.postReducer.posts == undefined || this.props.postReducer.posts == null) {
			return (
				<Container>
					<HederPostSection navigation={this.props.navigation} screen={1} />
					<Spinner color="blue" style={{ flex: 1 }} />
					<FooterTabsNavigationIconText navigation={this.props.navigation} tab={1} />
				</Container>
			);
		}

		return (
			<Container>
				<HederPostSection navigation={this.props.navigation} screen={1} />
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
				<Content>
					<Text>{this.state.categoryPostName}</Text>
					{this.loadContent()}
				</Content>
				<FooterTabsNavigationIconText navigation={this.props.navigation} tab={1} />
			</Container>
		);
	}
}

const mapStateToProps = ({ postReducer, usuariosReducer }) => {
	//return reducers.postReducer; /*   DE TODOS LOS REDUCERS MAPEAMOS el reducer de usuarios devolvera los suauiros en los props del componente */
	return { postReducer, usuariosReducer };
};

const mapDispatchProps = {
	...postActions,
	...loginActions
};

export default withNavigation(connect(mapStateToProps, mapDispatchProps)(PostsCategoryScreen));
