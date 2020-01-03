$(function(){
	$.fn.extend({
		top: function() {
			$("#body_top_btn").hide();
			$(window).scroll(function() {
				if ($(window).scrollTop() > 200) {
					// alert(1);
					$("#body_top_btn").fadeIn();
				} else {
					$("#body_top_btn").fadeOut();
				}
			});
			$("#body_top_btn").click(function() {
				$('body,html').animate({
					scrollTop: 0
				}, 500);
				return false;
			});
		},
		inSS: function() {
			let flag = false;
			$('#ss').click(function() {
				if (flag == false) {
					$(".inputss").show();
					flag = true;
				} else {
					$(".inputss").hide();
					flag = false;
				}
			})
			$(".inputss").click(function() {
				$(this).css({
					borderColor: '#333'
				})
			})
	
		},
	
		sub_mouse: function(nav_list, menu_list) {
			nav_list.mouseover(function() {
				menu_list.eq($(this).index()).show().siblings().hide();
			});
			nav_list.mouseout(function() {
				menu_list.hide();
			});
			menu_list.mouseover(function() {
				$(this).show();
			});
			menu_list.mouseleave(function() {
				$(this).hide();
			});
		},
		slide: function() {
			let slice = $(this);
			let index = 1;
			let time = null;
			let outWidth = $('.sliceItem').width(); // 外层盒子(可视窗口)的宽度
			let sliceItem = $('.sliceItem').length; // 得到所有的移动的内层盒子的个数
			let sliceBox = $('.sliceBox'); // 得到移动的外层盒子
			let doudou = $('.dou'); //得到包含所有豆豆的数组
	
			autoPlay();
			// 定时器,实现图片自动播放
			function autoPlay() {
				time = setInterval(function() {
					index++;
					changeSlide();
					changDoudou();
				}, 3000);
			}
			// 图片切换
			function changeSlide() {
				sliceBox.animate({
					left: -1 * outWidth * index + 'px'
				}, 1000);
				if (index >= sliceItem - 1) {
					sliceBox.animate({
						left: -outWidth + 'px'
					}, 0)
					index = 1;
				}
				if (index < 1) {
					sliceBox.animate({
						left: -(sliceItem - 2) * outWidth + 'px'
					}, 0);
					index = sliceItem - 2;
				}
			}
			// 小圆点切换
			function changDoudou() {
				doudou.eq(index - 1).css({
						backgroundColor: 'red'
					})
					.siblings().css({
						backgroundColor: '#ccc'
					});
			}
			// 点击小圆点,切换图
			doudou.click(function(event) {
				let target = event.target;
				index = $(target).index() + 1;
				changeSlide();
				changDoudou();
			})
			// 划过时清除定时器 $(element).hover(over，out);
			slice.hover(function() {
				$('.btn').show();
				clearInterval(time);
			}, function() {
				$('.btn').hide();
				autoPlay();
			});
			// 点击next使得index++,递增
			$('.next').click(function() {
				clearInterval(time);
				index++;
				changeSlide();
				changDoudou();
			})
			// 点击prev使得index--,递减
			$('.prev').click(function() {
				clearInterval(time);
				index--;
				changeSlide();
				changDoudou();
			});
	
		}
	});
})