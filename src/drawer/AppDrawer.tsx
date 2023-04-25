import {View, Text, SafeAreaView} from 'react-native';
import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SplashScreen from '../screens/SplashScreen';

import RecentSearch from '../screens/RecentSearch';
import Weather from '../screens/Weather';
import HeaderBar from '../shared/HeaderBar';
import Favourite from '../screens/Favourite';

const Drawer = createDrawerNavigator();

type Props = {};

const AppDrawer = (props: Props) => {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
      console.log('uning timer');
    }, 5000);

    return () => {};
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Splash"
        screenOptions={{
          drawerStyle: {
            backgroundColor: '#c6cbef',
            width: 300,
          },
          headerShown: false,
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        {showSplash ? (
          <Drawer.Screen
            name="Splash"
            component={SplashScreen}
            options={{headerShown: false}}
          />
        ) : null}
        <Drawer.Screen name="Weather" component={Weather} />
        <Drawer.Screen name="Favourite" component={Favourite} />
        <Drawer.Screen name="Recent Search" component={RecentSearch} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppDrawer;
