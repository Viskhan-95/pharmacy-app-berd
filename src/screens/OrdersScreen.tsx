import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const dummyOrders = [
  { id: '1', date: '2025-06-15', total: 2450 },
  { id: '2', date: '2025-06-10', total: 1590 },
];

const OrdersScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Мои заказы</Text>
      <FlatList
        data={dummyOrders}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.orderCard}>
            <Text style={styles.orderText}>Дата: {item.date}</Text>
            <Text style={styles.orderText}>Сумма: {item.total} ₽</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#007B7F',
  },
  orderCard: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  orderText: {
    fontSize: 16,
    color: '#333',
  },
});

export default OrdersScreen;