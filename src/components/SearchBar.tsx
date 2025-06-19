import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SearchBar = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="search" size={20} color="#007B7F" />
      <TextInput
        placeholder="Поиск медикаментов"
        style={styles.input}
        placeholderTextColor="#7D8C8C"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4F4',
  },
  input: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
    color: '#000',
  },
});

export default SearchBar;