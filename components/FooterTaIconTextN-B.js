import React, { Component } from "react";
import { View, Footer, FooterTab, Button, Icon, Text } from "native-base";
class FooterTabsNavigationIconText extends Component {
  constructor(props) {
    super();
  }

  render() {
    //const { navigation } = this.props.navigation
    console.log("footer: ", this.props);
    return (
      <Footer>
        <FooterTab>
          <Button
            vertical
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Icon name="apps" />
            <Text>Apps</Text>
          </Button>
          <Button
            vertical
            onPress={() => this.props.navigation.navigate("Settings")}
          >
            <Icon name="settings" />
            <Text>Setting</Text>
          </Button>
          <Button
            vertical
            active
            onPress={() => this.props.navigation.navigate("User")}
          >
            <Icon name="user" type="FontAwesome" />
            <Text>User</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default FooterTabsNavigationIconText;
