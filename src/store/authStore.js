import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const BASE_URL = "https://store-backend-drab.vercel.app";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      role: null,
      loading: false,
      error: null,

      registerUser: async (formData, callback) => {
        try {
          set({ loading: true, error: null });
          const res = await axios.post(`${BASE_URL}/auth/register`, formData);
          const { token, userName, role } = res.data;

          set({
            user: userName,
            token,
            role,
            loading: false,
          });

          if (callback) callback();
        } catch (err) {
          set({
            error: err?.response?.data?.message || "Registration failed",
            loading: false,
          });
        }
      },

      loginUser: async (formData, callback) => {
        try {
          set({ loading: true, error: null });

          const res = await axios.post(`${BASE_URL}/auth/login`, formData);
          const { token, userName, role } = res.data;

          set({
            user: userName,
            token,
            role,
            loading: false,
          });

          if (callback) callback(role);
        } catch (err) {
          set({
            error: err?.response?.data?.message || "Login failed",
            loading: false,
          });
        }
      },

      logoutUser: () => {
        set({ user: null, token: null, role: null });
      },
    }),
    {
      name: "auth-storage",
      getStorage: () => localStorage,
    }
  )
);
