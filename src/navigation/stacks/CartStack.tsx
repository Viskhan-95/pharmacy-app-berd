import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CartScreen from '../../screens/CartScreen';
import CheckoutScreen from '../../screens/CheckoutScreen';

export type CartStackParamList = {
  Cart: undefined;
  Checkout: undefined;
};

const Stack = createNativeStackNavigator<CartStackParamList>();

const CartStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Cart" component={CartScreen} options={{ title: 'Корзина' }} />
    <Stack.Screen name="Checkout" component={CheckoutScreen} options={{ title: 'Оформить заказ' }} />
  </Stack.Navigator>
);

export default CartStack;
