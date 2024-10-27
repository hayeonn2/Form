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
        if (actionState?.message) return console.log(actionState.message);
    }, [actionState]);

    return (
        <div className={"bg-white w-[500px] mx-auto my-[200px] rounded-[12px] p-[20px]"}>
            <p className={"text-black font-bold text-[24px]"}>Form</p>
            <form action={formAction} className={"flex flex-col gap-[12px]"}>
                <div>
                    <p className={"text-black"}>이름</p>
                    <input className={"text-black border border-[#e0e0e0] rounded-[4px]"}
                           type={"text"} {...form.register("name", {
                        onChange: (e) => handleInputChange(e)
                    })} />
                </div>

                {/*<div>*/}
                {/*    <p className={"text-black"}>휴대폰</p>*/}
                {/*    <input className={"text-black border border-[#e0e0e0] rounded-[4px]"}*/}
                {/*           type={"text"} {...form.register("userPhone", {*/}
                {/*        onChange: (e) => handleInputChange(e)*/}
                {/*    })} />*/}
                {/*</div>*/}

                <div>
                    <p className={"text-black"}>아이디</p>
                    <input className={"text-black border border-[#e0e0e0] rounded-[4px]"}
                           type={"text"} {...form.register("userId", {
                        onChange: (e) => handleInputChange(e)
                    })} />
                </div>

                <div>
                    <p className={"text-black"}>비밀번호</p>
                    <input className={"text-black border border-[#e0e0e0] rounded-[4px]"}
                           type={"text"} {...form.register("userPw", {
                        onChange: (e) => handleInputChange(e)
                    })} />
                </div>

                {/*<div>*/}
                {/*    <p className={"text-black"}>비밀번호 확인</p>*/}
                {/*    <input className={"text-black border border-[#e0e0e0] rounded-[4px]"}*/}
                {/*           type={"text"} {...form.register("pwConfirm", {*/}
                {/*        onChange: (e) => handleInputChange(e)*/}
                {/*    })} />*/}
                {/*</div>*/}


                <button className={"p-[5px] bg-sky-800 rounded-[4px]"} type={"submit"}>등록하기</button>
            </form>
        </div>
    );
}
