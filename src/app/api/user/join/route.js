import DBConnect from "@/app/utils/database";
import UserModel from "@/app/models/users";
import { NextResponse } from "next/server";

const bcrypt = require("bcrypt");

export const POST = async (request) => {
  try {
    await DBConnect(); // DBConnect 호출 추가

    const reqBody = await request.json();
    const { userId, userPw, name } = reqBody;

    const newUser = new UserModel({
      userId,
      userPw,
      name,
    });

    const savedUser = await newUser.save();

    return NextResponse.json({
      message: "User created successfully",
      success: true,
      savedUser,
    });

    // const data = await request.json();
    // const userPassword = data.userPw;
    // const hashPassword = await bcrypt.hash(userPassword, 10);
    //
    // const userInfo = new UserModel({
    //     userId: data.userId,
    //     userPw: hashPassword,
    //     name: data.name,
    // });
    //
    // await userInfo.save();
    //
    // // JSON 형식으로 응답하기
    // return NextResponse.json({ message: "성공!" }); // 수정된 부분
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "데이터베이스 연결 실패" },
      { status: 500 }
    ); // 수정된 부분
  }
};
