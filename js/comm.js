/**
 * Created by ljh on 2016/9/20.
 */
(function () {
    !function () {
        function e() {
            var e = document.documentElement.clientWidth, t = document.querySelector("html"), f = e / 20;
            window.fontSize = f;
            t.style.fontSize = f + "px"
        }

        e(), window.addEventListener("resize", e);
    }();
})();

/**
 * 模态弹窗
 * */
var modal = {
    /**
     * 显示
     * */
    showModal: function (obj) {
        $(obj).show();
        $(""+obj+" .modal-backdrop").show();
        if ($(obj).is(":visible")) {
            $(obj).addClass("in");
        }
        if ($(""+obj+" .modal-backdrop").is(":visible")) {
            $(""+obj+" .modal-backdrop").addClass("in");
        }
    },
    /**
     * 隐藏
     * */
    hideModal: function (obj) {
        $(obj).removeClass("in");
        $(""+obj+" .modal-backdrop").removeClass("in");
        setTimeout(function () {
            $(obj).hide();
            $(""+obj+" .modal-backdrop").hide();
        }, 300);
    },

    /**
     * 显示
     * */
    showModalEvent: function (event) {
        var obj = event.data.obj;
        modal.showModal(obj);
    },
    /**
     * 隐藏
     * */
    hideModalEvent: function (event) {
        var obj = event.data.obj;
        modal.hideModal(obj);
    }
};
/**
 * load加载图标
 * */
var loadModal = {
    show: function () {
        $(".mask-wrap").show();
        $(".loadingimg").show();
        $(".mask-background").show();
    },

    hide: function () {
        $(".mask-wrap").hide();
        $(".mask-background").hide();
        $(".loadingimg").hide();
    }
};

/**
 * 错误页面
 * */
var error = {
    show: function (retMsg) {
        $(".error-wrap").show();
        $(".error-wraptext").html(retMsg);
    },

    hide: function () {
        $(".error-wrap").hide();
    }
};

/**
 * 错误提醒框
 * */
var errorAlert = {
    timer: "",

    show: function (retMsg) {
        $(".errorAlert-wrap").show();
        $(".errorAlert-text").html(retMsg);
        $("#errorAlert").click(function () {
            errorAlert.hide();
        });
        errorAlert.timer = setTimeout(function () {
            $(".errorAlert-wrap").hide();
        }, 4000);
    },

    hide: function () {
        $(".errorAlert-wrap").hide();
        $(".errorAlert-text").html("");
        clearInterval(errorAlert.timer);
    }
};

/**
 * 获取url链接上的参数
 * */
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return r[2];
    return "";
}

/**
 * 跳转app相应页面
 * */
var gotoAPP = {
    isNewVersion : "0",

    /**
     * 新旧版本以4.0.6作为区分
     * newApp {"code":"GMCCAPP_001_019"}
     * oldApp {"operation":"gmcc016"}
     * */
    page : function(newApp,oldApp){
        appType = getMobileForm();
        var newApp = JSON.stringify(newApp);
        var oldApp = oldApp;
        if (gotoAPP.isNewVersion == "0") {
            var reqData = newApp;
            var reqJson = '{"servicename":"GMCCJS_000_000_000_001","reqData":' + reqData + '}';
            //alert(reqJson)
            appCommunication(reqJson, "");
        } else {
            if(oldApp!="" && oldApp!=null){
                oldApp = JSON.stringify(oldApp);
            }else{
                oldApp = '{}';
            }
            var reqData = oldApp;
            var reqJson = '{"servicename":"GMCCJS_000_000_000_000","reqData":' + reqData + '}';
            //alert(reqJson)
            appCommunication(reqJson, "");
        }
    },

    /**
     * 添加事件调用page
     * */
    pageEvent: function(event){
        var newApp = event.data.newApp;
        var oldApp = event.data.oldApp;
        gotoAPP.page(newApp,oldApp);
    }
};

/**
 *  页面刷新
 */
var pageRefresh = {
    /**
     *  @param fun 刷新的事件对象
     * */
    init: function (event) {
        var fun = event.data.fun;
        loadModal.show();
        $(".error-wrap").hide();
        setTimeout(function () {
            fun.Request()
        }, 300);
    }
};

/**
 * 事件
 * */
var eventUtil = {
    /**
     * 添加事件
     * @param element 事件对象
     * @param type 事件类型
     * @param handler 事件方法
     * @param data 当一个事件被触发时要传递event.data给事件处理函数
     * 格式 {element:"",type:"",handler:function,data:{}}
     * */
    addHandler: function (obj) {
        var element = obj.element;
        var type = obj.type;
        var handler = obj.handler;
        var data = obj.data;
        $(element).on(type, data, handler);
    },

    /**
     * 获取事件
     * */
    getEvent: function (event) {
        return event ? event : window.event;
    },

    /**
     * 获取目标源
     * */
    getTarget: function (event) {
        return event.target || event.srcElement;
    },

    /**
     *  移除事件
     * @param element 事件对象
     * @param type 事件类型
     * @param handler 事件方法
     * 格式 {element:"",type:"",handler:function}
     * */
    removeHandler: function (obj) {
        var element = obj.element;
        var type = obj.type;
        var handler = obj.handler;
        $(element).off(type, handler);
    },

    /**
     * 阻止默认事件
     * */
    preventDefault: function (event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    /**
     * 阻止事件冒泡
     * */
    stopPropagation: function (event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
};
