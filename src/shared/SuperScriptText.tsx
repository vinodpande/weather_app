import {View, Text, Pressable, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Utils} from '../../utils/Utils';

type Props = {
  text: string;
};

const SuperScriptText: React.FC<Props> = ({text}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <Text style={[{fontSize: 8, color: '#FFF'}]}>o</Text>
      <Text style={[{fontSize: 13, lineHeight: 27, color: '#FFF'}]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    height: 30,
    width: 28,
    backgroundColor: 'transparent',
    borderRadius: 2,
    borderRadColor: '#FFF',
    justifyContent: 'center',
  },
  buttonHighLight: {
    flexDirection: 'row',
    height: 30,
    width: 28,
    backgroundColor: '#FFF',
    borderRadius: 2,
    borderColor: '#FFF',
    justifyContent: 'center',
  },
  text: {
    color: '#FFF',
  },
  textHighLight: {
    color: '#E32843',
  },
});
export default SuperScriptText;
