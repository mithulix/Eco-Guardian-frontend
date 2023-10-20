import { ENUM_TAG_TYPE } from "../tagTypes";
import { baseApi } from "./baseApi";

const CATEGORY_API = "/categories";
const categoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addCategory: build.mutation({
      query: (data: Record<string, any>) => ({
        url: CATEGORY_API,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [ENUM_TAG_TYPE.category],
    }),
    getCategories: build.query({
      query: (arg: Record<string, any>) => ({
        url: CATEGORY_API,
        method: "GET",
        params: arg,
      }),
      providesTags: [ENUM_TAG_TYPE.category],
    }),
    getCategory: build.query({
      query: (id: string) => ({
        url: `${CATEGORY_API}/${id}`,
        method: "GET",
      }),
      providesTags: [ENUM_TAG_TYPE.category],
    }),
    updateCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `${CATEGORY_API}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [ENUM_TAG_TYPE.category],
    }),
    deleteCategory: build.mutation({
      query: (id: string) => ({
        url: `${CATEGORY_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [ENUM_TAG_TYPE.category],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useGetCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;