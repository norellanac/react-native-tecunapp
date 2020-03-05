import * as React from "react";
import { Platform, StatusBar, StyleSheet, Image } from "react-native";
import { SplashScreen, AppLoading } from "expo";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";

import { Container, Root } from "native-base";
//***********navegagion************ */
import { createAppContainer } from "react-navigation";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabNavigator from "./navigation/BottomTabNavigator";
import useLinking from "./navigation/useLinking";


//************SCREENS COMPONENTES********** */
//import A from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen' 
import RegisterScreen from './screens/RegisterScreen'


/***************componentes**************** */
import HeaderCustom from './components/HeaderCustom'

const Stack = createStackNavigator();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ gestureEnabled: false }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: 'My app' }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        initialParams={{ user: 'me' }}
      />
    </Stack.Navigator>
  );
}

//***********navegagion************ */

/*/*******redux persist storage*****/
//*****crear archivo "./src/reducers" from "App.js" */
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reducers from "./src/reducers";
import reduxThunk from "redux-thunk";
import { AsyncStorage } from "react-native";
import { persistStore, persistReducer } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

//const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

//redux persisting
// Middleware: Redux Persist Config
const persistConfig = {
  // Root
  key: "root",
  // Storage Method (React Native)
  storage: AsyncStorage,
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
  link: "http://canjeaton.com"
};
//redux persisting
/*/*******redux persist storage*****/

const AppContainer = createAppContainer(Stack);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Provider store={store}>
        <Container>
          <Root>
            <PersistGate persistor={persistor} loading={null}>
            <NavigationContainer> <AppContainer />
             </NavigationContainer>
              
            </PersistGate>
          </Root>
        </Container>
      </Provider>
    );
  }
}
