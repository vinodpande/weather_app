import {View, Text, StyleSheet, ImageBackground} from 'react-native';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Card: React.FC<Props> = ({children}) => {
  return (
    <ImageBackground
      source={require('../assets/images/background_android.png')}
      resizeMode="cover"
      style={styles.card}>
      {children}
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  card: {
    height: 80,
    marginTop: 1,
    marginLeft: 16,
    marginRight: 16,
  },
});
export default Card;
