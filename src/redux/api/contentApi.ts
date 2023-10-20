import { ENUM_TAG_TYPE } from "../tagTypes";
import { baseApi } from "./baseApi";

const CONTENT_API = "/content-management";
const contentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addContent: build.mutation({
      query: (data: Record<string, any>) => ({
        url: CONTENT_API,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [ENUM_TAG_TYPE.content],
    }),
    getContents: build.query({
      query: (arg: Record<string, any>) => ({
        url: CONTENT_API,
        method: "GET",
        params: arg,
      }),
      providesTags: [ENUM_TAG_TYPE.content],
    }),
    updateContent: build.mutation({
      query: ({ id, data }) => ({
        url: `${CONTENT_API}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [ENUM_TAG_TYPE.content],
    }),
    deleteContent: build.mutation({
      query: (id: string) => ({
        url: `${CONTENT_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [ENUM_TAG_TYPE.content],
    }),
  }),
});

export const {
  useGetContentsQuery,
  useAddContentMutation,
  useUpdateContentMutation,
  useDeleteContentMutation,
} = contentApi;