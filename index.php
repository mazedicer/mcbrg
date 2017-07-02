<?php
session_start();
?>
<!doctype HTML>
<html ng-app="cheapNerfToyGunPartsApp">
	<head>
        <meta charset="utf-8"/>
		<title>toy guns</title>
		<meta name="description" content="Cheap Nerf toy gun parts, Buzzbee, Boomco, Dartzone, Toy guns, used/new for modding">
		<meta name="keywords" content="cheap toy guns, cheap nerf toy gun parts,cheap nerf parts, buzzbee, boomco, dartzone, toy guns">
		<meta name="author" content="Mario Carrizales">
		<link href="bootstrap/css/bootstrap.css" rel="stylesheet">
		<link rel='stylesheet' href="css/index.css" />
		<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    </head>
    <body >
		<div id="content" class="container-fluid" ng-controller="mainController">
			<div class="row center-content">
				<h1>Welcome to Cheap Nerf Toy Gun Parts<br><small>For Toy Gun Modding Enthusiast</small></h1>
			</div>
			<div class="row">
				<div class="col-md-8">
					<div class="row">
						<div class="main-menu">
							<button id="menus-button" type="button" class="btn btn-primary" title="MENU" ng-click="showHideMenu()">
								<span class="glyphicon glyphicon-menu-hamburger"></span>
							</button>
						</div>
					</div>
					<div class="row" ng-show="view_menu" menu-template>
						<!-- menu will appear here -->
					</div>
					<div class="row">
						<div id="menu_results" guns-template>
							<!-- item results will appear here -->
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="row">
						<div id="shopping_cart_div">
							<button id="shopping_cart_btn" type="button" ng-click="toggleCartView()">
								<span><i class="material-icons large-40">shopping_cart</i> Shopping Cart</span>
							</button>
							<div id="cart_div" ng-show="view_cart" shopping-cart-template></div>
						</div>
					</div>
				</div>
			</div>
			<div id="footer" class="row">
				<p>For inquiries, please contact Mario,<br>
					Email. <a href="mailto:customtoyguns@gmail?subject=Custom Toy Gun Order&body=I would like to place an order.">customtoyguns@gmail.com</a><br>
					Tel. 1-619-800-2278</p>
				<p><a href="http://www.prlog.org/12479916-customtoygunscom-the-source-for-toy-gun-commissions-official-launch.html">Customtoyguns.com The Source for Toy Gun Commissions Official Launch</a></p>
			</div>
		</div>
		<div class="modal fade" id="gallery_modal" role="dialog">
			<div class="modal-dialog" role="document">
				<div class="modal-content">
					<div class="modal-body">
						<div id="menu_gallery" >
							<!-- item gallery will appear here -->
						</div>
					</div>
				</div>
			</div>
		</div>
		<script src="jquery-1.12.2/jquery-1.12.2.min.js" type="text/javascript"></script>
		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.6.3/angular.min.js"></script>
		<script src="js/categories.js"></script>
		<script src="js/main-controller.js"></script>
		<script src="js/main-factory.js"></script>
		<script src="js/main-template.js"></script>
	</body>
</html>

