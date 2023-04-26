import {View, Text, Pressable, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Utils} from '../../utils/Utils';

type Props = {
  onCalculateTemp: Function;
};

const GroupButton: React.FC<Props> = ({onCalculateTemp}) => {
  const [selectedButton, setSelectedButton] = useState(Utils.Celsius);

  const onClickedButton = (button: string) => {
    setSelectedButton(button);
    onCalculateTemp(button);
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 60,
        alignItems: 'flex-end',
      }}>
      <Pressable
        style={
          selectedButton === Utils.Celsius
            ? styles.buttonHighLight
            : styles.button
        }
        onPress={() => onClickedButton(Utils.Celsius)}>
        <Text
          style={[
            {fontSize: 11},
            selectedButton === Utils.Celsius
              ? styles.textHighLight
              : styles.text,
          ]}>
          o
        </Text>
        <Text
          style={[
            {fontSize: 16, lineHeight: 30},
            selectedButton === Utils.Celsius
              ? styles.textHighLight
              : styles.text,
          ]}>
          C
        </Text>
      </Pressable>
      <Pressable
        style={
          selectedButton === Utils.Fahrenheit
            ? styles.buttonHighLight
            : styles.button
        }
        onPress={() => onClickedButton(Utils.Fahrenheit)}>
        <Text
          style={[
            {fontSize: 11},
            selectedButton === Utils.Fahrenheit
              ? styles.textHighLight
              : styles.text,
          ]}>
          o
        </Text>
        <Text
          style={[
            {fontSize: 16, lineHeight: 30},
            selectedButton === Utils.Fahrenheit
              ? styles.textHighLight
              : styles.text,
          ]}>
          F
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    height: 30,
    width: 28,
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderColor: '#FFF',
    justifyContent: 'center',
    borderWidth: 1,
  },
  buttonHighLight: {
    flexDirection: 'row',
    height: 30,
    width: 28,
    backgroundColor: '#FFF',
    borderRadius: 2,
    borderColor: '#FFF',
    justifyContent: 'center',
  },
  text: {
    color: '#FFF',
  },
  textHighLight: {
    color: '#E32843',
  },
});
export default GroupButton;
