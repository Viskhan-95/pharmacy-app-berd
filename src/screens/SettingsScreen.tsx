
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { supabase } from '../config/supabase';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Email: пользователь@пример.ру</Text>
      <Button title='Мои заказы' onPress={() => navigation.navigate('Orders' as never)} />
      <Button title="Выйти" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
});

export default SettingsScreen;
