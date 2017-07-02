var Cart = {
	order: [ ],
	addToCart: function( id ){
		$( "#cart_div" ).show( "fast" );
		var incart = this.checkCart( id );
		if( incart == false ){
			this.addGun( id );
		}else{
			this.addQty( id );
		}
		this.updateCart();
	},
	checkCart: function( id ){
		/*  called by addToCart()
		 *  checks order array if object with given id exsists
		 *  returns true/false */
		if( this.order.length < 1 ){
			return false;
		}else{
			for( var i = 0; i < this.order.length; i++ ){
				if( id == this.order[ i ].id ){
					return true;
				}//if
			}//for
		}//if
		return false;
	},
	addGun: function( id ){
		/* called by addToCart()
		 * adds gun object into order array with the given id */
		var gun_obj = this.returnGunObj( id );
		this.order.push( gun_obj );
	},
	addQty: function( id ){
		/* called by addToCart()
		 * adds to gun object's order attribute in the order array with the given id */
		for( var i = 0; i < this.order.length; i++ ){
			if( id == this.order[ i ].id ){
				var item_index = i;
				this.order[ i ].order += 1;
				// alert( JSON.stringify( order[i] ) );
			}
		}
		if( this.order[ item_index ].order > this.order[ item_index ].stock ){
			this.order[ item_index ].order = this.order[ item_index ].stock;
		}
	},
	removeFromCart: function( id ){
		var qty = this.checkQty( id );
		if( qty > 0 ){
			this.minusQty( id );
		}else{
			this.removeGun( id );
		}//if
		this.updateCart();
	},
	removeGun: function( id ){
		/* called by removeFromCart()
		 * removes the gun object from the order array */
		for( var i = 0; i < this.order.length; i++ ){
			if( id == this.order[ i ].id ){
				this.order.splice( i, 1 );
				break;
			}
		}
		if( this.order.length < 1 ){
			if( localStorage.getItem( "myorder" ) !== null ){
				localStorage.removeItem( "myorder" );
			}
		}
	},
	minusQty: function( id ){
		/* called by removeFromCart()
		 * substracts from the order attribute of the gun object  */
		for( var i = 0; i < this.order.length; i++ ){
			if( id == this.order[ i ].id ){
				this.order[ i ].order -= 1;
				// alert( JSON.stringify( order[i] ) );
			}
		}
	},
	checkQty: function( id ){
		/* called by removeFromCart()
		 * checks the order attribute of the gun object
		 *  returns the value */
		for( var i = 0; i < this.order.length; i++ ){
			if( id == this.order[ i ].id ){
				return this.order[ i ].order;
			}
		}
	},
	returnGunObj: function( id ){
		/* called by addGun()
		 * with the given id, returns the gun object from the guns.js library */
		for( var i = 0; i < all_guns.length; i++ ){
			if( id == all_guns[ i ].id ){
				return all_guns[ i ];
			}
		}
	},
	updateCart: function(){
		/* update localstorage, 
		 * if order is empty and localstorage is not empty, fill order with localstorage */
		this.updateLocalStorage();
		if( this.order.length < 1 && localStorage.getItem( "myorder" ) !== null ){
			this.order = JSON.parse( localStorage.getItem( "myorder" ) );
		}
		var cart = JSON.stringify( this.order );
		$.ajax(
				{
					type: 'POST',
					cache: false,
					data: { cart: cart },
					url: 'process/process_cart.php',
					success: function( data, status, xml ){
						//console.log( data );
						Cart.displayCart( data );
					}
				}
		);
	},
	displayCart: function( data ){
		$( "#cart_div" ).html( data );
	},
	getTotal: function(){
		$( "#first_name" ).val( $( "#first_name_input" ).val() );
		$( "#last_name" ).val( $( "#last_name_input" ).val() );
		$( "#address1" ).val( $( "#address1_input" ).val() );
		$( "#city" ).val( $( "#city_input" ).val() );
		$( "#state" ).val( $( "#state_input" ).val() );
		$( "#zip" ).val( $( "#zip_input" ).val() );
		var cart = JSON.stringify( this.order );
		$.ajax(
				{
					type: 'POST',
					cache: false,
					data: { cart: cart, zip: $( "#zip_input" ).val() },
					url: 'process/process_cart.php',
					success: function( data, status, xml ){
						//console.log( data );
						Cart.displayTotal( data );
					}
				}
		);
	},
	displayTotal: function( data ){
		if( data.indexOf( "|" ) === 0 ){
			alert( "Error Connecting to Shipping Service!\nMake sure you entered valid information." );
		}else{
			var ship_and_total = data.split( "|" );
			$( "#shipping" ).val( ship_and_total[ 0 ] );
			$( "#shipping_cost_span" ).html( "Shipping: $" + ship_and_total[ 0 ] );
			$( "#total_span" ).html( "Total: $" + ship_and_total[ 1 ] );
		}
	},
	orderSubmit: function(){
		var valid = true;
		var required_array = [ $( "#first_name" ), $( "#last_name" ), $( "#address1" ), $( "#city" ), $( "#state" ), $( "#zip" ) ];
		required_array.forEach( validateFields );
		if( valid === false ){
			alert( "Please enter shipping information and click\nGet Total button" );
		}else{
			document.getElementById( 'CustomToyGunsOrder' ).submit();
		}
		function validateFields( item ){
			if( item.val() === "" ){
				valid = false;
			}
		}
	},
	updateLocalStorage: function(){
		/* called by updateCart()
		 * if  order is not empty, fill localstorage with order */
		if( this.order.length > 0 ){
			if( localStorage.getItem( "myorder" ) !== null ){
				localStorage.removeItem( "myorder" );
			}//if
			localStorage.setItem( "myorder", JSON.stringify( this.order ) );
		}//if
	},
	toggleCartView: function(){
		$( "#cart_div" ).toggle( "fast" );
	}
};


