import {View, Pressable, StyleSheet, Image} from 'react-native';
import React from 'react';
import TextLabel from '../TextLabel';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NavigationProp} from '@react-navigation/native';

type Props = {
  goto: Function;
  label?: string;
  showImage?: boolean;
  navigation: any;
};

const HeaderBar: React.FC<Props> = ({
  goto,
  label,
  showImage = false,
  navigation,
}) => {
  const backStyle = showImage
    ? {backgroundColor: 'transparent'}
    : {backgroundColor: '#FFF'};
  const iconColor = showImage ? '#FFF' : '#000';
  return (
    <View style={[style.container, backStyle]}>
      {showImage ? (
        <>
          <Pressable
            onPress={() => {
              navigation.openDrawer();
            }}>
            <Image
              source={require('../../assets/images/icon_menu_white.png')}
              style={style.icon}
            />
          </Pressable>
          <Image
            source={require('../../assets/images/logo_splash.png')}
            style={style.image_log}
          />
        </>
      ) : (
        <>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}>
            <Icon name="arrow-back" size={30} color={iconColor} />
          </Pressable>
          <TextLabel type="headLabel">{label}</TextLabel>
        </>
      )}
      <Pressable onPress={() => goto()} style={style.icon_right}>
        <Icon name="search" size={30} color={iconColor} />
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
