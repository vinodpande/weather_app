import {View, Text, StyleSheet, Pressable, FlatList} from 'react-native';
import React from 'react';
import {RealmWeatherData, useObject, useQuery} from '../realm/RealmWeatherData';
import Row from '../shared/Row';
import Column from '../shared/Column';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextLabel from '../shared/TextLabel';
import Container from '../shared/Container';
import HeaderBar from '../shared/HeaderBar';
import RenderListItem from '../shared/RenderListItem';

type Props = {};
const data: RealmWeatherData = {
  main: 'string',
  description: 'fdgdgdg',
  temp: 1,
  feels_like: 1,
  temp_min: 1,
  temp_max: 1,
  pressure: 1,
  humidity: 1,
  city: 'string',
  country: 'string',
  date: 'string',
  is_favourite: false,
};
const RecentSearch: React.FC<Props> = () => {
  const objects = useQuery(RealmWeatherData);
  console.log('data', objects);

  const clearAll = () => {};

  return (
    <Container>
      <HeaderBar />
      <Row flex={0}>
        <TextLabel type="favourite">You recently Search for</TextLabel>
        <Pressable
          onPress={() => clearAll()}
          style={{flex: 1, alignItems: 'flex-end'}}>
          <TextLabel type="favourite">Clear All</TextLabel>
        </Pressable>
      </Row>
      <RenderListItem data={data} />
      <RenderListItem data={data} />
      <FlatList
        data={objects}
        renderItem={({item}) => <RenderListItem data={item} />}
        keyExtractor={item => item._id.toHexString()}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  row: {flexDirection: 'row'},
});
export default RecentSearch;
