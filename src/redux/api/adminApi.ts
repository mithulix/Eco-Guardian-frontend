import { ENUM_TAG_TYPE } from "../tagTypes";
import { baseApi } from "./baseApi";

const ADMIN_API = "/users";
const adminApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addAdmin: build.mutation({
      query: (data: Record<string, any>) => ({
        url: `${ADMIN_API}/create-admin`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [ENUM_TAG_TYPE.admin],
    }),
    getAdmins: build.query({
      query: (arg: Record<string, any>) => ({
        url: ADMIN_API,
        method: "GET",
        params: arg,
      }),
      providesTags: [ENUM_TAG_TYPE.admin],
    }),
    getAdmin: build.query({
      query: (id: string) => ({
        url: `${ADMIN_API}/${id}`,
        method: "GET",
      }),
      providesTags: [ENUM_TAG_TYPE.admin],
    }),
    updateAdmin: build.mutation({
      query: ({ id, data }) => ({
        url: `${ADMIN_API}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [ENUM_TAG_TYPE.admin],
    }),
    deleteAdmin: build.mutation({
      query: (id: string) => ({
        url: `${ADMIN_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [ENUM_TAG_TYPE.admin],
    }),
  }),
});

export const {
  useGetAdminsQuery,
  useGetAdminQuery,
  useAddAdminMutation,
  useUpdateAdminMutation,
  useDeleteAdminMutation,
} = adminApi;
