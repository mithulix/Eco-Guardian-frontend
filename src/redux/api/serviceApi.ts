import { ENUM_TAG_TYPE } from "../tagTypes";
import { baseApi } from "./baseApi";

const SERVICE_API = "/cleaning-service";
const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addService: build.mutation({
      query: (data: Record<string, any>) => ({
        url: SERVICE_API,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [ENUM_TAG_TYPE.service],
    }),
    getServices: build.query({
      query: (arg: Record<string, any>) => ({
        url: SERVICE_API,
        method: "GET",
        params: arg,
      }),
      providesTags: [ENUM_TAG_TYPE.service],
    }),
    getService: build.query({
      query: (id: string) => ({
        url: `${SERVICE_API}/${id}`,
        method: "GET",
      }),
      providesTags: [ENUM_TAG_TYPE.service],
    }),
    updateService: build.mutation({
      query: ({ id, data }) => ({
        url: `${SERVICE_API}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [ENUM_TAG_TYPE.service],
    }),
    deleteService: build.mutation({
      query: (id: string) => ({
        url: `${SERVICE_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [ENUM_TAG_TYPE.service],
    }),
  }),
});

export const {
  useGetServicesQuery,
  useGetServiceQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceApi;
