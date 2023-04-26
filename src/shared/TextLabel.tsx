import {Text, StyleSheet} from 'react-native';
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
    | 'searchLabel'
    | 'precipitation'
    | 'headLabel'
    | 'modelLabel'
    | 'modelButton';
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
  precipitation: {
    color: '#FFFFFF',
    marginTop: 0,
    fontSize: 13,
    marginLeft: 0,
  },
  temp: {
    color: '#FFFFFF',
    marginTop: 15,
    fontSize: 52,
  },
  recentLabel: {
    color: '#FFE539',
    fontSize: 15,
    marginLeft: 16,
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
  headLabel: {
    flex: 1,
    color: '#292F33',
    fontSize: 20,
    fontWeight: '500',
    // fontFamily:'Roboto'
    marginLeft: 32,
    marginTop: 0,
  },
  modelLabel: {
    color: 'rgba(0,0,0,0.54)',
    fontSize: 16,
    letterSpacing: 0,
    lineHeight: 24,
    fontFamily: 'Roboto',
    paddingLeft: 24,
    paddingRight: 24,
  },
  modelButton: {
    width: 50,
    height: 36,
    color: '#673AB7',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
export default TextLabel;
