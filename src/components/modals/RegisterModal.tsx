"use client";
import { useCallback, useState } from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import { signIn } from "next-auth/react";
const RegisterModal = () => {
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        registerModal.onClose();
      })
      .catch((err) => toast.error("Something went wrong"))
      .finally(() => setIsLoading(false));
  };
  const bodyContent = (
    <div className='flex flex-col gap-4 '>
      <Heading title='Welcom to Airbnboo' subtitle='Create an account!' />
      <Input
        id='email'
        lable='Email'
        disable={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='name'
        lable='Name'
        disable={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        type='password'
        id='password'
        lable='Password'
        disable={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
  const footerContent = (
    <div className='flex flex-col gap-4 mt-3 '>
      <hr />
      <Button
        outline
        lable='Continue with google '
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      <div className='text-neutral-500 text-center mt-4 '>
        <div className='flex items-center gap-2 justify-center'>
          <div className=''>Already have an account? </div>
          <div
            className='text-neutral-800 cursor-pointer hover:underline font-semibold'
            onClick={() => registerModal.onClose()}
          >
            Log in
          </div>
        </div>
      </div>
    </div>
  );
  return (
    <Modal
      disable={isLoading}
      isOpen={registerModal.isOpen}
      title='Register'
      actionLable='Continue'
      onClose={registerModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
