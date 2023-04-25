import {Pressable, Image, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import React from 'react';
import {IWeatherData} from '../screens/Weather';
import {RealmWeatherData, useObject, useRealm} from '../realm/RealmWeatherData';

type Props = {
  weatherData?: IWeatherData;
};

const FavouriteComponent: React.FC<Props> = ({weatherData}) => {
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
      <Image
        source={require('../assets/images/icon_favourite.png')}
        style={styles.icon}
      />
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
