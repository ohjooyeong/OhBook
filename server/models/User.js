import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import moment from "moment";

const saltRounds = 10;

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            maxlength: 50,
        },
        email: {
            type: String,
            trim: true,
            unique: 1,
        },
        password: {
            type: String,
            minlength: 6,
        },
        lastname: {
            type: String,
            maxlength: 50,
        },
        role: {
            type: Number,
            default: 0,
        },
        image: String,
        token: {
            type: String,
        },
        tokenExp: {
            type: Number,
        },
    },
    { timestamps: true }
);

userSchema.pre("save", function (next) {
    let user = this;

    // 저장을 하는데 password가 변경됐으면 이 코드를 실행.
    if (user.isModified("password")) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err);

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

// 비밀번호 비교 메서드 만들기
userSchema.methods.comparePassword = function (plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

// 토큰 생성 메서드 만들기
userSchema.methods.generateToken = function (cb) {
    var user = this;

    var token = jwt.sign(user._id.toHexString(), process.env.SECRET_KEY);
    var oneHour = moment().add(1, "hour").valueOf();

    user.tokenExp = oneHour;
    user.token = token;
    user.save(function (err, user) {
        if (err) return cb(err);
        cb(null, user);
    });
};

// statics 와 methods 는 모델 메소드를 만들 수 있다.
// 각 종류는 서로 다르키는 this의 값이 다르다.
// statics는 모델 자체를 가르키고, methods 는 데이터 인스턴스를 가르킴.
userSchema.statics.findByToken = function (token, cb) {
    var user = this;

    jwt.verify(token, process.env.SECRET_KEY, function (err, decode) {
        user.findOne({ _id: decode, token: token }, function (err, user) {
            if (err) return cb(err);
            cb(null, user);
        });
    });
};

const User = mongoose.model("User", userSchema);

export default User;
