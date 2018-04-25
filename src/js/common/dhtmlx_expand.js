
// 扩展的grid
eXcell_button.prototype = new eXcell;
eXcell_chex.prototype = new eXcell;
function eXcell_button(cell) {
    if (cell) {
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    var buttonHtml = this.grid.buttonHtml;
    this.edit = function () { }
    this.isDisabled = function () { return true; }
    this.setValue = function (val) {
        var row_id = this.cell.parentNode.idd;     // 获取行id
        this.setCValue("<button onclick='initEvent.editEvent("+row_id+")' class='bianji'><span><img src='" + webroot + "pages/images/ico_edit.png' />修改</span></button> <button onclick='initEvent.delRecEvent("+row_id+")' class='shanchu'><span><img src='" + webroot + "pages/images/ico_del.png' />删除</span></button>", val);
    }
}


function eXcell_func(cell) { // excell name is defined here
	if (cell) { // default pattern, just copy it
		this.cell = cell;
		this.grid = this.cell.parentNode.grid;
		this.row = this.cell.parentNode;

	}
	this.edit = function() {
	}; // read-only cell doesn't have edit method
	this.isDisabled = function() {
		return true;
	}; // the cell is read-only, that's why it is always in the disabled state
	this.setValue = function(val) {
		var returnVal =val.apply(this, [ this.row.idd, this.row._attrs]);
		this.setCValue(returnVal, "");
	};
}

eXcell_func.prototype = new eXcell;


function eXcell_chex(cell) {
    if (cell) {
        this.cell = cell;
        this.grid = this.cell.parentNode.grid;
    }
    this.edit = function () { }
    this.isDisabled = function () { return true; }
    this.setValue = function (val) {
        var row_id = this.cell.parentNode.idd;     // 获取行id
        this.setCValue("<div style='padding-left: 6px'><input type='checkbox' name='animal' class='btn-check' value='"+row_id+"'/></div>", val);
    }
}