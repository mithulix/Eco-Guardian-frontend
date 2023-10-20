"use client";
import { useAddCategoryMutation } from "@/redux/api/categoryApi";
import { useAddContentMutation } from "@/redux/api/contentApi";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  title: string;
  status: string;
};

export default function CreateCategory() {
  const [addContent, { isError, isLoading, isSuccess }] =
    useAddContentMutation();

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    try {
      data.age = Number(data.age);
      await addContent(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (isSuccess)
      toast.success("Content Created successfully", { id: "success" });
    if (isLoading)
      toast.loading("Processing...", { id: "process", duration: 800 });
    if (isError) toast.error("Failed to create", { id: "err" });
  }, [isSuccess, isError, isLoading]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Create Category</h2>
      <div className="card flex-shrink-0 w-full max-w-3xl shadow-2xl bg-base-100">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input
              type="text"
              placeholder="title"
              className="input input-bordered"
              required
              {...register("title", { required: true })}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Status</span>
            </label>
            <select
              className="select select-bordered w-full text-black"
              placeholder="Select Status"
              {...register("status", { required: true })}
            >
              <option value="visible">Visible</option>
              <option value="invisible">Invisible</option>
            </select>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}