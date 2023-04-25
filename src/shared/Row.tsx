import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

type Props = {
  children: React.ReactNode;
  flex?: number;
  elevation?: number;
};

const Row: React.FC<Props> = ({children, flex = 1}) => {
  return <View style={[styles.row, {flex: flex}]}>{children}</View>;
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
