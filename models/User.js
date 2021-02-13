//mongoose 모델 가져오기
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;//자릿수
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

//db에 저장하기 전에 function을 한다
userSchema.pre('save', function(next){
    var user = this;
    //비밀번호를 바꿀때만 비밀번호를 암호화 시킨다.
    if(user.isModified('password')){

    //salt생성
        bcrypt.genSalt(saltRounds, function(err, salt){
            if(err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash){
                //hash = 암호화된 비밀번호
                if(err) return next(err)
                user.password = hash;
                next();
            })
        })
    } else{
        next()
    }
})

//model로 schema감싸기 (model이름, schema이름)
const User = mongoose.model('User',userSchema)

//다른파일에서도 model사용가능하게 하기
module.exports = {User}