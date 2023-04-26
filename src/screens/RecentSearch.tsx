import {View, Text, StyleSheet, Pressable, FlatList} from 'react-native';
import React, {useState} from 'react';
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
import HeaderBar from '../shared/headers/HeaderBar';
import RenderListItem from '../shared/RenderListItem';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../drawer/AppDrawer';
import NotFound from '../shared/NotFound';
import CustomModel from '../shared/CustomModel';
import {IWeatherData} from './Weather';

type Props = NativeStackScreenProps<RootStackParamList, 'RecentSearch'>;

const RecentSearch: React.FC<Props> = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const objects = useQuery(RealmWeatherData)?.filter(item => {
    if (item.is_recent === true) {
      return item;
    }
  });
  const realm = useRealm();
  // console.log('data objects', objects);

  const clearAll = () => {
    objects?.filter(item => {
      if (item.is_favourite === false) {
        // console.log('Delete', item);
        realm.write(() => {
          realm.delete(item);
        });
      } else {
        // console.log('Delete update', item);
        realm.write(() => {
          item.is_recent = false;
        });
      }
    });
  };

  return (
    <Container>
      <HeaderBar
        goto={() => {}}
        label="Recent Search"
        navigation={navigation}
      />
      <CustomModel
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        clear={clearAll}
      />
      {objects.length <= 0 ? (
        <NotFound label="No Recent Search" />
      ) : (
        <>
          <Row flex={0}>
            <TextLabel type="recentSearchLabel">
              You recently Search for
            </TextLabel>
            <Pressable
              onPress={() => setModalVisible(true)}
              style={styles.pressable}>
              <TextLabel type="favourite">Clear All</TextLabel>
            </Pressable>
          </Row>

          <FlatList
            data={objects}
            renderItem={({item}) => <RenderListItem data={item} />}
            keyExtractor={item => item._id.toHexString()}
          />
        </>
      )}
    </Container>
  );
};

const styles = StyleSheet.create({
  pressable: {flex: 1, alignItems: 'flex-end'},
});
export default RecentSearch;
