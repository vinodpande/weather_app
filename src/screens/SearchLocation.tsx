import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../drawer/AppDrawer';
import Container from '../shared/Container';
import SearchHeaderBar from '../shared/headers/SearchHeaderBar';
import {FlatList} from 'react-native-gesture-handler';
import SearchListItem from '../shared/SearchListItem';
import {Utils} from '../../utils/Utils';

type Props = NativeStackScreenProps<RootStackParamList, 'SearchLocation'>;

const SearchLocation: React.FC<Props> = ({navigation}) => {
  const [filterCites, setFilterCities] = useState(Utils.cities);

  const setSelectedLocation = (city: string) => {
    navigation.navigate('Weather', {
      city: city,
    });
  };

  const filterItems = (query: string) => {
    let data = Utils.cities.filter(el =>
      el.city.toLowerCase().startsWith(query.toLowerCase()),
    );
    setFilterCities(data);
  };

  return (
    <View style={style.container}>
      <SearchHeaderBar goto={filterItems} navigation={navigation} />
      <FlatList
        data={filterCites}
        renderItem={({item}) => (
          <SearchListItem
            city={item.city}
            onSlectedCity={setSelectedLocation}
          />
        )}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#fff'},
});
export default SearchLocation;
