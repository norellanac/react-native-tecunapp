import React from 'react';
import {View, Text, Image, StyleSheet, SafeAreaView} from 'react-native';
import { connect } from 'react-redux';

function HeaderCustom(props) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image
          source={require('../assets/images/robot-prod.png')}
          style={styles.logo}
        />
        <Text style={styles.textPoints}>{props.usuariosReducer.wallet.points} Puntos</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  logo: {
    width: 41,
    height: 35,
    resizeMode: 'contain',
  },
  textPoints: {
    fontSize: 20,
    color: '#EC4C17',
    fontWeight: 'bold',
    paddingVertical: 5,
  },
});

const MapStateToProps =({usuariosReducer }) => {
  return {
      usuariosReducer
  }
}

export default connect(MapStateToProps)(HeaderCustom);