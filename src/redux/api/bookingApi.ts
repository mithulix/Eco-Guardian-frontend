import { ENUM_TAG_TYPE } from "../tagTypes";
import { baseApi } from "./baseApi";

const BOOKING_API = "/bookings";
const bookingApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addBooking: build.mutation({
      query: (data: Record<string, any>) => ({
        url: BOOKING_API,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [ENUM_TAG_TYPE.booking],
    }),
    getBookings: build.query({
      query: (arg: Record<string, any>) => ({
        url: BOOKING_API,
        method: "GET",
        params: arg,
      }),
      providesTags: [ENUM_TAG_TYPE.booking],
    }),
    getBooking: build.query({
      query: (id: string) => ({
        url: `${BOOKING_API}/${id}`,
        method: "GET",
      }),
      providesTags: [ENUM_TAG_TYPE.booking],
    }),
    updateBooking: build.mutation({
      query: ({ id, data }) => ({
        url: `${BOOKING_API}/update-status/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [ENUM_TAG_TYPE.booking],
    }),
    deleteBooking: build.mutation({
      query: (id: string) => ({
        url: `${BOOKING_API}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [ENUM_TAG_TYPE.booking],
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useGetBookingQuery,
  useAddBookingMutation,
  useUpdateBookingMutation,
  useDeleteBookingMutation,
} = bookingApi;
