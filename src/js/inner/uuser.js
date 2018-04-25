//页面html事件会使用到的方法
var query;			// 按用户名称条件查询
var add;			// 新增用户
var deleteAll;		// 删除选中的所有数据
var chooseAll;		// 全选
var historyBack;	// 返回
var deleteOne;		// 单个删除
var edit;			// 修改用户信息
var resetPassword;  // 重置密码

var subTitle; 

$(function() {
	// 內部变量和方法
	var mygrid; 	// 表格
	var initGrid;	// 初始化表格
	var refreshGrid;// 刷新表格
	var routePath = '';// 长链接时方便获取最后一个“真”值
	var addMain;
	var editMain;
	var router;
	var deleteRecord; // 删除数据
	
	function init() {
		initGrid();
	}
	
	function initEvent() {
		$("#editForm").validate({
			submitHandler : function(form) {
				var editJson = {
					"id" : $('#editids').val(),
					"loginName" : $('#edit_loginName').val(),
					"userName" : $('#edit_userName').val(),
					"email" : $('#edit_email').val(),
					"mobileNo" : $('#edit_mobileNo').val(),
					"status" : $('input[name="edit_status"]:checked').val(),
					"org" : {
						"id" : $('#edit_orgId').val()
					}
				};
				ajaxRequest(GLOBAL_AJAX_URL.userUpdate, 'POST', JSON.stringify(editJson), function(res) {
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
		$("#addForm").validate({
			submitHandler : function(form) {
//				rules : {
//					email : "email",
//					mobileNo : "mobileNo"
//				},
//				messages : {
//					email : "请输入正确的邮箱地址",
//					mobileNo : "请输入正确的手机号码"
//				},
				var addJson = {
					"loginName" : $('#loginName').val(),
					"userName" : $('#userName').val(),
					"email" : $('#email').val(),
					"mobileNo" : $('#mobileNo').val(),
					"status" : $('input[name="status"]:checked').val(),
					"org" : {
						"id" : $('#orgId').val()
					}
				};
				ajaxRequest(GLOBAL_AJAX_URL.userSave, 'POST', JSON.stringify(addJson), function(res) {
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
			"/add" : addMain,
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
	
	// 组织机构列表

	
	query = function(){
		refreshGrid(true);
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
	// 根据用户Id删除数据
	deleteRecord = function(ids, text){
		top.dhtmlx.confirm({
			title : "提示",
			type : "confirm",
			text : text,
			cancel : '取消',
			ok : '确认删除',
			callback : function(res) {
				if (res) {
					ajaxRequest(GLOBAL_AJAX_URL.userDelete + '?ids=' + ids, 'DELETE', null, function(res) {
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
	}
	add = function() {
		subTitle = "新增用户";
		window.location.href = '#/add';
	}
	// 批量删除
	deleteAll = function() {
		var $btn_checks = $('#gridbox').find('.btn-check:checked');
		var checkarr = [];
		$btn_checks.each(function(index, item) {
			checkarr.push($(this).val());
		});
		if (checkarr.length > 0) {
			var ids = checkarr.join(",");
			// deleteRecord(ids, "确认要批量删除这些用户吗？");
		}
		else{
			top.dhtmlx.alert({
				title : "提示",
				type : "alert-warning",
				text : "请选择需要删除的数据",
				ok : '确认'
			})
		}
	};
	// 单条数据删除
	deleteOne = function(ids) {
		// deleteRecord(ids, "确认要删除这个用户吗？");
	};
	// 修改用户信息
	edit = function(id) {
		// window.location.href = '#/edit/' + id;
	};
	// 用户密码重置
	// resetPassword = function(id) {		
	// 	top.dhtmlx.confirm({
	// 		title : "提示",
	// 		type : "confirm",
	// 		text : "确定要重置密码吗？",
	// 		cancel : '取消',
	// 		ok : '确认',
	// 		callback : function(res) {
	// 			if (res) {
	// 				ajaxRequest(GLOBAL_AJAX_URL.userResetPassword + id, 'PUT', {}, function(res) {
	// 					if (res.status) {
	// 						top.dhtmlx.message({
	// 							type : "success",
	// 							text : res.message
	// 						});
	// 					} else {
	// 						top.dhtmlx.message({
	// 							type : "error",
	// 							text : res.message
	// 						});
	// 					}
	// 				});
	// 			}
	// 		}
	// 	});
	// }

	addMain = function() {
		routePath = 'uadd';
	};
	editMain = function(id) {
		routePath = 'umodify';
		// ajaxRequest(GLOBAL_AJAX_URL.userGet + id, 'GET', {}, function(res) {
		// 	if (res.status) {
		// 		$('#editids').val(res.data.id);
		// 		$('#edit_orgId').val(res.data.org.id);
		// 		$('#edit_loginName').val(res.data.loginName);
		// 		$('#edit_userName').val(res.data.userName);
		// 		$('#edit_email').val(res.data.email);
		// 		$('#edit_mobileNo').val(res.data.mobileNo);
		// 		 if (res.data.status == 1) {
        //              $('input[name="edit_status"]:eq(1)').prop('checked', true);
        //          } else {
        //              $('input[name="edit_status"]:eq(0)').prop('checked', true);
        //          }
		// 	} else {
		// 		top.dhtmlx.message({
		// 			type : "error",
		// 			text : res.message
		// 		});
		// 	}
		// });

	};

	// 内部变量
	initGrid = function() {
		mygrid = new dhtmlXGridObject('gridbox');
		mygrid.setSkin(dhtmlx_skin);
		mygrid.selMultiRows = true;
		mygrid.i18n.paging=grid_i18n_paging;
		mygrid.setImagePath("/src/js/dhtmlx/codebase/imgs/");
		mygrid.setHeader("<input style='margin-left:12px' type='checkbox'id='checkAll'onclick='chooseAll(this)'/>,登录名,真实名称,所属组织机构,邮箱地址,联系电话,激活状态,创建时间,操作");
		mygrid.setColumnIds("id,loginName,userName,orgName,email,mobileNo,statusName,createdTime,func");
		mygrid.setColTypes("chex,ro,ro,ro,ro,ro,ro,ro,func");
		mygrid.setInitWidths("60,80,80,100,100,80,50,150,300");
		mygrid.enablePaging(true, 10, 3, "pagingArea");
		mygrid.setPagingSkin("toolbar", dhtmlx_skin);
		mygrid.enableAutoHeight(true);
		mygrid.enableAutoWidth(true);
		mygrid.init();
		refreshGrid();
	};
	// 表格刷新数据
	refreshGrid = function(isPageable) {
		var url = GLOBAL_AJAX_URL.userAll;
		var param = {};
		if(isPageable){
			url = GLOBAL_AJAX_URL.userQuery;
			var userName = $('#query_userName').val();
			var param = {
					userName : userName,
					orderby : 'user.createdTime',
					direct : 'DESC',
					posStart : 0,
					count : 100	
			}
		}
		// ajaxRequest(url, 'GET', param, function(respond) {
			var respond = uuserJson;
			if (respond.status) {
				var resData = null;
				if(isPageable){
					resData = respond.data.rows;
				}
				else{
					resData = respond.data;
				}
				mygrid.clearAll();
				$.each(resData,function(index,value){
					value.orgName = value.org.name;
					value.statusName="启用";
					if(value.status==1) {
						value.statusName="禁用"
					}
					// resetPassword("+row_id+")
					value.func = function(row_id,attr,cellValue){
						return "<button onclick='' class='bianji mr10'><span>密码重置</span></button>"
							  +"<button onclick='edit("+row_id+")' class='bianji mr10'><span><img src='../../src/img/ico_edit.png' />修改</span></button>"
						      +"<button onclick='deleteOne("+row_id+")' class='shanchu'><span><img src='../../src/img/ico_del.png' />删除</span></button>";

//						return "<a href='javascript:resetPassword("+row_id+");'>密码重置</a>" 
//						     + "&nbsp&nbsp&nbsp&nbsp<a href='javascript:edit("+row_id+");'>编辑</a>"
//						     + "&nbsp&nbsp&nbsp&nbsp<a href='javascript:deleteOne("+row_id+");'>删除</a>";
					}
				})
				mygrid.parse(resData, "js");
			} else {
				top.dhtmlx.message({
					type : "error",
					text : respond.message
				});
			}
		// });
	};


	init();
	initRoute();
	initEvent();
	initValidator();
	
});