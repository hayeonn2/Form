"use server"

export async function textFormAction(message, formData) {
    try {
        console.log(formData.get("text"), "폼?ㅎㅎ");

        return { message: "성공적으로 처리되었습니다." };
    } catch (e) {
        console.error("에러 발생:", e);
        return { message: "알 수 없는 에러 발생" };
    }
}
