import {View, Text} from 'react-native';
import React from 'react';
import {RealmWeatherData} from '../realm/RealmWeatherData';
import Row from './Row';
import Column from './Column';
import TextLabel from './TextLabel';
import Card from './Card';

type Props = {
  data: RealmWeatherData;
};

const RenderListItem: React.FC<Props> = ({data}) => {
  return (
    <Card>
      <Row>
        <Column>
          <TextLabel type="city">Sambhaji Nagar</TextLabel>
          <TextLabel type="favourite">Data</TextLabel>
        </Column>
        <TextLabel type="city">Y</TextLabel>
      </Row>
    </Card>
  );
};

export default RenderListItem;
