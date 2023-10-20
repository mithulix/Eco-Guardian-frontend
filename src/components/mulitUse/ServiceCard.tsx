/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

export default function ServiceCard({ data }: { data: any }) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl rounded-md">
      <figure>
        <img
          src="https://images.unsplash.com/photo-1550963295-019d8a8a61c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGNsZWFuaW5nfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
          alt="Shoes"
          className="h-28 w-full object-cover"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {data?.title}
          <div className="badge badge-sm badge-secondary">
            {data?.category?.title}
          </div>
        </h2>
        <p>{data?.description}</p>
        <div className="flex justify-between">
          <p className="font-bold">Price:</p>
          <span>{data?.price}tk</span>
        </div>
        <Link href={`/service/${data?._id}`} className="btn btn-primary">
          See Details
        </Link>
      </div>
    </div>
  );
}