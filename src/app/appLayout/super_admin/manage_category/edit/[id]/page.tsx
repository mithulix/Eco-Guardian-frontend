"use client";
import { useGetCategoryQuery, useUpdateCategoryMutation } from "@/redux/api/categoryApi";
import React, { useEffect, useMemo } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  title: string;
};

export default function EditCategory({ params }: { params: any }) {
  const id = params.id;
  const [updateCategory, { isLoading, isError, isSuccess, error }] =
    useUpdateCategoryMutation();
  const { data } = useGetCategoryQuery(id);

  const defaultValues = useMemo(() => {
    return {
      title: data?.data?.title || "",
    };
  }, [data]);

  const {
    register,
    handleSubmit,
    reset,
  } = useForm<Inputs>({ defaultValues: defaultValues });

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    try {
      data.age = Number(data.age);
      await updateCategory({ id, data });
    } catch (error) {}
  };

  useEffect(() => {
    if (isSuccess) toast.success("Category Update successfully", { id: "success" });
    if (isLoading)
      toast.loading("Processing...", { id: "process", duration: 800 });
    if (isError) toast.error("Failed to update", { id: "err" });
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
          <div className="form-control mt-6">
            <button className="btn btn-primary">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}