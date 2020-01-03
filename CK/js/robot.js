$(function(){
	$.fn.extend({
		robot: function(oTextArea, oRobotMain, oButtonSend, oButtonClose) {
			// $(this).show();
			let isClick = false;
			$(document).keydown(function(event){
				if (event.keyCode == 13) {//回车键的键值为13
					sh();
				　}
			});
			oButtonSend.click(function(){
				sh();
			})
			function sh() {
				let oTextAreaVal = oTextArea.val();
				if (oTextAreaVal == '') {
					return;
				} else {
					oTextArea.keydown(function(event){
						oButtonSend.css({
							backgroundColor: "black",
							color: "white"
						})
					})
					let right = $(
						`<div class="robotRight">
									<img src="img/2f9d0cfa731c46bfa3c32540502e81bc.jpg" >
									<i></i>
									<span>${oTextAreaVal}</span>
								</div>`
					);
					oRobotMain.append(right);
					// oRobotMain.scrollTop (oRobotMain[0].scrollHeight);//父元素.scrolltop
					oRobotMain.animate({scrollTop: oRobotMain[0].scrollHeight}, 200);
					$.ajax({
						url: '../CK/js/robot.php',//注意：没有在html文件中写的话，是以此路径找到php文件
						type: 'get',
						data: {
							"text": oTextAreaVal
						},
						dataType: 'json',
						success: function(str) {
							let newStr = str.content;
							let left = $(
								`<div class="robotLeft">
								<img src="img/86e3d62d7b374d46a2988fa44f8507db.jpg">
								<i></i>
								<span>${newStr}</span>
								</div>`
							);
							oRobotMain.append(left);
							oRobotMain.animate({scrollTop: oRobotMain[0].scrollHeight}, 200);
						}
					});
					oTextArea.val("");
				}
			};
			oButtonClose.click(function() {
				$("html").add("body").css({
					"overflow": "auto"
				})
				$('#robot').hide();
			})
		}
	})
})