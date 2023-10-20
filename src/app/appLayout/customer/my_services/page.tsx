"use client";
import Table from "@/components/ui/Table";
import {
  useGetBookingsQuery,
  useUpdateBookingMutation,
} from "@/redux/api/bookingApi";
import { getUserInfo } from "@/services/auth.services";
import moment from "moment";
import React, { useEffect } from "react";
import toast from "react-hot-toast";

export default function MyServices() {
  const rowItems = ["", "Title", "Price", "Status", "Created At"];

  const [cancelBooking, { isError, isLoading, isSuccess }] =
    useUpdateBookingMutation();

  //@ts-ignore
  const userId = getUserInfo()._id;

  const { data } = useGetBookingsQuery({ orderBy: userId, status: "pending" });

  const handleCancel = (id: string) => {
    cancelBooking({ id, data: { status: "canceled" } });
  };

  const tableData = data?.data?.map((data: any, i: number) => (
    <tr key={data._id} className="hover">
      <th>{i + 1}</th>
      <td>{data?.service?.title}</td>
      <td>{data?.service?.price}</td>
      <td>
        <span className="badge badge-primary badge-sm">{data?.status}</span>
      </td>
      <td>{moment(data?.createdAt).format("DD MMM YYYY")}</td>
      <td>
        <div className="flex gap-3">
          <button
            onClick={() => handleCancel(data._id)}
            className="btn btn-sm btn-error"
          >
            Cancel
          </button>
        </div>
      </td>
    </tr>
  ));

  useEffect(() => {
    if (isSuccess) {
      toast.success("Booking canceled successfully", { id: "success" });
    }
    if (isLoading)
      toast.loading("Processing...", { id: "process", duration: 800 });
    if (isError) toast.error("Failed to cancel", { id: "err" });
  }, [isSuccess, isError, isLoading]);

  return (
    <div>
      <h2 className="text-3xl font-bold">My Services Page</h2>
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
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