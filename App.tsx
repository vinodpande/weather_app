import React from 'react';
import AppDrawer from './src/drawer/AppDrawer';
import {createRealmContext} from '@realm/react';
import {RealmProvider} from './src/realm/RealmWeatherData';

type Props = {};

const App = (props: Props) => {
  return (
    <RealmProvider>
      <AppDrawer />
    </RealmProvider>
  );
};

export default App;
