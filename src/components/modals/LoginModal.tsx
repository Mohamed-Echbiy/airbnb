"use client";
import { useState } from "react";
import { signIn, getProviders } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-hot-toast";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModal from "@/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../Button";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/navigation";
const LoginModal = () => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const LoginModal = useLoginModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const providers = await getProviders();
    setIsLoading(true);
    console.log(data, providers);
    signIn("credentials", { ...data, redirect: false }).then((callback) => {
      setIsLoading(false);
      if (callback?.ok) {
        toast.success("logged in");
        router.refresh();
        LoginModal.onClose();
      }
      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };
  const bodyContent = (
    <div className='flex flex-col gap-4 '>
      <Heading title='Welcom back' subtitle='Login to your account!' />
      <Input
        id='email'
        lable='Email'
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
        lable='Login with google '
        icon={FcGoogle}
        onClick={() => signIn("google")}
      />
      {/* <Button
        outline
        lable='Login with github '
        icon={AiFillGithub}
        onClick={() => console.log("eee")}
      /> */}
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
      isOpen={LoginModal.isOpen}
      title='Login'
      actionLable='Continue'
      onClose={LoginModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModal;
