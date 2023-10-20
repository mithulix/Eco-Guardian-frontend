"use client";
import Table from "@/components/ui/Table";
import {
  useDeleteServiceMutation,
  useGetServicesQuery,
} from "@/redux/api/serviceApi";
import Link from "next/link";
import React, { useEffect } from "react";
import moment from "moment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import toast from "react-hot-toast";

export default function ManageService() {
  const rowItems = ["", "Title", "Price", "Status", "Category", "Created At"];

  const { data } = useGetServicesQuery({ page: 1, limit: 100 });
  const [deleteService, { isLoading, isError, isSuccess }] =
    useDeleteServiceMutation();

  const tableData = data?.data?.map((data: any, i: number) => (
    <tr key={data._id} className="hover">
      <th>{i + 1}</th>
      <td>{data.title}</td>
      <td>{data.price}</td>
      <td>{data.status}</td>
      <td>{data.category.title}</td>
      <td>{moment(data.createdAt).format("DD MMM YYYY")}</td>
      <td>
        <div className="flex gap-3">
          <Link href={`manage_service/edit/${data._id}`}>
            <button className="btn btn-sm">
              <AiFillEdit className="text-blue-500 text-2xl" />
            </button>
          </Link>
          <button
            onClick={() => deleteService(data._id)}
            className="btn btn-sm"
          >
            <AiFillDelete className="text-red-600 text-2xl" />
          </button>
        </div>
      </td>
    </tr>
  ));

  useEffect(() => {
    if (isSuccess)
      toast.success("Service Delete successfully", { id: "success" });
    if (isLoading)
      toast.loading("Processing...", { id: "process", duration: 800 });
    if (isError) toast.error("Failed to delete", { id: "err" });
  }, [isSuccess, isError, isLoading]);

  return (
    <div>
      <h2 className="text-3xl font-bold">Manage Service Page</h2>
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
          <Link href="manage_service/create">
            <button className="btn btn-primary">Create Service</button>
          </Link>
        </div>
        <Table rowItems={rowItems} tableData={tableData} />
      </div>
    </div>
  );
}