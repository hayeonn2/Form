import DBConnect from "@/app/utils/database";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        await DBConnect(); // DBConnect 호출 추가
        return new NextResponse('It works!', { status: 200 });
    } catch (error) {
        console.error(error);
        return new NextResponse('데이터베이스 연결 실패', { status: 500 });
    }
};
