const path = require('path');
const express = require('express');
const app = express();
// 跨域访问  网页所在的IP地址与要访问的服务器所在的IP地址不是同一个时要用跨域访问
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.use(express.static(path.join(process.cwd(), 'www_root')));
app.listen(6080);

app.get('/login', function (request, respones) {
    // 获取客户端get操作参数
    console.log(request.query);
    respones.send("SUCCESS");
});

app.post('/upload', function (request, respones) {
    console.log("UPLOAD", request.query);
    respones.send("SUCCESS");
    request.on('data', (data) => {
        console.log(data.toString());
    });
});