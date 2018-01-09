<?php
	$response			= (object) null;
	$response->time		= time();
	$response->error	= false;
	header('Content-Type: text/plain; charset=x-user-defined');
	error_reporting(E_ALL);
	ini_set('display_errors', 'On');
	set_time_limit(0);
	
	if(!isset($_POST['action']) || !isset($_POST['hostname']) || !isset($_POST['port']) || !isset($_POST['username']) || !isset($_POST['password']) || !isset($_POST['database'])) {
		$response->error	= true;
		$response->message	= 'Invalid Parameter';
		print json_encode($response);
		exit();
	}
	
	try {
		$connection = new PDO(sprintf('mysql:host=%s;port=%d;dbname=%s', $_POST['hostname'], $_POST['port'], $_POST['database']), $_POST['username'], $_POST['password'], [
			PDO::MYSQL_ATTR_INIT_COMMAND	=> 'SET NAMES utf8',
			PDO::ATTR_ERRMODE				=> PDO::ERRMODE_EXCEPTION
		]);
	} catch(PDOException $e) {
		$response->error	= true;
		$response->message	= $e->getMessage();
		print json_encode($response);
		exit();
	}
	
	switch($_POST['action']) {
		case 'query':
			try {
				$stmt = $connection->prepare($_POST['query']);
				$stmt->execute();
				$response->response	= $stmt->fetchAll(PDO::FETCH_OBJ);
			} catch(PDOException $e) {
				$response->error	= true;
				$response->response	= $e;
			}
		break;
	}
	
	print json_encode($response);
?>
