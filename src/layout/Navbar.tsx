"use client";
import CartItems from "@/components/ui/CartItems";
import { useGetCartsQuery } from "@/redux/api/cartApi";
import { getUserInfo, removeUserInfo } from "@/services/auth.services";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function Navbar() {
  const router = useRouter();
  const userInfo = getUserInfo();
  //@ts-ignore
  const userId = userInfo._id;
  const { data } = useGetCartsQuery({ user: userId });

  //@ts-ignore
  const role = userInfo?.role;

  const handleLogOut = () => {
    removeUserInfo("accessToken");
    router.push("/");
    window.location.reload();
  };

  const totalCartItems = userInfo ? data?.data?.length : 0;

  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">

        <Link href={`/`} className="btn btn-ghost normal-case text-xl text-[#10a1e5]">
          <Image width={60} height={60}
          src="/logo.png"
          alt="logo"
          className="h-lg w-lg rounded-md"
        />eco guardian
        </Link>
      </div>
      <div className="flex-none gap-2">
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-40 md:w-auto"
          />
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">
                {totalCartItems}
              </span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-64 bg-base-100 shadow"
          >
            <div className="card-body">
              <CartItems items={data?.data} />
            </div>
          </div>
        </div>
        {userInfo ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <Image
                  src="https://cdn-icons-png.flaticon.com/512/3177/3177440.png"
                  height={100}
                  width={100}
                  alt="image"
                />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <Link href="/profile" className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </Link>
              </li>
              <Link href={`/${role}`}>
                <li>
                  <a>Dashboard</a>
                </li>
              </Link>
              <button onClick={handleLogOut} className="btn btn-sm btn-error">
                Logout
              </button>
            </ul>
          </div>
        ) : (
          <Link href="/signin">
            <button className="btn btn-sm btn-secondary">Sign In</button>
          </Link>
        )}
      </div>
    </div>
  );
}