import {View, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import React from 'react';

type Props = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  flex?: number;
  elevation?: number;
};

const Row: React.FC<Props> = ({children, flex = 0, style}) => {
  return <View style={[styles.row, {flex: flex}, style]}>{children}</View>;
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 2,
    marginTop: 1,
    marginLeft: 16,
    marginRight: 16,
    alignItems: 'center',
  },
});
export default Row;
