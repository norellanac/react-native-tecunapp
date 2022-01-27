import React, { useContext, useEffect, useState } from "react";
import { Image, SafeAreaView, Dimensions, ImageBackground } from "react-native";
import { Col, Grid, Row } from "react-native-easy-grid";
import {
  Container,
  Content,
  Text,
  Card,
  CardItem,
  Button,
  Icon,
  Form,
  Item,
  Input,
  Spinner,
} from "native-base";

import { apiUrl, myStyles } from "../App";
import { useDispatch, useSelector, connect } from "react-redux";
import * as loginActions from "../src/actions/loginActions";
import * as userActions from "../src/actions/userActions";
import PostsScreen from "./PostsScreen";

import { useForm } from "../src/hooks/useForm";
import {StackScreenProps} from '@react-navigation/stack';
interface Props extends StackScreenProps<any, any> {}

const LoginScreen = ({navigation}: Props) => {
  const [isDisplayAlert, setIsDisplayAlert] = useState(true);
  const [errorMessage, setErrorMessage] = useState("error inesperado");
  const loginReducer = useSelector((store) => store.loginReducer);
  const dispatch = useDispatch();
  const { email, password, onChange } = useForm({
    email: ``,
    password: ``,
  });

  useEffect(() => {
    // Logging the event that component is mount on first render
    setIsDisplayAlert(true);
    setErrorMessage(null);
    console.log(
      "changing legacy code",
      loginReducer,
      "loginActions: ",
      loginActions,
      "userActions:",
      userActions,
      "navigation: ",
      navigation
    );
  }, []);

  const showAlert = () => {
    if (errorMessage && isDisplayAlert) {
      return (
        <Card style={{ marginTop: 0, marginLeft: 0, marginRight: 0 }}>
          <CardItem style={{ backgroundColor: "#1B2853" }}>
            <Image
              source={{ uri: `${apiUrl.link}/img/not-found.png` }}
              style={{ width: 25, height: 25 }}
            />
            <Col size={4}>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 15,
                  fontWeight: "bold",
                  color: "#fff",
                }}
              >
                {errorMessage}
              </Text>
            </Col>
            <Button
              onPress={() => setIsDisplayAlert(false)}
              transparent
              rounded
            >
              <Icon name="close" />
            </Button>
          </CardItem>
        </Card>
      );
    }
  };

  const userData = async () => {
    console.log("trying to dispatch an action --reducer");
    await dispatch(loginActions.ldapLoginRegister(email, password));
    if (loginReducer.isLdap) {
      console.log("call data");
      dispatch(loginActions.traerToken(email, password));
      dispatch(userActions.traerUser(loginReducer.token));
    }
    onChange("", "password");
    if (loginReducer.error) {
      console.log("display error: ", loginReducer.error);
      setIsDisplayAlert(true);
      setErrorMessage(loginReducer.error);
    }
  };

  const ponerContenido = () => {
    if (loginReducer.cargando) {
      return <Spinner color="blue" style={{ flex: 1 }} />;
    }
    return (
      <Grid>
        <Col style={{ alignItems: "center" }}>
          <Button
            onPress={userData}
            rounded
            large
            style={{
              backgroundColor: myStyles.bg2,
              borderBottomLeftRadius: 20,
              borderTopLeftRadius: 20,
              borderBottomRightRadius: 20,
              borderTopRightRadius: 20,
              alignSelf: "center",
            }}
          >
            <Text style={{ fontWeight: "bold" }}> Ingresar </Text>
          </Button>
        </Col>
      </Grid>
    );
  };

  const ponerError = () => {
    if (loginReducer.error) {
      return (
        <Col style={{ alignItems: "center", marginBottom: 15 }}>
          <Text style={{ color: "white" }}>
            Correo o Contraseña incorrecta intenta de nuevo
          </Text>
        </Col>
      );
    }
  };

  let screenWidth = Dimensions.get("window").width;
  let screenHeight = Dimensions.get("window").height;
  if (loginReducer.isAuth) {
    return <PostsScreen navigation={navigation} />;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container style={{ flex: 1, backgroundColor: "transparent" }}>
        <ImageBackground
          style={{ flex: 1, width: screenWidth + 5 }}
          source={{ uri: apiUrl.link + "/img/app/" + "pi1.png" }}
        >
          {showAlert()}
          <Content>
            <Image
              style={{
                width: screenWidth - 100,
                height: screenWidth - 210,
                alignSelf: "center",
                marginTop: screenHeight / 4,
              }}
              source={{ uri: apiUrl.link + "/img/app/" + "login-logo.png" }}
            />
            <Form style={{ marginRight: 45, marginLeft: 45, marginTop: 50 }}>
              <Item rounded>
                <Icon
                  type="FontAwesome"
                  name="user-o"
                  style={{ color: "white", fontSize: 25 }}
                />
                <Input
                  keyboardType="email-address"
                  textContentType="emailAddress"
                  onChangeText={(value) => onChange(value, "email")}
                  value={email}
                  placeholder="Correo"
                  placeholderTextColor="#FFFFFF"
                  style={{ color: "white" }}
                />
              </Item>
              <Item rounded style={{ marginTop: 25 }}>
                <Icon
                  type="MaterialCommunityIcons"
                  name="lock-open-outline"
                  style={{ color: "white", fontSize: 25 }}
                />
                <Input
                  textContentType="password"
                  secureTextEntry={true}
                  onChangeText={(value) => onChange(value, "password")}
                  value={password}
                  placeholder="Contraseña"
                  placeholderTextColor="#FFFFFF"
                  style={{ color: "white" }}
                />
              </Item>
            </Form>
            <Card transparent>
              <CardItem
                style={{ backgroundColor: "transparent", marginTop: 20 }}
              >
                <Grid>
                  <Row>{ponerError()}</Row>
                  <Row>{ponerContenido()}</Row>
                </Grid>
              </CardItem>
            </Card>
          </Content>
        </ImageBackground>
      </Container>
    </SafeAreaView>
  );
};

const mapStateToProps = ({ loginReducer, usuariosReducer }) => {
  //return reducers.loginReducer; /*   DE TODOS LOS REDUCERS MAPEAMOS el reducer de usuarios devolvera los suauiros en los props del componente */
  return { loginReducer, usuariosReducer };
};

const mapDispatchProps = {
  ...loginActions,
  ...userActions,
};
export default connect(mapStateToProps, mapDispatchProps)(LoginScreen);
