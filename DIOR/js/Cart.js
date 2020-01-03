$(function() {
	$.fn.extend({
		car: function(){
			let goodsData = JSON.parse(localStorage.getItem('data'));
			
			// let zongjizhi = goodsData[0].prices;
			// console.log(zongjizhi);
			$('#submit').click(function(){
				alert('下单成功!')
			})
			render();
			// render-------------------------
			function render(){
				// let goodsData = JSON.parse(localStorage.getItem('data'));
				let shopBox = $('.goods_cart').eq(0);//存放商品
				console.log(goodsData);
				let noGoods = $('.goodsmain_tit').eq(0);//空空如也
				if (goodsData == "") {//localstorage值为空
					noGoods.show();//空空如也显示
					shopBox.hide();//存放商品消失
				} else{
					shopBox.show();
					noGoods.hide();
					let goodsData = JSON.parse(localStorage.getItem('data'));
					let goodsInfo = $("<div></div>");
					goodsInfo.attr('class','goodsInfo');
					$('.box').prepend(goodsInfo);
					// console.log(goodsData[0].imgsrc);
					for (var i = 0; i < goodsData.length; i++) {
						goodsInfo.html(`
										<ul class="tr_row">
											<li>
												<p class="goods_Id">${goodsData[0].goodId}</p>
											</li>
											<li>
												<img src="${goodsData[0].imgsrc}" class="goodsImg">
											</li>
											<li>
												<div class="goodsTitle">
													<p class="goods_name">${goodsData[0].title}</p>
													<p class="goods_type">${goodsData[0].type}</p>
													<p class="goods_color">766 Passion</p>
													<br>
												</div>
											</li>
											<li>
												<div class="goodsbtn">
													<button class="goods_btn min">-</button>
													<span class="goods_nums">1</span>
													<button class="goods_btn max">+</button>
												</div>
											</li>
											<li>
												<span class="goods_price">${goodsData[0].totalPrice}</span>
											</li>
											<li>
												<input type="button" value="×" class="goods_del" />
											</li>
										</ul>
									`);
					}
					let zongjizhi = goodsData[0].prices;
					let sum = $("#goods_price_sum");
					sum.html(zongjizhi);
				}
				Del();
				
				bindEvent();
				// getTotalPrice();
				// getTotalNum();
			}
			// getXiaoji-----------------------------
			function getXiaojihe(btn,num){
				let zongjizhi = goodsData[0].prices;
				let zongjihe = num * zongjizhi;
				btn.parent().parent().next().children().html(zongjihe);
				let sum = $("#goods_price_sum");
				sum.html(zongjihe);
			}
				
			// addGoodsNum---------------------------
			function addGoodsNum(btn){
				let num = Number(btn.prev().text());
				num++;
				btn.prev().html(num);
				getXiaojihe(btn,num);
			}
			// reduceGoodsNum---------------------
			function reduceGoodsNum(btn){
				let num = Number(btn.next().text());
				num--;
				
				if (num < 1) {
					num = 1;
					alert('不能再减啦');
				} else{
					btn.next().html(num);
					getXiaojihe(btn,num);
				}
			}
			// Del------------------------------
			
			function Del(){
				let dele = $('.goods_del');
				for (let i = 0; i < dele.length; i++) {
					dele.eq(i).click(function(){
						dele.parent().parent().remove();
						let goodsid = goodsData[0].goodId;
						for (var i = 0; i < goodsData.length; i++) {
							// 根据删除的当前这条数的id和数据库进行比对
							console.log(goodsData[i].goodId);
							console.log(goodsid);
							if (goodsData[i].goodId == goodsid) { // 找到后
								// localStorage.removeItem();
								// window.localStorage.removeItem('key')
								goodsData.splice(i, 1); // 从整个localStorage数据中删除中条数据
							}
						}
						localStorage.setItem('data', JSON.stringify(goodsData));
					})
				};
			}
			// -----------------------------------------
			
			function bindEvent(){
				let addBtn = $(".max");
				for (let i = 0; i < addBtn.length; i++) {
					addBtn.eq(i).click(function(){
						addGoodsNum($(this));
						// Del($(this));
					})
				}
				let reduceBtn = $(".min");
				for (let i = 0; i < reduceBtn.length; i++) {
					reduceBtn.eq(i).click(function(){
						reduceGoodsNum($(this));
						// Del($(this));
					})
				}
				
			}
		}
	});

});
