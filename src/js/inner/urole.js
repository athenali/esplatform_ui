//页面html事件会使用到的方法
var deleteAll;
var chooseAll;
var historyBack;
var deleteRecord;
var editForm;
var query;
$(function() {
	// 內部变量和方法
	var mygrid; // 表格
	var initGrid;
	var refreshGrid;
	var routePath = '';// 长链接时方便获取最后一个“真”值
	var addMain;
	var editMain;
	var router;
	
	function init() {
		initGrid();
	}
	function initEvent() {
		$("#editForm").validate({
			submitHandler : function(form) {
				var editJson = {
					"id" : $('#editids').val(),
					"name" : $('#editName').val(),
					"code" : $('#editCode').val(),
					"description" : $('#editDesc').val()
				};
				ajaxRequest(GLOBAL_AJAX_URL.roleedit, 'POST', JSON.stringify(editJson), function(res) {
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
				rolecode : "jeff_bianma",
				rolename : "jeff_bianma",
				roledesc : "jeff_dec"
			},
			messages : {
				rolecode : "请输入50个字且非空不带任何符号的字",
				rolename : "请输入50个字且非空不带任何符号的字",
				roledesc : "请输入200个字且非空不带任何符号的字"
			},
			submitHandler : function(form) {
				var addJson = {
					"name" : $('#addName').val(),
					"code" : $('#addCode').val(),
					"description" : $('#addDesc').val()
				};
				ajaxRequest(GLOBAL_AJAX_URL.roleadd, 'POST', JSON.stringify(addJson), function(res) {
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
			"/addNew" : addMain,
			"/edit/:bookId" : editMain,
			"/index" : function() {
				// 初始页面
				routePath = 'urole';
			}
		};
		router = Router(routes);
		// 其他跳转设置
		router.configure({
			on : function() {
				var route = routePath || window.location.hash.slice(2);
				var sections = $('.tab-item>div');
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

	function initValidator() {

	}

	chooseAll = function check(_this) {
		var a = $(".only").find(".objbox").find("tbody").children().find(".btn-check");
		var checked = $(_this).prop("checked");
		for (var i = 0; i <= a.length; i++) {
			if (!checked) {
				a.eq(i).prop("checked", false)
			} else {
				a.eq(i).prop("checked", 'checked')
			}
		}
	};
	// 返回
	historyBack = function check() {
		window.history.back();
	};
	// 批量删除
	deleteAll = function() {
		var $btn_checks = $('#gridbox').find('.btn-check:checked');
		var checkarr = [];
		$btn_checks.each(function(index, item) {
			checkarr.push($(this).val());
		});
		if (checkarr.length > 0) {
			top.dhtmlx.confirm({
				title : "提示",
				type : "confirm",
				text : "确认要批量删除这些角色吗？",
				cancel : '取消',
				ok : '确认删除',
				callback : function(res) {
					if (res) {
						ajaxRequest(GLOBAL_AJAX_URL.roledel + '?ids=' + checkarr.join(","), 'DELETE', null, function(res) {
							if (res.status) {
								refreshGrid();
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
		}
	};

	// 单条数据删除
	deleteRecord = function(ids) {
		top.dhtmlx.confirm({
			title : "提示",
			type : "confirm",
			text : "确认要删除这个角色吗？",
			cancel : '取消',
			ok : '确认删除',
			callback : function(res) {
				if (res) {
					ajaxRequest(GLOBAL_AJAX_URL.roledel + '?ids=' + ids, 'DELETE', null, function(res) {
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
	query = function(){
		refreshGrid(true);
	}
	editForm = function(id) {
		window.location.href = '#/edit/' + id;
	};

	addMain = function() {
		routePath = 'uadd';
		// 匹配
	};
	editMain = function(id) {
		routePath = 'umodify';
		ajaxRequest(GLOBAL_AJAX_URL.roledetail + id, 'GET', {}, function(res) {
			if (res.status) {
				$('#editids').val(res.data.id);
				$('#editCode').val(res.data.code);
				$('#editName').val(res.data.name);
				$('#editDesc').val(res.data.description);
			} else {
				top.dhtmlx.message({
					type : "error",
					text : res.message
				});
			}
		});

	};

	// 内部变量
	initGrid = function() {
		mygrid = new dhtmlXGridObject('gridbox');
		mygrid.setSkin(dhtmlx_skin);
		mygrid.selMultiRows = true;
		mygrid.i18n.paging=grid_i18n_paging;
		mygrid.setImagePath('/src/js/dhtmlx/codebase/imgs/');
		mygrid.setHeader("<input style='margin-left:12px' type='checkbox'id='checkAll'onclick='chooseAll(this)'/>,角色编码,名称,描述,创建时间,操作");
		mygrid.setColumnIds("id,code,name,description,createdTime,func");
		mygrid.setColTypes("chex,ro,link,ro,ro,func");
		mygrid.setInitWidths("60,100,100,150,150,150");
		mygrid.enablePaging(true, 10, 3, "pagingArea");
		mygrid.setPagingSkin("toolbar", dhtmlx_skin);
		mygrid.enableAutoHeight(true);
		mygrid.enableAutoWidth(true);
		mygrid.init();
		refreshGrid();
	};
	// 表格刷新数据
	refreshGrid = function(isPageable) {
		var url = GLOBAL_AJAX_URL.rolelist;
		var param = {};
		if(isPageable){
			url = GLOBAL_AJAX_URL.roleQuery;
			var userName = $('#checkUserRole').val();			
			param = {
					name : userName,
					orderby : 'createdTime',
					direct : 'DESC',
					posStart : 0,
					count : 100	
			}	
		}
		ajaxRequest(url, 'GET', param, function(respond) {
			if (respond.status) {
				mygrid.clearAll();
				var dataOfGrid = [];
				var resDate=[];
				if(isPageable){
					resDate=respond.data.rows	
				}else {
					resDate=respond.data;
				}
				$.each(resDate,function(index,value){
					value.func = function(row_id,attr,cellValue){
						return "<button onclick='editForm("+row_id+")' class='bianji mr10'><span><img src='../../src/img/ico_edit.png' />修改</span></button>"
						+" <button onclick='deleteRecord("+row_id+")' class='shanchu '><span><img src='../../src/img/ico_edit.png' />删除</span></button>";
					}
				})
				mygrid.parse(resDate, "js");
			} else {
				top.dhtmlx.message({
					type : "error",
					text : respond.message
				});
			}
		});
	};
	
	
	init();
	initRoute();
	initEvent();
	initValidator();

});