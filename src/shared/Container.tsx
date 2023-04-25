import {ImageBackground, StyleSheet} from 'react-native';
import React from 'react';

type Props = {
  children: React.ReactNode;
};

const Container: React.FC<Props> = ({children}) => {
  return (
    <ImageBackground
      source={require('../assets/images/background_android.png')}
      resizeMode="cover"
      style={styles.image}>
      {children}
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  image: {
    flex: 1,
    flexDirection: 'column',
  },
});
export default Container;
