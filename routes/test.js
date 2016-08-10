/**
 * Des
 * Created by luowei5 on 2016/8/9.
 * E-mail luowei5@jd.com
 * Update 2016/8/9
 */
var express = require('express');
var router = express.Router();

/*router.use(function (req, res, next){
    console.log(req.url);
    next(req.url);
});*/

/* GET users listing. */
router.get('/test', function(req, res, next) {
    res.render("test", {title: "测试页面"});
});

module.exports = router;