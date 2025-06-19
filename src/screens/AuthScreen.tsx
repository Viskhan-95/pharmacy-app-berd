
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { supabase } from '../config/supabase';
import { useNavigation } from '@react-navigation/native';
import { loadCartFromSupabase } from '../store/cartSlice';
import { useAppDispatch } from '../hooks/useAppDispatch';

type FormData = {
  email: string;
  password: string;
};

const AuthScreen = () => {
  const { control, handleSubmit, reset } = useForm<FormData>();
  const [isLogin, setIsLogin] = useState(true);
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        Alert.alert('Ошибка входа', error.message);
      } else {
        dispatch(loadCartFromSupabase());
        navigation.reset({ index: 0, routes: [{ name: 'Home' as never }] });
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        Alert.alert('Ошибка регистрации', error.message);
      } else {
        Alert.alert('Регистрация прошла успешно. Проверьте почту для подтверждения.');
        setIsLogin(true);
        reset();
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isLogin ? 'Вход' : 'Регистрация'}</Text>

      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{ required: true }}
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Пароль"
            secureTextEntry
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
        <Text style={styles.buttonText}>{isLogin ? 'Войти' : 'Зарегистрироваться'}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.link}>
          {isLogin ? 'Нет аккаунта? Зарегистрируйтесь' : 'Уже есть аккаунт? Войти'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 24 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: '#1abc9c',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 12,
  },
  buttonText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  link: { color: '#3498db', textAlign: 'center', marginTop: 12 },
});

export default AuthScreen;
