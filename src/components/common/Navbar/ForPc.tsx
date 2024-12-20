"use client"
import React from "react";
import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import NavMenu from "./NavMenu";
import ProfileDropdownMenu from "@/components/ui/ProfileDropdownMenu";
import { useAppSelector } from "@/redux/hooks";
import { selectCurrentUser } from "@/redux/features/auth/authSlice";

const ForPc = () => {
  const user = useAppSelector(selectCurrentUser);
  return (
    <div className="container hidden md:flex items-center justify-between py-2">
      <Link href={"/"} className="">
        <div className="flex items-center gap-2">
          <Image
            src={logo}
            alt="Booksy.buzz"
            width={200}
            height={200}
            className="rounded"
          />
        </div>
      </Link>
      <NavMenu />
      {user?.email ? (
        <ProfileDropdownMenu />
      ) : (
        <div className="flex items-center gap-6">
          <Link href={"/login"}>
            <button className="text-lg font-normal">Login</button>
          </Link>
          <Link href={"/signup"}>
            <button className="px-6 py-2  bg-white  border border-primary rounded-md hover:border-primary-light font-semibold text-lg text-primary">
              Sign Up
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ForPc;
