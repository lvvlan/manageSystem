/**
 * Des
 * Created by luowei5 on 2016/8/9.
 * E-mail luowei5@jd.com
 * Update 2016/8/9
 */
var express = require('express');
var router = express.Router();
const fs = require("fs");

//响应登录页
router.get('/login.html', function(req, res, next) {
    res.render("login");
});
//响应编辑页
router.get('/edit.html', function(req, res, next) {
    if(req.session.userInfo){
        fs.readFile("data/product.json", function (err, data){
            if(err){
                res.send("获取数据失败!")
            }else{
                res.render("edit", {
                    username: req.session.userInfo.username,
                    listJson: JSON.parse(data)
                });
            }
        });
    }else{
        req.session.error = "请先登录";
        res.redirect("/login.html");
    }

});

//登录接口信息
router.post("/login", function (req, res, next){
    if(req.body.username == "admin" && req.body.password == "admin"){
        var userInfo = {
            username: "admin",
            password: "admin"
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
});

//二级目录接口
router.post("/second", function (req, res, next){
    var reVal = {};
    fs.readFile("data/product.json", function (err, data){
        if(err){
            reVal = {
                code: 201,
                msg: "读取数据失败"
            };
        }else{
            var listJson = JSON.parse(data);
            for(var i = 0; i<listJson.length; i++){
                if(listJson[i].name.match(req.body.firstName)){
                    reVal = listJson[i].child;
                    break;
                }
            }
        }
        res.send(reVal);
    });
});

module.exports = router;