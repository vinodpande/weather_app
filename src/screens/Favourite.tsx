import {View, Text} from 'react-native';
import React from 'react';
import Container from '../shared/Container';
import HeaderBar from '../shared/HeaderBar';

type Props = {};

const Favourite = (props: Props) => {
  return (
    <Container>
      <HeaderBar />
      <Text>Favourite</Text>
    </Container>
  );
};

export default Favourite;
