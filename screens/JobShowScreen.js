import React, { Component } from "react";
import { Dimensions, Share, ScrollView } from "react-native";
import { WebView } from 'react-native-webview';
import HTML from "react-native-render-html";
import { withNavigation } from "react-navigation";
import {
    Container,
    Content,
    View,
    Thumbnail,
    Form,
    Item,
    Input,
    Icon,
    Text,
    CardItem,
    Card,
    Button,
    Left,
    Right,
    Body,
} from "native-base";
import { connect } from "react-redux";
import * as jobsActions from "../src/actions/jobsActions";
import * as loginActions from "../src/actions/loginActions";
import FooterTabsNavigationIconText from "../components/FooterTaIconTextN-B";
import * as DocumentPicker from 'expo-document-picker';
import HeaderCustom from "../components/HeaderCustom";
import { persistor } from "../App";
import { SliderBox } from "react-native-image-slider-box";

import Loading from "./../components/Loading";

class JobShowScreen extends Component {
    constructor() {
        super();
    }
    state = {
        search: "",
        jobId: null,
    };

    shareMesage = async (text) => {
        try {
            const result = await Share.share({
                message: text,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    async componentDidMount() {

        //await this.props.getJobs(this.props.usuariosReducer.token);
        console.log("jobs props", this.props.jobsReducer);

        console.log("jobs state: ", this.state);
    }

    render() {
        var screenWidth = Dimensions.get("window").width;
        //const { navigation } = this.props.navigation

        if (this.props.jobsReducer.cargando) {
            console.log("jobsScreen: ", this.props);
            return (
                <Container>
                    <HeaderCustom navigation={this.props.navigation} />
                    <HederPostSection navigation={this.props.navigation}></HederPostSection>
                    < Loading />
                    <FooterTabsNavigationIconText navigation={this.props.navigation} />
                </Container>
            )
        }

        console.log("jobsProps: ", this.props);

        return (
            <Container>
                <HeaderCustom navigation={this.props.navigation} />
                <Content>

                    <Card style={{ flex: 0 }} key={this.props.jobsReducer.job.id}>
                        <CardItem style={{ backgroundColor: "transparent" }}>
                            <Left>
                                <Thumbnail
                                    style={{ backgroundColor: "#000000" }}
                                    source={require("../assets/images/robot-dev.png")}
                                />
                                <Body>
                                    <Text>{this.props.jobsReducer.job.title}</Text>
                                    <Text note>{this.props.jobsReducer.job.created_at}</Text>
                                </Body>
                            </Left>
                        </CardItem>
                    </Card>
                    <ScrollView style={{ flex: 1 }}>
                        <Text style={{ marginLeft: 20 }}>{this.props.jobsReducer.job.description}</Text>
                        <Text>  </Text>
                        <HTML source={{ html: this.props.jobsReducer.job.skils }} contentWidth={screenWidth} />
                    </ScrollView>
                    <Button style={{ marginBottom: 3 }} block success onPress={() => this.shareMesage(this.props.jobsReducer.job.public_link)} title="Share">
                        <Text>Compartir</Text>
                        <Icon name='whatsapp' type="FontAwesome" />
                    </Button>
                </Content>
                <FooterTabsNavigationIconText navigation={this.props.navigation} />
            </Container>
        );
    }
}



const mapStateToProps = ({ jobsReducer, usuariosReducer }) => {
    //return reducers.jobsReducer; /*   DE TODOS LOS REDUCERS MAPEAMOS el reducer de usuarios devolvera los suauiros en los props del componente */
    return { jobsReducer, usuariosReducer };
};

const mapDispatchProps = {
    ...jobsActions,
    ...loginActions,
};

export default withNavigation(
    connect(mapStateToProps, mapDispatchProps)(JobShowScreen)
);