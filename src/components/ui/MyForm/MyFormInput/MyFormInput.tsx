/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import { cn } from "@/lib/utils";
import { Form, Input } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext } from "react-hook-form";

const MyFormInput = ({
  type = "text",
  name,
  label,
  inputClassName,
  placeHolder,
  value,
  isPassword = false,
}: {
  type?: string;
  name: string;
  label?: string;
  inputClassName?: string;
  placeHolder?: string;
  value?: any;
  isPassword?: boolean;
}) => {
  const { setValue, control } = useFormContext();

  useEffect(() => {
    setValue(name, value, { shouldValidate: false });
  }, [value, name, setValue]);

  return (
    <div>
      <Controller
        name={name}
        control={control}
        rules={{
          required: true,
        }}
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col justify-center w-full">
            {label && (
              <p className="ps-1 mb-2 text-[#101828] text-base font-normal leading-6">
                {label}
              </p>
            )}
            <Form.Item style={{ marginBottom: "0px" }}>
              {
                isPassword ?  <Input.Password
                {...field}
                type={type}
                id={name}
                size="large"
                className={cn("w-full ", inputClassName)}
                placeholder={placeHolder}
              /> :  <Input
              {...field}
              type={type}
              id={name}
              size="large"
              className={cn("w-full ", inputClassName)}
              placeholder={placeHolder}
            />
              }
             
            </Form.Item>
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </div>
        )}
      />
    </div>
  );
};

export default MyFormInput;