import { ENUM_TAG_TYPE } from "../tagTypes";
import { baseApi } from "./baseApi";

const REVIEW_API = "/reviews";
const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addReview: build.mutation({
      query: (data: Record<string, any>) => ({
        url: REVIEW_API,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [ENUM_TAG_TYPE.review],
    }),
    getReviews: build.query({
      query: (arg: Record<string, any>) => ({
        url: REVIEW_API,
        method: "GET",
        params: arg,
      }),
      providesTags: [ENUM_TAG_TYPE.review],
    }),
       getReviewsByServiceId: build.query({
      query: (serviceId) => ({
        url: `${REVIEW_API}/${serviceId}`,
        method: "GET",
      }),
      providesTags: [ENUM_TAG_TYPE.review],
    }),
    getReview: build.query({
      query: (id: string) => ({
        url: `${REVIEW_API}/${id}`,
        method: "GET",
      }),
      providesTags: [ENUM_TAG_TYPE.review],
    }),
    updateReview: build.mutation({
      query: ({ id, data }) => ({
        url: `${REVIEW_API}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [ENUM_TAG_TYPE.review],
    }),
    deleteReview: build.mutation({
      query: (id: string) => ({
        url: `${REVIEW_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [ENUM_TAG_TYPE.review],
    }),
  }),
});

export const {
  useGetReviewsQuery,
  useGetReviewsByServiceIdQuery,
  useGetReviewQuery,
  useAddReviewMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
