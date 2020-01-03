$.fn.extend({
	// 接收数据并且对数据进行更改
	Receive: function(){
		let data =  JSON.parse(sessionStorage.getItem('data'));
		// console.log(data);
		// 接收到的数据
		// console.log(data[0].ItemTit);
		// console.log(data[0].ItemModel);
		// console.log(data[0].TtemDesc);
		// console.log(data[0].imgSrc);
		// console.log(data[0].TtemPrice);
		// console.log(data[0].ItemColor);
		// console.log(data[0].TtemId);
		data.forEach((v,i)=>{
			$('.GoodsName').html(v.ItemTit);
			$('.Conttit .GoodsID').html(v.TtemId);
			$('.Conttit h2').html(v.ItemTit);
			$('.Conttit .sale_desc span').html(v.ItemModel);
			$('.Conttit .J_proPrice i').html(v.TtemPrice);
			$('.Conttit .sale_desc i').html(v.TtemDesc);
			$('.step img').attr("src",v.imgSrc);
			$('.step span').html(v.ItemColor);
			$('.img1 img').attr("src",v.imgSrc);
			$(".totlePrice").children('i').html(v.TtemPrice);
			$('.typeAndPrice').find('i').html(v.TtemPrice);
			$('.typeAndPrice').children('p').eq(0).children('span').eq(0).html(v.ItemTit);
			$('.typeAndPrice').children('p').eq(0).children('span').eq(1).html(v.ItemColor)
		})
	},
	
	// 点击加入购物车进行数据的传送
	Purchased: function(){
		let localMain = JSON.parse(localStorage.getItem('data'));
		let arr = [];
		arr = arr.concat(localMain);
		if (arr[0] == null) {
			arr = [];
		}
		// console.log(arr);
		
		// 找元素
		let TtemPrice = Number($('.J_proPrice').children('i').html());
		let TtemId = Number($('.Conttit .GoodsID').html());
		let ItemGoodsNew = {
			"imgSrc": $('.img1 img').attr('src'),
			"ItemTit": $(".Conttit h2").html(),
			"TtemPrice": TtemPrice,
			"TtemId": TtemId,
			"totalPrice": TtemPrice,
			"num": 1,
			"ItemColor": $('.step span').html()
		};
		
		// 判断是否存在此此商品的信息
		let flag = false;
		for (let i = 0; i < arr.length; i++) {
			if (arr[i].TtemId == TtemId) {
				arr[i].num++;
				arr[i].totalPrice = arr[i].TtemPrice * arr[i].num;
				flag = true;
			}
		}
		if (flag == false) {
			arr.push(ItemGoodsNew);
		}
		localStorage.setItem('data', JSON.stringify(arr));
		// console.log(ItemGoodsNew);
		alert('商品已加入购物车！');
		// $(location).attr('href', 'LoadMoreGoodsDemo.html');
	}
})