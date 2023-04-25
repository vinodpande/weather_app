import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {RealmWeatherData, useObject, useRealm} from '../realm/RealmWeatherData';
import Container from '../shared/Container';
import HeaderBar from '../shared/HeaderBar';
import TextLabel from '../shared/TextLabel';
import Row from '../shared/Row';
import Column from '../shared/Column';
import GroupButton from '../shared/GroupButton';
import {Utils} from '../../utils/Utils';
import Favourite from './Favourite';
import FavouriteComponent from '../shared/FavouriteComponent';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../drawer/AppDrawer';

export interface IWeatherData {
  main: string;
  description: string;
  temp: number;
  feels_like: number; // Precipitation
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  city: string;
  country: string;
  date: string;
  icon: string;
}
type Props = NativeStackScreenProps<RootStackParamList, 'Weather'>;

const Weather: React.FC<Props> = ({route, navigation}) => {
  // console.log('Weather data', route.params.city);
  // console.log('Weather data', navigation);
  const [temp, setTemp] = useState(0);
  const [tempMin, setTempMin] = useState(0);
  const [tempMax, setTempMax] = useState(0);

  const realm = useRealm();
  const realmObject = useObject(RealmWeatherData, route.params.city);
  // console.log('realmObject', realmObject);

  const [weatherData, setWeatherData] = useState<IWeatherData>();

  const setTempMode = (mode: string) => {
    if (mode === Utils.Celsius) {
      if (weatherData) {
        setTemp(Math.round(Utils.getCelsius(weatherData.temp)));
        setTempMin(Math.round(Utils.getCelsius(weatherData.temp_min)));
        setTempMax(Math.round(Utils.getCelsius(weatherData.temp_max)));
      }
    } else {
      if (weatherData) {
        setTemp(Math.round(Utils.getFahrenheit(weatherData.temp)));
        setTempMin(Math.round(Utils.getFahrenheit(weatherData.temp_min)));
        setTempMax(Math.round(Utils.getFahrenheit(weatherData.temp_max)));
      }
    }
  };

  useEffect(() => {
    getMoviesFromApi();
    return () => {};
  }, []);

  useEffect(() => {
    setTempMode(Utils.Celsius);
    if (weatherData) onRecentSave(weatherData);
    return () => {};
  }, [weatherData]);

  const getMoviesFromApi = () => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${route.params.city}&APPID=871e5e40bdcc1860b997404cc7ca1042`,
    )
      .then(response => response.json())
      .then(json => {
        // console.log('json', json);
        setWeatherData({
          main: json.weather[0].main,
          description: json.weather[0].description,
          icon: json.weather[0].icon,
          temp: Math.round(json.main.temp),
          feels_like: Math.round(json.main.feels_like), // Precipitation
          temp_min: Math.round(json.main.temp_min),
          temp_max: Math.round(json.main.temp_max),
          pressure: Math.round(json.main.pressure),
          humidity: Math.round(json.main.humidity),
          city: json.name,
          country: json.sys.country,
          date: moment(json.dt).format('llll'),
        });
      })
      .catch(error => {
        console.error('error', error);
      });
  };

  const onRecentSave = (data?: IWeatherData) => {
    // console.log(data);
    if (data?.city) {
      console.log('Updating records');
      if (realmObject?.city === data.city) {
        realm.write(() => {
          (realmObject.temp = data.temp),
            (realmObject.temp_min = data.temp_min),
            (realmObject.temp_min = data.temp_min),
            (realmObject.feels_like = data.feels_like),
            (realmObject.is_favourite = false);
        });
      }
    } else {
      console.log('Saved');
      realm.write(() => {
        realm.create('RealmWeatherData', {
          _id: new Realm.BSON.ObjectId(),
          is_recent: true,
          is_favourite: false,
          ...data,
        });
      });
    }
  };

  const gotToSearchLocation = () => {
    navigation.navigate('SearchLocation', {});
  };

  return (
    <Container>
      <HeaderBar goto={gotToSearchLocation} />
      <Row flex={2}>
        <Column>
          <TextLabel type="date">{weatherData?.date}</TextLabel>
          <TextLabel type="city">
            {weatherData?.city}, {weatherData?.country}
          </TextLabel>
          <View
            // onPress={() => onUpdateForFav(weatherData)}
            style={styles.addfavourite}>
            <FavouriteComponent weatherData={weatherData} />
            <TextLabel type="favourite">Add to favourite</TextLabel>
          </View>
        </Column>
      </Row>
      <Row flex={2}>
        <Column>
          <Row flex={0}>
            <TextLabel type="temp">{temp}</TextLabel>
            <GroupButton onCalculateTemp={setTempMode} />
          </Row>

          <TextLabel type="city">{weatherData?.description}</TextLabel>
        </Column>
      </Row>

      <Row flex={1} elevation={2}>
        <Image
          source={require('../assets/images/icon_temperature_info.png')}
          style={styles.icon_min_max}
        />

        <Column align="flex-start" alignSelf="center">
          <TextLabel type="favourite">Min - Max</TextLabel>
          <TextLabel type="city">
            {tempMin} - {tempMax}
          </TextLabel>
        </Column>

        <Image
          source={require('../assets/images/icon_temperature_info.png')}
          style={styles.icon_min_max}
        />
        <Column align="flex-start" alignSelf="center">
          <TextLabel type="favourite">Precipitation</TextLabel>
          <TextLabel type="city">{weatherData?.feels_like}</TextLabel>
        </Column>

        <Image
          source={require('../assets/images/icon_temperature_info.png')}
          style={styles.icon_min_max}
        />
        <Column align="flex-start" alignSelf="center">
          <TextLabel type="favourite">humidity</TextLabel>
          <TextLabel type="city">{weatherData?.humidity}</TextLabel>
        </Column>
      </Row>
    </Container>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  icon: {
    width: 18,
    height: 17,
  },
  icon_min_max: {
    width: 18,
    height: 34,
    marginLeft: 16,
    marginRight: 8,
  },
  addfavourite: {
    flexDirection: 'row',
    height: 40,
    padding: 10,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default Weather;
