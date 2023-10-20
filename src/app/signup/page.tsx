"use client";
import { useSignUpMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

type Inputs = {
  name: string;
  email: string;
  age: string;
  password: string;
  confirmPassword: string;
  contactNo: string;
  address: string;
};

export default function SignUp() {
  const router = useRouter();
  const [signUp, { isSuccess, isLoading, isError }] = useSignUpMutation();

  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data: any) => {
    data.age = Number(data.age);
    const res = await signUp(data);
    //@ts-ignore
    const accessToken = res.data?.data?.accessToken;
    storeUserInfo({ accessToken });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Signup In successfully", { id: "success" });
      router.push("/");
    }
    if (isLoading)
      toast.loading("Processing...", { id: "process", duration: 800 });
    if (isError) toast.error("Failed to signup", { id: "err" });
  }, [isSuccess, isError, isLoading, router]);

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
          <p className="py-6 max-w-lg">
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
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
                {...register("password", { required: true })}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="Confirm Password"
                className="input input-bordered"
                required
                {...register("confirmPassword", { required: true })}
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
              <button className="btn btn-primary">Sign Up</button>
            </div>
            <label className="label pb-0">
              <span className="label-text-alt">
                Already have an account?{" "}
                <Link href="/signin" className="abel-text-alt link link-hover">
                  LogIn
                </Link>
              </span>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}