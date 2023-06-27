"use client";
import { useCallback, useState } from "react";
import axios from "axios";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
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
      .catch((err) => console.log(err.message))
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
    />
  );
};

export default RegisterModal;
