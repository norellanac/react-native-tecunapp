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
    CardItem,
    Input,
    CheckBox,
    Textarea,
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
            return (
                <Container>
                    <HeaderCustom navigation={this.props.navigation} />
                    < Loading />
                    <FooterTabsNavigationIconText navigation={this.props.navigation} />
                </Container>
            )
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
                    <CardItem style={{ backgroundColor: "transparent" }}>
                        <Grid>
                            <Col style={{ alignItems: "center" }}>
                                <Text
                                    style={{
                                        fontSize: 30,
                                        color: "#3490dc",
                                        fontWeight: "bold"
                                    }}
                                >
                                    Línea de denuncia
                    </Text>
                            </Col>
                        </Grid>
                    </CardItem>
                    <Form style={{ marginRight: 20, marginLeft: 20, marginTop: 10 }}>
                        <Item style={{ marginTop: 25 }}>
                            <Textarea rowSpan={5}
                                placeholderTextColor="#3490dc"
                                style={{ color: "#3490dc" }}
                                placeholder="En breve, describe lo que sucedió, dónde ocurrió el suceso y quiénes estuvieron involucrados. El Gerente de Ética le dará seguimiento a tu caso. " />

                        </Item>
                        <Item rounded style={{ marginTop: 25 }}>
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
                        <Content style={{ marginTop: 20 }}>
                            <Body>
                                <Button
                                    onPress={this.consultacaptcha}
                                    rounded
                                    danger
                                    style={{
                                        fontSize: 44,
                                        color: "#3490dc"
                                    }}
                                >
                                    <Text
                                        style={{
                                            textAlign: "center",
                                            color: "#ffffff",
                                            fontSize: 20,
                                            marginRight: 35,
                                            marginLeft: 35
                                        }}
                                    >
                                        Reportar
        </Text>
                                </Button>
                            </Body>
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