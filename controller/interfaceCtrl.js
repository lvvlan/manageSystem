/**
 * Des
 * Created by luowei5 on 2016/8/16.
 * E-mail luowei5@jd.com
 * Update 2016/8/16
 */
const EventEmitter = require("events").EventEmitter;
const fs = require("fs");

var E = new EventEmitter();

E.on("renderEnd", function (req, res, reVal){
    res.send(reVal);
});

var whiteList = {   //key: name; value: pass
    admin: "admin",
    jrudc: "test123"
};

module.exports = {
    login: function (req, res, next){
        if(req.body.username in whiteList && req.body.password == whiteList[req.body.username]){
            var userInfo = {
                username: req.body.username,
                password: req.body.password
            };

            req.session.userInfo = userInfo;
            res.send({
                "code": 200,
                "msg": "登录成功"
            });

        }else{
            res.send({
                "code": 201,
                "msg": "用户名或密码错误"
            });
        }
    },
    second: function (req, res, next){
        var reVal = {},
            rs = fs.createReadStream("data/product.json"),
            rsArr = [];

        rs.on("data", function (b){
            rsArr.push(b);
        });
        rs.on("end", function (){
            var rsData = Buffer.concat(rsArr).toString(),
                listJson = JSON.parse(rsData);

            for(var i = 0; i<listJson.length; i++){
                if(listJson[i].name.match(req.body.firstName)){
                    reVal = listJson[i].child;
                    break;
                }
            }
            rsArr = [];
            //渲染完毕
            E.emit("renderEnd", req, res, reVal);
        });
        rs.on("error", function (){
            reVal = {
                code: 201,
                msg: "读取数据失败"
            };
            rsArr = [];
            //渲染完毕
            E.emit("renderEnd", req, res, reVal);
        });
    },
    submitSystem: function (req, res){
        var rs = fs.createReadStream("data/product.json"),
            rsArr = [];

        rs.on("data", function (b){
            rsArr.push(b);
        });
        rs.on("end", function (){
            var rsData = Buffer.concat(rsArr).toString(),
                listJson = JSON.parse(rsData),
                reVal = {};

            if(req.body.second != "添加新项目"){
                reVal = {
                    code: 201,
                    msg: "不是添加新项目"
                };
            }else{
                for(var i = 0; i<listJson.length; i++){
                    if(req.body.first == listJson[i].name){
                        var ws = fs.createWriteStream("data/product.json");
                        listJson[i].child.push({
                            name: req.body.proName,
                            url: req.body.url,
                            describe: req.body.describe
                        });
                        ws.write(JSON.stringify(listJson));
                        ws.end();
                        ws.on("finish", function (){
                            reVal = {
                                code: 200,
                                msg: "添加成功"
                            };
                            E.emit("renderEnd", req, res, reVal);
                        });
                        break;
                    }
                }
            }
        });
    },
    reset: function (req, res, next){
        var sendJson = {};
        if(req.session.userInfo.username == "admin"){
            var srcArr = ["data/backData.json", "data/product.json"],
                rs = null, ws = null; //[备份数据, 线上数据]
            if(req.body.resetValue == "true"){    //更新
                rs = fs.createReadStream(srcArr[1]);
                ws = fs.createWriteStream(srcArr[0]);
            }else{  //不更新
                rs = fs.createReadStream(srcArr[0]);
                ws = fs.createWriteStream(srcArr[1]);
            }
            rs.pipe(ws);

            ws.on("finish", function (){
                sendJson = {
                    code: 200,
                    msg: "还原完成!"
                };
                E.emit("renderEnd", req, res, sendJson);
            });
        }else{
            sendJson = {
                code: 201,
                msg: "您不能进行此操作!"
            };
            E.emit("renderEnd", req, res, sendJson);
        }
    }
};