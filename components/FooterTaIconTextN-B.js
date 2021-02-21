import React, { Component } from "react";
import { Linking } from "react-native";
import {myStyles} from '../App'
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
          <FooterTab style={{ backgroundColor: myStyles.light }}>
            <Button
              vertical
              onPress={() => this.props.navigation.navigate("Home")}
            >
              <Icon style={{ color: this.props.tab==1 ? myStyles.bg2 : '#6c757d' }} name="newspaper" type="FontAwesome5" />
              <Text style={{ color: this.props.tab==1 ? myStyles.bg2 : '#6c757d' }}>Noticias</Text>
            </Button>
            <Button
              vertical
              onPress={() => this.props.navigation.navigate("TeamScreen")}
            >
              <Icon style={{ color: this.props.tab==2 ? myStyles.bg2 : '#6c757d' }} name="hard-hat" type="FontAwesome5" />
              <Text style={{ color: this.props.tab==2 ? myStyles.bg2 : '#6c757d' }}>Tecun</Text>
            </Button>
            <Button
              vertical
              onPress={() => this.props.navigation.navigate("GamesScreen")}
            >
              <Icon style={{ color: this.props.tab==3 ? myStyles.bg2 : '#6c757d' }} name="gamepad" type="FontAwesome5" />
              <Text style={{ color: this.props.tab==3 ? myStyles.bg2 : '#6c757d' }}>Juegos</Text>
            </Button>
          </FooterTab>
        </Footer>

      </View>

    );
  }
}

export default FooterTabsNavigationIconText;
