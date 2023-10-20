import { baseApi } from "./baseApi";

const AUTH_API = "/auth";
const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (data: Record<string, any>) => ({
        url: `${AUTH_API}/signin`,
        method: "POST",
        body: data,
      }),
    }),
    signUp: build.mutation({
      query: (data: Record<string, any>) => ({
        url: `${AUTH_API}/signup`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignInMutation, useSignUpMutation } = authApi;