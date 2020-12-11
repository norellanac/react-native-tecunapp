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
    Icon,
    View
} from "native-base";
import { connect } from "react-redux";
import * as loginActions from "../src/actions/loginActions";
import FooterTabsNavigationIconText from "../components/FooterTaIconTextN-B";
import HeaderCustom from "../components/HeaderCustom";
import { persistor } from "../App";
import { SliderBox } from "react-native-image-slider-box";

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
        ]
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
        console.log("");
    }

    userData = async () => {
        let Dpi = this.state.dpi;
        let Name = this.state.name;
        let Lastname = this.state.lastname;
        let Email = this.state.email;
        let Phone = this.state.phone;
        await this.props.logoutUser();
        if (this.state.password === this.state.confirmPassword) {
            var Password = this.state.password;
            await this.props.registerUsers(
                Dpi,
                Name,
                Lastname,
                Email,
                Phone,
                Password
            );
        }
        if (this.props.error == "") {
            await this.props.traerToken(Email, Password);
            await this.props.traerUser(this.props.token);
        }
    };


    render() {
        //const { navigation } = this.props.navigation
        var screenWidth = Dimensions.get("window").width;
        var screenHeight = Dimensions.get("window").height;

        console.log("UserScreenProfile: ", this.props);

        return (
            <Container>
                <HeaderCustom navigation={this.props.navigation} />
                <Content>
                    <Button transparent onPress={this.logout}>
                        <Text>Salir</Text>
                    </Button>
                    <Card transparent>
                        <CardItem cardBody>
                            <Grid style={{ marginTop: 5 }}>
                                <Col size={4} style={{ alignItems: "center" }}>
                                    <CardItem cardBody>
                                        <Grid style={{ marginTop: 50 }}>
                                            <Col size={4} style={{ alignItems: "center" }}>
                                                <Image
                                                    source={{ uri: "https://lh3.googleusercontent.com/proxy/bkTwbMdwjkZQzC4Fhti-RqE9yg1Qa6Yzt6hP1qYGWCKMOppXHyhXy_Imz9TjozDuSCLGhSMLo0WAhFKX70ncvtp73pPhWiPEUs9tZJr_g0zZ1662h10NKiURj3kV61oTEY-q9NB-OmWfp9cYqwNQ7xF4tOXS-LY" }}
                                                    style={{ width: screenWidth / 3, height: screenWidth / 3 }}
                                                />
                                            </Col>
                                        </Grid>
                                    </CardItem>
                                </Col>
                            </Grid>
                        </CardItem>
                        <CardItem cardBody>
                            <Grid style={{ marginTop: 5 }}>
                                <Col size={4} style={{ alignItems: "center" }}>
                                    <CardItem cardBody>
                                        <Grid style={{ marginTop: 50 }}>
                                            <Col size={4} style={{ alignItems: "center" }}>
                                                <Image 
                                                    source={{ uri: "http://157.55.181.102/img/game/trivia.png" }}
                                                    style={{ width: screenWidth / 2, height: screenHeight / 4 }}
                                                />
                                                <Button block primary onPress={() => this.props.navigation.navigate("GameShowScreen")}></Button>
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

const mapStateToProps = reducers => {
    return reducers.usuariosReducer;
};

export default connect(mapStateToProps, loginActions)(GamesScreen);
