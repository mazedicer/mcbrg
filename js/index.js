/* global vars */
var all_guns = [ ];
/* menu */
var Menu = {
	createMenu: function(){
		$( '#menus-button' ).click( function(){
			$( '#menu' ).toggle( 'slide' );
		} );
		categories.sort();
		var menu = '<div class="btn-group" role="group">';
		for( var i = 0; i < categories.length; i++ ){
			var instock = this.returnOutOfStock( categories[ i ] );
			if( instock ){
				menu += '<button type="button" class="btn btn-default" onclick="AllGuns.getCategoryItems( \'' + categories[ i ] + '\' )">' + categories[ i ] + '</button>';
			}else{
				menu += '<button type="button" class="btn btn-default disabled" onclick="AllGuns.getCategoryItems( \'' + categories[ i ] + '\' )">' + categories[ i ] + '</button>';
			}
		}
		menu += '<div>';
		$( '#menu' ).html( menu );
	},
	returnOutOfStock: function( category ){
		/* returns array with out of stock categories */
		var instock_categories = [ ];
		for( var i = 0; i < all_guns.length; i++ ){
			var current_category = all_guns[ i ].category;
			if( instock_categories.indexOf( current_category ) >= 0 ){
				continue;
			}
			instock_categories.push( current_category );
		}
		if( instock_categories.indexOf( category ) < 0 ){
			return false;
		}
		return true;
	}
};

var AllGuns = {
	category_items: [ ],
	getCategoryItems: function( category ){
		$( '#menu' ).toggle( 'slide' );
		this.setCategoryitems( category );
		this.buildCategoryResultsHtml();
	},
	setCategoryitems: function( category ){
		this.category_items = [ ];
		/* called by addGun()
		 * with the given category, returns the category guns from the guns.js library */
		for( var i = 0; i < all_guns.length; i++ ){
			if( category === all_guns[ i ].category ){
				this.category_items.push( all_guns[ i ] );
			}
		}
	},
	buildCategoryResultsHtml: function(){
		var results_html = "";
		for( var i = 0; i < this.category_items.length; i++ ){
			results_html += this.buildItemHtml( this.category_items[ i ] );
		}
		$( '#menu_results' ).html( results_html );
	},
	buildItemHtml: function( item ){
		var replace = new Array( "{category}", "{id}", "{name}", "{price}" );
		var replace_with = new Array( item.category, item.id, item.name, item.price );
		var template = '<div class="col-md-4 item-div">';
		template += '<div class="row">';
		template += '<a href="javascript:ToyGallery.getGallery( \'{category}/{id}\' )">';
		template += '<img class="item-img" src="./images/{category}/{id}.JPG">';
		template += '</a>';
		template += '</div>';
		template += '<div class="row">';
		template += '<h3>{name} {id}</h3>';
		template += '</div>';
		template += '<div class="row">';
		template += '<h4>${price}</h4>';
		template += '</div>';
		template += '<div class="row">';
		template += '<button class="btn btn-default" onclick="Cart.addToCart( \'{id}\' );">ADD TO CART</button>';
		template += '</div>';
		template += '</div>';
		var result = template.replaceArray( replace, replace_with );
		return result;
	}
};

var ToyGallery = {
	getGallery: function( gallery ){
		$( '#gallery_modal' ).modal( 'show' );
		$( '#menu_gallery' ).html( '<div class="jumbotron"><h1>Loading Gallery...</h1></div>' );
		$.ajax( {
			type: 'POST',
			cache: false,
			data: { gallery: gallery },
			url: './process/process_gallery.php',
			success: function( data ){
				// do something is successful
				ToyGallery.startGallery( data );
			} } );
	},
	startGallery: function( data ){
		$( '#menu_gallery' ).html( data );
	}
};

$( document ).ready( function(){
	$.getJSON( './process/guns.json', function( data ){
		all_guns = data;
		Menu.createMenu();
	} );
} );