if (!Array.isArray) {
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]';
    };
}
if (!Array.prototype.filter) {
    Array.prototype.filter = function(callback) {
        // 获取数组长度
        var len = this.length;
        if(typeof callback != "function") {
            throw new TypeError();
        }
        // 创建新数组，用于承载经回调函数修改后的数组元素
        var newArr = new Array();
        // thisArg为callback 函数的执行上下文环境
        var thisArg = arguments[1];
        for(var i = 0; i < len; i++) {
            if(i in this) {
                var val = this[i];// in case fun mutates this
                if(callback.call(thisArg, val, i, this)) {
                    newArr.push(val);
                }
            }
        }
        return newArr;
    }
}
//indexOf()兼容ie8
if (!Array.prototype.indexOf){
    Array.prototype.indexOf = function(elt /*, from*/)
    {
        var len = this.length >>> 0;

        var from = Number(arguments[1]) || 0;
        from = (from < 0)
            ? Math.ceil(from)
            : Math.floor(from);
        if (from < 0)
            from += len;

        for (; from < len; from++)
        {
            if (from in this &&
                this[from] === elt)
                return from;
        }
        return -1;
    };
}
