$.fn.extend({
	// banner的淡入淡出
	fadeBanner: function(ImgItem,douItem,btn){
		// 初始化
		ImgItem.eq(0).show().siblings(ImgItem).hide();
		douItem.eq(0).css({background: 'hsla(0,0%,100%,.4)','border-color': 'rgba(0,0,0,.4)'});
		let prev = btn.children('.bannerPrev');
		let next = btn.children('.bannerNext');
		let BannerBox = $('.banner');
		let leng = ImgItem.length;
		let timer = null;
		let time = 3000;
		let index = 0;
		autoplay();
		// 自动播放
		function autoplay(){
			timer = setInterval(function(){
				index++;
				if (index > leng-1) {
					index = 0;
				}
				Anime();
			},time);
		}
		// 动画
		function Anime(){
			ImgItem.eq(index).fadeIn(1000).siblings(ImgItem).fadeOut(1000);
			douItem.eq(index).css({background: 'hsla(0,0%,100%,.4)','border-color': 'rgba(0,0,0,.4)'})
			.siblings(douItem).css({'border-color': 'hsla(0, 0%, 100%, .3)',background: 'rgba(0, 0, 0, .4)'})
		}
		// 划过时换背景色
		prev.hover(function(){
			prev.css({
				backgroundColor: 'black',
				backgroundPosition: '0 50%',
				opacity: .6})
		},function(){
			prev.css({
				backgroundColor: "",
				backgroundPosition: '-84px 50%',
				backgroundRepeat: 'no-repeat'})
		});
		next.hover(function(){
			next.css({
				backgroundColor: 'black',
				backgroundPosition: '-42px 50%',
				opacity: .6})
		},function(){
			next.css({
				backgroundColor: "",
				backgroundPosition: '-125px 50%',
				backgroundRepeat: 'no-repeat'})
		})
		// 点击切换图片的按钮
		prev.click(function(){
			clearInterval(timer);
			index--;
			if (index < 0) {
				index = leng-1;
			}
			Anime();
			autoplay();
		});
		next.click(function(){
			clearInterval(timer);
			index++;
			if (index > leng-1) {
				index = 0;
			}
			Anime();
			autoplay();
		});
		// 点击豆豆切换图片
		douItem.click(function(){
			clearInterval(timer);
			index = $(this).index();
			Anime();
			autoplay();
		});
		// 划过时清除定时器
		BannerBox.hover(function(){
			clearInterval(timer);
		},function(){
			autoplay();
		});
		// BannerBox.mouseover(function(){
		// 	clearInterval(timer);
		// });
	},
	// banner二级菜单
	BannerNavShow: function(navShow,showItem){
		let lis = $(this).children('.DoodsBoxList').children('li');
		lis.mouseover(function() {
			navShow.show();
		});
		navShow.mouseover(function() {
			navShow.show();
		});
		navShow.mouseout(function() {
			navShow.hide();
		});
		lis.mouseout(function() {
			navShow.hide();
		});
	},
	// 传递数据
	createList: function(){
		let box = $(this);
		// $.getJSON( url [, data ] [, success(data, textStatus, jqXHR) ] )
		$.getJSON('../XM/js/goods.json').done(function(message){
			console.log(message.Sale);
			fun(message.Sale);
		}).fail(function(fail) {  //失败时的事件，这个失败是访问目标网址失败
			alert("路径有误");
		});
		// $.ajax({
		// 	url: '../XM/js/goods.json',
		// 	type: 'get',
		// 	success: function(str) {
		// 		console.log(str);
		// 	}
		// });
		function fun(sale){
			// for (let i = 0; i < 5; i++) {
			let List;
			sale.forEach((v,i)=>{
				List=
					`
						<li><a href="" class="thumb">
								<img src="${v.imgsrc}" alt="">
								<p class="thumbTit">${v.title}</p>
								<p class="thumbDesc">${v.model}</p>
								<p class="thumbPrice"><span>${v.price}</span>元 <del>${v.cost}</del></p>
							</a></li>`;
				box.append(List);
			})
			// }
		}
		
	},
	// 第二个轮播图
	slide: function() {
		let slice = $(this);
		let index = 0;
		let time = null;
		let outWidth = 992; // 外层盒子(可视窗口)的宽度
		let sliceBox = $('.one>ul'); // 得到移动的外层盒子
		
		autoPlay();
		// 定时器,实现图片自动播放
		function autoPlay() {
			time = setInterval(function() {
				index++;
				changeSlide();
			}, 3000);
		}
		// 图片切换
		function changeSlide() {
			if (index<=2) {
				sliceBox.animate({
					left: -1 * outWidth * index + 'px'
				}, 1000);
				
			}
			if (index == 3) {
				index == 0;
			}
		}
		// 划过时清除定时器 $(element).hover(over，out);
		slice.hover(function() {
			clearInterval(time);
		}, function() {
			autoPlay();
		});
		// 点击next使得index++,递增
		$('.swiper_next').click(function() {
			index++;
			changeSlide();
			if (index == -1) {
				index ==0;
			}else{
				changeSlide();
			}
		})
		// 点击prev使得index--,递减
		$('.swiper_prev').click(function() {
			clearInterval(time);
			index--;
			if (index == -1) {
				index ==0;
			}else{
				changeSlide();
			}
		});		
	},
	// 倒计时
	Countdown:function(){
		let kuang = $(this).children('span');
		console.log(kuang);
		let starttime = Date.parse(new Date('2020/1/14'))+14*60*60*1000; //8月1号15点
		setInterval(function () {
			var date = new Date();
			function totwo(v) {
				return v >= 10 ? v : "0" + v;
			}
			var time = starttime - date;
			var hour = parseInt(time / 1000 / 60 / 60 % 24);
			var minute = parseInt(time / 1000 / 60 % 60);
			var seconds = parseInt(time / 1000 % 60);
			kuang.eq(0).html(totwo(hour));
			kuang.eq(1).html(totwo(minute));
			kuang.eq(2).html(totwo(seconds));
		}, 1000);
		console.log(starttime);
	},	
});