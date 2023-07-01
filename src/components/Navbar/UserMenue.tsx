"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/hooks/useRegisterModal";
import useLoginModal from "@/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  currentUser?: User | null;
}

const UserMenue: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const [open, setIsOpen] = useState<boolean>(false);
  const toggleOpen = () => {
    setIsOpen((pre) => !pre);
  };
  return (
    <div className='realtive'>
      <div className='flex items-center gap-3'>
        <div
          className='hidden md:block py-3 text-sm font-semibold rounded-full px-4 transition cursor-pointer hover:bg-neutral-400'
          onClick={() => console.log("clicked")}
        >
          Airbnboo your home
        </div>
        <div
          onClick={() => toggleOpen()}
          className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition-all'
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>
      {open && (
        <div className='absolute rounded-xl shadow-md w-[40vw] max-w-[180px]  bg-white overflow-hidden right-0 md:right-28 top-20 text-sm'>
          <div className=' flex cursor-pointer flex-col '>
            {currentUser ? (
              <>
                <MenuItem onClick={() => console.log("")} lable='My trips' />
                <MenuItem
                  onClick={() => console.log("")}
                  lable='My Favorites'
                />
                <MenuItem
                  onClick={() => console.log("")}
                  lable='My Reservations'
                />
                <MenuItem
                  onClick={() => console.log("")}
                  lable='My Properties'
                />
                <MenuItem
                  onClick={() => console.log("")}
                  lable='Airbnb My Home'
                />
                <hr />
                <MenuItem onClick={() => signOut()} lable='Log out' />
              </>
            ) : (
              <>
                <MenuItem onClick={() => loginModal.onOpen()} lable='Login' />
                <MenuItem
                  onClick={() => registerModal.onOpen()}
                  lable='Signup'
                />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
export default UserMenue;
