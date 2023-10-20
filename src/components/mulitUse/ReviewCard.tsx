"use client";
import { useDeleteReviewMutation } from "@/redux/api/reviewApi";
import { getUserInfo } from "@/services/auth.services";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { AiFillDelete, AiFillStar } from "react-icons/ai";

export default function ReviewCard({ review }: any) {
  const [deleteReview, { isError, isLoading, isSuccess }] =
    useDeleteReviewMutation();

  const ratingStars = Array.from({ length: review?.rating }, (_, index) => (
    <AiFillStar key={index} className="text-orange-400" />
  ));

  const userInfo = getUserInfo();

  //@ts-ignore
  const userOwnReview = userInfo?._id == review?.user?._id;

  useEffect(() => {
    if (isSuccess)
      toast.success("Review deleted successfully", { id: "success" });
    if (isLoading)
      toast.loading("Processing...", { id: "process", duration: 800 });
    if (isError) toast.error("Failed to delete review", { id: "err" });
  }, [isSuccess, isError, isLoading]);

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="card-title">{review?.user?.name}</h2>
            <div className="flex items-center gap-[1px]">{ratingStars}</div>
          </div>
          {userOwnReview && (
            <button
              onClick={() => deleteReview(review?._id)}
              className="btn btn-sm btn-error"
            >
              <AiFillDelete className="text-2xl text-gray-800" />
            </button>
          )}
        </div>

        <p>{review?.review}</p>
      </div>
    </div>
  );
}