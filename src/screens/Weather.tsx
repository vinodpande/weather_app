import {View, Text, StyleSheet, Pressable, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {
  RealmWeatherData,
  useObject,
  useQuery,
  useRealm,
} from '../realm/RealmWeatherData';
import Container from '../shared/Container';
import HeaderBar from '../shared/headers/HeaderBar';
import TextLabel from '../shared/TextLabel';
import Row from '../shared/Row';
import Column from '../shared/Column';
import GroupButton from '../shared/GroupButton';
import {Utils} from '../../utils/Utils';
import Favourite from './Favourite';
import FavouriteComponent from '../shared/FavouriteComponent';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../drawer/AppDrawer';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

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
  const [isFavourite, setIsFavourite] = useState(false);

  const realm = useRealm();
  // const realmObject = useObject(RealmWeatherData, route.params.city);
  const realmObject_qu = useQuery(RealmWeatherData).filter(item => {
    if (item.city.toLowerCase() === route.params.city.toLowerCase())
      return item;
  });

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
  }, [route.params.city]);

  useEffect(() => {
    setTempMode(Utils.Celsius);
    if (weatherData) onRecentSave(weatherData);
    // console.log('realmObject ', realmObject);
    console.log('realmObject from', realmObject_qu);
    return () => {};
  }, [weatherData]);

  const getMoviesFromApi = () => {
    return fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${route.params.city}&APPID=871e5e40bdcc1860b997404cc7ca1042`,
    )
      .then(response => response.json())
      .then(json => {
        console.log('json', json);
        setWeatherData({
          main: json.weather[0].main,
          description: json.weather[0].description,
          icon: json.weather[0].icon,
          temp: json.main.temp,
          feels_like: json.main.feels_like, // Precipitation
          temp_min: json.main.temp_min,
          temp_max: json.main.temp_max,
          pressure: json.main.pressure,
          humidity: json.main.humidity,
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
      if (realmObject_qu.length > 0) {
        // console.log('Updating records');
        setIsFavourite(realmObject_qu[0].is_favourite);

        realm.write(() => {
          (realmObject_qu[0].temp = data.temp),
            (realmObject_qu[0].temp_min = data.temp_min),
            (realmObject_qu[0].temp_min = data.temp_min),
            (realmObject_qu[0].feels_like = data.feels_like),
            (realmObject_qu[0].is_recent = true);
        });
      } else {
        // console.log('Saved');
        setIsFavourite(false);
        try {
          realm.write(() => {
            realm.create('RealmWeatherData', {
              _id: new Realm.BSON.ObjectId(),
              is_recent: true,
              is_favourite: false,
              ...data,
            });
          });
        } catch (e) {
          console.log('Exception', e);
        }
      }
    }
  };

  const gotToSearchLocation = () => {
    navigation.navigate('SearchLocation', {});
  };

  return (
    <Container>
      <HeaderBar
        goto={gotToSearchLocation}
        showImage={true}
        navigation={navigation}
      />
      <Row flex={1}>
        <Column>
          <TextLabel type="date">{weatherData?.date}</TextLabel>
          <TextLabel type="city">
            {weatherData?.city}, {weatherData?.country}
          </TextLabel>
          <View
            // onPress={() => onUpdateForFav(weatherData)}
            style={styles.addfavourite}>
            <FavouriteComponent
              weatherData={weatherData}
              isFavourite={isFavourite}
            />
            <TextLabel type="favourite">Add to favourite</TextLabel>
          </View>
        </Column>
      </Row>

      <Row flex={2}>
        <Column alignSelf="center">
          <Image
            style={styles.image_weather}
            source={{
              uri: `https://openweathermap.org/img/wn/${weatherData?.icon}.png`,
            }}
          />
          <Row flex={0} style={styles.row_temp}>
            <TextLabel type="temp">{temp}</TextLabel>
            <GroupButton onCalculateTemp={setTempMode} />
          </Row>

          <TextLabel type="city">{weatherData?.description}</TextLabel>
        </Column>
      </Row>

      <Row flex={1} elevation={2} style={styles.row}>
        <Image
          source={require('../assets/images/icon_temperature_info.png')}
          style={styles.icon_min_max}
        />

        <Column align="flex-start" alignSelf="center">
          <TextLabel type="precipitation">Min - Max</TextLabel>
          <TextLabel type="city">
            {tempMin} - {tempMax}
          </TextLabel>
        </Column>

        <Image
          style={styles.icon_min_max}
          source={{
            uri: `https://openweathermap.org/img/wn/${weatherData?.icon}.png`,
          }}
        />
        <Column align="flex-start" alignSelf="center">
          <TextLabel type="precipitation">Precipitation</TextLabel>
          <TextLabel type="city">{weatherData?.feels_like}</TextLabel>
        </Column>

        <Image
          style={styles.icon_min_max}
          source={{
            uri: `https://openweathermap.org/img/wn/03n.png`,
          }}
        />
        <Column align="flex-start" alignSelf="center">
          <TextLabel type="precipitation">humidity</TextLabel>
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
    padding: 0,
  },
  row_temp: {margin: 0, padding: 0},
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
    marginLeft: 0,
    marginRight: 7,
  },
  addfavourite: {
    flexDirection: 'row',
    height: 40,
    padding: 10,
    marginTop: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image_weather: {width: 64, height: 67},
});
export default Weather;
