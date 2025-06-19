import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { News } from '../types/News';

const dummyNews: News[] = [
  {
    id: '1',
    title: 'Скидка 20% на витамины!',
    image: 'https://via.placeholder.com/300x100.png?text=Скидка+20%25',
    description: 'Только до конца месяца — витамины со скидкой 20% во всех аптеках!',
  },
  {
    id: '2',
    title: 'Новая поставка антисептиков',
    image: 'https://via.placeholder.com/300x100.png?text=Антисептики',
    description: 'Поступление новых эффективных средств защиты.',
  },
];

const NewsList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Новости и акции</Text>
      <FlatList
        data={dummyNews}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.description}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007B7F',
    marginBottom: 10,
  },
  card: {
    width: 300,
    marginRight: 16,
    borderRadius: 10,
    backgroundColor: '#F8FDFD',
    padding: 10,
    elevation: 2,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 6,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#004B4C',
  },
  cardDesc: {
    fontSize: 14,
    color: '#555',
  },
});

export default NewsList;