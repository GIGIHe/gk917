// JavaScript Document
$(function(){
	//倒计时函数
	function runcount(t){
		 if(t>0){
			 document.getElementById('daojishi').innerHTML=t+'S';
			 t--;
			 setTimeout(function(){
			 runcount(t)
		 },1000)
		 $('#getyzm').hide()
		 $('#daojishi').show();
		 }else{
		   $('#getyzm').show();
		   $('#daojishi').hide();
		 }
	 }
	 // 利用注册登录功能实现
	$('#dosubmit').click(function(){
		var info = {};
		info.name=$('#name').val()
		info.tel=$('#tel').val()
		info.yzm=$('#yzm').val()
		if(info.tel == '') { //验证手机号是否为空
			alert('请填写手机号');
			return false;
		}
		var reg = /^0?1[3465789]\d{9}$/; //手机号正则
		if(!reg.test(info.tel)) { //验证手机号是否正确
			alert('请填写正确的手机号!');
			return false;
		}
		$.ajax({
			url:"http://bj.offcn.com/index.php?m=formguide&c=forms&a=show&formid=344&action=jsonp&siteid=1&verify=true",
			data: {info},
			dataType:"jsonp",
			type:"GET",
			success:function(json){
				if(json.status == 1){
					// crm调用导入crm
					// $.get("http://dc.offcn.com:8100/a.gif", {sid:'85e36c58b475c3910c80815e3fed41a9', mobile:info.tel, name:info.name})
					alert("预约成功");
					$('#getyzm').show();
					$('#daojishi').hide();
				}else if(json.status==-2){
					alert("验证码错误");
					$('#getyzm').show();
					$('#daojishi').hide();
				}
			}
		})
	});
	// 发送验证码
	$("#getyzm").click(function(event) {
		var phone = $("#tel").val();
			$.ajax({
			  url: 'http://bj.offcn.com/index.php?m=formguide&c=forms&a=send_sms&formid=344&siteid=1',
			  type: 'GET',
			  dataType: 'jsonp',
			  data: {phone: phone},
			  success: function(json) {
				if (json.status == 1) {
					// $('#daojishi').css('display','inline-block')
					// $('#getyzm').css('display','none')
					$('#daojishi').show()
					$('#getyzm').hide()
					runcount(60)
					alert('发送成功')
				}  else {
					alert(json.msg);

				}
			}
		})
	})
})






