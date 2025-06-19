import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { clearCart } from '../store/cartSlice';
import { useNavigation } from '@react-navigation/native';
import { placeOrdder } from '../config/api';
import { supabase } from '../config/supabase';

const CheckoutScreen = () => {
  const [address, setAddress] = useState('');
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleOrder = async () => {
    if (!address.trim()) {
      Alert.alert('Ошибка', 'Введите адрес доставки');
      return;
    }

    const user = supabase.auth.getUser
        ? (await supabase.auth.getUser()).data.user
        : null;

        if(!user) {
            Alert.alert('Вы не авторизованы');
            return;
        }

        try {
            await placeOrdder({
                userId: user.id,
                items: cartItems,
                totalPrice: total,
                address,
            });
            
            dispatch(clearCart());
            Alert.alert('Заказ оформлен', 'Спасибо за покупку!', [
              {
                text: 'OK',
                onPress: () => navigation.navigate('Home' as never),
              },
            ]);
        }
        catch (error) {
            Alert.alert('Не удалось оформить заказ');
            console.error(error);
        }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Адрес доставки</Text>
      <TextInput
        style={styles.input}
        value={address}
        onChangeText={setAddress}
        placeholder="Например, с. Бердыкель, ул. Кадырова, д. 1"
      />

      <Text style={styles.total}>Итого: {total.toFixed(2)} ₽</Text>

      <TouchableOpacity style={styles.button} onPress={handleOrder}>
        <Text style={styles.buttonText}>Оформить заказ</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckoutScreen;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#007B7F',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  total: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
    color: '#333',
  },
  button: {
    backgroundColor: '#007B7F',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '600',
  },
});
