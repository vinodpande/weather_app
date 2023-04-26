import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import SplashScreen from '../screens/SplashScreen';

import RecentSearch from '../screens/RecentSearch';
import Weather from '../screens/Weather';
import Favourite from '../screens/Favourite';
import SearchLocation from '../screens/SearchLocation';

export type RootStackParamList = {
  Splash: {};
  Weather: {city: string};
  Favourite: {};
  RecentSearch: {};
  SearchLocation: {};
};

const Drawer = createDrawerNavigator<RootStackParamList>();

const AppDrawer = () => {
  const [showSplash, setShowSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
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

        <Drawer.Screen
          name="Weather"
          initialParams={{city: 'Pune'}}
          component={Weather}
        />
        <Drawer.Screen name="Favourite" component={Favourite} />
        <Drawer.Screen
          name="RecentSearch"
          options={{title: 'Recent Search'}}
          component={RecentSearch}
        />
        <Drawer.Screen
          name="SearchLocation"
          component={SearchLocation}
          options={{title: 'Search Location'}}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default AppDrawer;
