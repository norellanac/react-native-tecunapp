import React, { Component, useEffect } from 'react';
import { Dimensions, Linking, Image, TouchableOpacity } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import {
	Container,
	Content,
	Spinner,
	Item,
	Icon,
	Text,
	Thumbnail,
	View,
	CardItem,
	Body,
	Card,
	Button,
	ListItem,
	Left,
	Right
} from 'native-base';
import { connect } from 'react-redux';
import * as loginActions from '../src/actions/loginActions';
import * as contactsActions from '../src/actions/contactsActions';
import * as userActions from '../src/actions/userActions';
import FooterTabsNavigationIconText from '../components/FooterTaIconTextN-B';
import HeaderCustom from '../components/HeaderCustom';
import { screenHeight, apiUrl, screenWidth, myStyles } from '../App';
import { withNavigation } from 'react-navigation';
import Loading from './../components/Loading';

class EmergencyNumberScreen extends Component {
	constructor() {
		super();
	}
	state = {
		isShowAlert: true,
		pathImage: apiUrl.link + '/img/'
	};

	async componentDidMount() {
        let token = this.props.usuariosReducer.token;
		await this.props.getEmergency(token);
	}

    loadingInfoName = () => {
		var screenWidth = Dimensions.get('window').width;
		var screenHeight = Dimensions.get('window').height;

        const numbers = this.props.usuariosReducer.number

		if (numbers) {
			return numbers.map((record) => (
				<ListItem avatar noBorder>
					<Body style={{ marginLeft: 25 }}>
						<Text
							style={{
								fontSize: 20,
								fontWeight: 'bold',
								color: myStyles.bg2,
								paddingVertical: 8,
							}}
						>
							{record.title}
						</Text>
                        {(() => {
                            return record.body.map((item) => (
                                <View>
                                    <ListItem style={{ marginLeft: -1 }} onPress={() => Linking.openURL(`tel:${item.number}`)}>
                                        <Left>
                                            <Text style={{ color: myStyles.bg3 }}>{item.description}</Text>
                                        </Left>
                                        <Right>
                                            <Thumbnail
                                                source={{ uri: apiUrl.link + '/img/app/' + 'llamar.png' }}
                                            />
                                        </Right>
                                    </ListItem>
                                </View>
                            ));
                        })()}
					</Body>
				</ListItem>
			));
		} else {
			return <Spinner color="blue" style={{ flex: 1 }} />;
		}
	};

	render() {
		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				<Content>
					<Image
						source={{ uri: apiUrl.link + '/img/app/' + 'bnumeroemergencia.png' }}
						style={{ 
							width: screenWidth,
							minHeight: screenHeight / 10,
							height: screenHeight / 4
						}}
					/>

					<View style={{ marginTop: 7 }} />
                    {(() => {
                        if (!this.props.usuariosReducer.cargando) {
                            return (
                                this.loadingInfoName()
                            );
                        } else {
                            return <Spinner color="blue" style={{ flex: 1 }} />;
                        }
                    })()}
				</Content>
				<FooterTabsNavigationIconText navigation={this.props.navigation} tab={2} />
			</Container>
		);
	}
}

const mapStateToProps = ({ usuariosReducer, loginReducer, contactsReducer }) => {
	return { usuariosReducer, loginReducer, contactsReducer };
};

const mapDispatchProps = {
	...loginActions,
	...userActions,
	...contactsActions
};

export default withNavigation(connect(mapStateToProps, mapDispatchProps)(EmergencyNumberScreen));
