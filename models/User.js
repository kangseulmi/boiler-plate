//mongoose 모델 가져오기
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type : String,
        maxlength: 50
    },
    email:{
        type : String,
        trim : true, //email의 space없애주는 역할
        unique : 1 //똑같은 이메일을 쓰지 못하도록
    },
    password:{
        type : String,
        minlength : 5
    },
    lastname:{
        type : String,
        maxlength : 50
    },
    role:{
        //유저의 역할 - 일반유저(0)/관리자(1)
        type : Number,
        default : 0 
    },
    image: String,
    token:{
        //유효성 관리
        type : String
    },
    tokenExp:{
        //유효성 기간
        type : Number
    }
})

//model로 schema감싸기 (model이름, schema이름)
const User = mongoose.model('User',userSchema)

//다른파일에서도 model사용가능하게 하기
module.exports = {User}