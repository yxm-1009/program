$.fn.extend({
	// 动态创建
	Automatic: function(){
		let box = $(this);
		// console.log(box);
		// $.getJSON(url,[data],success(data,textstatus,jqXHR))
		$.getJSON('../XM/js/goods.json').done(function(message){
			console.log(message.All);
			fun(message.All);
		}).fail(function(fail){
			alert('请求失败');
		});
		// 对接收到的数据进行处理
		function fun(all){
			console.log(all)
			// for (let i = 0; i < all.length; i++) {
			// 	console.log(all[i].imgsrc);
			// 	console.log(all[i].name);
			// 	console.log(all[i].desc);
			// 	console.log(all[i].price);
			// 	console.log(all[i].color);
			// }
			all.forEach((v,i)=>{
				let Item = 
				`<ul class="goods_item">
					<li class="goodsBigImg"><img src="${v.imgsrc}" alt="${v.desc}"></li>
					<li class="goodsTit"><span>${v.name}</span></li>
					<li class="goodsPrice"><span>${v.price}</span>元</li>
					<li class="goodsSmallImg"><img src="${v.imgsrc}" alt="${v.color}"><span style='display:none;'>${v.model}</span></li>
					<li class="goodsId" style='display:none;'><span>${i}</span></li>
				</ul>`;
				box.append(Item)
			})
		}
	},
	Purchased: function(){
		// 防止数据的更新
		let arr = [];
		let localMain = JSON.parse(localStorage.getItem('data'));
		arr = arr.concat(localMain);
		if (arr[0] == null) {
			arr = [];
		}
		console.log(arr);
		let TtemPrice = Number($(this).children('li').eq(2).children('span').html());
		let TtemId = Number($(this).children('li').eq(4).children('span').html());
		console.log(TtemPrice,TtemId);
		let ListItem = {
			"imgSrc": $(this).children('li').eq(0).children('img').attr("src"),
			"ItemTit": $(this).children('li').eq(1).children('span').html(),
			"TtemDesc": $(this).children('li').eq(0).children('img').attr("alt"),
			"TtemPrice": TtemPrice,
			"TtemId": TtemId,
			"ItemColor": $(this).children('li').eq(3).children('img').attr("alt"),
			"ItemModel":$(this).children('li').eq(3).children('span').html()
			// "totalPrice": TtemPrice,
			// "num": 1
		};
		// console.log(ListItem);
		// 进行物品确认，id相同增加数量
		let flag = false;
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].TtemId == TtemId) {
				arr[i].num++;
				arr[i].totalPrice = arr[i].TtemPrice * arr[i].num;
				flag = true;
			}
		}
		// id不同进行跳转
		if (flag == false) {
			arr.push(ListItem);
		}
		sessionStorage.setItem('data', JSON.stringify(arr));
		$(location).attr('href', 'LoadMoreGoodsDemo.html');
	}
})