import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { tagTypes } from "../tagTypes";
import { getFromLocalStorage } from "@/utils/local-storage";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://earth-cleaner-backend-seven.vercel.app/api/v1",
    prepareHeaders: (headers) => {
      const accessToken = getFromLocalStorage("accessToken");
      if (accessToken) {
        headers.set("Authorization", accessToken);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: tagTypes,
});
