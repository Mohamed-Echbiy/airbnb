"use client";
import React from "react";
interface MenuItemProps {
  onClick: () => void;
  lable: string;
}
const MenuItem: React.FC<MenuItemProps> = ({ onClick, lable }) => {
  return (
    <div
      className='px-4 py-3 hover:bg-neutral-100 transition-all font-semibold'
      onClick={onClick}
    >
      {lable}
    </div>
  );
};

export default MenuItem;
