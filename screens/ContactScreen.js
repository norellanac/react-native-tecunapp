import React, { Component, useEffect } from "react";
import { Dimensions, Linking } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import {
    Container,
    Content,
    Form,
    Item,
    Icon,
    Text,
    Accordion,
    Input,
    View,
    CardItem,
    Body,
    Button
} from "native-base";
import { connect } from "react-redux";
import * as loginActions from "../src/actions/loginActions";
import * as contactsActions from "../src/actions/contactsActions";
import * as userActions from "../src/actions/userActions";
import FooterTabsNavigationIconText from "../components/FooterTaIconTextN-B";
import HeaderCustom from "../components/HeaderCustom";
import { persistor } from "../App";
import { withNavigation } from "react-navigation";
import Loading from "./../components/Loading";

class ContactScreen extends Component {
    constructor() {
        super();
    }
    state = {
        searchNombre: "",
        searchDepartamento: "",
        searchPais: "",
        searchPuesto: "",
        records: [],
        dataArray: [
            { title: "First Element", content: "Lorem ipsum dolor sit amet" },
            { title: "Second Element", content: "Lorem ipsum dolor sit amet" },
            { title: "Third Element", content: "Lorem ipsum dolor sit amet" }
        ]

    };

    _renderHeader(item, expanded) {
        return (
            <View style={{
                flexDirection: "row",
                padding: 10,
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "#F7F7F7"
            }}>
                <Text style={{ fontWeight: "600", color: "#3490dc" }}>
                    {" "}{item.nombre}
                </Text>
                {expanded
                    ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
                    : <Icon style={{ fontSize: 18 }} name="add-circle" />}
            </View>
        );
    }
    _renderContent(item) {
        return (
            <View>
                <Text
                    style={{
                        backgroundColor: "#e3f1f1",
                        padding: 10,
                        fontStyle: "italic",
                    }}
                >
                    {item.nombre}
                </Text>
                <Text
                    style={{
                        backgroundColor: "#e3f1f1",
                        padding: 10,
                        fontStyle: "italic",
                    }}
                >
                    {item.departamento} | {item.puesto}
                </Text>
                <Button success  textStyle={{ color: "#87838B" }} 
                onPress={() => Linking.openURL(`mailto:${item.correo}`)}  >
                    <Icon name="phone" type="FontAwesome" />
                    <Text>{item.correo}</Text>
                </Button>
                <Button success rounded textStyle={{ color: "#87838B" }} onPress={() => Linking.openURL(`tel:${item.comentarios}`)}  >
                    <Icon name="phone" type="FontAwesome" />
                    <Text>{item.comentarios}</Text>
                </Button>
            </View>
        );
    }

    async componentDidMount() {
        await this.props.clearContactsAction();
    }
    async searchContactData(token) {
        await this.props.searchContactsAction(this.state.searchNombre, this.state.searchDepartamento, this.state.searchPais, this.state.searchPuesto, token);
        //await this.props.
        console.log("entra a buscar en la pantalla: ", this.props.contactsReducer.contacts);
        //this.props.navigation.navigate('ContactScreen');
    }


    render() {
        var screenWidth = Dimensions.get("window").width - 1;
        var hg = Dimensions.get("window").width - 150;

        if (this.props.usuariosReducer.cargando) {
            return (
                <Container>
                    <HeaderCustom navigation={this.props.navigation} />
                    < Loading />
                    <FooterTabsNavigationIconText navigation={this.props.navigation} />
                </Container>
            )
        }


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
                                    Buscar contacto
                    </Text>
                            </Col>
                        </Grid>
                    </CardItem>
                    <Form style={{ marginRight: 20, marginLeft: 20, marginTop: 10 }}>
                        <Item rounded style={{ marginTop: 25 }}>
                            <Icon
                                type="SimpleLineIcons"
                                name="people"
                                style={{ color: "#3490dc", fontSize: 25 }}
                            />
                            <Input
                                onChangeText={searchDepartamento => this.setState({ searchDepartamento })}
                                value={this.state.searchDepartamento}
                                placeholder="Departameto o area"
                                placeholderTextColor="#3490dc"
                                style={{ color: "#3490dc" }}
                            />
                        </Item>
                        <Item rounded style={{ marginTop: 25 }}>
                            <Icon
                                type="FontAwesome"
                                name="user-o"
                                style={{ color: "#3490dc", fontSize: 25 }}
                            />
                            <Input
                                onChangeText={searchNombre => this.setState({ searchNombre })}
                                value={this.state.searchNombre}
                                placeholder="Apellidos, Nombres"
                                placeholderTextColor="#3490dc"
                                style={{ color: "#3490dc" }}
                            />
                        </Item>
                        <Item rounded style={{ marginTop: 25 }}>
                            <Icon
                                type="MaterialCommunityIcons"
                                name="map"
                                style={{ color: "#3490dc", fontSize: 25 }}
                            />
                            <Input
                                keyboardType="numeric"
                                maxLength={13}
                                onChangeText={searchPais => this.setState({ searchPais })}
                                value={this.state.searchPais}
                                placeholder="Pais"
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
                                onChangeText={searchPuesto => this.setState({ searchPuesto })}
                                value={this.state.searchPuesto}
                                placeholder="Plaza o puesto"
                                placeholderTextColor="#3490dc"
                                style={{ color: "#3490dc" }}
                            />
                        </Item>
                        <Content style={{ marginTop: 20 }}>
                            <Body>
                                <Button
                                    onPress={() => this.searchContactData(this.props.usuariosReducer.token)}
                                    rounded
                                    primary
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
                                        Buscar
                                    </Text>
                                </Button>
                            </Body>
                        </Content>
                        <Content style={{ marginTop: 20 }}>
                            <Accordion
                                dataArray={this.props.contactsReducer.contacts}
                                animation={true}
                                expanded={true}
                                renderHeader={this._renderHeader}
                                renderContent={this._renderContent}
                            />
                        </Content>
                    </Form>


                </Content>
                <FooterTabsNavigationIconText navigation={this.props.navigation} />
            </Container>
        );
    }
}

const mapStateToProps = ({ usuariosReducer, loginReducer, contactsReducer }) => {
    return { usuariosReducer, loginReducer, contactsReducer };
}

const mapDispatchProps = {
    ...loginActions,
    ...userActions,
    ...contactsActions,
}

export default withNavigation(
    connect(mapStateToProps, mapDispatchProps)(ContactScreen)
);