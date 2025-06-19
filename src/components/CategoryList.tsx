import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Category } from '../types/Category';

type Props = {
  categories: Category[];
};

const CategoryList = ({ categories }: Props) => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Категории</Text>
      <FlatList
        data={categories}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card}>
            <Text style={styles.cardText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#007B7F',
  },
  list: {
    gap: 10,
  },
  card: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#E0F7F7',
    borderRadius: 10,
  },
  cardText: {
    color: '#005F60',
    fontWeight: '500',
  },
});

export default CategoryList;