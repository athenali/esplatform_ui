var deleteAll;
var chooseAll;
var historyBack;
var deleteRecord;
var editForm;
var pMenuId;
$(function(){
    var initGrid;
    var refreshGrid;
    var initMenuTree;
    var routePath = '';
    var addMain;
    var editMain;
    var router;
    
    function initEvent() {
    	$("#editForm").validate({
			submitHandler : function(form) {
				var editJson = {
					"id" : $('#editids').val(),
					"name" : $('#editName').val(),
					"url" : $('#editLink').val(),
					"displayOrder" : $('#editOrder').val(),
					"icon" : $('#editIcon').val()
				};
				ajaxRequest(GLOBAL_AJAX_URL.menuedit, 'POST', JSON.stringify(editJson), function(res) {
					if (res.status) {
						top.dhtmlx.message({
							type : "success",
							text : res.message
						});
						form.reset();
						router.setRoute('/index');
						refreshGrid();
					} else {
						top.dhtmlx.message({
							type : "error",
							text : res.message
						});
					}
				});
			}
		});
    	
    	$("#commentForm").validate({
			rules : {
				menuname : "jeff_bianma",
				menulink : "jeff_bianma",
				menuorder : "jeff_bianma",
				menuicon : "jeff_bianma"
			},
			messages : {
				menuname : "请输入50个字且非空不带任何符号的字",
				menulink : "请输入50个字且非空不带任何符号的字",
				menuorder : "请输入50个字且非空不带任何符号的字",
				menuicon : "请输入50个字且非空不带任何符号的字"
			},
			submitHandler : function(form) {
				var addJson = {
					"name" : $('#addName').val(),
					"url" : $('#addLink').val(),
					"displayOrder" : $('#addOrder').val(),
					"icon" : $('#addIcon').val(),
					"pMenuId" : id
				};
				ajaxRequest(GLOBAL_AJAX_URL.menuadd, 'POST', JSON.stringify(addJson), function(res) {
					alert(JSON.stringify(addJson));
					if (res.status) {
						top.dhtmlx.message({
							type : "success",
							text : res.message
						});
						form.reset();
						router.setRoute('/index');
						refreshGrid();
					} else {
						top.dhtmlx.message({
							type : "error",
							text : res.message
						});
					}
				});
			}
		});
    }
    
    
    function initRoute() {
		var routes = {
			"/views" : {
				"/user/:manage" : {
					on : function(path) {
						routePath = path;
					}
				}
			},
			"/addMenu" :  addMain,
			"/editMenu/:bookId" : editMain,
			"/index" : function() {
				// 初始页面
				routePath = 'umenu';
			}
		};
		router = Router(routes);
		// 其他跳转设置
		router.configure({
			on : function() {
				var route = routePath || window.location.hash.slice(2);
				var sections = $('.umenu_body>div');
				var $section;
				$section = sections.filter('[data-route=' + route + ']');
				if ($section.length) {
					sections.hide();
					$section.show();
				}
			}
		});
		// 初始化
		router.init().setRoute('/index');
	}
    
    addMain = function() {
		routePath = 'madd';
	};
	
	editMain = function(id) {
		routePath = 'medit';
		ajaxRequest(GLOBAL_AJAX_URL.menugetById + id, 'GET', {}, function(res) {
			if (res.status) {
				$('#editids').val(res.data.id);
				$('#editName').val(res.data.name);
				$('#editLink').val(res.data.url);
				$('#editOrder').val(res.data.displayOrder);
				$('#editIcon').val(res.data.icon);
			} else {
				top.dhtmlx.message({
					type : "error",
					text : res.message
				});
			}
		});
	};
    
	historyBack = function check() {
		window.history.back();
	};
	
	editForm = function(id) {
		window.location.href = '#/editMenu/' + id;
	};
	
	// 单条数据删除
	deleteRecord = function(ids) {
		top.dhtmlx.confirm({
			title : "提示",
			type : "confirm-error",
			text : "确认要删除这个角色吗？",
			cancel : '取消',
			ok : '确认删除',
			callback : function(res) {
				if (res) {
					ajaxRequest(GLOBAL_AJAX_URL.menudel + '?ids=' + ids, 'DELETE', null, function(res) {
						if (res.status) {
							refreshGrid()
							top.dhtmlx.message({
								type : "success",
								text : "删除成功"
							});
						} else {
							top.dhtmlx.message({
								type : "error",
								text : res.message
							});
						}
					});
				}
			}
		});
	};

    var myTreeView;
    var menuTree;
    $.ajax({
    	type: 'GET',
    	url: GLOBAL_AJAX_URL.menulistTree,
    	data: {},
    	contentType: 'application/json',
    	timeout: 10000,
    	async: false,//同步ajax请求，解决无法展示treeView的问题
    	success: function(res){
    		if (res.status) {
    			menuTree = res.data;
    		} else {
    			top.dhtmlx.message({
    				type : "error",
    				text : res.message
    			});
    		}
        },
    });
    
    initMenuTree = function() {
    	myTreeView = new dhtmlXTreeView("treeboxbox_tree");
    	myTreeView.loadStruct(JSON.stringify(menuTree));
    	myTreeView.attachEvent("onSelect", function(id, mode){
            if(mode){
            	pMenuId = id;
            	ajaxRequest(GLOBAL_AJAX_URL.menulistByPMenuId + id, 'GET', null, function(res) {
            		if (res.status) {
            			mygrid.clearAll();
            			var dataOfGrid = [];
                 		$.each(res.data,function(index,value){
                 			value.func = function(row_id,attr,cellValue){
                 				return "<button onclick='editForm("+row_id+")' class='bianji'><span><img src='../../src/img/ico_edit.png' />修改</span></button>"
                 				+" <button onclick='deleteRecord("+row_id+")' class='shanchu'><span><img src='../../src/img/ico_del.png' />删除</span></button>";
                 			}
                 		})
                 		mygrid.parse(res.data, "js");
            		} else {
            			top.dhtmlx.message({
            				type : "error",
            				text : res.message
            			});
            		}
            	});
            }
        });
    }
    
    initGrid = function() {
        mygrid = new dhtmlXGridObject('gridbox');
        mygrid.selMultiRows = true;
        mygrid.setImagePath("/src/css/dhtmlxCodebase/skins/web/imgs/dhxgrid_web/");
        mygrid.setHeader("序号,菜单名称,菜单链接,菜单顺序,菜单图标,操作",
        null,
        ["text-align:center;","text-align:center;","text-align:center","text-align:center","text-align:center","text-align:center"]);
        mygrid.setColumnIds(",name,url,displayOrder,icon,func");
        mygrid.setColTypes("cntr,ro,ro,ro,ro,func");
        mygrid.setInitWidths("60,80,120,*,120,*");
        mygrid.setSkin("dhx_web");
        mygrid.enablePaging(true,10,5,"pagingArea");
        mygrid.setPagingSkin("toolbar","dhx_web");
        mygrid.setColAlign("center,center,center,center,center,center");
        mygrid.enableColumnAutoSize(true);
        mygrid.enableAutoWidth(true);
        
        mygrid.init();
        refreshGrid();
    };

    //  这是 请求数据 渲染表格
    // 表格刷新数据
     function refreshGrid() {
         ajaxRequest(GLOBAL_AJAX_URL.menulist, 'GET', {}, function(respond) {
         	if (respond.status) {
         		// mygrid.updateFromJSON(respond.data, false, false)
         		mygrid.clearAll();
         		var dataOfGrid = [];
         		$.each(respond.data,function(index,value){
         			value.func = function(row_id,attr,cellValue){
         				return "<button onclick='editForm("+row_id+")' class='bianji'><span><img src='../../src/img/ico_edit.png' />修改</span></button>"
         				+" <button onclick='deleteRecord("+row_id+")' class='shanchu'><span><img src='../../src/img/ico_del.png' />删除</span></button>";
         			}
         		})
         		mygrid.parse(respond.data, "js");
         	} else {
         		top.dhtmlx.message({
         			type : "error",
         			text : respond.message
         		});
         	}
         });
    };
    
    initGrid();
    initRoute();
    initEvent();
    initMenuTree();
})

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