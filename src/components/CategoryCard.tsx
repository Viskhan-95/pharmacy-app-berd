import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Category } from '../types/Category';

type Props = {
  category: Category;
  onPress: () => void;
};

const CategoryCard = ({ category, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image
        source={{ uri: category.icon || 'https://via.placeholder.com/80?text=Icon' }}
        style={styles.icon}
      />
      <Text style={styles.name}>{category.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    backgroundColor: '#E7F9F9',
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 12,
    alignItems: 'center',
  },
  icon: {
    width: 60,
    height: 60,
    marginBottom: 10,
    borderRadius: 12,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    color: '#005F60',
    textAlign: 'center',
  },
});

export default CategoryCard;