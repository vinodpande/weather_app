import {View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
import {RealmWeatherData} from '../realm/RealmWeatherData';
import Row from './Row';
import Column from './Column';
import TextLabel from './TextLabel';
import Card from './Card';
import SuperScriptText from './SuperScriptText';

type Props = {
  city: string;
  onSlectedCity: Function;
};

const SearchListItem: React.FC<Props> = ({city, onSlectedCity}) => {
  // console.log('Searchlist data', city);
  return (
    <Pressable onPress={() => onSlectedCity(city)}>
      <Row style={styles.row}>
        <TextLabel type="searchLabel">{city}</TextLabel>
      </Row>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    backgroundColor: '#FFF',
    marginLeft: 0,
    marginRight: 0,
    paddingLeft: 24,
    borderBottomColor: '#000',
    borderBottomWidth: 0.2,
    justifyContent: 'flex-start',

    paddingBottom: 14,
  },
});
export default SearchListItem;
