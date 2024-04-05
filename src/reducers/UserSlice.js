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
     

      const response = await fetch("https://ecommerce-backend-yxmt.onrender.com/api/user/login", {
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
      localStorage.setItem("token", responseData.token);
     
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
     

      const response = await fetch("https://ecommerce-backend-yxmt.onrender.com/api/user/signup", {
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
      localStorage.setItem("token", responseData.token);

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
  },
});

export const { todoAdded } = UserSlice.actions;
export { getuser }; // Export getuser async thunk

export default UserSlice.reducer;
