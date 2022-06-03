import React, {useState} from 'react';
import {StyleSheet, View, Text, Pressable, Modal} from 'react-native';

const GenericModal = ({button, children}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const onOpenModal = () => {
    setModalVisible(true);
  };
  const onCloseModal = () => {
    setModalVisible(false);
  };
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {children}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={onCloseModal}>
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {button ? (
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={onOpenModal}>
          {button}
        </Pressable>
      ) : (
        <Pressable
          style={[styles.button, styles.buttonClose]}
          onPress={onOpenModal}>
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      )}
    </View>
  );
};

export default GenericModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonClose: {
    backgroundColor: 'green',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
});
