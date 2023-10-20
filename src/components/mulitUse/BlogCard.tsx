/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function BlogCard() {
  return (
    <div className="card card-compact w-80 rounded-sm bg-base-200 shadow-xl">
      <figure>
        <img
          src="https://images.pexels.com/photos/48889/cleaning-washing-cleanup-the-ilo-48889.jpeg?auto=compress&cs=tinysrgb&w=300"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Cleaning helps to improve mood</h2>
        <p>
          If a dog chews shoes whose shoes does he choose?If a dog chews shoes
          does he choose?If a dog chews shoes whose shoes does he choose?{" "}
          <span className="text-secondary link">Read More</span>
        </p>
      </div>
    </div>
  );
}