import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
});

const getuser = createAsyncThunk(
  "getuser",
  async (data, { rejectWithValue }) => {
    try {
    
      const { email, password } = data;
    

      const response = await fetch("https://ecommerce-backend-yxmt.onrender.com/api/seller/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
    
      if (!response.ok) {
        throw new Error("Login Failed");
      }

      const responseData = await response.json();
      localStorage.setItem("seller", responseData.token);
    
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createuser = createAsyncThunk(
  "createuser",
  async (data, { rejectWithValue }) => {
    try {
   
      const { name, email, password } = data;
    

      const response = await fetch("https://ecommerce-backend-yxmt.onrender.com/api/seller/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
    
      if (!response.ok) {
        throw new Error("Login Failed");
      }

      const responseData = await response.json();
      localStorage.setItem("seller", responseData.token);

      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addproduct = createAsyncThunk(
  "seller/addproduct",
  async (data, { rejectWithValue }) => {
    try {
   
      const { name, price, image, desc, selectedItem } = data;
      const response = await fetch(
        "https://ecommerce-backend-yxmt.onrender.com/api/seller/addproduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("seller")}`,
          },
          body: JSON.stringify({ name, price, image, desc, selectedItem }),
        }
      );
     
      if (!response.ok) {
        throw new Error("Login Failed");
      }

      const responseData = await response.json();
     
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const getsellerproduct = createAsyncThunk(
  "seller/getsellerproducts",
  async (rejectWithValue) => {
  
    try {
      const response = await fetch(
        "https://ecommerce-backend-yxmt.onrender.com/api/seller/getsellerproduct",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("seller")}`,
          },
        }
      );
     
      if (!response.ok) {
        throw new Error("Login Failed");
      }
   
      const responseData = await response.json();
      
      return responseData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteproduct = createAsyncThunk(
  "seller/delete",
  async (data, rejectWithValue) => {
    const { id, category } = data;
    try {
      const response = await fetch("https://ecommerce-backend-yxmt.onrender.com/api/seller/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("seller")}`,
        },
        body: JSON.stringify({ id, category }),
      });
     
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

export const editproduct = createAsyncThunk(
  "seller/edit",
  async (data, rejectWithValue) => {
    
    const { name, description, image, price, id, category } = data;
    try {
      const response = await fetch("https://ecommerce-backend-yxmt.onrender.com/api/seller/edit", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("seller")}`,
        },
        body: JSON.stringify({ name, description, image, price, id, category }),
      });
    
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

export const getSellerOrder = createAsyncThunk(
  "seller/edit",
  async (data, rejectWithValue) => {
    try {
      const response = await fetch("https://ecommerce-backend-yxmt.onrender.com/api/seller/orders", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("seller")}`,
        },
      });

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

const UserSlice = createSlice({
  name: "User",
  initialState: {
    data: null,
    status: null,
    error: null,
  },
  reducers: {
    todoAdded(state, action) {
      state.push({
        id: action.payload.id,
        text: action.payload.text,
        completed: false,
      });
    },
  },

  extraReducers: (builder) => {
    builder.addCase(getuser.pending, (state) => {
      state.status = STATUSES.LOADING;
    });
    builder.addCase(getuser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = STATUSES.IDLE;
    });
    builder.addCase(getuser.rejected, (state, action) => {
      state.status = STATUSES.ERROR;
      state.error = action.error.message;
    });

    builder.addCase(createuser.pending, (state) => {
      state.status = STATUSES.LOADING;
    });
    builder.addCase(createuser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = STATUSES.IDLE;
    });
    builder.addCase(createuser.rejected, (state, action) => {
      state.status = STATUSES.ERROR;
      state.error = action.error.message;
    });

    builder.addCase(addproduct.pending, (state) => {
      state.status = STATUSES.LOADING;
    });
    builder.addCase(addproduct.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = STATUSES.IDLE;
    });
    builder.addCase(addproduct.rejected, (state, action) => {
      state.status = STATUSES.ERROR;
      state.error = action.error.message;
    });

    builder.addCase(getsellerproduct.pending, (state) => {
      state.status = STATUSES.LOADING;
    });
    builder.addCase(getsellerproduct.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = STATUSES.IDLE;
    });
    builder.addCase(getsellerproduct.rejected, (state, action) => {
      state.status = STATUSES.ERROR;
      state.error = action.error.message;
    });

    builder.addCase(deleteproduct.pending, (state) => {
      state.status = STATUSES.LOADING;
    });
    builder.addCase(deleteproduct.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = STATUSES.IDLE;
    });
    builder.addCase(deleteproduct.rejected, (state, action) => {
      state.status = STATUSES.ERROR;
      state.error = action.error.message;
    });

    builder.addCase(editproduct.pending, (state) => {
      state.status = STATUSES.LOADING;
    });
    builder.addCase(editproduct.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = STATUSES.IDLE;
    });
    builder.addCase(editproduct.rejected, (state, action) => {
      state.status = STATUSES.ERROR;
      state.error = action.error.message;
    });

    builder.addCase(getSellerOrder.pending, (state) => {
      state.status = STATUSES.LOADING;
    });
    builder.addCase(getSellerOrder.fulfilled, (state, action) => {
      state.data = action.payload;
      state.status = STATUSES.IDLE;
    });
    builder.addCase(getSellerOrder.rejected, (state, action) => {
      state.status = STATUSES.ERROR;
      state.error = action.error.message;
    });
  },
});

export const { todoAdded } = UserSlice.actions;
export { getuser }; // Export getuser async thunk

export default UserSlice.reducer;
