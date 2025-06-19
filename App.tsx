import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView,  StatusBar, StyleSheet, Platform } from 'react-native';
import { Provider } from 'react-redux';
import Navigation from './src/navigation/Navigation';
import { store } from './src/store';
import AuthScreen from './src/screens/AuthScreen';
import { Session } from '@supabase/supabase-js';
import { supabase } from './src/config/supabase';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <GestureHandlerRootView style={styles.flex}>
        <Provider store={store} >
            <SafeAreaView style={styles.flex}>
                <StatusBar
                    barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
                    backgroundColor='#2a9d8f'
                />
                <NavigationContainer>
                  {session ? <Navigation /> : <AuthScreen />}
              </NavigationContainer>
            </SafeAreaView>
        </Provider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
});
