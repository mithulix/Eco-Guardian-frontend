"use client";
import Table from "@/components/ui/Table";
import {
  useGetBookingsQuery,
  useUpdateBookingMutation,
} from "@/redux/api/bookingApi";
import moment from "moment";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function BookingHistory() {
  const [updateStatus, { isError, isLoading, isSuccess }] =
    useUpdateBookingMutation();

  useEffect(() => {
    if (isSuccess)
      toast.success("Update Service status successfully", { id: "success" });

    if (isLoading)
      toast.loading("Processing...", { id: "process", duration: 800 });
    if (isError) toast.error("Failed to update status", { id: "err" });
  }, [isSuccess, isError, isLoading]);

  const rowItems = ["", "Title", "Price", "Status", "Order By", "Created At"];

  const query: Record<string, unknown> = {
    page: 1,
    limit: 100,
    status: "pending",
  };
  const { data } = useGetBookingsQuery(query);

  const tableData = data?.data?.map((data: any, i: number) => {
    let badgeColor = "badge-primary";

    const handleUpdate = (id: string, status: string) => {
      updateStatus({ id, data: { status } });
    };

    return (
      <tr key={data._id} className="hover">
        <th>{i + 1}</th>
        <td>{data?.service?.title}</td>
        <td>{data?.service?.price}</td>
        <td>
          <span className={`badge ${badgeColor} badge-sm`}>{data?.status}</span>
        </td>
        <td>{data?.orderBy?.name}</td>
        <td>{moment(data?.createdAt).format("DD MMM YYYY")}</td>
        <td>
          <div className="flex gap-3">
            <button
              onClick={() => handleUpdate(data._id, "accepted")}
              className="btn btn-xs btn-secondary"
            >
              Accept
            </button>
            <button
              onClick={() => handleUpdate(data._id, "rejected")}
              className="btn btn-xs btn-error"
            >
              Reject
            </button>
          </div>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h2 className="text-3xl font-bold">Manage Service Page</h2>
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
        </div>
        {tableData?.length ? (
          <Table rowItems={rowItems} tableData={tableData} />
        ) : (
          <p className="mt-5 text-xl text-center">No Data</p>
        )}
      </div>
    </div>
  );
}