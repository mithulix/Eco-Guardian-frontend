"use client";
import Table from "@/components/ui/Table";
import { useGetBookingsQuery } from "@/redux/api/bookingApi";
import { useGetServicesQuery } from "@/redux/api/serviceApi";
import { getUserInfo } from "@/services/auth.services";
import moment from "moment";
import Link from "next/link";
import React from "react";

export default function BookingHistory() {
  const rowItems = ["", "Title", "Price", "Status", "Created At"];

  const { data } = useGetBookingsQuery({ limit: 1000 });

  const tableData = data?.data?.map((data: any, i: number) => {
    let badgeColor = "badge-primary";

    if (data?.status == "approved") badgeColor = "badge-secondary";

    if (data?.status == "rejected") badgeColor = "badge-error";

    if (data?.status == "canceled") badgeColor = "badge-neutral";

    return (
      <tr key={data._id} className="hover">
        <th>{i + 1}</th>
        <td>{data?.service?.title}</td>
        <td>{data?.service?.price}</td>
        <td>
          <span className={`badge ${badgeColor} badge-sm`}>{data?.status}</span>
        </td>
        <td>{moment(data?.createdAt).format("DD MMM YYYY")}</td>
        <td></td>
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