import React, { Component } from "react";
import { Dimensions, Image } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import {
    Container,
    Content,
    CardItem,
    Fab,
    Text,
    Card,
    Button,
    ListItem,
    Left,
    Body,
    Right,
    TouchableHighlight,
    TouchableOpacity,
    Icon,
    View
} from "native-base";
import { connect } from "react-redux";
import * as loginActions from "../src/actions/loginActions";
import * as questionActions from "../src/actions/questionActions";
import FooterTabsNavigationIconText from "../components/FooterTaIconTextN-B";
import HeaderCustom from "../components/HeaderCustom";
import { persistor } from "../App";
import Loading from "./../components/Loading";
import { SliderBox } from "react-native-image-slider-box";
import { apiUrl } from '../App';

class GamesScreen extends Component {
    constructor() {
        super();
    }
    state = {
        search: "",
        images: [
            "https://app.canjeaton.com/storage/users/cajeaton1.png",
            "https://app.canjeaton.com/storage/users/cajeaton2.png",
            "https://app.canjeaton.com/storage/users/cajeaton3.png",
        ],
        pass: 1,
        pass2: 0,
        pathImage: apiUrl.link + "/img/game/"
    };

    logout = async () => {
        //await this.props.logoutUser();
        console.log("borró usuario");
        //await this.props.resetAddress();
        await persistor.purge();
        this.props.navigation.navigate("Login");
        console.log("borró direccion");
    };

    componentDidMount() {
        this.props.allScoreUser(this.props.usuariosReducer.token);
        console.log("Como viene el path: ", this.state.pathImage);
    }

    oneQuestion(){
        this.props.oneQuestion(this.props.usuariosReducer.token);
        this.props.navigation.navigate("GameShowScreen")
    }

    allScore(){
        //console.log("Que viene en el score?: ",this.state.pass);
        let count = 0;
        let possitionArray = {1:"numeric-1", 2:"numeric-2", 3:"numeric-3", 4:"numeric-4", 5:"numeric-5"};
        if(this.state.pass == 1) {
            
            return (this.props.questionReducer.score.map((pounts) => (
                count++,
                <ListItem icon>
                    <Left>
                        <Button style={{ backgroundColor: "#46a3ff" }}>
                        <Icon
                            type="MaterialCommunityIcons"
                            name={possitionArray.[count]}
                            style={{ marginLeft: 4, color: "#ffffff" }}
                        />
                        </Button>
                    </Left>
                    <Right>
                        <Text>{pounts.user.name} {pounts.user.lastname}   </Text>
                        <Text></Text>
                        <Button style={{ backgroundColor: "#00b814", borderRadius: 20 }}>
                            <Text>{pounts.points}</Text>
                        </Button>
                    </Right>
                </ListItem>
            )))
        }
    }

    onValueChance(){
        if(this.state.pass == 1){
            this.setState({
                pass: 0
            });
        }else{
            this.setState({
                pass: 1
            });
        }
    }

    render() {
        //const { navigation } = this.props.navigation
        var screenWidth = Dimensions.get("window").width;
        var screenHeight = Dimensions.get("window").height;

        //console.log("Como viene el state2 en el render? ", this.state.pass);
        //console.log("Como viene el state2 en el render? ", this.state.pass2);

        if (this.props.questionReducer.cargando) {
            return (
                <Container>
                    <HeaderCustom navigation={this.props.navigation} />
                        < Loading />
                    <FooterTabsNavigationIconText navigation={this.props.navigation} />
                </Container>
            )
        };

        return (
            <Container>
                <HeaderCustom navigation={this.props.navigation} />
                <Content>
                    <Card transparent>
                        <CardItem cardBody>
                            <Grid style={{ marginTop: 5 }}>
                                <Col size={4} style={{ alignItems: "center" }}>
                                    <CardItem cardBody>
                                        <Grid style={{ marginTop: 20 }}>
                                            <Col size={4} style={{ alignItems: "center" }}>
                                                <Button
                                                    transparent
                                                    style={{width: screenWidth/3, height: screenHeight/6}}
                                                    onPress={() => {this.onValueChance()}}
                                                >
                                                    <Image
                                                        source={{ uri: this.state.pathImage + "trophy.png" }}
                                                        style={{ width: screenWidth / 3, height: screenWidth /3 }}
                                                    />
                                                </Button>

                                                {(() => {
                                                    if (this.state.pass2 != 1) {

                                                        return(
                                                            <ListItem icon>
                                                                <Left>
                                                                    <Button style={{ backgroundColor: "#FF9501" }}>
                                                                        <Icon active name="airplane" />
                                                                    </Button>
                                                                </Left>
                                                                <Right>
                                                                    <Text>Nombre</Text>
                                                                    <Text>Puntos</Text>
                                                                </Right>
                                                            </ListItem>,
                                                            this.allScore()
                                                        )
                                                    }
                                                })()} 

                                            </Col>
                                        </Grid>
                                    </CardItem>
                                </Col>
                            </Grid>
                        </CardItem>
                        <CardItem cardBody>
                            <Grid style={{ marginTop: 10 }}>
                                <Col size={4} style={{ alignItems: "center" }}>
                                    <CardItem cardBody>
                                        <Grid style={{ marginTop: 50 }}>
                                            <Col size={4} style={{ alignItems: "center" }}>
                                                <Image 
                                                    source={{ uri:   this.state.pathImage + "trivia.png" }}
                                                    style={{ width: screenWidth / 2, height: screenHeight / 4 }}
                                                />
                                                <Button 
                                                    onPress={() => this.oneQuestion() }
                                                    style={{ width: screenWidth / 3, height: screenHeight / 13, borderRadius: 10 }}
                                                >
                                                <Icon
                                                    type="Entypo"
                                                    name="game-controller"
                                                    style={{ marginLeft: 13, color: "#ffffff" }}
                                                />
                                                <Text style={{ color: "#ffffff", marginRight:15 }}>Jugar</Text>
                                                </Button>
                                            </Col>
                                        </Grid>
                                    </CardItem>
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

const mapStateToProps = ({ questionReducer, usuariosReducer }) => {
    return { questionReducer, usuariosReducer };
}

const mapDispatchProps = {
    ...questionActions,
    ...loginActions,
}

export default connect(mapStateToProps, mapDispatchProps)(GamesScreen);
