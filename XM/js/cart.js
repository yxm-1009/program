$.fn.extend({
	// 动态创建
	getlocal: function(mainNull, mainGoods, GoodsList, goodSum, totalPrice) {
		let localData = JSON.parse(localStorage.getItem('data'));
		creatItem();

		function creatItem() {
			if (localStorage.getItem('data') != null) {
				mainNull.hide();
				mainGoods.show();
				for (let i = 0, j = 0; i < localData.length; i++) {
					// console.log(localData[i].TtemId);
					let frame =
						`<ul class="item_box">
							<li class='TitItem ChooseItem'><span class="choose"></span></li>
							<li class='TitItem imgItem'><a href="#"><img src="${localData[i].imgSrc}" alt=""></a></li>
							<li class='TitItem goodsItem'><span class="tit"> ${localData[i].ItemTit}&nbsp;&nbsp;${localData[i].ItemColor}</span></li>
							<li class='TitItem priceItem'><p><span class="price">${localData[i].TtemPrice}</span>元</p></li>
							<li class='TitItem numItem'>
								<div class="btnBox">
									<button>-</button>
									<span class="count">${localData[i].num}</span>
									<button>+</button>
								</div>
							</li>
							<li class='TitItem totleItem'><p class="totle"><span class="balace">${localData[i].totalPrice}</span>元</p></li>
							<li class='TitItem DelItem'><span class="del">×</span><span class="ids" style="display:none">${localData[i].TtemId}</span></li>
						</ul>`;
					GoodsList.append(frame);
					j += Number(localData[i].totalPrice);
					totalPrice.html(j);
				}
				OperateBtn();
			} else {
				mainGoods.hide();
				mainNull.show();
			}
		}
		// // 操作按钮
		function OperateBtn() {
			let arrItemUls = $(".item_box");
			for (let i = 0; i < arrItemUls.length; i++) {
				let index = $(this).index();
				// 减少货物的操作
				let reduce = arrItemUls.eq(i).children('.numItem').children('.btnBox').children('button').eq(0);
				reduce.eq(index).click(function() {
					ReduceGoods($(this));
					/* DelBtn($(this)); */
				});
				// 增加货物的操作
				let add = arrItemUls.eq(i).children('.numItem').children('.btnBox').children('button').eq(1);
				add.eq(index).click(function() {
					AddGoods($(this));
					// DelBtn($(this));
				});
			}
			DelBtn();
			goodsNum();
		}
		// changeLocal改变localstorage的值
		function changeLocal(num, addGoodsbtn) {
			let LoginIds = Number(addGoodsbtn.parent().parent().next().next().children('.ids').html()); //寻找商品ID
			let LoginIndex = addGoodsbtn.parent().parent().parent().index(); //localData的下标
			if (LoginIds === localData[LoginIndex].TtemId) {
				localData[LoginIndex].num = num;
				localData[LoginIndex].totalPrice = num * localData[LoginIndex].TtemPrice;
				// console.log(localData[LoginIndex]);
			}
			localStorage.setItem('data', JSON.stringify(localData));
		}
		// 增加货物
		function AddGoods(addGoodsbtn) {
			let num = Number(addGoodsbtn.prev().html());
			num++;
			addGoodsbtn.prev().html(num);
			goodsNum();
			numPrice(num, addGoodsbtn);
			sumprice();
			changeLocal(num, addGoodsbtn);
		};
		// 减少货物
		function ReduceGoods(reduceGoodsbtn) {
			let num = Number(reduceGoodsbtn.next().html());
			num--;
			if (num < 1) {
				reduceGoodsbtn.next().html(1);
				alert('该宝贝不能减少了呦~')
			} else {
				reduceGoodsbtn.next().html(num);
				goodsNum();
				numPrice(num, reduceGoodsbtn);
				sumprice();
				changeLocal(num, reduceGoodsbtn);
			}
		};
		// 计算商品数量
		function goodsNum() {
			let sum = 0;
			for (let i = 0; i < $(".count").length; i++) {
				sum += Number($(".count").eq(i).html());
			}
			goodSum.html(sum);

		};
		// 计算小计和
		function numPrice(num, btn) {
			let pri = Number(btn.parent().parent().prev().children('p').children('span').html()); //单价
			let sum = btn.parent().parent().next().children('p').children('span');
			let a = 0;
			sum.html(num * pri);
		};
		// 计算总计和
		function sumprice() {
			let sum = 0;
			for (let i = 0; i < $(".balace").length; i++) {
				sum += Number($(".balace").eq(i).html());
			}
			totalPrice.html(sum);
		};
		// 删除商品
		// function DelBtn(btn){
		// 	let del = btn.parent().next().next().children('span');
		// 	del.click(function(){
		// 		alert(1);
		// 	})
		// }
		function DelBtn() {
			$(".item_box").on('click', ".del", function() {
				// for (let i = 0; i < $(this).length; i++) {};
				if (!confirm('确认删除吗？')) {
					return false;
				} else {
					let LoginIds = Number($(this).parent().children('.ids').html()); //寻找商品ID
					let LoginIndex = $(this).parent().parent().index(); //localData的下标
					// for (let i = 0; i < localData.length; i++) {}
					if (LoginIds === localData[LoginIndex].TtemId) {
						localData.splice(LoginIndex, 1);
					}
					// 判断localstorage的值为空
					localStorage.setItem('data', JSON.stringify(localData));
					if (localStorage.getItem('data') == '[]') {
						mainGoods.hide();
						mainNull.show();
					}
					// 实时更新商品数量
					let j = 0;
					for (let i = 0; i < localData.length; i++) {
						j += Number(localData[i].num);
					}
					// $("#shop_num").html(j);
				}
				$(this).parent().parent().remove();
			});
		};

	}
});

