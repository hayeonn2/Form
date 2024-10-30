"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div
      className={
        "bg-[rgba(255,255,255,0.2)] w-[500px] mx-auto my-[200px] rounded-[12px] p-[20px] border"
      }
    >
      <p className={"font-bold text-[24px] text-center mb-[20px]"}>
        Register form.
      </p>
      <Link
        href={"/auth"}
        className={
          "bg-transparent border-[rgba(255,255,255,0.6)] border w-full block px-[10px] py-[20px] text-blue-400 text-center font-semibold"
        }
      >
        GO
      </Link>
    </div>
  );
}
