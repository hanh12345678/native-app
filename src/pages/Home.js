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
  const [data, setData] = useState([]);
  const getUsers = async () => {
    try {
      const response = await fetch('https://gorest.co.in/public/v2/users');
      const json = await response.json();
      setData(json);
    } catch (err) {
      console.error(err);
    }
  };
  const onSubmit = async data => {
    const response = await fetch('https://gorest.co.in/public/v2/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...data, gender: 'male', status: 'active'}),
    });
    console.log(response);
  };
  useEffect(() => {
    getUsers();
  }, []);
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={({id}, index) => id}
        renderItem={({item}) => (
          <Pressable onPress={() => navigation.push('Detail', {id: item.id})}>
            <Text>{item.name}</Text>
          </Pressable>
        )}
      />
      <GenericModal>
        <Input name="name" control={control} placeholder="name" />
        <Input name="email" control={control} placeholder="email" />
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
});
