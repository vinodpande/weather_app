import {useRealm} from '../src/realm/RealmWeatherData';
import {IWeatherData} from '../src/screens/Weather';

export class Utils {
  static Celsius = 'Celsius';
  static Fahrenheit = 'Fahrenheit';

  static getCelsius = (kelvic: number) => {
    return Math.round(kelvic - 273.15);
  };
  static getFahrenheit = (kelvic: number) => {
    return Math.round(((309 - 273.15) * 9) / 5 + 32);
  };

  static cities: {city: string}[] = [
    {city: 'Beed'},
    {city: 'Aurangabad'},
    {city: 'Pune'},
    {city: 'mumbai'},
  ];
}
