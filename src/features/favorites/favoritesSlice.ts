import { createSlice,PayloadAction } from "@reduxjs/toolkit";


type Product = {
  id: number;
  title: string;
  price: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

type FavoritesState = {
  value: Product[];
};

const initialState: FavoritesState = {
  value: [],
};

export const favoritesSlice = createSlice({
  name:"favorites",
  initialState,
  reducers:{
    addFavorite: (state, action: PayloadAction<Product>) => {
      state.value.push(action.payload);
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.value = state.value.filter((product) => product.id !== action.payload);
    },
  }
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;