"use client";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "@/redux/api/profileApi";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  name: string;
  email: string;
  age: number;
  contactNo: string;
  address: string;
};

export default function Profile() {
  const { data } = useGetProfileQuery({});
  const [updateProfile, { isError, isLoading, isSuccess }] =
    useUpdateProfileMutation();

  const defaultValues = data?.data;
  const { register, handleSubmit, reset } = useForm<Inputs>({ defaultValues });
  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    updateProfile(data);
  };

  useEffect(() => {
    reset(defaultValues);
  }, [reset, defaultValues]);

  useEffect(() => {
    if (isSuccess)
      toast.success("Profile Update successfully", { id: "success" });
    if (isLoading)
      toast.loading("Processing...", { id: "process", duration: 800 });
    if (isError) toast.error("Failed to update", { id: "err" });
  }, [isSuccess, isError, isLoading]);

  return (
    <div className="min-h-screen px-4 my-6">
      <h1 className="text-3xl font-bold text-center">
        Welcome to Profile Page
      </h1>
      <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl mx-auto mt-10 bg-base-200">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="name"
              className="input input-bordered"
              required
              {...register("name", { required: true })}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
              {...register("email", { required: true })}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Age</span>
            </label>
            <input
              type="number"
              placeholder="age"
              className="input input-bordered"
              required
              {...register("age", { required: true })}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">ContactNo</span>
            </label>
            <input
              type="number"
              placeholder="contactNo"
              className="input input-bordered"
              required
              {...register("contactNo", { required: true })}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <textarea
              className="textarea textarea-bordered resize-none"
              placeholder="Bio"
              required
              {...register("address", { required: true })}
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