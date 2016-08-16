/**
 * Des
 * Created by luowei5 on 2016/8/12.
 * E-mail luowei5@jd.com
 * Update 2016/8/12
 */
$.fn.select = function (options){
    var setting = $.extend({
        hidden: true,       //是否填充隐藏域
        instant: false,      //是否立即执行
        callback: null,
        visual: 5           //select显示个数
    }, options);

    return this.each(function (){
        var that = $(this),
            defObj = $(".defTxt", that),
            selectBox = $(".check", that),
            targetH = 0,
            singleH = selectBox.children().height();

        selectBox.css({
            maxHeight: singleH * setting.visual,
            overflowY: "auto",
            overflowX: "hidden"
        });

        function selectEvent(obj){
            var $this = obj;
            targetH = targetH <= singleH ? defObj.height() + selectBox.height() : singleH;
            $this.stop().animate({height: targetH});
            selectBox.children().off("click").on("click", function (event){
                event.stopPropagation();
                targetH = singleH;
                defObj.html($(this).html());
                $this.stop().animate({height: targetH});
                if(setting.hidden){
                    $this.find(".hidden").val($(this).html());
                }
                $.isFunction(setting.callback) && setting.callback($(this),selectBox.children().length);
            });
        }
        
        that.on("click.select", function (){
            selectEvent($(this));
        });
        
        setting.instant && selectEvent(that);
    });
};