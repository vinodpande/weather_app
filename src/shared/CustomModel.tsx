import {
  View,
  Text,
  Modal,
  Pressable,
  StyleSheet,
  Platform,
  Alert,
  Button,
} from 'react-native';
import React from 'react';
import TextLabel from './TextLabel';
import Row from './Row';

type Props = {
  modalVisible: boolean;
  setModalVisible: Function;
  clear: Function;
};

const CustomModel: React.FC<Props> = ({
  setModalVisible,
  modalVisible,
  clear,
}) => {
  //   Alert.alert('Prom');
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
      }}>
      <Pressable
        style={[
          Platform.OS === 'ios' ? styles.iOSBackdrop : styles.androidBackdrop,
          styles.backdrop,
        ]}
        onPress={() => setModalVisible(false)}
      />
      <View
        style={{
          flex: 1,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#FFF',
            width: 280,
            height: 138,
            elevation: 2,
          }}>
          <TextLabel type="modelLabel">
            Are you sure want ro remove all the favourities
          </TextLabel>
          <Row
            style={{
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}>
            <Pressable onPress={() => setModalVisible(false)}>
              <TextLabel type="modelButton">No</TextLabel>
            </Pressable>
            <Pressable
              onPress={() => {
                setModalVisible(false);
                clear();
              }}>
              <TextLabel type="modelButton">Yes</TextLabel>
            </Pressable>
          </Row>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },

  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  iOSBackdrop: {
    backgroundColor: '#000000',
    opacity: 0.3,
  },
  androidBackdrop: {
    backgroundColor: '#232f34',
    opacity: 0.32,
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
export default CustomModel;
