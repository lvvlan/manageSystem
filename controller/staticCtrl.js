/**
 * Des
 * Created by luowei5 on 2016/8/16.
 * E-mail luowei5@jd.com
 * Update 2016/8/16
 */
const fs = require("fs");

module.exports = {
    login: function(req, res, next) {
        res.render("login");
    },
    edit: function(req, res, next) {
        if(req.session.userInfo){
            var rs = fs.createReadStream("data/product.json"),
                rsArr = [];

            rs.on("data", function (b){
                rsArr.push(b);
            });
            rs.on("end", function (){
                var rsData = Buffer.concat(rsArr).toString();
                res.render("edit", {
                    username: req.session.userInfo.username,
                    listJson: JSON.parse(rsData)
                });
            });
            rs.on("error", function (){
                res.send("获取数据失败!");
            });
        }else{
            req.session.error = "请先登录";
            res.redirect("/login.html");
        }
    },
    logout: function (req, res, next){
        req.session.userInfo = {};
        req.session.error = "";
        res.redirect("/login.html");
    }
};