<?php
	header('content-type:text/html;charset=utf-8');
	$tel = $_POST['tel'];
	// 创建连接对象
	$conn = mysql_connect("localhost","root","root");
	// 连接到表
	mysql_select_db('xmpro');
	// // 进行查询
	$request = mysql_query("select * from register where tel = '$tel'",$conn);
	// 进行添加
	if (mysql_num_rows($request) > 0){
		echo '1';
	} else{
		echo '0';
	}
	mysql_close($conn);
?>