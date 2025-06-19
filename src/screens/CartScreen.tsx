import React from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { RootState } from '../store';
import { removeFromCart } from '../store/cartSlice';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { decreaseQuantity, increaseQuantity } from '../store/cartSlice';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/stacks/HomeStack';

const CartScreen = () => {
  const dispatch = useAppDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

   const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();


  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
        <MaterialCommunityIcons name='cart-remove' size={120} color='#ccc' />
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View style={styles.info}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.price}>{item.price} ₽</Text>
                  <View style={styles.quantityControl}>
                    <TouchableOpacity onPress={() => dispatch(decreaseQuantity(item.id))}>
                      <Text style={styles.controlButton}>−</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{item.quantity}</Text>
                    <TouchableOpacity onPress={() => dispatch(increaseQuantity(item.id))}>
                      <Text style={styles.controlButton}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <TouchableOpacity onPress={() => handleRemove(item.id)}>
                  {/* <Text style={styles.remove}>Удалить</Text> */}
                  <View style={styles.remove}>
                    <Ionicons name="trash-outline" size={32} color='#FF3B30' />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          />

          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Итого: {totalPrice.toFixed(2)} ₽</Text>
            <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Checkout' as never)}>
              <Text style={styles.checkoutText}>Оформить заказ</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  empty: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
    color: '#666',
  },
  item: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007B7F',
  },
  price: {
    fontSize: 14,
    marginTop: 4,
    color: '#555',
  },
  remove: {
    padding: 6,
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 1.5,
    shadowColor: '#FF3B30',
    elevation: 5,
    // color: '#FF3B30',
    // fontWeight: '600',
  },
  totalContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    textAlign: 'right',
    color: '#007B7F',
  },
  checkoutButton: {
    backgroundColor: '#007B7F',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  controlButton: {
    fontSize: 22,
    paddingHorizontal: 10,
    color: '#007B7F',
    fontWeight: '600',
  },
  quantityText: {
    fontSize: 16,
    marginHorizontal: 8,
    fontWeight: '500'
  }
});