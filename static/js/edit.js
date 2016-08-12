/**
 * Des
 * Created by luowei5 on 2016/8/12.
 * E-mail luowei5@jd.com
 * Update 2016/8/12
 */
;(function (){
    var $item = $(".item", "#settingForm");

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
            obj.attr("first", true);
            $(".defTxt", "[node-type=second]").html("加载中...");
            obj.parents(".item").find(".error").hide();
            //渲染二级选项
            $.ajax({
                url: "/second",
                type: "POST",
                data: {
                    firstName: obj.find(".defTxt").html()
                },
                dataType: "json",
                success: function (data){
                    for(var i = 0; i <data.length; i++){
                        html.push("<li>"+data[i].name+"</li>");
                    }
                    html.push("<li>添加新项目</li>");
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
                }
            });
            $this.off("click.check");
        }else{
            alert("请先选择一级选项!");
        }
    });

    //提交校验
    var form = $("#settingForm");

    $.validator.setDefaults({
        ignore: "", //默认忽略隐藏域
        rules:{
            first:{
                required:true
            },
            second: {
                required:true
            }
        },
        messages:{
            first:{
                required:"请选择一级标题"
            },
            second: {
                required: "请选择二级标题"
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
            alert("成功!");
        }
    });
})();