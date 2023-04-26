import {Image, StyleSheet} from 'react-native';
import React from 'react';
import {RealmWeatherData, useRealm} from '../realm/RealmWeatherData';
import Row from './Row';
import Column from './Column';
import TextLabel from './TextLabel';
import Card from './Card';
import SuperScriptText from './SuperScriptText';
import {Utils} from '../../utils/Utils';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Pressable} from 'react-native';

type Props = {
  data: RealmWeatherData;
};

const RenderListItem: React.FC<Props> = ({data}) => {
  const realm = useRealm();

  const onUpdateForFav = (data?: RealmWeatherData) => {
    if (data) {
      realm.write(() => {
        data.is_favourite = !data.is_favourite;
      });
    }
  };

  return (
    <Card>
      <Row style={styles.row}>
        <Column align="flex-start">
          <TextLabel type="recentLabel">{data.city}</TextLabel>
          <Row style={styles.row}>
            <Image
              style={styles.icon}
              resizeMode="cover"
              source={{
                uri: `https://openweathermap.org/img/wn/${data?.icon}.png`,
              }}
            />
            <TextLabel type="recentTemp">
              {Utils.getCelsius(data.temp)}
            </TextLabel>
            <SuperScriptText text="C" />
            <TextLabel type="recentDes">{data.description}</TextLabel>
          </Row>
        </Column>
        {data.is_favourite ? (
          <Pressable
            onPress={() => {
              onUpdateForFav(data);
            }}>
            <Icon name="favorite" size={22} color="#FFE539" />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => {
              onUpdateForFav(data);
            }}>
            <Icon name="favorite-border" size={22} color="#FFF" />
          </Pressable>
        )}
      </Row>
    </Card>
  );
};

const styles = StyleSheet.create({
  row: {
    padding: 0,
    marginLeft: 0,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
  icon: {
    width: 25,
    height: 26,
    marginLeft: 10,
    marginRight: 4,
  },
  icon_fav: {
    width: 18,
    height: 17,
  },
});
export default RenderListItem;
