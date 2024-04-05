import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define statuses
export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

// Define async thunk to fetch cart data
export const getCart = createAsyncThunk("cart/getCart", async (_, thunkAPI) => {
  try {
    const response = await fetch("https://ecommerce-backend-yxmt.onrender.com/api/cart/getCart", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cart data");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Define async thunk to fetch product data
export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (_, thunkAPI) => {
    try {
      const response = await fetch(
        "https://ecommerce-reduxbackend.onrender.com/api/cart/products"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch product data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Define async thunk to add item to cart
export const addcart = createAsyncThunk(
  "cart/addCart",
  async (product, thunkAPI) => {
    try {
      const response = await fetch("https://ecommerce-backend-yxmt.onrender.com/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(product),
      });
      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      const data = await response.json();

      return { data, status: response.status }; // Return both data and status
    } catch (error) {
      console.error("Error in addcart:", error);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Define async thunk to increase quantity in cart
export const increases = createAsyncThunk(
  "cart/increase",
  async ({ id, inc }, thunkAPI) => {
    console.log(id, inc);
    try {
      const response = await fetch("https://ecommerce-backend-yxmt.onrender.com/api/cart/getCart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id, type: inc }),
      });
      if (!response.ok) {
        throw new Error("Failed to increase quantity in cart");
      }
      const data = await response.json();
      return { data, status: response.status }; // Return both data and status
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Define async thunk to buy a product
export const buyproduct = createAsyncThunk(
  "cart/buyProduct",
  async (product, thunkAPI) => {
  
    
    try {
      const response = await fetch(
        "https://ecommerce-backend-yxmt.onrender.com/api/cart/order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(product),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to buy product");
      }
      const data = await response.json();
      return { data, status: response.status }; // Return both data and status
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Define async thunk to get user's order
export const getOrder = createAsyncThunk(
  "cart/getOrder",
  async (_, thunkAPI) => {
   
    try {
      const response = await fetch(
        "https://ecommerce-backend-yxmt.onrender.com/api/cart/getorder",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to get user's order");
      }
      const data = await response.json();
      return { data, status: response.status }; // Return both data and status
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Define async thunk to get user's wishlist
export const getwishlist = createAsyncThunk(
  "cart/getWishlist",
  async (_, thunkAPI) => { 
    try {
      const response = await fetch(
        "https://ecommerce-backend-yxmt.onrender.com/api/cart/getwishlist",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Failed to get user's wishlist");
      }
      const data = await response.json();
     
      return { data, status: response.status }; // Return both data and status
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const AddWishlist = createAsyncThunk(
  "cart/addwishlist",
  async (product, thunkAPI) => {
    try {
      const response = await fetch("https://ecommerce-backend-yxmt.onrender.com/api/cart/wishlist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(product),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to Wishlist");
      }

      const data = await response.json();

      return { data, status: response.status };
    } catch (error) {
      console.error("Error in Adding:", error);

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeWish = createAsyncThunk(
  "cart/removewishlist",
  async (id, thunkAPI) => {
  
    try {
      const response = await fetch("https://ecommerce-backend-yxmt.onrender.com/api/cart/wishlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to Wishlist");
      }

      const data = await response.json();

      return { data, status: response.status };
    } catch (error) {
      

      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Define ProductSlice
const ProductSlice = createSlice({
  name: "Product",
  initialState: {
    data: null,
    status: null,
    error: null,
  },
  reducers: {},

  // Define extra reducers
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
        state.error = action.error.message;
      })
      .addCase(getCart.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getCart.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.data = action.payload;
      })
      .addCase(getCart.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(addcart.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(addcart.fulfilled, (state) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(addcart.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(buyproduct.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(buyproduct.fulfilled, (state) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(buyproduct.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(getOrder.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getOrder.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.data = action.payload;
      })
      .addCase(getOrder.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })
      .addCase(getwishlist.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(getwishlist.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.data = action.payload;
      })

      .addCase(getwishlist.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })

      .addCase(AddWishlist.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(AddWishlist.fulfilled, (state) => {
        state.status = STATUSES.IDLE;
      })
      .addCase(AddWishlist.rejected, (state) => {
        state.status = STATUSES.ERROR;
      })

      .addCase(removeWish.pending, (state) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(removeWish.fulfilled, (state, action) => {
        state.status = STATUSES.IDLE;
        state.data = action.payload;
      })

      .addCase(removeWish.rejected, (state) => {
        state.status = STATUSES.ERROR;
      });
  },
});

// Export actions and reducer
export const {} = ProductSlice.actions;
export default ProductSlice.reducer;
