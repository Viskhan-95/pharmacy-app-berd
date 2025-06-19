import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../config/supabase';
import { Product } from '../types/Product';

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchByCategory',
  async (categoryId: string) => {
    const { data, error } = await supabase
      .from('medications')
      .select('*')
      .eq('category_id', categoryId);
    if (error) throw error;
    return data as Product[];
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    data: [] as Product[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.data = action.payload;
        state.loading = false;
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Ошибка загрузки';
      });
  },
});

export default productsSlice.reducer;