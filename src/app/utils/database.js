import { connect } from "mongoose";

// 데이터베이스 연결을 위한 URI
const DATABASE_URI = process.env.DATABASE_URI;

if (!DATABASE_URI) {
  throw new Error("데이터 베이스 접속 정보를 확인해주세요!");
}

// 캐시 설정 (데이터 베이스 연결마다 새로운 연결 생성하지 않도록 리소스 절약)
// 전연 변수로 캐시 설정 - 데이터 베이스 연결을 재사용
let cached = global.mongoose;

// 캐시가 없다면, 새로운 객체를 생성해 conn과 promise 속성 초기화
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

// 데이터베이스 연결을 관리하는 비동기 함수
async function DBConnect() {
  // 연결이 존재한다면, 해당 연결을 사용하고 메세지 출력
  if (cached.conn) {
    console.log("캐싱된 커넥션 사용하기");
    return cached.conn;
  }
  // 캐시된 연결이 없으면 새로운 데이터 베이스 연결 시도
  if (!cached.promise) {
    const opts = {
      bufferCommands: false, // 연결 전에 버퍼링 방지
    };

    // 커넥스 메서드를 사용해 데이터베이스 연결
    cached.promise = connect(DATABASE_URI, opts)
      .then((mongoose) => {
        console.log("DB 커넥션 생성");
        return mongoose;
      })
      .catch((error) => {
        console.error("DB 커넥션 실패");
        return error;
      });
  }

  // 연결이 성공할때까지 기다리고 실패하면 cached.promise 를 null 로 설정
  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }

  // 최종적으로 연결 객체를 반환한다.
  // 이 객체는 데이터 베이스 쿼리를 수행하는데 사용된다.
  return cached.conn;
}

export default DBConnect;
