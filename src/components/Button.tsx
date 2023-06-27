"use client";
import React from "react";
import { IconType } from "react-icons";

interface ButtonProps {
  lable: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
}

const Button: React.FC<ButtonProps> = ({
  lable,
  onClick,
  disabled,
  outline,
  small,
  icon: Icon,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full ${
        outline
          ? "bg-white border-black text-black"
          : "text-white bg-rose-500 border-rose-500"
      } ${
        small
          ? "py-1 text-sm font-light border-[1px]"
          : " font-semibold py-3 text-base border-2"
      }`}
    >
      {Icon && <Icon size={24} className='absolute left-4 top-3' />}
      {lable}
    </button>
  );
};

export default Button;
