import React, {Component} from 'react';
import {View, Footer, FooterTab, Button, Icon, Text} from 'native-base';
class FooterTabsNavigationIconText extends Component {
  constructor(props) {
    super();
  }
  
  
  render() {
    //const { navigation } = this.props.navigation
    console.log('footer: ', this.props);
    return (
      <Footer>
          <FooterTab style={{ backgroundColor: '#1B2853'}}>
            <Button
            vertical
            onPress={() => this.props.navigation.navigate('Home')}>
              <Icon style={{ color: '#FFFFFF' }} type="FontAwesome" name="gift" />
              <Text style={{ color: '#FFFFFF' }}>Home</Text>
            </Button>
            <View style={{ marginTop: 3, }}>
              <Text style={{ color: '#F4A01C', fontSize: 30, }} type="Entypo" name="flow-line" > | </Text>
            </View>
            <Button
              vertical
              onPress={() =>
                this.props.navigation.navigate('LoginScreen')
              }>
              <Icon style={{ color: '#FFFFFF' }} type="MaterialCommunityIcons" name="sticker" />
              <Text style={{ color: '#FFFFFF' }}>Login</Text>
            </Button>
            <View style={{ marginTop: 3, }}>
              <Text style={{ color: '#F4A01C', fontSize: 30, }} type="Entypo" name="flow-line" > | </Text>
            </View>
            <Button
              vertical
              onPress={() => this.props.navigation.navigate('Detail')}>
              <Icon style={{ color: '#FFFFFF' }} type="AntDesign" name="user" />
              <Text style={{ color: '#FFFFFF' }}>Register</Text>
            </Button>
          </FooterTab>
        </Footer>
    );
  }
}

export default FooterTabsNavigationIconText;
