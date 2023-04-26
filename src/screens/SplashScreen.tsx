import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Container from '../shared/Container';
import {Image} from 'react-native';
type Props = {};

const SplashScreen = (props: Props) => {
  return (
    <Container>
      <View style={styles.conainer}>
        <Image
          source={require('../assets/images/logo_splash.png')}
          style={styles.image_log}
        />
      </View>
    </Container>
  );
};

const styles = StyleSheet.create({
  conainer: {flex: 1, justifyContent: 'center'},
  image_log: {
    width: 170,
    height: 36,
    alignSelf: 'center',
  },
});
export default SplashScreen;
