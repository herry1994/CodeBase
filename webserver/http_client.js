const http = require('http');
/**
 * 
 * @param {*} ip 
 * @param {*} port 
 * @param {*} url 
 * @param {*} params 
 * @param {*} callback (issuccess, data/error)
 */
function http_get(ip, port, url, params, callback) {
    // step1 创建客户端请求
    let options = {
        host: "127.0.0.1",
        port: port,
        path: url + "?" + params,
        method: "GET"
    }

    // 当有请求返回的时候，参数就会被传递为http.IncomingMessage
    const req = http.request(options, (incoming_msg) => {
        console.log('get respones ' + incoming_msg.statusCode);
        // 监听incomingMessage的data事件,收到服务器数据时触发
        incoming_msg.on('data', (data) => {
            if (incoming_msg.statusCode === 200) {
                callback(true, data)
            }
        });

    });

    //把请求发送出去
    req.end();
}
function http_post(ip, port, url, params, body, callback) {
    var options = {
        host: ip,
        port: port,
        path: url + "?" + params,
        method: "POST",
        header: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Content-Length": body.length
        }
    }
    let req = http.request(options, (incoming_msg) => {
        incoming_msg.on("data", (data => {
            if (incoming_msg.statusCode == 200) {
                callback(true, data);
            }
        }));
    })
    req.write(body);
    req.end();
}
http_post('127.0.0.1',6080,'/upload','filename=my_file.txt','THIS IS UPLOAD!!!',(is_ok,data)=>{
    if(is_ok){
        console.log("UPLOAD RESPONSE" + data.toString());
    }
});