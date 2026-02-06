import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const getInitialState = (): AuthState => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    if (token && user) {
      try {
        return {
          user: JSON.parse(user),
          token,
          isAuthenticated: true,
        };
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }
  }
  return {
    user: null,
    token: null,
    isAuthenticated: false,
  };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; token: string }>,
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(action.payload.user)); // Keep localstorage for redundancy if needed, or remove
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      // Note: We can't use js-cookie in Redux logic if it runs server-side (Next.js),
      // but Redux Toolkit is usually client-side.
      // Ideally, logout should happen in a component or thunk.
      // For now, we rely on the component dispatching this to also clear cookies if possible,
      // or we accept that reducers are pure.
      // Better: Create a logout function in AuthService or component that clears cookie THEN dispatches.
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
