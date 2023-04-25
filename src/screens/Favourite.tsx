import {View, Text, StyleSheet, Pressable, FlatList} from 'react-native';
import React from 'react';
import Container from '../shared/Container';
import HeaderBar from '../shared/HeaderBar';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../drawer/AppDrawer';
import {RealmWeatherData, useQuery, useRealm} from '../realm/RealmWeatherData';
import Row from '../shared/Row';
import TextLabel from '../shared/TextLabel';
import RenderListItem from '../shared/RenderListItem';
import SearchHeaderBar from '../shared/SearchHeaderBar';

type Props = NativeStackScreenProps<RootStackParamList, 'Favourite'>;

const Favourite: React.FC<Props> = () => {
  const realm = useRealm();
  const objects = useQuery(RealmWeatherData).filter(item => {
    if (item.is_favourite === true) {
      return item;
    }
  });

  // console.log('data', objects);

  const clearAll = () => {
    objects.filter(item => {
      if (item.is_favourite === true && item.is_recent === false) {
        console.log('Delete', item);
        realm.write(() => {
          realm.delete(item);
        });
      } else {
        console.log('Delete update', item);
        realm.write(() => {
          item.is_favourite = false;
        });
      }
    });
  };

  return (
    <Container>
      <SearchHeaderBar goto={() => {}} />
      <Row flex={0}>
        <TextLabel type="recentSearchLabel">
          6 City Added as Favourite
        </TextLabel>
        <Pressable
          onPress={() => clearAll()}
          style={{flex: 1, alignItems: 'flex-end'}}>
          <TextLabel type="favourite">Remove All</TextLabel>
        </Pressable>
      </Row>
      {/* <RenderListItem data={data} />
      <RenderListItem data={data} /> */}
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

export default Favourite;
