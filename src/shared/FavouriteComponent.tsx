import {Pressable, Image, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {IWeatherData} from '../screens/Weather';
import {RealmWeatherData, useObject, useRealm} from '../realm/RealmWeatherData';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  weatherData?: IWeatherData;
  isFavourite: boolean;
};

const FavouriteComponent: React.FC<Props> = ({weatherData, isFavourite}) => {
  const realm = useRealm();
  let realmObject: any;
  if (weatherData) {
    realmObject = useObject(RealmWeatherData, weatherData?.city);
  }
  const onUpdateForFav = (data?: IWeatherData) => {
    console.log('Updating data', data?.city);
    if (data) {
      if (realmObject) {
        console.log('Updating data 2');
        realm.write(() => {
          realmObject.is_favourite = true;
        });
      }
    }
  };

  return (
    <Pressable onPress={() => onUpdateForFav(weatherData)}>
      {isFavourite ? (
        <Icon name="favorite" size={22} color="#FFE539" />
      ) : (
        <Icon name="favorite-border" size={22} color="#FFF" />
      )}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  icon: {
    width: 18,
    height: 17,
  },
});
export default FavouriteComponent;
