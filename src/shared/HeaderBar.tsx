import {View, Text, Button, StyleSheet, Image} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';

type Props = {};

const HeaderBar = (props: Props) => {
  return (
    <View style={style.container}>
      <Image
        source={require('../assets/images/icon_menu_white.png')}
        style={style.icon}
      />
      <Image
        source={require('../assets/images/logo_splash.png')}
        style={style.image_log}
      />
      <Image
        source={require('../assets/images/icon_search_white.png')}
        style={style.icon_right}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
  },
  icon: {
    width: 24,
    height: 24,
  },
  image_log: {
    width: 113,
    height: 24,
    marginLeft: 32,
  },
  icon_right: {
    width: 24,
    height: 24,
    marginLeft: 'auto',
  },
});
export default HeaderBar;
