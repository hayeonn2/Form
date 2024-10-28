const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    userId: { type: String, required: true },
    userPw: { type: String, required: true },
    name: String,
    // createDate: { type: Date, default: Date.now },
});

// 모델을 정의하고, 이미 존재하는 경우 재사용
const UserModel = mongoose.models.users || mongoose.model("users", UserSchema);

module.exports = UserModel;
