import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CatalogScreen from '../screens/CatalogScreen';
import ProductsScreen from '../screens/ProductsScreen';
import CartStack from './stacks/CartStack';
import { RootStackParamList } from '../types/navigation';
import { Ionicons } from '@expo/vector-icons';
import HomeStack from './stacks/HomeStack';
import CartIconWithBadge from '../components/CartIconWithBadge';
import SettingsStack from './stacks/SettingsStack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const CatalogStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Catalog" component={CatalogScreen} options={{ title: 'Каталог' }} />
    <Stack.Screen
      name="Products"
      component={ProductsScreen}
      options={({ route }) => ({ title: route.params.categoryName })}
    />
  </Stack.Navigator>
);

const Navigation = () => {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'home';

            if (route.name === 'Home') iconName = 'home';
            else if (route.name === 'Catalog') iconName = 'list';
            else if (route.name === 'Cart') iconName = 'cart';
            else if (route.name === 'Settings') iconName = 'settings';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Home" component={HomeStack} options={{tabBarLabel: 'Главная'}} />
        <Tab.Screen name="Catalog" component={CatalogStack} options={{tabBarLabel: 'Каталог'}} />
        <Tab.Screen name="Cart" component={CartStack} options={{
          tabBarLabel: 'Корзина',
          tabBarIcon: ({color, size}) => (
            <CartIconWithBadge color={color} size={size} />
          ),
        }} 
        />
        <Tab.Screen name="Settings" component={SettingsStack} options={{tabBarLabel: 'Настройки'}} />
      </Tab.Navigator>
  );
};

export default Navigation;
