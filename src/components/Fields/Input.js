import React from 'react';
import {useController} from 'react-hook-form';
import {TextInput, StyleSheet} from 'react-native';

const Input = ({name, control, placeholder}) => {
  const {field} = useController({
    control,
    defaultValue: '',
    name,
  });
  return (
    <TextInput
      style={styles.input}
      value={field.value}
      placeholder={placeholder}
      onChangeText={field.onChange}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Input;
