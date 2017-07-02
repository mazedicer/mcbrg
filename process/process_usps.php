<?php

function USPSParcelRate( $weight, $dest_zip ){
    if( $weight <= 0.13 ){
        $template = file_get_contents( "../templates/usps_first_class_xml.php" );
        $pounds = 0; $ounces = $weight;
    }else{
        $template = file_get_contents( "../templates/usps_priority_xml.php" );
        $pounds = $weight; $ounces = 0;
    }
    $replace = array( "{pounds}", "{ounces}", "{zipcode}" );
    $replace_with = array( $pounds, $ounces, $dest_zip );
    $data = str_replace( $replace, $replace_with, $template );
// This script was written by Mark Sanborn at http://www.marksanborn.net  
// If this script benefits you are your business please consider a donation  
// You can donate at http://www.marksanborn.net/donate.  
// ========== CHANGE THESE VALUES TO MATCH YOUR OWN ===========

    //$userName = 'username'; // Your USPS Username
    //$orig_zip = '12345'; // Zipcode you are shipping FROM
// =============== DON'T CHANGE BELOW THIS LINE ===============

    $url = "http://Production.ShippingAPIs.com/ShippingAPI.dll";
    $ch = curl_init();

// set the target url
    curl_setopt( $ch, CURLOPT_URL, $url );
    curl_setopt( $ch, CURLOPT_HEADER, 1 );
    curl_setopt( $ch, CURLOPT_RETURNTRANSFER, 1 );

// parameters to post
    curl_setopt( $ch, CURLOPT_POST, 1 );

 //   $data = "API=RateV3&XML=<RateV3Request USERID=\"$userName\"><Package ID=\"1ST\"><Service>PRIORITY</Service><ZipOrigination>$orig_zip</ZipOrigination><ZipDestination>$dest_zip</ZipDestination><Pounds>$weight</Pounds><Ounces>0</Ounces><Size>REGULAR</Size><Machinable>TRUE</Machinable></Package></RateV3Request>";

// send the POST values to USPS
    curl_setopt( $ch, CURLOPT_POSTFIELDS, $data );

    $result = curl_exec( $ch );
    $data = strstr( $result, '<?' );
// echo '<!-- '. $data. ' -->'; // Uncomment to show XML in comments
    $xml_parser = xml_parser_create();
    xml_parse_into_struct( $xml_parser, $data, $vals, $index );
    xml_parser_free( $xml_parser );
    $params = array();
    $level = array();
    foreach ( $vals as $xml_elem ){
        if ( $xml_elem[ 'type' ] == 'open' ){
            if ( array_key_exists( 'attributes', $xml_elem ) ){
                list($level[ $xml_elem[ 'level' ] ], $extra) = array_values( $xml_elem[ 'attributes' ] );
            } else{
                $level[ $xml_elem[ 'level' ] ] = $xml_elem[ 'tag' ];
            }
        }
        if ( $xml_elem[ 'type' ] == 'complete' ){
            $start_level = 1;
            $php_stmt = '$params';
            while ( $start_level < $xml_elem[ 'level' ] ){
                $php_stmt .= '[$level[' . $start_level . ']]';
                $start_level++;
            }
            $php_stmt .= '[$xml_elem[\'tag\']] = $xml_elem[\'value\'];';
            eval( $php_stmt );
        }
    }
    curl_close( $ch );
// echo '<pre>'; print_r($params); echo'</pre>'; // Uncomment to see xml tags
    return $params[ 'RATEV3RESPONSE' ][ '1ST' ][ '1' ][ 'RATE' ];
}

