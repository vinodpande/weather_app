export class Utils {
  static Celsius = 'Celsius';
  static Fahrenheit = 'Fahrenheit';
  static getCelsius(kelvic: number) {
    return kelvic - 273.15;
  }
  static getFahrenheit(kelvic: number) {
    return ((309 - 273.15) * 9) / 5 + 32;
  }
}
