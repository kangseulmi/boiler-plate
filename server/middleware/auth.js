const {User} = require("../models/User");

let auth = (req, res, next) =>{
    //인증처리하는 곳

    //클리이언트 쿠키에서 토큰 가져오기
    let token = req.cookies.x_auth;

    //토큰 복호화한 후 유저 찾기
    User.findByToken(token, (err, user)=>{
        if(err) throw err;
        if(!user) return res.json({isAuth : false, error : true}) 

        req.token = token;
        req.user = user;
        next();
    })
    //유저 있음 인증 오케이

    //유저 없으면 인증 no

}

module.exports = {auth};