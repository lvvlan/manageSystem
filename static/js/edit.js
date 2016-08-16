/**
 * Des
 * Created by luowei5 on 2016/8/12.
 * E-mail luowei5@jd.com
 * Update 2016/8/12
 */
;(function (){
    var form = $("#settingForm"),
        currentDef = "",
        $item = $(".item", form),
        formLock = false;

    for(var i = 0; i <$item.length; i++){
        $item.eq(i).css({
            "position": "relative",
            "zIndex": $item.length - i
        });
    }

    //一级标题
    $("[node-type=first]").select({
        callback: function (obj){
            var html = [];
            obj.parents(".select").attr("first", true);
            obj.parents(".item").find(".error").hide();
            if(currentDef == $(".defTxt", "[node-type=first]").html()) return;
            currentDef = $(".defTxt", "[node-type=first]").html();
            $(".defTxt", "[node-type=second]").html("加载中...");
            //渲染二级选项
            $.ajax({
                url: "/second",
                type: "POST",
                data: {
                    firstName: obj.parents(".select").find(".defTxt").text()
                },
                dataType: "json",
                success: function (data){
                    for(var i = 0; i <data.length; i++){
                        html.push("<li>"+data[i].name+"</li>");
                    }
                    html.push("<li data-operate='new'>添加新项目</li>");
                    $(".check", "[node-type=second]").html(html.join(""));
                    $(".defTxt", "[node-type=second]").html("请选择");
                }
            });
        }
    });
    //二级标题
    $("[node-type=second]").on("click.check", function (){
        var $this = $(this);
        if($("[node-type=first]").attr("first")){
            $this.select({
                instant: true,
                callback: function (obj){
                    obj.parents(".item").find(".error").hide();
                    if(obj.attr("data-operate") == "new" && $(".minor", form).height()<=0){
                        var $item = $(".minor", form).find(".item"),
                            targetH = $item.length * $item.outerHeight(true);
                        $(".minor", form).animate({height: targetH});
                    }
                }
            });
            $this.off("click.check");
        }else{
            alert("请先选择一级选项!");
        }
    });

    //提交校验
    $.validator.setDefaults({
        ignore: "", //默认忽略隐藏域
        rules:{
            first:{
                required:true
            },
            second: {
                required:true
            },
            proName: {
                required:true
            },
            url: {
                required:true,
                url:true
            }
        },
        messages:{
            first:{
                required:"请选择一级标题"
            },
            second: {
                required: "请选择二级标题"
            },
            proName: {
                required: "请填写项目名称"
            },
            url: {
                required: "请填写项目链接",
                url: "请输入以http://或https://或//开头的链接"
            }
        },
        /*onkeyup: function (element){
         this.element( element );
         },*/
        /*重写校验元素焦点离开时的执行函数--移除[1.添加的帮助提示,2.校验元素的高亮显示]*/
        onfocusout: function( element ) {
            /*任何时候光标离开元素都触发校验功能*/
            this.element( element );
        },
        /*自定义错误放到哪里*/
        errorPlacement:function(error,element) {
            error.appendTo(element.parents(".item"));
        }
    });

    form.validate({
        errorElement: "p",
        submitHandler: function(form){  //通过验证的后的回调
            $.ajax({
                url: "/submitSystem",
                dataType: "json",
                type: "POST",
                data: $(form).serialize(),
                success: function (data){
                    alert(data.msg);
                }
            });
        }
    });
})();