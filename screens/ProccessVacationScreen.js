import React, { Component } from 'react';
import { Dimensions, Image, ScrollView } from 'react-native';
import HTML from 'react-native-render-html';
import { withNavigation } from 'react-navigation';
import { Col, Grid, Row } from "react-native-easy-grid";
import {
	Container,
	Content,
	Thumbnail,
	Form,
	Input,
	List,
	Icon,
	View,
	ListItem,
	Item,
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
import { apiUrl } from '../App';

import Loading from './../components/Loading';

class PostsShowScreen extends Component {
	constructor() {
		super();
	}
	state = {
		showComments: false
	};

	/* loadInfoComment() {
		//console.log("Que trae esto: ",this.props.postReducer.post);
		if (this.state.showComments == true) {
			return this.props.postReducer.post.comments.map((comment) => (
				<List key={comment.id}>
					<ListItem avatar>
						<Left>
							<Icon name="user" type="FontAwesome" />
						</Left>
						<Body>
							<Text>
								{comment.user.name} {comment.user.lastname}
							</Text>
							<Text note>{comment.message}</Text>
						</Body>
					</ListItem>
				</List>
			));
		}
    } */
    
    loadInfoComment() {
        
        if (this.state.showComments == true) {
            console.log("Hola mundo");
        }
    }

	render() {
		var screenWidth = Dimensions.get("window").width;
        var screenHeight = Dimensions.get("window").height;

		/* if (this.props.postReducer.cargando || this.props.postReducer.post.comments == undefined) {
			return (
				<Container>
					<HeaderCustom navigation={this.props.navigation} />
					<HederPostSection navigation={this.props.navigation} />
					<Loading />
					<FooterTabsNavigationIconText navigation={this.props.navigation} />
				</Container>
			);
		} */

		//console.log("jobsProps: ", this.props);

		return (
			<Container>
				<HeaderCustom navigation={this.props.navigation} />
				<Content>
					<Card style={{ flex: 0 }}>
                        <CardItem cardBody>
                            <Grid style={{ marginTop: 8 }}>
                                <Col size={4} style={{ alignItems: "center" }}>
                                    <Button
                                        iconLeft
                                        info
                                        block
                                        style={{  borderRadius: 10, marginBottom: 10, alignSelf: "center" }}
                                        onPress={(showComments) => this.setState({ showComments: !this.state.showComments })}
                                    >
                                        <Icon name="cog" />
                                        <Text>Alguna empresas</Text>
                                    </Button>
                                    <ScrollView>
                                        {this.loadInfoComment()}
                                    </ScrollView>
                                </Col>
                            </Grid>
                        </CardItem>
                    </Card>
				</Content>
				<FooterTabsNavigationIconText navigation={this.props.navigation} />
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

export default withNavigation(connect(mapStateToProps, mapDispatchProps)(PostsShowScreen));
