/* eslint-disable @next/next/no-img-element */
import React from "react";

export default function NewsCard() {
  return (
    <div className="card card-compact w-80 rounded-sm bg-base-200 shadow-xl">
      <figure>
        <img
          src="https://images.pexels.com/photos/209230/pexels-photo-209230.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Cleaning Service!</h2>
        <p>
          If a dog chews shoes whose shoes does he choose?If a dog chews shoes
          does he choose?If a dog chews shoes whose shoes does he choose?{" "}
          <span className="text-secondary link">Read More</span>
        </p>
      </div>
    </div>
  );
}