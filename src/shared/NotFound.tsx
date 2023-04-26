import {View, StyleSheet} from 'react-native';
import React from 'react';
import TextLabel from './TextLabel';

type Props = {
  label: string;
};

const NotFound: React.FC<Props> = ({label = 'Page Not Found'}) => {
  return (
    <View style={styles.conainer}>
      <TextLabel type="favourite">{label}</TextLabel>
    </View>
  );
};

const styles = StyleSheet.create({
  conainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default NotFound;
