"use client";
import React from 'react'
import ReviewCard from '../mulitUse/ReviewCard';
import { useGetReviewsQuery } from "@/redux/api/reviewApi";

export default function ClientReview() {
  const { data } = useGetReviewsQuery({ limit: 3 });

  return (
    <div className="section-padding">
      <h2 className="section-heading">Client Reviews</h2>
      <div className="card_div">
        {data?.data?.map((review: any) => (
          <ReviewCard key={review?._id} review={review} />
        ))}
      </div>
    </div>
  );
}