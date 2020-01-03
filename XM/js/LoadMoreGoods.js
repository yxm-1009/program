$.fn.extend({
	cell: function() {
		$(window).scroll(function() {
			// console.log($(window).scrollTop());
			if ($(window).scrollTop() > 100) {
				$('.SectionCeiling').addClass('box-active');
			} else {
				$('.SectionCeiling').removeClass('box-active');
			}
			let top = $(window).scrollTop() - 100;
			// console.log(top);
			if (top > 100 && top < 400) {
				$(".LeftImgBox").css({
					top: top + 'px'
				});
			} else if (top < 100) {
				$(".LeftImgBox").css({
					top: 0 + 'px'
				});
			}
		});
	},
	fadeBanner: function(ImgItem, douItem) {
		// 初始化
		ImgItem.eq(0).show().siblings(ImgItem).hide();
		douItem.eq(0).css({
			background: '#ccc'
		});
		let BannerBox = $('.imgBox');
		let leng = ImgItem.length;
		let timer = null;
		let time = 3000;
		let index = 0;
		autoplay();
		// 自动播放
		function autoplay() {
			timer = setInterval(function() {
				index++;
				if (index > leng - 1) {
					index = 0;
				}
				Anime();
			}, time);
		}
		// 动画
		function Anime() {
			ImgItem.eq(index).fadeIn().siblings(ImgItem).fadeOut();
			douItem.eq(index).css({
					background: '#a3a3a3'
				})
				.siblings(douItem).css({
					background: '#ccc'
				});
		}
		// 点击豆豆切换图片
		douItem.click(function() {
			clearInterval(timer);
			index = $(this).index();
			Anime();
			autoplay();
		});
		// 划过时清除定时器
		BannerBox.hover(function() {
			clearInterval(timer);
		}, function() {
			autoplay();
		});
	},
	// 点击哪个显示哪个
	choose: function(tit, img, big) {
		// console.log(tit);
		// console.log(img);
		let all = tit.children('span');
		// console.log(all)
		let a = img.parent();
		// console.log(a);
		tit.click(function() {
			let text = $(this).children('span');
			// 设置样式
			$(this).css({
				borderColor: '#FF6700'
			}).siblings(tit).css({
				borderColor: '#e0e0e0'
			});
			all.css({
				color: "#333"
			});
			text.css({
				borderColor: '#FF6700',
				color: "#FF6700"
			});
			// 改变图片
			let index = $(this).index();
			let newimg = tit.eq(index).children('img').attr('src');
			img.attr("src", newimg);
			// 给大盒子设置背景
			big.css({
				'background-image': 'url(' + newimg + ')'
			})
			a.css({
				'background-image': 'url(' + newimg + ')'
			})
		});
	},
	// 放大镜
	Magnifier: function(s, m, b) {
		s.mouseover(function() {
			m.show();
			b.show();
			// let bgi = $(this);
			// console.log(bgi)
			let newimg = $('.img1 img').attr('src');
			// console.log(newimg);
			b.css({
				'background-image': 'url(' + newimg + ')'
			})
		});

		s.mousemove(function(event) {
			let left = event.pageX - s.offset().left - m[0].offsetWidth / 2;
			let top = event.pageY - s.offset().top - m[0].offsetHeight / 2;
			if (left < 0) {
				left = 0;
			}

			let maxLeft = s[0].offsetWidth - m[0].offsetWidth;

			if (left > maxLeft) {
				left = maxLeft;
			}

			if (top < 0) {
				top = 0;
			}

			let maxTop = s[0].offsetHeight - m[0].offsetHeight;

			if (top > maxTop) {
				top = maxTop;
			}

			let x = left * b[0].offsetWidth / m[0].offsetWidth;
			let y = top * b[0].offsetHeight / m[0].offsetHeight;

			m.css({
				left: left + 'px',
				top: top + 'px'
			});
			b.css({
				backgroundPositionX: -x + 'px',
				backgroundPositionY: -y + 'px'
			})
		})
		s.mouseout(function() {
			m.hide();
			b.hide();
		});
	}
	
})
