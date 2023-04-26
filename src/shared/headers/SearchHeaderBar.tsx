import {View, Pressable, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

type Props = {
  goto: Function;
  navigation: any;
};

const SearchHeaderBar: React.FC<Props> = ({goto, navigation}) => {
  const [inputeValue, setInputeValue] = useState<string>('');
  const onInputeChnage = (e: string) => {
    // console.log('e', e);
    setInputeValue(e);
    goto(e);
  };
  return (
    <View style={style.container}>
      <Pressable
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name="arrow-back" size={30} color="#000" />
      </Pressable>
      <TextInput
        placeholder="Search for city"
        style={style.inpute}
        autoFocus={true}
        value={inputeValue}
        onChangeText={e => {
          onInputeChnage(e);
        }}
      />
      <Pressable onPress={() => setInputeValue('')} style={style.icon_right}>
        <Icon name="clear" size={30} color="#000" />
      </Pressable>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    borderBottomWidth: 0.5,
    borderBottomColor: '#000',
  },
  icon: {
    width: 24,
    height: 24,
  },
  image_log: {
    width: 113,
    height: 24,
    marginLeft: 32,
  },
  icon_right: {
    width: 24,
    height: 24,
    marginLeft: 'auto',
  },
  inpute: {flex: 1},
});
export default SearchHeaderBar;
