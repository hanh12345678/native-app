import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';

const Detail = ({route}) => {
  const {id} = route.params;
  const [todo, setTodo] = useState({});
  const getUser = async () => {
    try {
      const response = await fetch(
        `https://5f7fd524d6aabe00166f0a52.mockapi.io/api/v1/people/todos/${id}`,
      );
      const json = await response.json();
      setTodo(json);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  if (!todo) {
    return null;
  }
  return (
    <View>
      <Text>
        {todo.name} - {todo.status ? 'done' : 'not done'}
      </Text>
    </View>
  );
};

export default Detail;
