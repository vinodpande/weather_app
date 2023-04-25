import React from 'react';
import Realm from 'realm';
import {createRealmContext} from '@realm/react';

// Define your object model
export class RealmWeatherData extends Realm.Object<RealmWeatherData> {
  _id!: Realm.BSON.ObjectId;
  main!: string;
  description!: string;
  temp!: number;
  feels_like!: number; // Precipitation
  temp_min!: number;
  temp_max!: number;
  pressure!: number;
  humidity!: number;
  city!: string;
  country!: string;
  date!: string;
  icon!: string;
  is_recent!: boolean;
  is_favourite!: boolean;

  static schema = {
    name: 'RealmWeatherData',
    properties: {
      _id: 'objectId',
      main: 'string',
      description: 'string',
      temp: 'int',
      feels_like: 'int', // Precipitation
      temp_min: 'int',
      temp_max: 'int',
      pressure: 'int',
      humidity: 'int',
      city: 'string',
      country: 'string',
      date: 'string',
      icon: 'string',
      is_recent: 'bool',
      is_favourite: 'bool',
    },
    primaryKey: 'city',
  };
}

// Create a configuration object
const realmConfig: Realm.Configuration = {
  schema: [RealmWeatherData],
};

// Create a realm context
export const {RealmProvider, useRealm, useObject, useQuery} =
  createRealmContext(realmConfig);
