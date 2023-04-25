import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import {RealmWeatherData} from '../realm/RealmWeatherData';
import Row from './Row';
import Column from './Column';
import TextLabel from './TextLabel';
import Card from './Card';
import SuperScriptText from './SuperScriptText';
import {Utils} from '../../utils/Utils';

type Props = {
  data: RealmWeatherData;
};

const RenderListItem: React.FC<Props> = ({data}) => {
  return (
    <Card>
      <Row>
        <Column align="flex-start">
          <TextLabel type="recentLabel">{data.city}</TextLabel>
          <Row style={styles.row}>
            <Image
              source={require('../assets/images/icon_favourite.png')}
              style={styles.icon}
              resizeMode="contain"
            />
            <TextLabel type="recentTemp">
              {Utils.getCelsius(data.temp)}
            </TextLabel>
            <SuperScriptText text="C" />
            <TextLabel type="recentDes">{data.description}</TextLabel>
          </Row>
        </Column>
        <Image
          source={
            data.is_favourite
              ? require('../assets/images/icon_favourite.png')
              : require('../assets/images/icon_favourite.png')
          }
          style={styles.icon_fav}
        />
      </Row>
    </Card>
  );
};

const styles = StyleSheet.create({
  row: {
    padding: 0,
    marginLeft: 0,
    marginRight: 0,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
  icon: {
    width: 22,
    height: 23,
    marginRight: 4,
  },
  icon_fav: {
    width: 18,
    height: 17,
  },
});
export default RenderListItem;
