/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyFormInput from "@/components/ui/MyForm/MyFormInput/MyFormInput";
import MyFormWrapper from "@/components/ui/MyForm/MyFormWrapper/MyFormWrapper";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { useAppDispatch } from "@/redux/hooks";
import { handleAsyncWithToast } from "@/utils/handleAsyncWithToast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import AuthLayout from "../AuthLayout";
import Cookies from "js-cookie"
const validationSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email("Invalid email address"),
  password: z.string({
    required_error: "Password is required",
  }),
  // .min(8, "Password must be at least 8 characters long")
  // .max(30, "Password cannot exceed 30 characters")
  // .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  // .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  // .regex(/\d/, "Password must contain at least one digit")
  // .regex(
  //   /[!@#$%^&*(),.?":{}|<>]/,
  //   "Password must contain at least one special character"
  // ),
});

const LoginComponent = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const router = useRouter();
  // const handleSubmit = async (formData: FieldValues) => {
  //   try {
  //     const res = await login(formData).unwrap();
  //     if (res.success) {
  //       console.log("Login Successful:", res.data);

  //       const user = await verifyToken(res?.data?.accessToken);

  //       await dispatch(setUser({ user: user, token: res?.data?.accessToken }));

  //       // Show success message
  //       Swal.fire({
  //         position: "top-end",
  //         icon: "success",
  //         title: "Login Successful",
  //         showConfirmButton: false,
  //         timer: 2500,
  //       });
  //       router.push("/");
  //     } else {
  //       console.log("Login Failed:", res.error);
  //       Swal.fire({
  //         position: "top-end",
  //         icon: "error",
  //         title: "Login Failed",
  //         text:
  //           (error as any)?.data?.success === false &&
  //           (error as any)?.data?.errorSources[0]?.message,
  //         showConfirmButton: true,
  //         // timer: 1500,
  //       });
  //     }
  //   } catch (error) {
  //     Swal.fire({
  //       position: "top-end",
  //       icon: "error",
  //       title: "Failed",
  //       text:
  //         (error as any)?.data?.success === false &&
  //         (error as any)?.data?.errorSources[0]?.message,
  //       showConfirmButton: true,
  //     });
  //   }
  // };

  const handleSubmit = async (formData: any) => {
    const res = await handleAsyncWithToast(
      async () => {
        return login(formData); // Replace with your actual login function
      },
      "Logging in...",
      "Login successful!",
      "Login failed. Please try again.",
      true,
      dispatch
    );
    // console.log(res);
    if (res?.data?.success) {
      Cookies.set('token', res?.data.data.accessToken)
      router.push("/");
    }
    // console.log(res.error);
    if (res?.error?.status === 400) {
      router.push("/plans");
    }
  };

  return (
    <div>
      <AuthLayout backLink="/">
        <div className=" w-full max-w-3xl px-5 mt-24 md:mt-0">
          <p className="text-base font-normal mb-2">We missed you</p>
          <h5 className=" text-3xl font-semibold mb-10">
            <span className="text-primary">Welcome</span> back!
          </h5>
          <MyFormWrapper
            className={"flex flex-col gap-6 w-full"}
            onSubmit={handleSubmit}
            resolver={zodResolver(validationSchema)}
          >
            <div className="w-full">
              <MyFormInput
                label="Email"
                labelClassName="mb-1 text-xs font-medium"
                name={"email"}
                placeHolder="Email"
              // value={"akonhasan6802@gmail.com"}
              />
            </div>
            <div className="w-full">
              <MyFormInput
                label="Password"
                labelClassName="mb-1 text-xs font-medium"
                name={"password"}
                isPassword={true}
                placeHolder="Password"
              // value={"123456"}
              />
            </div>
            <div className="flex items-center justify-end gap-2 text-xs font-medium">
              <Link href={"/forget-password"} className="text-[#5F7992]">Forgot Password?</Link>
              <p className="text-[#030B12]">Reset</p>
            </div>
            <Button
              className="w-fit mx-auto py-3 rounded-lg bg-primary text-white text-base font-normal leading-6 mb-5"
              type="submit"
            >
              Login
            </Button>
            <div className="flex items-center justify-center gap-2 text-xs font-medium mb-5">
              <p className="text-[#5F7992]">Don’t have an account?</p>
              <Link href={"/signup"}>
                <p className="text-primary">Signup now</p>
              </Link>
            </div>
          </MyFormWrapper>
        </div>
      </AuthLayout>
    </div>
  );
};

export default LoginComponent;
