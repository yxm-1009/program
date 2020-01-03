$.fn.extend({
	// 顶部的购物车划过事件，传入的参数放购物车的父元素，对父元素进行操作
	TopNavShop: function(hideEle){
		let sessData = JSON.parse(sessionStorage.getItem('admin'));
		if (sessData != null) {
			console.log(sessData);
			$('.verify').html(sessData);
		}
		$(this).hover(function(){
			$(this).css({backgroundColor: '#fff',zIndex: 2});
			$(this).children('img').attr('src','img/index/shopC.jpg');
			$(this).children('span').css({color: "#ff6700"});
			hideEle.show();
		},function(){
			$(this).css({backgroundColor: '#424242',zIndex: 0});
			$(this).children('img').attr('src','img/index/shopN.jpg');
			$(this).children('span').css({color: "#B0B0B0"});
			hideEle.hide();
		});
		hideEle.mouseover(function() {
			$(".TopMainRightShop").css({backgroundColor: '#fff',zIndex: 2});
			$(".TopMainRightShop").children('img').attr('src','img/index/shopC.jpg');
			$(".TopMainRightShop").children('span').css({color: "#ff6700"});
			$(this).show();
		});
		hideEle.mouseleave(function() {
			$(".TopMainRightShop").css({backgroundColor: '#424242',zIndex: 0});
			$(".TopMainRightShop").children('img').attr('src','img/index/shopN.jpg');
			$(".TopMainRightShop").children('span').css({color: "#B0B0B0"});
			$(this).hide();
		});
		// 当localstorage中吗没有数据的时候，显示状态
		if ($('.verify').html() != '登录') {
			if (localStorage.getItem('data') == null) {
				setTimeout(function(){
					$('.shopHideGif').empty();
					let nullM = `<span class='nullM'>购物车中还没有商品，赶紧选购吧！</span>`;
					$('.shopHideGif').html(nullM);
					$('.nullM').css({color:"#333",lineHeight: '56px'})
				},2000);
				// console.log(1);
			} else{
				setTimeout(function(){
					$('.shopHideGif').empty();
					$('.shopHideCount').show();
					let local = JSON.parse(localStorage.getItem('data'));
					console.log(local);
					local.forEach((v,i)=>{
						console.log(v.ItemColor);
						let nullM =
						`<ul class="ShopHideItem">
							<li><a href=""><img src="${v.imgSrc}" class="imgs" ></a></li>
							<li><span class="tit">${v.ItemTit}</span></li>
							<li class="PriceCount"><span class="price">￥${v.TtemPrice}</span>×<i class="num">${v.num}</i></li>
						</ul>`;
						$('.shopHideCount').append(nullM);
					})
				},2000);
			}
		} else{
			setTimeout(function(){
				$('.shopHideGif').empty();
				let nullM = `<span class='nullM'>用户请先登录！</span>`;
				$('.shopHideGif').html(nullM);
				$('.nullM').css({color:"#333",lineHeight: '56px'})
			},2000);
		}
		$(".TopMainRightShop").click(function(){
			if ($('.verify').html() != '登录') {
				$(location).attr('href','cart.html');
			} else{
				if (!confirm('去登录？')) {
					return false;
				} else {
					$(location).attr('href','login.html');
				}
			}
				
		})
	},
	// 下滑的二级菜单，由上到下逐渐显示
	HeaderNavShow: function(navShow,showItem){
		let lis = $(this).children('ul').find('.boxNava');
		lis.mouseover(function() {
			$('.navListBox').css({borderTop: '1px solid #e0e0e0'});
			navShow.stop().slideDown(300);
		});
		navShow.mouseover(function() {
			$('.headerMain').css({borderTop: '1px solid #e0e0e0'});
			navShow.stop().slideDown(300);
		});
		navShow.mouseout(function() {
			$('.headerMain').css({borderTop: 0});
			navShow.stop().slideUp(300);
		});
		lis.mouseout(function() {
			$('.headerMain').css({borderTop: 0});
			navShow.stop().slideUp(300);
		});
	},
	// logo和home的切换
	logoAndso: function(logo,soso){
		logo.mouseover(function(){
			$('.home').show().animate({left:'0px'},100);
		});
		$('.home').mouseout(function(){
			$('.home').hide().animate({left:'-10px'},100);
		});
		soso.focus(function(){
			$('.hotword').fadeOut();
			soso.css({border: '1px solid #ff6700',borderRight: 'none'});
			$(".SearchBtn").css({border: '1px solid #ff6700'})
		});
		soso.blur(function(){
			$('.hotword').fadeIn();
			soso.css({border: '1px solid #e0e0e0',borderRight: 'none'});
			$(".SearchBtn").css({border: '1px solid #e0e0e0'});
		});
	},
	// 侧边栏
	aslide: function(hov,aslide,top){
		top.hide(); 
		let hovBox = hov.find('a');
		let img = aslide.find('img');
		let aBox = aslide.find('a');
		let imgBoxOld = [
			"img/index/98a23aae70f25798192693f21c4d4039.png",
			"img/index/55cad219421bee03a801775e7309b920.png",
			"img/index/12eb0965ab33dc8e05870911b90f3f13.png",
			"img/index/4f036ae4d45002b2a6fb6756cedebf02.png",
			"img/index/d7db56d1d850113f016c95e289e36efa.png",
			'img/index/totop.png'
		];
		let imgBoxNew = [
			'img/index/74c4fcb4475af8308e9a670db9c01fdf.png',
			'img/index/41f858550f42eb1770b97faf219ae215.png',
			'img/index/95fbf0081a06eec7be4d35e277faeca0.png',
			'img/index/5e9f2b1b0da09ac3b3961378284ef2d4.png',
			'img/index/692a6c3b0a93a24f74a29c0f9d68ec71.png',
			'img/index/totop_hover.png',
		];
		aBox.hover(function(){
			let index = $(this).index();
			img.eq(index).attr('src',imgBoxNew[index]);
			hovBox.eq(index).show();
		},function(){
			// def();
			let index = $(this).index();
			img.eq(index).attr('src',imgBoxOld[index]);
			hovBox.eq(index).hide();
		});
		
		//当滚动条的位置处于距顶部50像素以下时，跳转链接出现，否则消失
		$(window).scroll(function() {
			if ($(window).scrollTop() > 200) {
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

});