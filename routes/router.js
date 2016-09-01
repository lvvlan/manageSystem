/**
 * Des
 * Created by luowei5 on 2016/8/9.
 * E-mail luowei5@jd.com
 * Update 2016/8/9
 */
var express = require('express');
var router = express.Router();
const fs = require("fs");
const EventEmitter = require("events").EventEmitter;
var staticCtrl = require("../controller/staticCtrl"),
    interfaceCtrl = require("../controller/interfaceCtrl");

var E = new EventEmitter();

//登录页
router.get('/login.html', staticCtrl.login);

//登出
router.get('/logout.html', staticCtrl.logout);

//编辑页
router.get('/edit.html', staticCtrl.edit);

//登录接口信息
router.post("/login", interfaceCtrl.login);

//编辑>二级标题接口
router.post("/second", interfaceCtrl.second);

//编辑>详细信息接口
router.post("/submitSystem", interfaceCtrl.submitSystem);

//编辑>还原备份接口
router.post("/reset", interfaceCtrl.reset);

module.exports = router;