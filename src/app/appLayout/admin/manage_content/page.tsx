"use client";
import Table from "@/components/ui/Table";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import moment from "moment";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import toast from "react-hot-toast";
import {
  useDeleteContentMutation,
  useGetContentsQuery,
  useUpdateContentMutation,
} from "@/redux/api/contentApi";

export default function ContentManagement() {
  const rowItems = ["", "Title", "Status", "Created At"];

  const [searchTerm, setSearchTerm] = useState("");
  const query: Record<string, unknown> = { page: 1, limit: 100};
  query["searchTerm"] = searchTerm;
  const { data } = useGetContentsQuery(query);
  const [deleteContent, { isLoading, isError, isSuccess }] =
    useDeleteContentMutation();

  const [
    updateContent,
    { isLoading: updateLoad, isError: updateErr, isSuccess: updateSucc },
  ] = useUpdateContentMutation();

  const handleUpdateContent = (id: string, status: string) => {
    status = status == "visible" ? "invisible" : "visible";
    updateContent({ id, data: { status } });
  };

  const tableData = data?.data?.map((data: any, i: number) => (
    <tr key={data._id} className="hover">
      <th>{i + 1}</th>
      <td>{data.title}</td>
      <td>
        <span
          className={`badge badge-sm ${
            data.status == "visible" ? "badge-primary" : "badge-error"
          }`}
        >
          {data.status}
        </span>
      </td>
      <td>{moment(data.createdAt).format("DD MMM YYYY")}</td>
      <td>
        <div className="flex gap-3">
          <button
            onClick={() => handleUpdateContent(data._id, data.status)}
            className={`btn btn-sm ${
              data.status == "visible" ? "btn-error" : "btn-success"
            }`}
          >
            {data.status == "visible" ? "Invisible" : "Visible"}
          </button>
          <button
            onClick={() => deleteContent(data._id)}
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

    if (updateSucc)
      toast.success("Service Delete successfully", { id: "success" });
    if (updateLoad)
      toast.loading("Processing...", { id: "process", duration: 800 });
    if (updateErr) toast.error("Failed to delete", { id: "err" });
  }, [isSuccess, isError, isLoading, updateSucc, updateLoad, updateErr]);

  return (
    <div>
      <h2 className="text-3xl font-bold">Manage Service Page</h2>
      <div className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <input
            onChange={(e) => setSearchTerm(e.target.value)}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-xs"
          />
          <Link href="manage_content/create">
            <button className="btn btn-primary">Create Service</button>
          </Link>
        </div>
        <Table rowItems={rowItems} tableData={tableData} />
      </div>
    </div>
  );
}