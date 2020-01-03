<?php
	header('content-type:text/html;charset=utf-8');
	
	// 获取前端数据
	$tel = $_POST['tel'];
	
	// echo $surname;
	
	// 连接到数据库
	$conn = mysql_connect('localhost','root','root');
	// 连接到表
	mysql_select_db('login');
	// 进行查询
	$request = mysql_query("select * from register where stu_tel = '$tel'",$conn);
	// 进行判断,确定重名,查找,没有,添加
	if (mysql_num_rows($request) == 1){//可以查找到此行
			echo '1';//返回1,可以查找到重名
		} else{
			echo '0';//没有此数据,返回0
		}
	mysql_close($conn);
?>