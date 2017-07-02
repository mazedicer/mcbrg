<?php
class Update{
	
	public function getMain(){
		$main = file_get_contents( "../templates/update/main.php" );
		return $main;
	}
	
}
