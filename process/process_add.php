<?php
if( isset( $_POST[ 'login' ] ) && isset( $_POST[ 'password' ] ) ){
	$login = 'yourloginname';
	$password = 'yourpassword';
	$result = "<div id=\"product_add\"></div>";
	if( strcmp( $login, $_POST[ 'login' ] ) !== 0 && strcmp( $password, $_POST[ 'password' ] ) !== 0 ){
		$result = "badlogin";
	}
	echo $result;
}
if( isset( $_POST[ 'guns' ] ) ){
	$guns = str_replace( "\\", "", $_POST[ 'guns' ] );
	if( file_put_contents( "guns.json", $guns ) > 0 ) {
		$result .= " ok guns";
	}else{
		$result .= " saveError Guns";
	}
	echo $result;
}
