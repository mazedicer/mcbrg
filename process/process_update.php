<?php
include_once '../classes/Update.php';
if( isset( $_POST[ 'login' ] ) && isset( $_POST[ 'password' ] ) ){
	$update = new Update();
	$login = 'yourlogin';
	$password = 'yourpassword';
	if( strcmp( $login, $_POST[ 'login' ] ) == 0 && strcmp( $password, $_POST[ 'password' ] ) == 0 ){
		$result = $update->getMain();
	}else{
		$result = "badlogin";
	}
	echo $result;
}
if( isset( $_POST[ 'sold' ] ) && isset( $_POST[ 'guns' ] ) ){
	if( file_put_contents( "sold.json", $_POST[ 'sold' ] ) > 0 ) {
		$result = "ok sold";
	}else{
		$result = "saveError Sold";
	}
	if( file_put_contents( "guns.json", $_POST[ 'guns' ] ) > 0 ) {
		$result .= " ok guns";
	}else{
		$result .= " saveError Guns";
	}
	echo $result;
}
