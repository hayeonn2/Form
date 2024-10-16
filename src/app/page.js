"use client"

import {useForm, useFormState} from "react-hook-form";
import {useState} from "react";
import {textFormAction} from "@/app/api/actions";

export default function Home() {
    const initFormState = { success: false, msg: "" };
    const [actionState, formAction] = useFormState(textFormAction,
        initFormState);
    const [text, setText] = useState("");


    const form = useForm({
        mode: "onChange"
    });

    function handleInputChange(e) {
        setText(e.target.value);
    }

    useEffect(() => {
        if (actionState?.msg && !actionState?.success) return console.error(actionState.msg);
        // if (actionState.success) router.replace("/");
    }, [actionState]);

    return (
    <form action={formAction} className="border w-[500px] bg-[#ddd] rounded-[10px] mx-auto mt-[120px]">
      <input className={"text-black"} type={"text"} {...form.register("test", {
          onChange: (e) => handleInputChange(e)
      })} />

        <button className={"p-[5px] bg-sky-800"} type={"submit"}>제출버튼!</button>

        <p className="text-black mt-[30px]">결과값: {text}</p>
    </form>
  );
}
