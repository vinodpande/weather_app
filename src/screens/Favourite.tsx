import {View, Text, StyleSheet, Pressable, FlatList, Alert} from 'react-native';
import React, {useState} from 'react';
import Container from '../shared/Container';
import HeaderBar from '../shared/headers/HeaderBar';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../drawer/AppDrawer';
import {RealmWeatherData, useQuery, useRealm} from '../realm/RealmWeatherData';
import Row from '../shared/Row';
import TextLabel from '../shared/TextLabel';
import RenderListItem from '../shared/RenderListItem';
import SearchHeaderBar from '../shared/headers/SearchHeaderBar';
import NotFound from '../shared/NotFound';
import CustomModel from '../shared/CustomModel';

type Props = NativeStackScreenProps<RootStackParamList, 'Favourite'>;

const Favourite: React.FC<Props> = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
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
      <HeaderBar label="Favourite" goto={() => {}} navigation={navigation} />
      <CustomModel
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        clear={clearAll}
      />
      {objects.length <= 0 ? (
        <NotFound label="No Favourites Added" />
      ) : (
        <>
          <Row flex={0}>
            <TextLabel type="recentSearchLabel">
              {`${objects.length} City added as favourite`}
            </TextLabel>
            <Pressable
              onPress={() => setModalVisible(true)}
              style={styles.pressable}>
              <TextLabel type="favourite">Remove All</TextLabel>
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

export default Favourite;
