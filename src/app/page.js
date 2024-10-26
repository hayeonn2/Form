"use client"

import {useForm} from "react-hook-form";
import {useFormState} from "react-dom";
import {useEffect, useState} from "react";
import {textFormAction} from "@/app/api/actions";


export default function Home() {
    const [actionState, formAction] = useFormState(textFormAction, {message: ""});
    const [text, setText] = useState("");

    const form = useForm({
        mode: "onChange"
    });


    function handleInputChange(e) {
        setText(e.target.value);
    }

    useEffect(() => {
        if (actionState?.message) return console.error(actionState.message);
    }, [actionState]);

    return (
    <form action={formAction} className="border w-[500px] bg-[#ddd] rounded-[10px] mx-auto mt-[120px]">
      <input className={"text-black"} type={"text"} {...form.register("text", {
          onChange: (e) => handleInputChange(e)
      })} />
        <button className={"p-[5px] bg-sky-800"} type={"submit"}>제출버튼!</button>

        <p className="text-black mt-[30px]">결과값: {text}</p>
    </form>
  );
}
