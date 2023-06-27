"use client";
import React from "react";
import { FieldError, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
interface InputProps {
  id: string;
  lable: string;
  type?: string;
  disable?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldError;
}

const Input: React.FC<InputProps> = ({
  id,
  lable,
  type,
  disable,
  formatPrice,
  required,
  register,
  errors,
}) => {
  return (
    <div className='w-full relative'>
      {formatPrice && (
        <BiDollar
          size={24}
          className='text-neutral-700 absolute top-5 left-2'
        />
      )}
      <input
        id={id}
        disabled={disable}
        {...register(id, { required })}
        placeholder=' '
      />
    </div>
  );
};

export default Input;
