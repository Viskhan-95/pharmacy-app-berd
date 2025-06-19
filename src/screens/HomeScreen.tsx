import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, Image, StyleSheet, TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { fetchCategories } from '../store/categoriesSlice';
import { RootState } from '../store';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../navigation/stacks/HomeStack';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  const { data: categories, loading } = useSelector(
    (state: RootState) => state.categories
  );

  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const renderCategory = ({ item }: any) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() =>
        navigation.navigate('Products', {
          categoryId: item.id,
          categoryName: item.name,
        })
      }
    >
      <Image source={{ uri: item.icon }} style={styles.categoryIcon} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Поиск медикаментов"
        value={search}
        onChangeText={setSearch}
      />

      <Image
        source={{ uri: 'https://via.placeholder.com/300x120.png?text=Аптека+Берд' }}
        style={styles.banner}
        resizeMode="cover"
      />

      <Text style={styles.sectionTitle}>Категории</Text>
      {loading ? (
        <Text style={styles.loadingText}>Загрузка...</Text>
      ) : (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={categories}
          renderItem={renderCategory}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.categoriesList}
        />
      )}

      <Text style={styles.sectionTitle}>Новости</Text>
      <View style={styles.newsBlock}>
        <Text style={styles.newsText}>🎉 Скидки на витамины до конца недели!</Text>
        <Text style={styles.newsText}>💊 Бесплатная доставка при заказе от 1000 ₽</Text>
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
  },
  banner: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  categoriesList: {
    paddingBottom: 16,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
  },
  categoryIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 4,
    backgroundColor: '#eef',
  },
  categoryName: {
    fontSize: 13,
    textAlign: 'center',
    maxWidth: 70,
  },
  newsBlock: {
    padding: 12,
    backgroundColor: '#e6f9f6',
    borderRadius: 10,
    marginTop: 8,
  },
  newsText: {
    fontSize: 14,
    marginBottom: 6,
  },
  loadingText: {
    marginVertical: 10,
    textAlign: 'center',
  },
});