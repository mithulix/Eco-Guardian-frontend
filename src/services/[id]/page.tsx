"use client";
/* eslint-disable @next/next/no-img-element */
import Reviews from "@/components/ui/Reviews";
import {
  useAddBookingMutation,
  useGetBookingsQuery,
} from "@/redux/api/bookingApi";
import {
  useAddCartMutation,
  useDeleteCartMutation,
  useGetCartsByServiceIdQuery,
  useGetCartsQuery,
} from "@/redux/api/cartApi";
import { useGetServiceQuery } from "@/redux/api/serviceApi";
import { getUserInfo } from "@/services/auth.services";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ServiceDetails({ params }: { params: { id: string } }) {
  const [date, setDate] = useState("");
  const [addBooking] = useAddBookingMutation();
  const [addToCart, { isError, isLoading, isSuccess }] = useAddCartMutation();
  const [removeFromCart] = useDeleteCartMutation();

  const id = params.id;
  const { data: cartData } = useGetCartsByServiceIdQuery(id);

  const { data } = useGetServiceQuery(id);

  const serviceData = data?.data;
  const userInfo = getUserInfo();
  const handleBookService = () => {
    if (!date) {
      toast.error("Please select a date.", { id: "err" });
      return;
    }
    const data = { service: id, serviceDate: date };
    addBooking(data);
    toast.success("Thanks for booking our service");
  };

  const handleAddToCart = () => {
    addToCart({ service: id });
  };

  useEffect(() => {
    if (isSuccess) toast.success("Added to successfully", { id: "success" });

    if (isLoading)
      toast.loading("Processing...", { id: "process", duration: 800 });
    if (isError) toast.error("Failed to add to cart", { id: "err" });
  }, [isSuccess, isError, isLoading]);

  //@ts-ignore
  const userId = getUserInfo()._id;
  let alreadyAddedToCart = cartData?.data?.find(
    (cart: any) => cart?.user?._id == userId
  );

  const handleRemoveFromCart = () => {
    removeFromCart(alreadyAddedToCart._id);
  };

  return (
    <div className=" px-8 py-5">
      <div>
        <img
          src="https://images.unsplash.com/photo-1550963295-019d8a8a61c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNsZWFuaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
          alt="Shoes"
          className="h-28 w-full object-cover rounded-md"
        />
      </div>
      <div className="mt-6 flex justify-between">
        <div>
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold">{serviceData?.title}</h2>
            <span className="badge badge-primary badge-sm">
              {serviceData?.category?.title}
            </span>
          </div>
          <p>
            <span className="font-semibold">Price:</span> {serviceData?.price}tk
          </p>
          <p>{serviceData?.description}</p>
        </div>
        <div className="text-end flex gap-4">
          {!!alreadyAddedToCart ? (
            <button
              onClick={handleRemoveFromCart}
              disabled={!userInfo}
              className="btn btn-accent btn-sm"
            >
              Remove From Cart
            </button>
          ) : (
            <button
              onClick={handleAddToCart}
              disabled={!userInfo}
              className="btn btn-secondary btn-sm"
            >
              Add To Cart
            </button>
          )}
          <input
            onChange={(e) => setDate(e.target.value)}
            type="date"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs input-sm"
          />
          <button
            onClick={handleBookService}
            disabled={!userInfo}
            className="btn btn-primary btn-sm"
          >
            Book Now
          </button>
          {!userInfo && (
            <p className="text-sm text-error">
              Please log in first to post review
            </p>
          )}
        </div>
      </div>
      <hr className="my-4" />
      <div className="mt-4">
        <Reviews serviceId={id} />
      </div>
    </div>
  );
}