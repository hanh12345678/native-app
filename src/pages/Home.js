import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {StyleSheet, View, Text, FlatList, Pressable} from 'react-native';
import Input from '../components/Fields/Input';
import GenericModal from '../components/Modal';

const Home = ({navigation}) => {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({});
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const getUsers = async () => {
    try {
      const response = await fetch(
        'https://5f7fd524d6aabe00166f0a52.mockapi.io/api/v1/people/todos',
      );
      const json = await response.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
  };
  const onSubmit = async values => {
    fetch('https://5f7fd524d6aabe00166f0a52.mockapi.io/api/v1/people/todos', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...values, status: false}),
    })
      .then(response => {
        return response.json();
      })
      .then(res => {
        setData([...data, res]);
        onClose();
      });
  };
  useEffect(() => {
    getUsers();
  }, []);
  const onOpenModal = () => {
    setShowModal(true);
  };
  const onClose = () => {
    setShowModal(false);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        style={{padding: 10}}
        keyExtractor={({id}, index) => id}
        renderItem={({item}) => (
          <Pressable onPress={() => navigation.push('Detail', {id: item.id})}>
            <Text style={{padding: 10}}>{item.name}</Text>
          </Pressable>
        )}
      />
      <Pressable
        style={[styles.button, styles.buttonClose]}
        onPress={onOpenModal}>
        <Text style={styles.textStyle}>Show Modal</Text>
      </Pressable>
      <GenericModal show={showModal} onClose={onClose}>
        <Input name="name" control={control} placeholder="name" />
        <Pressable
          style={[styles.button, styles.submit]}
          onPress={handleSubmit(onSubmit)}>
          <Text style={{color: 'white'}}>Submit</Text>
        </Pressable>
      </GenericModal>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  submit: {
    backgroundColor: 'blue',
    marginBottom: 10,
  },
  buttonClose: {
    backgroundColor: 'green',
  },
});
