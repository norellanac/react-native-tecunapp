import React, { Component } from "react";
import {
  Dimensions,
  Share,
  ScrollView,
  PermissionsAndroid,
  Alert,
} from "react-native";
import { WebView } from "react-native-webview";
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
  Grid,
  Col,
  CardItem,
  Textarea,
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
import * as DocumentPicker from "expo-document-picker";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import HeaderCustom from "../components/HeaderCustom";
import HederPostSection from "../components/HederPostSection";
import { apiUrl } from "../App";
import Loading from "./../components/Loading";

class JobShowScreen extends Component {
  constructor() {
    super();
  }
  state = {
    search: "",
    jobId: null,
    content: "",
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

  async componentDidMount() {}

  _pickDocument = async () => {
    if (Platform.OS === "android") {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: "Permisos de accesso a su SD",
            message:
              "Permitir el acceso para acceder a sus documentos de la SD, al momento de aceptar podra seleccionar el documento deseado",
            buttonPositive: "ok",
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("You can use the storage");
        } else {
          console.log("permission denied");
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }

    let email = this.props.usuariosReducer.user.email;

    let token = this.props.usuariosReducer.token;

    let result = await DocumentPicker.getDocumentAsync({});

    if (result.uri) {
      //console.log("result ",result);
      await this.props.UploadDocument(result, email, token);

      if (result.name) {
        Alert.alert(
          "Carga exitosa",
          `El documente seleccionado es ${result.name}`,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }
    } else {
      Alert.alert(
        "Nota: ",
        `No fue seleccionado ningun documento, intente de nuevo`,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );
    }
  };

  async sendMessage() {
    //console.log("jobReducer ", this.props.jobsReducer);

    let token = this.props.usuariosReducer.token;
    let title = this.props.jobsReducer.job.title;
    let name = this.props.usuariosReducer.user.name;
    let lastname = this.props.usuariosReducer.user.lastname;
    let email = this.props.usuariosReducer.user.email;
    let phone = this.props.usuariosReducer.user.phone;
    let emailCompany = this.props.jobsReducer.job.email;
    let pdfNameToStore = this.props.jobsReducer.document;
    let content = this.state.content;

    let objectMessage = {
      'title': title,
      'name': name,
      'lastname': lastname,
      'email': email,
      'phone': phone,
      'emailCompany': emailCompany,
      'content': content,
    };

    if (!pdfNameToStore) {
      Alert.alert(
        "Nota:",
        `Documento no cargado, por favor intente nuevamente seleccionando su curriculum en pdf`,
        [{ text: "OK", onPress: () => console.log("OK Pressed") }],
        { cancelable: false }
      );

    } else {

      await this.props.apply(objectMessage, pdfNameToStore, token);

      this.props.jobsReducer.document = null;

      if (this.props.jobsReducer.message) {
        Alert.alert(
          "Postulacion Correcta",
          `${this.props.jobsReducer.message}`,
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      }

    }
  }

  render() {
    var screenWidth = Dimensions.get("window").width;
    //const { navigation } = this.props.navigation

    //console.log("jobsReducer? ", this.props.jobsReducer);

    if (this.props.jobsReducer.cargando) {
      return (
        <Container>
          <HeaderCustom navigation={this.props.navigation} />
          <HederPostSection navigation={this.props.navigation} />
          <Loading />
          <FooterTabsNavigationIconText navigation={this.props.navigation} />
        </Container>
      );
    }

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
            <Text style={{ marginLeft: 20 }}>
              {this.props.jobsReducer.job.description}
            </Text>
            <Text> </Text>
            <HTML
              source={{ html: this.props.jobsReducer.job.skils }}
              contentWidth={screenWidth}
            />
          </ScrollView>
          <Button
            style={{ marginBottom: 3 }}
            block
            success
            onPress={() =>
              this.shareMesage(this.props.jobsReducer.job.public_link)
            }
            title="Share"
          >
            <Text>Compartir</Text>
            <Icon name="whatsapp" type="FontAwesome" />
          </Button>
          <Form style={{ marginLeft: 10, marginRight: 10, marginTop: 20 }}>
            <Button
              style={{ marginBottom: 3 }}
              block
              success
              onPress={this._pickDocument}
            >
              <Text>Adjuntar pdf</Text>
              <Icon name="pdf" type="FontAwesome" />
            </Button>
            <Textarea
              rowSpan={5}
              onChangeText={(content) => this.setState({ content })}
              value={this.state.content}
              bordered
              style={{ borderRadius: 15 }}
              placeholder="Contestar preguntas"
            />

            <Button
              style={{
                borderRadius: 15,
                marginTop: 10,
                marginBottom: 5,
                marginLeft: screenWidth / 4 + 18,
              }}
              onPress={() => this.sendMessage()}
            >
              <Icon name="send" type="FontAwesome" />
              <Text>Aplicar</Text>
            </Button>
          </Form>
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
