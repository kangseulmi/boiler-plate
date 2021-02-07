//express 모듈을 가져와라
const express = require('express')
//function을 이용해서 새로운 express앱을 만듦
const app = express()
//백서버로 둘 port번호
const port = 5000
//mongoose를 이용해서 app과 mongoDB연결
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://tmfal5023:tmfal123@boilerplate.m9lgf.mongodb.net/boilerplate?retryWrites=true&w=majority',{
    //error방지
    useNewUrlParser : true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false
}).then(()=> console.log('MongoDB Connected...')) //연결 확인
  .catch(err => console.log(err)) //에러 확인

app.get('/', (req, res) => {
    //서버에 출력
    res.send('Hello World!안녕')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
