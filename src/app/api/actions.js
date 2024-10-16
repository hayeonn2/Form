"use server"

export async function textFormAction({success, msg}, formData) {
    try {
        console.log(formData, "폼?ㅎㅎ");
        return { success: true, msg: "성공적으로 처리되었습니다." };
    } catch (e) {
        console.error("에러 발생:", e);
        return { success: false, msg: e.message || "알 수 없는 에러 발생" };
    }
}
