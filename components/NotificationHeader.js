import React, { Component } from 'react';
import { Col, Grid } from 'react-native-easy-grid';
import { Image, Dimensions } from 'react-native';
import { CardItem, Card, Button, Text, Icon } from 'native-base';

var screenWidth = Dimensions.get('window').width - 200;
var hg = Dimensions.get('window').width - 200;
export default class NotificationHeader extends Component {
	constructor() {
		super();
	}
	state = {
		isShowAlert: false
	};

	render() {
		if (this.props.isShowAlert) {
			return (
				<Card style={{ marginTop: 0, marginLeft: 0, marginRight: 0 }}>
					<CardItem style={{ backgroundColor: '#00B9D3' }}>
						<Image
							source={{ uri: 'http://157.55.181.102/img/game/trivia.png' }}
							style={{ width: 25, height: 25 }}
						/>
						<Col size={4}>
							<Text
								style={{
									textAlign: 'center',
									fontSize: 18,
									fontWeight: 'bold',
									color: '#fff'
								}}
							>
								{this.props.notification}
							</Text>
						</Col>
						<Button onPress={this.hideAlert} transparent rounded>
							<Icon name="close" />
						</Button>
					</CardItem>
				</Card>
			);
		} else {
			return <Text/>; 
		}
	}
}
