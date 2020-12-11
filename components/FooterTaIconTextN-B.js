import React, { Component } from "react";
import { View, Footer, FooterTab, Button, Icon, Text } from "native-base";
class FooterTabsNavigationIconText extends Component {
  constructor(props) {
    super();
  }

  render() {
    //const { navigation } = this.props.navigation
    //console.log("footer: ", this.props);
    return (
      <View>
        <Footer >
          <FooterTab style={{ backgroundColor: '#ed913b' }}>
            <Button
              vertical
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Icon style={{ color: '#FFFFFF' }} name="newspaper" type="FontAwesome5" />
              <Text style={{ color: '#FFFFFF' }}>Noticias</Text>
            </Button>
            <Button
              vertical
              onPress={() => this.props.navigation.navigate("TeamScreen")}
            >
              <Icon style={{ color: '#FFFFFF' }} name="hard-hat" type="FontAwesome5" />
              <Text style={{ color: '#FFFFFF' }}>Tecun</Text>
            </Button>
            <Button
              vertical
              onPress={() => this.props.navigation.navigate("GamesScreen")}
            >
              <Icon style={{ color: '#FFFFFF' }} name="gamepad" type="FontAwesome5" />
              <Text style={{ color: '#FFFFFF' }}>Juegos</Text>
            </Button>
          </FooterTab>
        </Footer>


        <Button rounded style={{ backgroundColor: '#e3342f', right: 20, bottom: 80, position: "absolute", flex: 1, zIndex: 100 }}
          onPress={() => this.props.navigation.navigate("DenounceScreen")}>
          <Icon name="bell" type="FontAwesome5" />
        </Button>
      </View>

    );
  }
}

export default FooterTabsNavigationIconText;
