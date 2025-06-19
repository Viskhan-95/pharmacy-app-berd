import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from '../../screens/SettingsScreen';
import OrdersScreen from '../../screens/OrdersScreen';

export type SettingsStackParamList = {
  Settings: undefined;
  Orders: undefined;
};

const Stack = createNativeStackNavigator<SettingsStackParamList>();

const SettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Профиль' }} />
    <Stack.Screen name="Orders" component={OrdersScreen} options={{ title: 'Мои заказы' }} />
  </Stack.Navigator>
);

export default SettingsStack;
