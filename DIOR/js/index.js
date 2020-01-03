$(function() {
	$.fn.extend({
		// 滚动条事件  封装
		top: function(top,height) {
			top.hide(); //首先将#btn隐藏
			//当滚动条的位置处于距顶部50像素以下时，跳转链接出现，否则消失
			$(window).scroll(function() {
				if ($(window).scrollTop() > height) {
					top.fadeIn(200);
				} else {
					top.fadeOut(200);
				}
			});
			//当点击跳转链接后，回到页面顶部位置
			top.click(function() {
				$('body,html').animate({
					scrollTop: 0
				}, 500);
				return false;
			});
		},
		// 搜索框事件
		focusSS: function() {
			$('#head_Left_Main').css({
				border: '2px solid #757575'
			});
		},
		blurSS: function() {
			$('#head_Left_Main').css({
				border: '1px solid #757575'
			});
		},
		changeSS: function() {
			if ($(this).val() == '') {
				$('#Left_Main_btn img').attr('src', 'img/a_1.png');
				$('#Left_Main_btn').css({
					backgroundColor: 'transparent'
				});
			} else if ($(this).val() != '') {
				$('#Left_Main_btn img').attr('src', 'img/a_12.png');
				$('#Left_Main_btn').css({
					backgroundColor: 'black'
				});
			}
		},
		// 遮罩层事件
		popPlugin: function() {
			$('html,body').css({'overflow': 'hidden'});
			$('#boxShadw').css({
				display: 'block'
			});
		},
		popClose: function() {
			$('html,body').css({'overflow': 'auto'});
			$(this).css({
				display: 'none'
			});
		},
		admin: function(){
			$('.admin').eq(0).show().siblings('.admin').hide();
			
			$('.SHMainCenterTit').click(function(){
				let index = $(this).index();
				$('.admin').eq(index).show().siblings('.admin').hide();
			})
			$('.gogogo').click(function(){
				let tel = localStorage.getItem('tel');
				if (tel != null) {
					$(".gogogo").attr('href', 'Cart.html');
				} else{
					alert("请登录");
					$(".gogogo").attr('href', 'Login.html');
				}
				
			})
		},
		// 下拉菜单上的事件
		ad: function(list, show, add) {
			list.mouseover(function() {
				$(add).show();
				show.hide();
				show.eq($(this).index()).show();
			});
			list.mouseleave(function() {
				show.hide();
			});
			show.mouseover(function() {
				$(this).show();
			});
			show.mouseleave(function() {
				$(this).hide();
			});

		},
		add: function(list, show, add) {
			list.mouseover(function() {
				$(add).show();
			});
			list.mouseout(function() {
				$(add).hide();
			});
			show.mouseover(function() {
				$(this).show();
			});
			show.mouseleave(function() {
				$(this).hide();
			});
		},
		// 轮播图
		slide: function() {
			let slideEle = $(this);

			let slideContent = slideEle.find('.slide-content');
			let slideNavLi = slideEle.find('.slide-nav li');
			let slideWidth = slideEle.width(); //显示窗口宽度
			let timer = null; //定时器
			let time = 3000; //轮播图切换事件(毫秒)
			let index = 0; //当前索引值
			let oldLength = slideEle.find('.slide-item').length; //item初始长度
			let length = oldLength * 2; //item复制后的长度 

			init();

			//初始化
			function init() {
				//将item复制一份加入到原item的后面，形成:原1、原2、原3、原4、...原末、复1、复2、复3、复4...复末,并定位到复1项
				index = oldLength;
				slideContent.append(slideContent.html()).css({
					width: slideWidth * length,
					left: -slideWidth * index
				});

				//鼠标悬浮事件
				slideEle.hover(function() { //移除定时任务
					clearInterval(timer);
				}, function() { //添加定时任务    
					setTimer();
				});

				//按钮点击事件
				slideEle.find('.prev').click(function() {
						if (!slideContent.is(':animated')) {
							index--;
							change();
						}

					}).end()
					.find('.next').click(function() {
						if (!slideContent.is(':animated')) {
							index++;
							change();
						}
					});

				//导航点点击事件委托
				slideNavLi.click(function(event) {
					index = $(event.target).index() + oldLength;
					change();
				});

				setTimer();
			}
			//设置定时器
			function setTimer() {
				timer = setInterval(function() {
					index++;
					change();
				}, time);
			}

			function change() {
				changeSlide();
				changeNav();
			}

			//轮播图切换
			function changeSlide() {
				slideContent.animate({
					left: -slideWidth * index
				}, 500, function() {
					//原1、原2、原3、原4、...原末、复1、复2、复3、复4...复末
					if (index <= 0) {
						//当定位到原1时，在回调函数中将slideContent瞬间定位到复1
						index = oldLength;
						slideContent.css({
							left: -slideWidth * index
						});

					}
					if (index >= length - 1) {
						//当定位到复末时，在回调中将slideContent瞬间定位到原末
						index = oldLength - 1;
						slideContent.css({
							left: -slideWidth * index
						});
					}
				});
			}
			//导航点切换
			function changeNav() {
				slideNavLi.removeClass('active').eq(index % oldLength).addClass('active');
			}

		},

		fade: function() {
			// 初始化盒子
			$('.banner2Img').eq(0).show().siblings('.banner2Img').hide();
			// 初始化小圆点
			$('.dou_list').eq(0).css({backgroundColor: '#757575'})
				.siblings('.dou_list').css({
					backgroundColor: '#000'
				});
			let len = $('.dou_list').length;
			let index = 0;
			let time = 2000;
			let timer;
			// 定时器
			showTime();
			// 盒子之间的相互转换
			function showTime() {
				timer = setInterval(function() {
					index++;
					if (index > len - 1) {
						index = 0
					}
					show();
				}, time);
			};
			// 动画效果
			function show() {
				$('.banner2Img').eq(index).fadeIn()
					.siblings('.banner2Img').fadeOut();
				$('.dou_list').eq(index).css({
						backgroundColor: '#757575'
					})
					.siblings('.dou_list').css({
						backgroundColor: '#000'
					});
			};
			$('.banner2Img').mouseover(function() {
				index = $(this).index();
				show();
				clearInterval(timer);
			});
			$('.banner2Img').mouseout(function() {
				showTime();
			});
			$('.dou_list').click(function() {
				index = $(this).index();
				show();
				$('.banner2Img').eq(index).show().siblings('.banner2Img').hide();
			});
			$('.fadeprev').click(function() {
				clearInterval(timer);
				index--;
				if (index > 4) {
					index = 0;
				}
				show();
				showTime();
			});
			$('.fadenext').click(function() {
				clearInterval(timer);
				index++;
				if (index > len - 1) {
					index = 0;
				}
				show();
				showTime();
			})
		}
	});
});
