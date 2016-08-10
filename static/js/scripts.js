jQuery(document).ready(function() {
    var lock = false,
        form = $("#myform");

    $.validator.setDefaults({
        rules:{
            username:{
                required:true,
                minlength:2
            },
            password: {
                required:true,
                minlength: 5
            }
        },
        messages:{
            username:{
                required:"用户名不能为空",
                minlength:"用户名至少由两个字母组成"
            },
            password: {
                required: "密码不能为空",
                minlength: "密码至少5位"
            }
        },
        /*onkeyup: function (element){
            this.element( element );
        },*/
        /*重写校验元素焦点离开时的执行函数--移除[1.添加的帮助提示,2.校验元素的高亮显示]*/
        onfocusout: function( element ) {
            /*任何时候光标离开元素都触发校验功能*/
            this.element( element );
        }
    });

    form.validate({
        errorElement: "em",
        submitHandler: function(form){  //通过验证的后的回调
            if(lock) return;
            lock = true;
            //登录请求
            $.ajax({
                url: "/login",
                type: "post",
                data: {
                    username: $(".username", form).val(),
                    password: $(".password", form).val()
                },
                dataType: "json",
                success: function (data){
                    console.log(data);
                }
            });
        }
    });
});
