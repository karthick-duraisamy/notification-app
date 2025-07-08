import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Reducer } from 'redux';
import { authenticateService, initialAuthService } from '../services/user/Users';
import { hydrateUserFromLocalStorage } from '../Utils/user';
import { encryptRequest } from '../Utils/crypto';

/**
 * User interface
 */
interface User {
  id: number;
  name: string;
  email: string;
  user_type: string;
  token?: string;
}

type Authenticated = boolean | null;

/**
 * Initial state
 */
const initialState: {
  user: User | null;
  auth: Authenticated;
} = {
  user: null,
  auth: null,
};

/**
 * Create slice
 */
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<User>) => {
      return { ...state, user: payload };
    },
    delUser: (state) => {
      localStorage.removeItem('user');
      localStorage.removeItem('project');
      localStorage.removeItem('project_code');
      return { ...state, user: null, auth: false };
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(initialAuthService.matchFulfilled, (state) => {
        const user = hydrateUserFromLocalStorage();
        if (user && user.id && user.email && user.name && user.user_type) {
          return { ...state, user, auth: true };
        } else {
          return { ...state, user: null, auth: false };
        }
      })
      .addMatcher(initialAuthService.matchRejected, (state) => {
        return { ...state, user: null, auth: false };
      })
      .addMatcher(authenticateService.matchFulfilled, (state, { payload, meta }) => {
        if ((payload as any)?.responseCode === 0) {
          const { email_id, user_id, user_type, token } = (payload as any).response.data;
          let csrf = (meta as any)?.baseQueryMeta?.response?.headers?.get('x-csrftoken') ?? token;

          const user: User = {
            email: email_id,
            id: user_id,
            name: email_id,
            user_type,
            token: csrf,
          };

          const encryptedUser = encryptRequest(JSON.stringify(user));
          localStorage.setItem('user', encryptedUser);

          return { ...state, user, auth: true };
        }
        return state;
      });
  },
});

/**
 * Export actions and reducer
 */
export const { setUser, delUser } = userSlice.actions;

// Explicitly type the reducer to fix TS2742
export const userReducer: Reducer<typeof initialState> = userSlice.reducer;
