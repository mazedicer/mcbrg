/* global vars */
var all_guns = [ ];

var Add = {
	logIn: function(){
		/* called by templates/member-guest-login.php */
		$.ajax( {
			type: 'POST',
			cache: false,
			data: { login: $( '#user' ).val(), password: $( '#password' ).val() },
			url: './process/process_add.php',
			success: function( data, status, xml ){
				// do something is successful
				//$("#checkout_result").append( data );
				Add.loginResult( data );
				//console.log( data );
			} } );
	},
	loginResult: function( data ){
		if( data.indexOf( "badlogin" ) == 0 ){
			//location.href = 'update.php';
			console.log( data );
		}else{
			$( '#main_div' ).html( data );
			this.loadGuns();
		}
	},
	loadGuns: function(){
		$.getJSON( './process/guns.json', function( data ){
			all_guns = data;
			displayAddForm();
		} );
		function displayAddForm(){
			var category_select_options = getCategoryOptions();
			var submit_button = getSubmit();
			var addForm = "";
			addForm += '<div>';
			addForm += 'ID: <input id="id" type="text" value="" placeholder="JAN01Y17" /> month + item# + Y(year) 17<br>'; // month + item# + Y(year) 17
			addForm += 'NAME: <input id="name" type="text" value="" size="50" /><br>';
			addForm += 'CATEGORY: <select id="category_select">';
			addForm += category_select_options;
			addForm += '</select><br>';
			addForm += 'PRICE: <input id="price" type="text" value="" placeholder="4.95" /> only decimal numbers<br>';
			addForm += 'WEIGHT: <input id="weight" type="text" value="1" /> only whole numbers<br>';
			addForm += 'STOCK: <input id="stock" type="text" value="1" /> only whole numbers<br>';
			addForm += submit_button;
			addForm += '</div>';
			$( '#product_add' ).html( addForm );
		}
		function getCategoryOptions(){
			categories.sort();
			var results = "";
			for( var i = 0; i < categories.length; i++ ){
				results += '<option value="' + categories[ i ] + '">' + categories[ i ] + '</option>';
			}
			return results;
		}
		function getSubmit(){
			var submit_button = '<div class="input-group">';
			submit_button += '<span class="input-group-addon">';
			submit_button += '<button type="button" class="btn btn-default btn-lg" onclick="Add.addItem()">';
			submit_button += '<span>SUBMIT</span>';
			submit_button += '</button>';
			submit_button += '</span>';
			submit_button += '</div>';
			return submit_button;
		}
	},
	addItem: function(){
		var new_item = { 
			id: $( "#id" ).val(),
			name: $( "#name" ).val(),
			category: $( "#category_select" ).val(),
			price: parseFloat( $( "#price" ).val() ),
			weight: parseInt( $( "#weight" ).val() ),
			order: 1,
			stock: parseInt( $( "#stock" ).val() )
		};
		all_guns.push( new_item );
		var all_guns_string = JSON.stringify( all_guns, null, 4 );
		saveOrder( all_guns_string );
		function saveOrder( all_guns_string ){
			$.ajax( {
				type: 'POST',
				cache: false,
				data: { guns: all_guns_string },
				url: './process/process_edit.php',
				success: function( data, status, xml ){
					saveOrderResult( data );
				} } );
		}
		function saveOrderResult( data ){
			if( data.indexOf( "saveError" ) === 0 ){
				alert( "ERROR" );
			}else{
				$( '#product_add' ).html( "SAVED!" );
				setTimeout( function(){
					Add.loadGuns();
				}, 3000 );
			}
		}
	}
};

