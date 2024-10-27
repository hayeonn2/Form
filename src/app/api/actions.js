"use server"

export async function textFormAction(message, formData) {
    try {
        console.log(formData, "폼?ㅎㅎ");

        const params = {
            userId: formData.get("userId"),
            userPw: formData.get("userPw"),
            name: formData.get("name"),
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_DEV_URL}/api/user/join`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params),
        })

        const data = await response.json();

        console.log(data, "data?")

        return { message: "성공적으로 처리되었습니다." };
    } catch (e) {
        console.error("에러 발생:", e);
        return { message: "알 수 없는 에러 발생" };
    }
}
