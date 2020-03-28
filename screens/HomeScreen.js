import * as React from "react";
import {
  Image,
  Platform,
  StyleSheet,
  Dimensions,
  View
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  Container,
  Card,
  CardItem,
  Content,
  Thumbnail,
  FooterTab,
  Button,
  Left,
  Right,
  Body,
  Icon,
  Text
} from "native-base";
import { ScrollView } from "react-native-gesture-handler";
import * as WebBrowser from "expo-web-browser";
import FooterTabsNavigationIconText from "../components/FooterTaIconTextN-B";
import HeaderCustom from "../components/HeaderNews";

import { MonoText } from "../components/StyledText";

var screenWidth = Dimensions.get("window").width;
var screenHeight = Dimensions.get("window").height;

export default function HomeScreen(props) {
  const { navigation } = props;
  console.log("home: ", navigation);

  return (
    <Container>
      <HeaderCustom navigation={navigation} />
      <Content>
        <Card style={{ flex: 0 }}>
          <CardItem style={{ backgroundColor: "transparent" }}>
            <Left>
              <Thumbnail 
              style={{ backgroundColor: "black" }}
                source={require("../assets/images/robot-dev.png")}
              />
              <Body>
                <Text>Nueva Publicación</Text>
                <Text note>April 15, 2016</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem style={{ backgroundColor: "#181e26" }}>
            <Body>
              <Image
                source={require("../assets/images/robot-dev.png")}
                style={{ width: screenWidth-20, height: 150 }}
              />
              <Text style={{color: "white"}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam eos nostrum delectus omnis...s</Text>
            </Body>
          </CardItem>
          <CardItem>
          <Left>
              <Button transparent textStyle={{ color: "#87838B" }}>
                <Icon name="heart" type="FontAwesome" />
                <Text>1,926 Likes</Text>
              </Button>
            </Left>
            <Right>
              <Button transparent textStyle={{ color: "#87838B" }}>
                <Icon name="comment" type="FontAwesome" />
                <Text>1,926 Comentarios</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>

        <Card style={{ flex: 0 }}>
          <CardItem style={{ backgroundColor: "transparent" }}>
            <Left>
              <Thumbnail 
              style={{ backgroundColor: "black" }}
                source={require("../assets/images/robot-dev.png")}
              />
              <Body>
                <Text>Nueva Publicación</Text>
                <Text note>April 15, 2016</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem style={{ backgroundColor: "#181e26" }}>
            <Body>
              <Image
                source={require("../assets/images/robot-dev.png")}
                style={{ width: screenWidth-20, height: 150 }}
              />
              <Text style={{color: "white"}}>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam eos nostrum delectus omnis...s</Text>
            </Body>
          </CardItem>
          <CardItem>
          <Left>
              <Button transparent textStyle={{ color: "#87838B" }}>
                <Icon name="heart" type="FontAwesome" />
                <Text>1,926 Likes</Text>
              </Button>
            </Left>
            <Right>
              <Button transparent textStyle={{ color: "#87838B" }}>
                <Icon name="comment" type="FontAwesome" />
                <Text>1,926 Comentarios</Text>
              </Button>
            </Right>
          </CardItem>
        </Card>
      
      </Content>
      <FooterTabsNavigationIconText navigation={navigation} />
    </Container>
  );
}

HomeScreen.navigationOptions = {
  header: null
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/development-mode/"
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change"
  );
}
