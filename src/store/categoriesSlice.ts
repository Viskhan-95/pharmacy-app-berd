import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { supabase } from '../config/supabase';
import { Category } from '../types/Category';

export const fetchCategories = createAsyncThunk('categories/fetch', async () => {
    const { data, error } = await supabase.from('categories').select('*');
    if (error) throw error;
    return data as Category[];
});

const categoriesSlice = createSlice({
    name: 'categories',
    initialState: {
        data: [] as Category[],
        loading: false,
        error: null as string | null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.data = action.payload;
        })
        .addCase(fetchCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message || 'Ошибка загрузки категорий';
        });
    },
});

export default categoriesSlice.reducer;