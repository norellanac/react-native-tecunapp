import React, {Component} from 'react';
import {View, Footer, FooterTab, Button, Icon, Text} from 'native-base';

import {withNavigation} from 'react-navigation';

class FooterTabsNavigationIconText extends Component {
  render() {
    return (
      <Footer>
          <FooterTab style={{ backgroundColor: '#1B2853'}}>
            <Button
            vertical
            onPress={() => 
            this.props.navigation.navigate('CategoriesRoute')}>
              <Icon style={{ color: '#FFFFFF' }} type="FontAwesome" name="gift" />
              <Text style={{ color: '#FFFFFF' }}>Premios</Text>
            </Button>
            <View style={{ marginTop: 3, }}>
              <Text style={{ color: '#F4A01C', fontSize: 30, }} type="Entypo" name="flow-line" > | </Text>
            </View>
            <Button
              vertical
              onPress={() =>
                this.props.navigation.navigate('StickersPageRoute')
              }>
              <Icon style={{ color: '#FFFFFF' }} type="MaterialCommunityIcons" name="sticker" />
              <Text style={{ color: '#FFFFFF' }}>Canjear</Text>
            </Button>
            <View style={{ marginTop: 3, }}>
              <Text style={{ color: '#F4A01C', fontSize: 30, }} type="Entypo" name="flow-line" > | </Text>
            </View>
            <Button
              vertical
              onPress={() => this.props.navigation.navigate('ProfileRoute')}>
              <Icon style={{ color: '#FFFFFF' }} type="AntDesign" name="user" />
              <Text style={{ color: '#FFFFFF' }}>Perfil</Text>
            </Button>
          </FooterTab>
        </Footer>
    );
  }
}

export default withNavigation(FooterTabsNavigationIconText);
