<?php

class Cart{

    public function getTotal( $cart, $zip ){
        $data = json_decode( str_replace( '\\', '', $cart ), false );
        $weight = 0;
        $sub_total = 0;
        $total = 0;
        $shipping_cost = 0;
        if ( is_array( $data ) && count( $data ) > 0 ){
            foreach ( $data as $gun ){
                $weight = $weight + ( ( float )$gun->weight * $gun->order );
                $sub_total = $sub_total + ( $gun->price * $gun->order );
            }//foreach
            $shipping_cost = $this->USPSParcelRate( $weight, $zip );
            sleep(1);
            $total = ( (float)$shipping_cost + (float)$sub_total ) * 1;
            //return $total;
            return (string)$shipping_cost . "|" . (string)$total; 
        }
    }

    public function returnCart( $cart, $order_num ){
        /* called by @root process_index.php
         * takes $cart JSON stringified, decodes it to access the gun objects within it
         * access with $data[0]->id, $data[0]->name, $data[1]->price, etc.. 
         * returns an html formatted string that forms the shopping cart */
        $results = "";
        $data = json_decode( str_replace( '\\', '', $cart ), false );
        if ( is_array( $data ) && count( $data ) > 0 ){
            $results = $this->buildCart( $data, $order_num );
            //print_r($data);
        }//if
        //$results = json_encode( $results );
        return $results;
    }

    private function buildCart( $data, $order_num ){
        /* called by returnCart()
         * returns html formatted string that forms the shopping cart */
        $results = "";
        $count = 2;
        $weight = 0;
        $sub_total = 0;
        $main_template = file_get_contents( "../templates/cart/cart_main.php" );
        $results_template = file_get_contents( "../templates/cart/cart_results.php" );
        $main_replace = array( "{content}", "{sub_total}", "{order_num}" );
        $results_replace = array( "{id}", "{name}", "{price}", "{order}", "{count}" );
        foreach ( $data as $gun ){
            $weight = $weight + ( ( float ) $gun->weight * $gun->order );
            $sub_total = $sub_total + ( $gun->price * $gun->order );
            $results_replace_with = array( $gun->id, $gun->name, $gun->price, $gun->order, $count );
            $results .= str_replace( $results_replace, $results_replace_with, $results_template );
            $count++;
        }//foreach
        //$shipping_cost = $this->USPSParcelRate( $weight, '17522' );
        //$total = $shipping_cost + $sub_total;
        $main_replace_with = array( $results, $sub_total, $order_num );
        $main_results = str_replace( $main_replace, $main_replace_with, $main_template );
        return $main_results;
    }

    private function USPSParcelRate( $weight, $dest_zip ){
        if ( $weight <= 0.13 ){
            $template = file_get_contents( "../templates/usps_first_class_xml.php" );
            $pounds = 0;
            $ounces = $weight;
        } else{
            $template = file_get_contents( "../templates/usps_priority_xml.php" );
            $pounds = $weight;
            $ounces = 0;
        }
        $ship_date = date( "Y-m-d" );
        $replace = array( "{pounds}", "{ounces}", "{zipcode}", "{ship_date}" );
        $replace_with = array( $pounds, $ounces, $dest_zip, $ship_date );
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
        $result = strstr( $result, '<?' );
// echo '<!-- '. $data. ' -->'; // Uncomment to show XML in comments
        /*
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
         * 
         */
        curl_close( $ch );
        $xml = new SimpleXMLElement( $result );
        return $xml->Package->Postage->Rate;
        //echo '<pre>'; print_r($params); echo'</pre>'; // Uncomment to see xml tags
        //return $params[ 'RATEV4RESPONSE' ][ '0' ][ '1' ][ 'RATE' ];
    }

    private function returnShippingCost( $weight ){
        if ( $weight <= 0.13 ){
            $shipping_cst = 3.50;
        } else if ( $weight > 0.13 && $weight < 1 ){
            $shipping_cst = 6;
        } else if ( $weight >= 1 && $weight < 2 ){
            $shipping_cst = 8;
        } else if ( $weight >= 2 && $weight < 3 ){
            $shipping_cst = 10;
        } else if ( $weight >= 3 && $weight < 4 ){
            $shipping_cst = 12;
        } else if ( $weight >= 4 && $weight < 5 ){
            $shipping_cst = 14;
        } else if ( $weight >= 5 && $weight < 6 ){
            $shipping_cst = 16;
        } else if ( $weight >= 6 && $weight < 7 ){
            $shipping_cst = 18;
        } else if ( $weight >= 7 && $weight < 8 ){
            $shipping_cst = 20;
        } else if ( $weight >= 8 && $weight < 9 ){
            $shipping_cst = 24;
        } else if ( $weight >= 9 && $weight < 12 ){
            $shipping_cst = 28;
        } else if ( $weight >= 12 && $weight < 16 ){
            $shipping_cst = 36;
        } else{
            $shipping_cst = 0;
        }//end if
        return $shipping_cst;
    }

//returnShippingCost
}
