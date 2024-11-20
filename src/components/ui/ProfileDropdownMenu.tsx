/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

const ProfileDropdownMenu = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const user = useAppSelector(selectCurrentUser);
  const handleLogout = async () => {
    try {
      const result = await Swal.fire({
        title: "Are you sure?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Log out!",
      });

      if (result.isConfirmed) {
        await dispatch(logout());
        await Swal.fire({
          title: "Logged Out Successfully!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        await router.push("/");
      }
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Failed",
        text:
          (error as any)?.data?.success === false &&
          (error as any)?.data?.errorSources[0]?.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <div>
      <Dropdown placement="bottom-end" aria-hidden>
        <DropdownTrigger>
          <Avatar
            isBordered
            as="button"
            className="transition-transform"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          <DropdownItem key="profile" className="h-14 gap-2">
            <p className="font-semibold">Signed in as</p>
            <p className="font-semibold">{user?.email}</p>
          </DropdownItem>
          <DropdownItem key="settings">My Settings</DropdownItem>

          <DropdownItem key="logout" color="danger" onClick={handleLogout}>
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};

export default ProfileDropdownMenu;