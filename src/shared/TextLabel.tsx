import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

type Props = {
  children: React.ReactNode;
  type:
    | 'date'
    | 'city'
    | 'favourite'
    | 'temp'
    | 'recentLabel'
    | 'recentTemp'
    | 'recentDes'
    | 'recentSearchLabel'
    | 'searchLabel';
};

const TextLabel: React.FC<Props> = props => {
  return (
    <Text style={[styles.text, styles[props.type]]}>{props.children}</Text>
  );
};
const styles = StyleSheet.create({
  text: {
    marginTop: 10,
  },
  date: {
    color: '#FFFFFF',
    textTransform: 'uppercase',
    fontSize: 13,
  },
  city: {
    color: '#FFFFFF',
    textTransform: 'capitalize',
    fontSize: 18,
  },
  favourite: {
    color: '#FFFFFF',
    marginTop: 0,
    fontSize: 13,
    marginLeft: 7,
  },
  temp: {
    color: '#FFFFFF',
    marginTop: 15,
    fontSize: 52,
  },
  recentLabel: {
    color: '#FFE539',
    fontSize: 15,
  },
  recentTemp: {
    color: '#FFFFFF',
    marginTop: 0,
    fontSize: 18,

    fontWeight: 800,
  },
  recentDes: {
    color: '#FFFFFF',
    marginTop: 0,
    fontSize: 14,
    marginLeft: 7,
  },
  recentSearchLabel: {
    color: '#FFFFFF',
    fontSize: 13,
    marginTop: 7,
    marginBottom: 24,
  },
  searchLabel: {
    color: '#000000',
    fontSize: 14,
  },
});
export default TextLabel;
