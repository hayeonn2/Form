"use client";

import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { useEffect, useState } from "react";
import { signUpFormAction } from "@/app/api/actions";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [actionState, formAction] = useFormState(signUpFormAction, {
    message: "",
  });
  const [inputValue, setInputValue] = useState("");

  const form = useForm({
    mode: "onChange",
  });

  function handleInputChange(e) {
    setInputValue(e.target.value);
  }

  useEffect(() => {
    if (actionState?.message) return console.log(actionState.message);
    if (actionState?.success) router.back();
  }, [actionState]);

  return (
    <div
      className={
        "bg-[rgba(255,255,255,0.2)] w-[500px] mx-auto my-[200px] rounded-[12px] p-[20px] border"
      }
    >
      <p className={"font-bold text-[24px]"}>Sign Up</p>

      <form
        action={formAction}
        className={"flex flex-col gap-[12px] mt-[12px]"}
      >
        <label>
          <div
            className={"py-[10px] px-[12px] border border-white rounded-[4px]"}
          >
            <input
              placeholder={"이름"}
              className={
                "rounded-[4px] bg-transparent w-full focus:outline-none placeholder:text-[14px]"
              }
              type={"text"}
              {...form.register("name", {
                onChange: (e) => handleInputChange(e),
              })}
            />
          </div>
        </label>

        <label>
          <div
            className={"py-[10px] px-[12px] border border-white rounded-[4px]"}
          >
            <input
              placeholder={"아이디"}
              className={
                "rounded-[4px] bg-transparent w-full focus:outline-none placeholder:text-[14px]"
              }
              type={"text"}
              {...form.register("userId", {
                onChange: (e) => handleInputChange(e),
              })}
            />
          </div>
        </label>

        <label>
          <div
            className={"py-[10px] px-[12px] border border-white rounded-[4px]"}
          >
            <input
              placeholder={"비밀번호"}
              className={
                "rounded-[4px] bg-transparent w-full focus:outline-none placeholder:text-[14px]"
              }
              type={"password"}
              {...form.register("userPw", {
                onChange: (e) => handleInputChange(e),
              })}
            />
          </div>
        </label>

        <label>
          <div
            className={"py-[10px] px-[12px] border border-white rounded-[4px]"}
          >
            <input
              placeholder={"비밀번호 확인"}
              className={
                "rounded-[4px] bg-transparent w-full focus:outline-none placeholder:text-[14px]"
              }
              type={"password"}
              {...form.register("pwConfirm", {
                onChange: (e) => handleInputChange(e),
              })}
            />
          </div>
        </label>

        <button
          className={
            "bg-transparent border-[rgba(255,255,255,0.6)] border w-full block px-[10px] py-[12px] text-center font-semibold"
          }
          type={"submit"}
        >
          등록하기
        </button>
      </form>
    </div>
  );
}
