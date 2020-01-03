<?php
	header('content-type:text/html;charset=utf-8');
	
	// 获取前端数据
	$surname = $_POST['surname'];
	$name = $_POST['name'];
	$tel = $_POST['tel'];
	$pass = $_POST['pass'];
	
	// echo $surname;
	
	// 连接到数据库
	$conn = mysql_connect('localhost','root','root');
	// 连接到表
	mysql_select_db('login');
	// 进行查询
	
	// mysql_query("insert into register (stu_surname,stu_name,stu_tel,stu_pass) values('$surname','$name','$tel','$pass')",$conn);// 将这些数据传入数据库
	
	
	$request = mysql_query("select * from register where stu_surname = '$surname' and stu_name = '$name' and stu_tel = '$tel' and stu_pass = '$pass'",$conn);
	// 进行判断,确定重名,查找,没有,添加
	if (mysql_num_rows($request) == 1){//可以查找到此行
			echo '1';//返回1,可以查找到重名
		} else{
			mysql_query("insert into register (stu_surname,stu_name,stu_tel,stu_pass) values('$surname','$name','$tel','$pass')",$conn);// 将这些数据传入数据库
			echo '0';//没有此数据,返回0
		}
	mysql_close($conn);
?>