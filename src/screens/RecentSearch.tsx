import {View, Text, StyleSheet, Pressable, FlatList} from 'react-native';
import React from 'react';
import {
  RealmWeatherData,
  useObject,
  useQuery,
  useRealm,
} from '../realm/RealmWeatherData';
import Row from '../shared/Row';
import Column from '../shared/Column';
import {SafeAreaView} from 'react-native-safe-area-context';
import TextLabel from '../shared/TextLabel';
import Container from '../shared/Container';
import HeaderBar from '../shared/HeaderBar';
import RenderListItem from '../shared/RenderListItem';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../drawer/AppDrawer';

type Props = NativeStackScreenProps<RootStackParamList, 'RecentSearch'>;

const RecentSearch: React.FC<Props> = () => {
  const objects = useQuery(RealmWeatherData)?.filter(item => {
    if (item.is_recent === true) {
      return item;
    }
  });
  const realm = useRealm();
  console.log('data', objects);

  const clearAll = () => {
    objects?.filter(item => {
      if (item.is_favourite === false) {
        console.log('Delete', item);
        realm.write(() => {
          realm.delete(item);
        });
      } else {
        console.log('Delete update', item);
        realm.write(() => {
          item.is_recent = false;
        });
      }
    });
  };

  return (
    <Container>
      <HeaderBar goto={() => {}} />
      <Row flex={0}>
        <TextLabel type="recentSearchLabel">You recently Search for</TextLabel>
        <Pressable
          onPress={() => clearAll()}
          style={{flex: 1, alignItems: 'flex-end'}}>
          <TextLabel type="favourite">Clear All</TextLabel>
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
export default RecentSearch;
