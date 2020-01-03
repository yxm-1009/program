<?php
	header("Content-type:text/html;charset=utf-8");
	$text = $_GET['text'];
	$opts = array('http' => array('header' => "User-Agent:MyAgent/1.0\r\n"));
	$context = stream_context_create($opts);
	$result = file_get_contents("http://api.qingyunke.com/api.php?key=free&appid=0&msg=".$text,false,$context);
	echo $result;
?>