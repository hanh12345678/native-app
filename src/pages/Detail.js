import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Detail = ({route}) => {
  const {id} = route.params;
  const [user, setUser] = useState({});
  const getUser = async () => {
    try {
      const response = await fetch(
        `https://gorest.co.in/public/v2/users/${id}`,
      );
      const json = await response.json();
      setUser(json);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return (
    <View>
      <Text>
        {user.name} - {user.email}
      </Text>
    </View>
  );
};

export default Detail;
