/**
 * Des
 * Created by luowei5 on 2016/8/9.
 * E-mail luowei5@jd.com
 * Update 2016/8/9
 */
var express = require('express');
var router = express.Router();

//响应登录页
router.get('/login.html', function(req, res, next) {
    res.render("login");
});
//响应编辑页
router.get('/edit.html', function(req, res, next) {
    res.render("edit");
});

//登录接口信息
router.post("/login", function (req, res, next){
    console.log(req.body);
    res.send({
        "code": 200,
        "msg": "登录成功"
    });
});

module.exports = router;