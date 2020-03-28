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
      <Footer >
        <FooterTab style={{ backgroundColor: '#ed913b'}}>
          <Button
            vertical
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Icon style={{ color: '#FFFFFF' }}  name="newspaper-o" type="FontAwesome" />
            <Text style={{ color: '#FFFFFF' }}>Tecun News</Text>
          </Button>
          <Button
            vertical
            onPress={() => this.props.navigation.navigate("Settings")}
          >
            <Icon style={{ color: '#FFFFFF' }}  name="ticket" type="FontAwesome" />
            <Text style={{ color: '#FFFFFF' }}>Tecun Club</Text>
          </Button>
          <Button
            vertical
            onPress={() => this.props.navigation.navigate("User")}
          >
            <Icon style={{ color: '#FFFFFF' }}  name="users" type="FontAwesome5" />
            <Text style={{ color: '#FFFFFF' }}>User</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

export default FooterTabsNavigationIconText;
