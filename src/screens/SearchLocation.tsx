import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../drawer/AppDrawer';
import Container from '../shared/Container';
import SearchHeaderBar from '../shared/SearchHeaderBar';
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
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <SearchHeaderBar goto={filterItems} />
      <FlatList
        numColumns={1}
        data={filterCites}
        renderItem={({item}) => (
          <SearchListItem
            city={item.city}
            onSlectedCity={setSelectedLocation}
          />
        )}
        contentContainerStyle={{padding: 0, margin: 0, width: '100%'}}
        style={{padding: 0, margin: 0, width: '100%'}}
      />
    </View>
  );
};

export default SearchLocation;
