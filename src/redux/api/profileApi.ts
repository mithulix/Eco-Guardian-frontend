import { ENUM_TAG_TYPE } from "../tagTypes";
import { baseApi } from "./baseApi";

const PROFILE_API = "/profile";
const profileApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProfile: build.query({
      query: () => ({
        url: `${PROFILE_API}/me`,
        method: "GET",
      }),
      providesTags: [ENUM_TAG_TYPE.profile],
    }),
    updateProfile: build.mutation({
      query: (data) => ({
        url: `${PROFILE_API}/update`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [ENUM_TAG_TYPE.profile],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;