/* global vars */
var all_guns = [ ];

var Update = {
	logIn: function(){
		/* called by templates/member-guest-login.php */
		$.ajax( {
			type: 'POST',
			cache: false,
			data: { login: $( '#user' ).val(), password: $( '#password' ).val() },
			url: './process/process_update.php',
			success: function( data, status, xml ){
				// do something is successful
				//$("#checkout_result").append( data );
				Update.loginResult( data );
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
			getProductsPick();
		} );
		function getProductsPick(){
			var products_picks = "";
			all_guns.forEach( buildItemPick );
			$( '#product_pick' ).html( products_picks );
			function buildItemPick( item ){
				var replace = [ "{id}", "{name}" ];
				var replace_with = [ item.id, item.name ];
				var item_pick = '<div class="input-group">';
				item_pick += '<span class="input-group-addon">';
				item_pick += '<input type="checkbox" name="items[]" value="{id}" />';
				item_pick += '</span>';
				item_pick += '<span class="input-group-addon">{id} {name}</span>';
				item_pick += '<span class="input-group-addon">';
				item_pick += '<select id="select_{id}">';
				item_pick += '<option></option>';
				for( var i = 1; i <= item.stock; i++ ){
					item_pick += '<option value="'+ i + '">' + i + '</option>';
				}
				item_pick += '</select>';
				item_pick += '</span>';
				item_pick += '</div>';
				var result = item_pick.replaceArray( replace, replace_with );
				products_picks += result;
			}
		}
	},
	recordOrder: function(){
		var new_order = { order_num: '', order_date: '', products: [ ] };
		/* check all the input fields are filled and add the values to new_order */
		if( checkFields() ){
			/* returns array of selected item ids and quantity */
			var selected = [ ];
			$( '#product_pick input:checked' ).each( function(){
				var id = $( this ).attr( 'value' );
				var item_quantity = parseInt( $( '#select_' + id ).val() );
				if( isNaN( item_quantity ) ){
					alert( "Please select quantity for item " + id );
					return false;
				}
				var obj = { id: id, quantity: item_quantity };
				selected.push( obj );
			} );
			/* add the selected products to new_order */
			selected.forEach( addProductToNewOrder );
			/* add the new order to sold list */
			sold.push( new_order );
			var sold_string = JSON.stringify( sold, null, 4 );
			var all_guns_string = JSON.stringify( all_guns, null, 4 );
			/* save order changes */
			saveOrder( sold_string, all_guns_string );
			function saveOrder( sold_string, all_guns_string ){
				$.ajax( {
					type: 'POST',
					cache: false,
					data: { sold: sold_string, guns: all_guns_string },
					url: './process/process_update.php',
					success: function( data, status, xml ){
						// do something is successful
						//$("#checkout_result").append( data );
						saveOrderResult( data );
						//console.log( data );
					} } );
			}
			function saveOrderResult( data ){
				if( data.indexOf( "saveError" ) === 0 ){
					alert( "ERROR" );
				}else{
					$( '#main_div' ).html( "SAVED!" );
				}
			}
			function addProductToNewOrder( item ){
				for( var i = 0; i < all_guns.length; i++ ){
					if( item.id === all_guns[ i ].id ){
						var obj = { id: all_guns[ i ].id, name: all_guns[ i ].name, category: all_guns[ i ].category, price: all_guns[ i ].price, weight: all_guns[ i ].weight, order: item.quantity };
						new_order.products.push( obj );
						if( all_guns[ i ].stock - item.quantity === 0 ){
							all_guns.splice( i, 1 );
						}else{
							all_guns[ i ].stock = all_guns[ i ].stock - item.quantity;
						}
					}
				}
			}
		}
		function checkFields(){
			if( $( '#order_number' ).val() === "" || $( '#order_number' ).val() === " " ){
				alert( 'Order # is empty. Please add an order #!' );
				return false;
			}else{
				new_order.order_num = $( '#order_number' ).val();
			}
			if( validateDate( $( '#order_date' ).val() ) ){
				new_order.order_date = $( '#order_date' ).val();
			}else{
				alert( "Please Enter a Valid Date" );
				return false;
			}
			return true;
		}
		function validateDate( date ){
			var validatePattern = /^(\d{4})(\/|-)(\d{1,2})(\/|-)(\d{1,2})$/;
			dateValues = date.match( validatePattern );
			if( dateValues == null ){
				return false;
			}
			return true;
		}
	}
};

