//config.js配置

// var webroot = "/embracebase/"; // 本地环境配置，访问使用地址http://localhost:1180/embracebase/pages/login.html

var webroot =""; //nginx下环境配置，访问使用 http://localhost:10000/pages/login.html

// 后台ajax请求地址   所有接口详情可查看http://192.168.3.124:1180/embracebase/swagger-ui.html
var GLOBAL_AJAX_URL = {
 
   //-------登录退出------
   userLogin:'/embracebase/loginAction', // 一般登录
   login:'/embracebase/api/jwt/login',   // jwt方式登录
    logout:'/embracebase/api/jwt/logout', // 退出
    
    //-------菜单管理------
    menunav: '/embracebase/api/menu/list-by-userId/',// 菜单导航列表
    menuSave: '/embracebase/api/menu/save',     // 新增
    menuUpdate: '/embracebase/api/menu/update',// 修改
    menuDelete: '/embracebase/api/menu/save',  // 删除
    
    //-------角色管理------
    rolelist:'/embracebase/api/role/list-all',// 查询所有角色
    roledetail:'/embracebase/api/role/get/',  // 单个角色详情
    roleedit:'/embracebase/api/role/update',  // 修改角色
    roledel:'/embracebase/api/role/delete',   // 删除角色
    roleadd:'/embracebase/api/role/save',     // 新增角色
    roleQuery:'/embracebase/api/role/list-query', // 根据角色名称分页查询
    
    //-------角色-菜单------
    roleMenuAssign:'/embracebase/api/role/assign-role-menus/', // 角色菜单分配
    roleMenuList:'/embracebase/api/role/list-role-menu/',      // 查询角色菜单权限
    
    //-----组织机构管理-------
    orgAll:'/embracebase/api/org/list-all',              // 查询所有组织机构本身信息，不含父节点和子节点
    orgAllLevel:'/embracebase/api/org/list-all-level',// 查询所有组织机构，含层级关系
    orgSave:'/embracebase/api/org/save',    // 新增
    orgUpdate:'/embracebase/api/org/update',// 修改
    orgDelete:'/embracebase/api/org/delete',// 删除
    
    //------用户管理----------
    userAll:'/embracebase/api/user/list-all',     // 查询所有用户
    userQuery:'/embracebase/api/user/list-query',// 按用户名称分页查询
    userGet:'/embracebase/api/user/get/',         // 获取用户详情
    userSave:'/embracebase/api/user/save',          // 新增用户
    userUpdate:'/embracebase/api/user/update',     // 修改用户
    userDelete:'/embracebase/api/user/delete',     // 删除用户
    userResetPassword:'/embracebase/api/user/reset-password/', // 重置用户密码
    userUpdatePassword:'/embracebase/api/user/update-password',// 修改用户密码
    
    //------用户-角色----------
    userRoleAssign:'/embracebase/api/user/assign-user-roles/',// 用户角色分配
    userRoleList:'/embracebase/api/user/list-user-role/',     // 查询用户角色
    
    //-------菜单管理------
    menulist:'/embracebase/api/menu-demo/list-all',//已维护菜单列表
    menudel:'/embracebase/api/menu-demo/delete', //删除菜单
    menulistByMenuId:'/embracebase/api/menu-demo/list-by-id/', //根据id查询菜单
    menulistByPMenuId:'/embracebase/api/menu-demo/list-by-pmenu-id/', //根据pmenuid查询子菜单
    menugetById:'/embracebase/api/menu-demo/get-by-id/',
    menulistTree:'/embracebase/api/menu-demo/list-menu-tree',//查询树状菜单列表
    menuadd:'/embracebase/api/menu-demo/insert',
    menuedit:'/embracebase/api/menu-demo/update'
};
 
var dhtmlx_skin = "material";
var grid_image_path = "/src/js/dhtmlx/codebase/imgs/"
 
var grid_i18n_paging = {
   results : "结果",
   records : "",
   to : "-",
   page : " ",
   perpage : "",
   first : "到第一页",
   previous : "上一页",
   found : "找到记录",
   next : "下一页",
   last : "到最后一页",
   of : " 总计：",
   notfound : "没有记录"
};

var loginMenu = {
    "validateMessagesShowId": "_validatorMessage",
    "status": true,
    "httpstatus": 200,
    "data": [
        {
            "id": 31,
            "name": "首页",
            "url": "",
            "level": 1,
            "displayOrder": 1,
            "subMenus": [
                {
                    "id": 32,
                    "name": "角色管理1",
                    "url": "pages/views/user/uorg.html",
                    "level": 2,
                    "displayOrder": 1,
                    "subMenus": [
                        
                    ]
                },
                {
                    "id": 33,
                    "name": "角色管理2",
                    "url": "pages/views/user/uuser.html",
                    "level": 2,
                    "displayOrder": 2,
                    "subMenus": [
                        
                    ]
                },
                {
                    "id": 34,
                    "name": "角色管理3",
                    "url": "pages/views/user/uuser.html",
                    "level": 2,
                    "displayOrder": 3,
                    "subMenus": [
                        
                    ]
                }
            ]
        },
        {
            "id": 31,
            "name": "重要人员查询",
            "url": "",
            "level": 1,
            "displayOrder": 1,
            "subMenus": [
                {
                    "id": 32,
                    "name": "重要人员1",
                    "url": "pages/views/user/uorg.html",
                    "level": 2,
                    "displayOrder": 1,
                    "subMenus": [
                        
                    ]
                },
                {
                    "id": 33,
                    "name": "重要人员2",
                    "url": "pages/views/user/uuser.html",
                    "level": 2,
                    "displayOrder": 2,
                    "subMenus": [
                        
                    ]
                },
                {
                    "id": 34,
                    "name": "重要人员3",
                    "url": "pages/views/user/urole.html",
                    "level": 2,
                    "displayOrder": 3,
                    "subMenus": [
                        
                    ]
                }
            ]
        },
        {
            "id": 31,
            "name": "轨迹查询",
            "url": "",
            "level": 1,
            "displayOrder": 1,
            "subMenus": [
                {
                    "id": 32,
                    "name": "轨迹查询1",
                    "url": "pages/views/user/uuser.html",
                    "level": 2,
                    "displayOrder": 1,
                    "subMenus": [
                        
                    ]
                },
                {
                    "id": 33,
                    "name": "轨迹查询2",
                    "url": "pages/views/user/uuser.html",
                    "level": 2,
                    "displayOrder": 2,
                    "subMenus": [
                        
                    ]
                },
                {
                    "id": 34,
                    "name": "轨迹查询3",
                    "url": "pages/views/user/uuser.html",
                    "level": 2,
                    "displayOrder": 3,
                    "subMenus": [
                        
                    ]
                }
            ]
        }
    ],
    "isValidateMessage": false,
    "validateMessages": {
        
    }
}

var uuserJson = {"validateMessagesShowId":"_validatorMessage","status":true,"httpstatus":200,"data":[{"id":3,"loginName":"admin","userName":"超级管理员","email":"123@126.com","mobileNo":"12345678900","status":0,"updatedTime":"2018-01-23 19:23:46","org":{"id":3,"code":"EmbraceSource","name":"共致开源"},"roles":[{"id":98,"name":"超级管理员","code":"superAdmin","description":"此角色请勿删除","createdTime":"2018-01-16 18:03:21","updatedTime":"2018-01-17 14:41:33"}]},{"id":9,"loginName":"testUser000","userName":"122334","email":"","mobileNo":"","status":0,"createdTime":"2018-01-24 12:34:19","updatedTime":"2018-01-24 12:34:19","org":{"id":4,"code":"bigdata","name":"大数据部门","description":"","createdTime":"2018-01-09 16:49:16","updatedTime":"2018-01-09 16:49:16"},"roles":[{"id":140,"name":"13334344543","code":"122345555","description":"的方式的方法","createdTime":"2018-01-18 17:09:20","updatedTime":"2018-01-18 17:09:20"}]},{"id":5,"loginName":"testUser","userName":"测试用户","email":"","mobileNo":"","status":0,"createdTime":"2018-01-10 11:57:53","updatedTime":"2018-01-23 19:18:21","org":{"id":3,"code":"EmbraceSource","name":"共致开源"},"roles":[{"id":147,"name":"测试角色","code":"test","description":"测测测","createdTime":"2018-01-22 14:16:44","updatedTime":"2018-01-22 14:16:44"},{"id":137,"name":"超级管理员22","code":"superAdmin22","description":"","createdTime":"2018-01-18 11:33:13","updatedTime":"2018-01-22 17:38:41"}]}],"isValidateMessage":false,"validateMessages":{}};