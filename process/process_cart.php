<?php
session_start();
include( "../classes/Cart.php" );
$params = json_decode( file_get_contents( 'php://input' ) ,true);
if( isset( $_POST[ 'cart' ] ) && !isset( $_POST[ 'zip' ] )
	|| $params["cart"] == true ){
	//generate a random order number
	$cur_time = time();
	$sess = session_id();
	$part1 = substr( $sess, 0, 4 );
	$part2 = substr( $cur_time, 2, 5 );
	$order_num = $part1 . $part2;
	echo $order_num;
}
if( isset( $_POST[ 'cart' ] ) && isset( $_POST[ 'zip' ] ) ){
    $my_cart = new Cart();
    $cart = $_POST[ 'cart' ];
    $zip = $_POST[ 'zip' ];
    $results = $my_cart->getTotal( $cart, $zip );
    echo $results;
}