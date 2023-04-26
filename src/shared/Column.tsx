import {View, Text, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import React from 'react';

type Props = {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
  align?: 'center' | 'flex-start' | 'flex-end';
  alignSelf?: 'center' | 'flex-start' | 'flex-end';
};

const Column: React.FC<Props> = ({
  children,
  align = 'center',
  alignSelf = 'flex-start',
  style,
}) => {
  return (
    <View
      style={[styles.row, {alignItems: align}, {alignSelf: alignSelf}, style]}>
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'column',
  },
});
export default Column;
