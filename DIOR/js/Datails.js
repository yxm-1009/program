$(function(){
	$.fn.extend({
		Magnifier: function(s,m,b){
			s.mouseover(function(){
				m.show();
				b.show();
			});
			s.mouseout(function(){
				m.hide();
				b.hide();
			});
			s.mousemove(function(event){
				let left = event.pageX - s.offset().left - m[0].offsetWidth/2;
				let top = event.pageY - s.offset().top - m[0].offsetHeight/2;
				if(left < 0){
					left = 0;
				}
				
				let maxLeft = s[0].offsetWidth - m[0].offsetWidth;
				
				if(left > maxLeft){
					left = maxLeft;
				}
				
				if(top < 0){
					top = 0;
				}
				
				let maxTop = s[0].offsetHeight - m[0].offsetHeight;
				
				if(top > maxTop){
					top = maxTop;
				}
				
				let x = left * b[0].offsetWidth/m[0].offsetWidth;
				let y = top * b[0].offsetHeight/m[0].offsetHeight;
				
				m.css({
					left: left + 'px',
					top: top + 'px'
				});
				b.css({
					backgroundPositionX: -x+'px',
					backgroundPositionY: -y+'px'
				})
			})
		},
		addgoods: function(){
			let by = $(this).eq(0);
			by.click(function(){
				let flag = false;
				let src = $('#src').eq(0).attr('src');
				let tit = $('.Tit_cont').eq(0).text();
				let price = $('#price').eq(0).text();
				let type = '口红';
				let goodId = 1;
				let obj = {
					"goodId": goodId,
					"imgsrc": src,
					"title": tit,
					"totalPrice": price, // 总价
					"prices": price,
					"type": type,
					"num": 1
				};
				for (let i = 0; i < saveArr.length; i++) {
					if (saveArr[x].goodId == goodId) { // 当前点击的按钮对应的id是否存在于数组中
						saveArr[x].num++; // 存在则修改数量
						// 修改总价
						saveArr[x].totalPrice = saveArr[x].price * saveArr[x].num;
						flag = true; // 有重复的标记置为true
					}
				}
				if (flag == false) {
					saveArr.push(obj);
				}
				localStorage.setItem('data', JSON.stringify(saveArr));
				alert('加入购物车成功');
			});
		}
	});
	
})