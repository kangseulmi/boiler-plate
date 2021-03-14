if(process.env.NODE_ENV === "production"){
    module.exports = require('./prod');
}
else{
    module.exports = require('./dev');
}

//로컬에서 개발인지 production에서 하고 있는지 인식