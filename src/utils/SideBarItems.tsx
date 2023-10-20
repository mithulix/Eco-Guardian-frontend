"use client";
import { ENUM_USER_ROLE } from "@/enums/common";
import Link from "next/link";

export default function SideBarItems({ role }: { role: string }) {
  const defaultItems = (
    <li>
      <Link href={`/${role}`}>Dashboard Home</Link>
    </li>
  );

  const userItems = (
    <>
    {defaultItems}
      <li>
        <Link href={`/${role}/my_services`}>My Services</Link>
      </li>
      <li>
        <Link href={`/${role}/booking_history`}>Booking History</Link>
      </li>
    </>
  );

  const superAdminItems = (
    <>
    {defaultItems}
      <li>
        <Link href={`/${role}/manage_admin`}>Manage Admin</Link>
      </li>
      <li>
        <Link href={`/${role}/manage_service`}>Manage Service</Link>
      </li>
      <li>
        <Link href={`/${role}/manage_category`}>Manage Category</Link>
      </li>
      <li>
        <Link href={`/${role}/booking_history`}>Booking History</Link>
      </li>
      <li>
        <Link href={`/${role}/manage_booking`}>Manage Booking</Link>
      </li>
      <li>
        <Link href={`/${role}/manage_content`}>Manage Content</Link>
      </li>
    </>
  );

  const adminItems = (
    <>
    {defaultItems}
      <li>
        <Link href={`/${role}/manage_service`}>Manage Service</Link>
      </li>
      <li>
        <Link href={`/${role}/manage_category`}>Manage Category</Link>
      </li>
      <li>
        <Link href={`/${role}/booking_history`}>Booking History</Link>
      </li>
      <li>
        <Link href={`/${role}/manage_booking`}>Manage Booking</Link>
      </li>
      <li>
        <Link href={`/${role}/manage_content`}>Manage Content</Link>
      </li>
    </>
  );

  if (role === ENUM_USER_ROLE.super_admin) return superAdminItems;

  if (role === ENUM_USER_ROLE.admin) return adminItems;
  
  return userItems;
}