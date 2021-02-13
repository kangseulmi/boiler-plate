//express 모듈을 가져와라
const express = require('express')
//function을 이용해서 새로운 express앱을 만듦
const app = express()
//백서버로 둘 port번호
const port = 5000
//user.js가져오기
const {User} = require("./models/User");
const {auth} = require("./middleware/auth");
const config = require("./config/key");

const cookieParser = require("cookie-parser");
//bodyparser가져오기
const bodyParser = require('body-parser');
//application/x-www-form-urlencoded 데이터를 분석해서 가져올 수 있도록 함
app.use(bodyParser.urlencoded({extended: true}));
//application/json 데이터를 분석해서 가져올 수 있도록함
app.use(bodyParser.json());
app.use(cookieParser());



//mongoose를 이용해서 app과 mongoDB연결 - 비밀정보 부분(mongoDB id/pw)
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    //error방지
    useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected...')) //연결 확인
  .catch(err => console.log(err)) //에러 확인

app.get('/', (req, res) => {
    //서버에 출력
    res.send('Hello World! Welcome here!')
})



//회원가입
app.post('/api/users/register',(req, res) =>{
  //회원가입할때 필요한 정보들을 client에서 가져오면
  const user = new User(req.body)

  //암호화후 그것들을 데이터 베이스에 저장
  user.save((err) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      //성공할 경우
      success: true
    })
  })
})

//로그인
app.post('/api/users/login',(req, res) =>{
  //1. db에서 요청된 이메일 찾기
  User.findOne({ email: req.body.email}, (err, userinfo) => {
    if(!userinfo){
      return res.json({
        loginSuccess: false,
        message : "제공된 이메일에 해당하는 유저가 없습니다."
      })
    }
    //2. 있다면 비밀번호가 저장된 것과 같은지 확인
    user.comparePassword(res.body.password, (err, isMatch)=>{
      if(!isMatch)
        return res.json({ loginSuccess: false, message : "제공된 비밀번호에 해당하는 유저가 없습니다." })

      //3. 비밀번호까지 맞다면 유저를 위한 토큰 생성
      user.generateToken((err, user)=> {
        if(err) return res.status(400).send(err);

        //토큰을 어딘가에 저장 - 쿠키, 로컬스토리지 등등
        //쿠키에 저장
            res.cookie("x_auth",user.token)
            .status(200)
            .json({loginSuccess: true, userid: user._id})

      })
    })
  })
})

app.get('/api/users/auth', auth, (req, res)=>{
  //미들웨어(auth) -> callback하기 전에 중간에서 인증처리
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role === 0 ? false: true,
    isAuth : true,
    email : req.user.email,
    name : req.user.name,
    lastname: req.user.lastname,
    role:req.user.role,
    image:req.user.image
  })
})

//로그아웃- db에서 유저의 토큰을 지우기
app.get('/api/users/logout', auth, (req, res)=>{

  User.findOneAndUpdate({_id: req.user._id},
    {token: ""},
    (err, user) => {
      if(err) return res.json({success : false, err});
      return res.status(200).send({
        success: true
      })
    })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
