<?php
include_once( '../classes/ImGallery.php' );
if( isset( $_POST[ 'gallery' ] ) ){
	$thumbsize = 180;
	$maxsize = 640;
	$folderpath = "../images/" . $_POST[ 'gallery' ];
	$elements = array();
	$my_gallery = new ImgGallery( $thumbsize, $maxsize, $folderpath, $elements );
	$result = $my_gallery->getPublicSide();
	echo $result;
}

