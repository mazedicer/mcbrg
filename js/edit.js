/* global vars */
var all_guns = [ ];

var Edit = {
    logIn: function(){
        /* called by templates/member-guest-login.php */
        $.ajax( {
            type: 'POST',
            cache: false,
            data: { login: $( '#user' ).val(), password: $( '#password' ).val() },
            url: './process/process_edit.php',
            success: function( data, status, xml ){
                // do something is successful
                //$("#checkout_result").append( data );
                Edit.loginResult( data );
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
            var submit_button = '<div class="input-group">';
            submit_button += '<span class="input-group-addon">';
            submit_button += '<button type="button" class="btn btn-default btn-lg" onclick="Edit.recordChange()">';
            submit_button += '<span>SUBMIT</span>';
            submit_button += '</button>';
            submit_button += '</span>';
            submit_button += '</div>';
            all_guns.forEach( buildItemPick );
            $( '#product_pick' ).html( products_picks );
            $( '#product_pick' ).append( submit_button );
            function buildItemPick( item ){
                var replace = [ "{id}", "{name}", "{price}" ];
                var replace_with = [ item.id, item.name, item.price ];
                var item_pick = '<div class="input-group">';
                item_pick += '<span class="input-group-addon">{id} {name} </span>';
                item_pick += '<input class="price-input" type="text" value="{price}" onchange="Edit.editPrice( \'{id}\', this )" />';
                item_pick += '<span class="input-group-addon"> Qty: <span id="qty_{id}"></span> </span>';
                item_pick += '<span class="input-group-addon">';
                item_pick += '<select onchange="Edit.editStock( \'{id}\', this )">';
                item_pick += '<option></option>';
                for( var i = 0; i <= 100; i++ ){
                    if( item.stock == i ){
                        item_pick += '<option value="' + i + '" selected>' + i + '</option>';
                    }else{
                        item_pick += '<option value="' + i + '">' + i + '</option>';
                    }
                }
                item_pick += '</select>';
                item_pick += '</span>';
                item_pick += '<span class="input-group-addon">';
                item_pick += '<button type="button" class="btn btn-default" onclick="Edit.removeItem( \'{id}\' )"><span class="glyphicon glyphicon-remove-circle"></span></button>';
                item_pick += '</span>';
                item_pick += '<span id="confirm_{id}" class="input-group-addon"></span>';
                item_pick += '</div>';
                var result = item_pick.replaceArray( replace, replace_with );
                products_picks += result;
            }
        }
    },
    editPrice: function( id, elem ){
        for( var i = 0; i < all_guns.length; i++ ){
            if( id === all_guns[ i ].id ){
                console.log( elem.value );
                var price = parseFloat( elem.value );
                all_guns[ i ].price = price;
            }
        }
        this.confirmChange( id );
    },
    editStock: function( id, elem ){
        for( var i = 0; i < all_guns.length; i++ ){
            if( id === all_guns[ i ].id ){
                all_guns[ i ].stock = parseInt( elem.value );
            }
        }
    },
    removeItem: function( id ){
        for( var i = 0; i < all_guns.length; i++ ){
            if( id === all_guns[ i ].id ){
                all_guns.splice( i, 1 );
            }
        }
        this.confirmChange( id );
    },
    confirmChange: function( id ){
        $( '#confirm_' + id ).html( "SAVED!" );
                setTimeout( function(){
                    $( '#confirm_' + id ).html( "" );
                }, 3000 );
    },
    recordChange: function( id ){
        var all_guns_string = JSON.stringify( all_guns, null, 4 );
        /* save order changes */
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
                $( '#product_pick' ).html( "SAVED!" );
                setTimeout( function(){
                    Edit.loadGuns();
                }, 3000 );
            }
        }
    }
};

