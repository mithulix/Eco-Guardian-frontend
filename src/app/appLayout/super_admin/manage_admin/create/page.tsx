"use client";
import { useAddAdminMutation } from "@/redux/api/adminApi";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  name: string;
  email: string;
  age: string;
  password: string;
  contactNo: string;
  address: string;
};

export default function CreateAdmin() {
  const [addAdmin, { isError, isLoading, isSuccess }] = useAddAdminMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    try {
      data.age = Number(data.age);
      await addAdmin(data);
    } catch (error) {}
  };

  useEffect(() => {
    if (isSuccess) toast.success("Admin Create successfully", { id: "success" });
    if (isLoading)
      toast.loading("Processing...", { id: "process", duration: 800 });
    if (isError) toast.error("Failed to create", { id: "err" });
  }, [isSuccess, isError, isLoading]);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Create Admin</h2>
      <div className="card flex-shrink-0 w-full max-w-3xl shadow-2xl bg-base-100">
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
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password?.type === "minLength" && (
              <p className="text-red-600 text-sm">
                Password must at least 6 character
              </p>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Address</span>
            </label>
            <textarea
              className="textarea textarea-bordered resize-none"
              placeholder="address"
              required
              {...register("address", { required: true })}
            ></textarea>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}