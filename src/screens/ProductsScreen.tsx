import React, { useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { RouteProp, useRoute } from '@react-navigation/native';
import { fetchProductsByCategory } from '../store/productsSlice';
import { RootState } from '../store';
import ProductCard from '../components/ProductCard';


type RouteParams = {
  Products: { categoryId: string; categoryName: string };
};

const ProductsScreen = () => {
  const route = useRoute<RouteProp<RouteParams, 'Products'>>();
  const dispatch = useAppDispatch();
  const { data: products, loading } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProductsByCategory(route.params.categoryId));
  }, [route.params.categoryId]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{route.params.categoryName}</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007B7F" />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ProductCard product={item} />}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
    color: '#007B7F',
  },
  list: {
    gap: 16,
  },
});

export default ProductsScreen;