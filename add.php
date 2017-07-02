<?php
session_start();
?>
<!doctype HTML>
<html>
	<head>
        <meta charset="utf-8"/>
		<title>Customtoyguns Add</title>
		<link href="bootstrap/css/bootstrap.css" rel="stylesheet">
		<link rel='stylesheet' href="css/default.css" />
		<link rel='stylesheet' href="css/add.css" />
		<script src="jquery-1.12.2/jquery-1.12.2.min.js" type="text/javascript"></script>
		<script src="js/categories.js"></script>
    </head>
    <body>
		<div id="content" class="container-fluid">
			<div class="row">
				<div class="page-header">
					<h1><a href="index.php">Customtoyguns</a> <small>Add</small></h1>
				</div>
			</div>
			<div class="row">
				<div id="main_div">
					<!-- main template will appear here after login -->
					<div class="login_div">
						<div class="input-group">
							<input id="user" type="text" class="form-control" placeholder="Username">
							<input id="password" type="password" class="form-control" placeholder="Password">
							<span class="input-group-addon">
								<button type="button" class="btn btn-default btn-lg" onclick="Add.logIn()">
									<span>Login <span class="glyphicon glyphicon-user"></span>
								</button>
							</span>	
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
		<script type="text/javascript" src="js/add.js"></script>
		<script type="text/javascript" src="js/utilities.js"></script>
		<script src="bootstrap/js/bootstrap.min.js"></script>
	</body>
</html>

