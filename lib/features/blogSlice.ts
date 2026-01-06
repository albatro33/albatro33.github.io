import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BlogState {
  searchQuery: string;
  selectedTag: string | null;
  selectedCategory: string | null;
}

const initialState: BlogState = {
  searchQuery: '',
  selectedTag: null,
  selectedCategory: null,
};

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setSelectedTag: (state, action: PayloadAction<string | null>) => {
      state.selectedTag = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    clearFilters: (state) => {
      state.searchQuery = '';
      state.selectedTag = null;
      state.selectedCategory = null;
    },
  },
});

export const { setSearchQuery, setSelectedTag, setSelectedCategory, clearFilters } = blogSlice.actions;
export default blogSlice.reducer;

