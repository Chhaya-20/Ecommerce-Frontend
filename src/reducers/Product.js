import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

export const getProduct = createAsyncThunk(
  "toDo/getToDos",
  async (thunkAPI) => {
    try {
      const response = await fetch("https://ecommerce-reduxbackend.onrender.com/api/cart/products");
      if (!response.ok) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchproducts =  createAsyncThunk(
  "cart/product",
  async (data,rejectWithValue) => {
  
    try {
      const response = await fetch(`https://ecommerce-backend-yxmt.onrender.com/api/cart/${data}`)
    
      if (!response.ok) {
        throw new Error("Delete Failed ");
      }
      
      const responseData = await response.json();
      
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);







export const addcart = createAsyncThunk(
  "/addcart",
  async ({ id, price }, thunkAPI) => {
    try {
      const response = await fetch("https://ecommerce-reduxbackend.onrender.com/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id, price }),
      });
      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }
      const data = await response.json();
      return { data, status: response.status };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);


const ProductSlice = createSlice({
  name: "Product",
  initialState: {
    data: null,
    status: null,
    error: null,
  },
  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(getProduct.pending, (state) => {
      state.status = STATUSES.LOADING;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = STATUSES.IDLE;
    });
    builder.addCase(getProduct.rejected, (state, action) => {
      state.status = STATUSES.ERROR;
      state.error = action.error.message;
    });

    builder.addCase(fetchproducts.pending, (state) => {
      state.status = STATUSES.LOADING;
    });
    builder.addCase(fetchproducts.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = STATUSES.IDLE;
    });
    builder.addCase(fetchproducts.rejected, (state, action) => {
      state.status = STATUSES.ERROR;
      state.error = action.error.message;
    });




   
    builder
    .addCase(addcart.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(addcart.fulfilled, (state) => {
      state.status = 'fulfilled';
    })
    .addCase(addcart.rejected, (state) => {
      state.status = 'rejected';
    });
  },
});

export const { todoAdded } = ProductSlice.actions;
// export { getProduct }; // Export getProduct async thunk

export default ProductSlice.reducer;
