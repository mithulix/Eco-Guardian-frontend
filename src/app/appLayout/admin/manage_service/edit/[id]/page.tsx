"use client";
import { useGetCategoriesQuery } from "@/redux/api/categoryApi";
import {
  useAddServiceMutation,
  useGetServiceQuery,
  useUpdateServiceMutation,
} from "@/redux/api/serviceApi";
import React, { useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  title: string;
  price: string;
  status: string;
  category: string;
  description: string;
};

export default function EditService({ params }: { params: any }) {
  const id = params.id;
  const [updateService, { isLoading, isError, isSuccess, error }] =
    useUpdateServiceMutation();
  const { data } = useGetServiceQuery(id);

  const { data: categories } = useGetCategoriesQuery({ page: 1, limit: 100 });

  const categoriesOption = categories?.data?.map((category: any) => (
    <option key={category._id} value={category._id}>
      {category.title}
    </option>
  ));

  const defaultValues = useMemo(() => {
    return {
      title: data?.data?.title || "",
      price: data?.data?.price || "",
      status: data?.data?.status || "",
      category: data?.data?.category._id || "",
      description: data?.data?.description || "",
    };
  }, [data]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>({ defaultValues: defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    try {
      data.price = Number(data.price);
      await updateService({ id, data });
    } catch (error) {}
  };

  useEffect(() => {
    if (isSuccess)
      toast.success("Service Update successfully", { id: "success" });
    if (isLoading)
      toast.loading("Processing...", { id: "process", duration: 800 });
    if (isError) toast.error("Failed to update", { id: "err" });
  }, [isSuccess, isError, isLoading]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Create Service</h2>
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
              <span className="label-text">price</span>
            </label>
            <input
              type="number"
              placeholder="price"
              className="input input-bordered"
              required
              {...register("price", { required: true })}
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
              <option value="available">Avaiable</option>
              <option value="unavailable">Unavaiable</option>
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <select
              className="select select-bordered w-full text-black"
              placeholder="Select Category"
              {...register("category", { required: true })}
            >
              {categoriesOption}
            </select>
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Description</span>
            </label>
            <textarea
              className="textarea textarea-bordered resize-none"
              placeholder="description"
              required
              {...register("description", { required: true })}
            ></textarea>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}