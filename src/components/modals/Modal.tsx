"use client";
import React, { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import Button from "../Button";
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  title?: string;
  body?: React.ReactElement;
  footer?: React.ReactElement;
  actionLable: string;
  disable?: boolean;
  secondaryAction?: () => void;
  secondaryLable?: string;
}
const Modal: React.FC<ModalProps> = ({
  isOpen,
  onSubmit,
  onClose,
  title,
  body,
  footer,
  secondaryLable,
  secondaryAction,
  disable,
  actionLable,
}) => {
  const [showModal, setShowModal] = useState<boolean>(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handelClose = useCallback(() => {
    if (disable) {
      return;
    }
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [disable, onClose]);
  const handelSubmit = useCallback(() => {
    if (disable) {
      return;
    }
    onSubmit();
  }, [disable, onSubmit]);
  const handelSecondaryAction = useCallback(() => {
    if (disable || !secondaryAction) {
      return;
    }
    secondaryAction();
  }, [disable, secondaryAction]);
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div className=' justify-center flex items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800/70'>
        <div className='relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full  md:h-auto'>
          <div
            className={`content translate duration-300 h-full ${
              showModal
                ? "translate-y-0 opacity-100"
                : "translate-y-full opacity-0"
            }`}
          >
            <div className='transalte h-full md:h-auto border-0 rounded-lg shadow-lg relative w-full g-white outline-none focus:outline-none flex flex-col bg-white'>
              {/* HEADER */}
              <div className='flex items-center p-6 rounded-t justify-center relative border-b-[1px] bg-white'>
                <button
                  className='p-1 border-0 hover:opacity-70 transition absolute left-9'
                  onClick={handelClose}
                >
                  <IoMdClose size={18} />
                </button>
                <div className='text-lg font-semibold '>{title}</div>
              </div>
              {/* body */}
              <div className='body realative p-6 flex-auto '>{body}</div>
              <div className='footer flex flex-col p-6 gap-2'>
                <div className=' flex items-center gap-4 w-full'>
                  {secondaryLable && secondaryAction && (
                    <Button
                      outline
                      disabled={disable}
                      lable={secondaryLable}
                      onClick={handelSecondaryAction}
                    />
                  )}
                  <Button
                    disabled={disable}
                    lable={actionLable}
                    onClick={handelSubmit}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
