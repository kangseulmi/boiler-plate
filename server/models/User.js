//mongoose 모델 가져오기
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;//자릿수
const jwt = require('jsonwebtoken');

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

//user method만들기
userSchema.methods.compardPassword = function(plainPassword, cb){
    //비밀번호 비교할 때
    //plain password 12345(암호화해서 ->와 비교)  암호화된 비밀번호 hash값(복호화 불가)
    bcrypt.compare(plainPassword, this.password, function(err, isMatch){
        if(err) return cb(err),
            cb(null, isMatch)
    })
}
userSchema.methods.generateToken = function(cb) {
    var user = this;

    //jsonwebtoken 이용해 토큰 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

    user.token = token
    user.save(function(err, user){
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    //토큰을 decode
    jwt.verfy(token,'secretToken', function(err, decoded){
        //유저 아이디를 이용해서 유저를 찾은 후에
        //클라이언트에서 가져온 token과 db에 보관된 토큰이 일치하는지 확인
        user.findOne({"_id":decoded, "token": token }, function(err, user){
            if(err) return cb(err);
            cb(null, user)
        })
    })
}
//model로 schema감싸기 (model이름, schema이름)
const User = mongoose.model('User',userSchema)

//다른파일에서도 model사용가능하게 하기
module.exports = {User}