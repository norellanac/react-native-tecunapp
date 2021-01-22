import React, { Component, useEffect } from 'react';
import { Dimensions } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import { Container, Content, View, Thumbnail, Icon, Text, CardItem, Card, Button } from 'native-base';
import { connect } from 'react-redux';
import { apiUrl } from '../App';
import * as awardActions from '../src/actions/awardActions';
import * as loginActions from '../src/actions/loginActions';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from '../components/HeaderCustom';
import { persistor } from '../App';
import { SliderBox } from 'react-native-image-slider-box';
import { withNavigation } from 'react-navigation';
import Loading from './../components/Loading';

class SpecialTeamScreen extends Component {
	constructor() {
		super();
	}
	state = {
		awards: [],
		pathImage: apiUrl.link + '/storage/awards/'
	};

	async componentDidMount() {
		await this.props.getAwards(this.props.usuariosReducer.token);
		this.setState({
			awards: await this.props.getAwards(this.props.usuariosReducer.token)
		});
	}

	awardsUrlImage0() {
		const pathImage = this.state.pathImage;
		var sliderImages = [];
		var url = '';
		this.props.awardReducer.awards.map((award) => {
			if (award.type_id === 1) {
				url = award.url_image;
				sliderImages.push(pathImage + url);
			}
			//console.log("array imagenes: ",sliderImages);
		});
		return sliderImages;
	}

	awardsUrlImage1() {
		const pathImage = this.state.pathImage;
		var sliderImages = [];
		var url = '';
		this.props.awardReducer.awards.map((award) => {
			if (award.type_id === 0) {
				url = award.url_image;
				sliderImages.push(pathImage + url);
			}
			//console.log("array imagenes: ",sliderImages);
		});
		return sliderImages;
	}

	render() {
		var screenWidth = Dimensions.get('window').width - 1;
		var hg = Dimensions.get('window').width - 150;

		if (this.props.awardReducer.cargando) {
			return (
				<Container>
					<HeaderCustom navigation={this.props.navigation} />
					<Loading />
					<FooterTabsNavigationIconText navigation={this.props.navigation} />
				</Container>
			);
		}

		//console.log("imagenes slider: ", this.awardsUrlImage1());
		/*console.log(this.awardsUrlImage0());
    console.log(this.awardsUrlImage1());
    console.log(pathImage);*/
		//const { navigation } = this.props.navigation

		//Url Api, pathImage y luego url_images para mostrar las imagenes

		/*console.log("Intento de Awards prueba 1: ",this.props.awardReducer.awards);*/

		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				<Content>
					<Grid style={{ backgroundColor: 'transparent', marginTop: 15 }}>
						<Col style={{ alignItems: 'center' }}>
							<Text
								style={{
									fontSize: 30,
									color: '#3490dc',
									fontWeight: 'bold'
								}}
							>
								Reconocimientos
							</Text>
						</Col>
					</Grid>
					<View style={{ margin: 0, marginTop: 10 }}>
						<SliderBox
							style={{ height: hg, width: screenWidth }}
							images={this.awardsUrlImage0()}
							autoplay
							circleLoop
						/>
					</View>
					<View style={{ margin: 0, marginTop: 30 }}>
						<SliderBox
							style={{ height: hg, width: screenWidth }}
							images={this.awardsUrlImage1()}
							autoplay
							circleLoop
						/>
					</View>
				</Content>
				<FooterTabsNavigationIconText navigation={this.props.navigation} />
			</Container>
		);
	}
}

const mapStateToProps = ({ awardReducer, usuariosReducer }) => {
	return { awardReducer, usuariosReducer };
};

const mapDispatchProps = {
	...awardActions,
	...loginActions
};

export default withNavigation(connect(mapStateToProps, mapDispatchProps)(SpecialTeamScreen));
