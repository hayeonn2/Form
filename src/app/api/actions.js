"use server";

export async function signUpFormAction({ success, message }, formData) {
  try {
    console.log(formData, "폼?ㅎㅎ");

    const params = {
      userId: formData.get("userId"),
      userPw: formData.get("userPw"),
      name: formData.get("name"),
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_DEV_URL}/api/user/join`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(params),
      }
    );

    const data = await response.json();

    console.log(data, "data!!!");

    // 데이터베이스에서 200, 500 code 를 받아와서 처리
    if (data.code != 200) {
      console.log("로그인 실패: ", data.data);
      return { success: false, message: data?.message };
    }

    return { success: true, message: data.message };
  } catch (e) {
    console.error("에러 발생:", e);
    return { success: false, message: "error" };
  }
}
