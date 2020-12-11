import React, { Component, useEffect } from "react";
import { Dimensions } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import {
    Container,
    Content,
    Form,
    Item,
    Icon,
    Text,
    ListItem,
    Input,
    CheckBox,
    Body,
    Button
} from "native-base";
import { connect } from "react-redux";
import { apiUrl } from '../App';
import * as awardActions from "../src/actions/awardActions";
import * as loginActions from "../src/actions/loginActions";
import FooterTabsNavigationIconText from "../components/FooterTaIconTextN-B";
import HeaderCustom from "../components/HeaderCustom";
import { persistor } from "../App";
import { SliderBox } from "react-native-image-slider-box";
import { withNavigation } from "react-navigation";
import Loading from "../components/Loading";

class DenounceScreen extends Component {
    constructor() {
        super();
    }
    state = {
        awards: []
    };

    async componentDidMount() {
        await this.props.getAwards(this.props.usuariosReducer.token);
        this.setState({
            awards: await this.props.getAwards(this.props.usuariosReducer.token),
        });
    }

    awardsUrlImage0() {
        const pathImage = "http://157.55.181.102/storage/awards/";
        var sliderImages = [];
        var url = "";
        this.props.awardReducer.awards.map((award) => {
            if (award.type_id === 1) {
                url = award.url_image
                sliderImages.push(pathImage + url);
            }
            //console.log("array imagenes: ",sliderImages);


        })
        return sliderImages;
    }

    awardsUrlImage1() {
        const pathImage = "http://157.55.181.102/storage/awards/";
        var sliderImages = [];
        var url = "";
        this.props.awardReducer.awards.map((award) => {
            if (award.type_id === 0) {
                url = award.url_image
                sliderImages.push(pathImage + url);
            }
            //console.log("array imagenes: ",sliderImages);


        })
        return sliderImages;
    }


    render() {
        var screenWidth = Dimensions.get("window").width - 1;
        var hg = Dimensions.get("window").width - 150;

        if (this.props.awardReducer.cargando) {
            return <Loading />
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
                    <Form style={{ marginRight: 20, marginLeft: 20, marginTop: 10 }}>
                        <Item rounded>
                            <Icon
                                type="FontAwesome"
                                name="user-o"
                                style={{ color: "#3490dc", fontSize: 25 }}
                            />
                            <Input
                                onChangeText={name => this.setState({ name })}
                                value={this.state.name}
                                placeholder="Nombre"
                                placeholderTextColor="#3490dc"
                                style={{ color: "#3490dc" }}
                            />
                        </Item>
                        <Item rounded style={{ marginTop: 25 }}>
                            <Icon
                                type="SimpleLineIcons"
                                name="people"
                                style={{ color: "#3490dc", fontSize: 25 }}
                            />
                            <Input
                                onChangeText={lastname => this.setState({ lastname })}
                                value={this.state.lastname}
                                placeholder="Apellido"
                                placeholderTextColor="#3490dc"
                                style={{ color: "#3490dc" }}
                            />
                        </Item>
                        <Item rounded style={{ marginTop: 25 }}>
                            <Icon
                                type="MaterialCommunityIcons"
                                name="numeric"
                                style={{ color: "#3490dc", fontSize: 25 }}
                            />
                            <Input
                                keyboardType="numeric"
                                maxLength={13}
                                onChangeText={dpi => this.setState({ dpi })}
                                value={this.state.dpi}
                                placeholder="Dpi"
                                placeholderTextColor="#3490dc"
                                style={{ color: "#3490dc" }}
                            />
                        </Item>
                        <Item rounded style={{ marginTop: 25 }}>
                            <Icon
                                type="MaterialCommunityIcons"
                                name="email-outline"
                                style={{ color: "#3490dc", fontSize: 25 }}
                            />
                            <Input
                                onChangeText={email => this.setState({ email })}
                                value={this.state.email}
                                placeholder="Email"
                                placeholderTextColor="#3490dc"
                                style={{ color: "#3490dc" }}
                            />
                        </Item>
                        <Item rounded style={{ marginTop: 25 }}>
                            <Icon
                                type="AntDesign"
                                name="phone"
                                style={{ color: "#3490dc", fontSize: 25 }}
                            />
                            <Input
                                keyboardType="numeric"
                                maxLength={8}
                                onChangeText={phone => this.setState({ phone })}
                                value={this.state.phone}
                                placeholder="Teléfono"
                                placeholderTextColor="#3490dc"
                                style={{ color: "#3490dc" }}
                            />
                        </Item>
                        <Item rounded style={{ marginTop: 25 }}>
                            <Icon
                                type="SimpleLineIcons"
                                name="lock"
                                style={{ color: "#3490dc", fontSize: 25 }}
                            />
                            <Input
                                textContentType="password"
                                secureTextEntry={true}
                                onChangeText={password => this.setState({ password })}
                                value={this.state.password}
                                placeholder="Contraseña"
                                placeholderTextColor="#3490dc"
                                style={{ color: "#3490dc" }}
                            />
                        </Item>
                        <Item rounded style={{ marginTop: 25 }}>
                            <Icon
                                type="SimpleLineIcons"
                                name="lock"
                                style={{ color: "#3490dc", fontSize: 25 }}
                            />
                            <Input
                                textContentType="password"
                                secureTextEntry={true}
                                onChangeText={confirmPassword =>
                                    this.setState({ confirmPassword })
                                }
                                value={this.state.confirmPassword}
                                placeholder="Confirmar contraseña"
                                placeholderTextColor="#3490dc"
                                style={{ color: "#3490dc" }}
                            />
                        </Item>
                        <Content>
                            <ListItem listBorderColor="transparent">
                                <CheckBox
                                    checked={this.state.checkTerm}
                                    onPress={() => this.setState({ checkTerm: !this.state.checkTerm })}
                                    color="#1B2853"
                                />
                                <Body>
                                    <Button
                                        transparent
                                        uppercase={false}
                                        vertical
                                        onPress={() =>
                                            Linking.openURL("http://10x.org/privacypolicy/")
                                        }
                                    >
                                        <Text
                                            uppercase={false}
                                            style={{
                                                fontSize: 15,
                                                color: "#3490dc",
                                                fontWeight: "bold",
                                                textDecorationLine: "underline",
                                                textTransform: "none"
                                            }}
                                        >
                                            Aceptar Términos y condiciones
                      </Text>
                                    </Button>
                                </Body>
                            </ListItem>
                        </Content>
                    </Form>

                </Content>
                <FooterTabsNavigationIconText navigation={this.props.navigation} />
            </Container>
        );
    }
}

const mapStateToProps = ({ awardReducer, usuariosReducer }) => {
    return { awardReducer, usuariosReducer };
}

const mapDispatchProps = {
    ...awardActions,
    ...loginActions,
}

export default withNavigation(
    connect(mapStateToProps, mapDispatchProps)(DenounceScreen)
);