import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from '../types/Product';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../hooks/useCart';

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const { add } = useCart();

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.dosage}>{product.dosage}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.price}>{product.price} ₽</Text>
          <TouchableOpacity style={styles.button} onPress={() => add(product)}>
            <Ionicons name="cart" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#F4FDFD',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
  },
  image: {
    width: 100,
    height: 100,
  },
  info: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#005F60',
  },
  dosage: {
    fontSize: 14,
    color: '#007B7F',
  },
  description: {
    fontSize: 13,
    color: '#555',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#004C4D',
  },
  button: {
    backgroundColor: '#00A8A8',
    padding: 8,
    borderRadius: 8,
  },
});

export default ProductCard;