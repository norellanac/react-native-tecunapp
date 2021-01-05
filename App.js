import * as React from "react";
import { Platform, StatusBar, StyleSheet, View, Text } from "react-native";
import { AppLoading, LinearGradient } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import { Container, Root } from "native-base";
import AppIntroSlider from "react-native-app-intro-slider";
/*/*******redux persist storage*****/
//*****crear archivo "./src/reducers" from "App.js" */
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducers from "./src/reducers";
import reduxThunk from "redux-thunk";
import { AsyncStorage } from "react-native";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import image1 from "./assets/images/tecun/logoColor.png";
import image2 from "./assets/images/tecun/logoBlanco.png";
import image3 from "./assets/images/tecun/logoColor.png";
//const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//redux persisting
// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: "root",
  // Storage Method (React Native)
  storage: AsyncStorage,
  timeout: null,
  /* Whitelist (Save Specific Reducers)
	whitelist: [
	  'authReducer',
	],*/
  // Blacklist (Don't Save Specific Reducers)

  blacklist: ["demo"]
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(persistedReducer, applyMiddleware(reduxThunk));

export const persistor = persistStore(store);

export const apiUrl = {
  link: "http://157.55.181.102"
  //link: "http://192.168.1.44:3000"
};
//http://192.168.50.144:3000  
//http://172.18.0.3:3000
//redux persisting
/*/*******redux persist storage*****/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      android: {
        //marginTop: StatusBar.currentHeight
      }
    })
  },
  containerSlides: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 16
  }
});

const slides = [
  {
    key: "1",
    title: "Bienvenido",
    text: "NUEVA APP TECUN",
    image: image1,
    backgroundColor: "#1D578A"
  },
  {
    key: "2",
    title: "Novedades",
    text: "Noticias y Podcast",
    image: image2,
    backgroundColor: "#E87823"
  },
  {
    key: "3",
    title: "Ingresa al App",
    text: "Utiliza tu correo y contraseña para ingresar!",
    image: image3,
    backgroundColor: "#181e26"
  }
];

import MainStackNavigator from "./navigation/MainStackNavigator";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
      showSlides: true
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
    if (store.getState().usuariosReducer.token) {
      this.setState({ showSlides: false });
    }
  }

  renderSlide = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Text style={styles.title}>{item.title}</Text>
        <Image source={item.image} />
        <Text style={styles.text}>{item.text}</Text>
      </View>
    );
  };
  onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showSlides: false });
  };

  // Load any resources or data that we need prior to rendering the app
  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    } else {
      if (!this.state.showSlides) {
        return (
          <Provider store={store}>
            <Container style={styles.container}>
              <Root>
                <PersistGate persistor={persistor} loading={null}>
                  <MainStackNavigator />
                </PersistGate>
              </Root>
            </Container>
          </Provider>
        );
      } else {
        return (
          <AppIntroSlider
            showSkipButton
            renderItem={this.renderItem}
            slides={slides}
            onDone={this.onDone}
          />
        );
      }
    }
  }
}

export default App;
