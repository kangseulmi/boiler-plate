//express 모듈을 가져와라
const express = require('express')
//function을 이용해서 새로운 express앱을 만듦
const app = express()
//백서버로 둘 port번호
const port = 5000
//user.js가져오기
const {User} = require("./models/User");

const config = require("./config/key");
//bodyparser가져오기
const bodyParser = require('body-parser');
//application/x-www-form-urlencoded 데이터를 분석해서 가져올 수 있도록 함
app.use(bodyParser.urlencoded({extended: true}));
//application/json 데이터를 분석해서 가져올 수 있도록함
app.use(bodyParser.json());

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

app.post('/register',(req, res) =>{
  //회원가입할때 필요한 정보들을 client에서 가져오면
  const user = new User(req.body)
  //그것들을 데이터 베이스에 넣어준다.
  user.save((err) => {
    if(err) return res.json({success: false, err})
    return res.status(200).json({
      //성공할 경우
      success: true
    })
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
