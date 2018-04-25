/*!
 * validator 正则
 */

//  在这里添加你任何想要的正则匹配的方法

$.validator.addMethod( "jeff_bianma", function( value, element ) {
    var tel = /^[\u4E00-\u9FA5A-Za-z0-9]{0,50}$/;
	return this.optional( element ) || (tel.test( value ));
}, "请输入50个字切非空不带任何符号的字" );
$.validator.addMethod( "jeff_cn", function( value, element ) {
	var regulars = /^[\u4e00-\u9fa5]{2,4}$/;
	return this.optional( element ) || (regulars.test( value ));
}, "中文" );
$.validator.addMethod( "jeff_dec", function( value, element ) {
	return this.optional( element ) || /^[\u4E00-\u9FA5A-Za-z0-9]{0,200}$/.test( value );
}, "请输入200个字切非空不带任何符号的字" );

$.validator.addMethod( "email", function( value, element ) {
	return this.optional( element ) || /^[a-zA-Z0-9_-]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/.test( value );
}, "请输入正确的邮箱地址" );

$.validator.addMethod( "mobileNo", function( value, element ) {
	return this.optional( element ) || /^1[34578]\d{9}$/.test( value );
}, "请输入正确的手机号码" );