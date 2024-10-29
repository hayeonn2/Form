"use client";

import { useState } from "react";

export default function Home() {
  const [test, setTest] = useState();

  return (
    <div
      className={
        "bg-white w-[500px] mx-auto my-[200px] rounded-[12px] p-[20px]"
      }
    >
      <p className={"text-black font-bold text-[24px]"}>Form</p>
    </div>
  );
}
