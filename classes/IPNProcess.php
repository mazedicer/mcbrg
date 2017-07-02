<?php

class IPNProcess {

    function __construct(){
        $this->db = new Database();
        $this->user_id = ( isset( $_SESSION[ 'user_id' ] ) ) ? $_SESSION[ 'user_id' ] : "";
        $this->session_id = Session::$current_session;
    }
    
    public function processIPN( $order_number, $payment_status, $txn_id, $full_address ){
        /* 1. check if txn_id exists */
        $stmt = $this->db->prepare( "SELECT * FROM orders_members_table WHERE ORDER_NUM=? AND TXN_ID=?" );
        $stmt->execute( array( $order_number, $txn_id ) );
        $row_count = $stmt->rowCount();
        if ( $row_count > 0 ){
            /* 2. if txn_id exists */
            $rows = $stmt->fetchAll( PDO::FETCH_ASSOC );
            if( $rows[0][ 'STATUS' ] == 'Completed' ){
                /* 2a. check status, if completed, don't do anything */
                return "Not";
            }else if( $rows[0][ 'STATUS' ] != 'Completed' && strcmp( $payment_status, "Completed" ) == 0 ){
                /* 2b. if status NOT equal to completed and payment_status equals Completed, save status and return Completed */
                $this->db->exec( "UPDATE orders_members_table SET STATUS = '$payment_status' WHERE ORDER_NUM = '$order_number'" );
                return "Completed";
            }else if( $rows[0][ 'STATUS' ] != 'Completed' && strcmp( $payment_status, "Completed" ) != 0 ){
                /* 2c. if status NOT equal to completed and payment_status NOT equal to Completed, save status and return Not */
                $this->db->exec( "UPDATE orders_members_table SET STATUS = '$payment_status' WHERE ORDER_NUM = '$order_number'" );
                return "Not";
            }
        }else{
            /* 3. txn_id does NOT exists, save txn_id, status, and full address */
            $this->db->exec( "UPDATE orders_members_table SET STATUS = '$payment_status', ADDRESS = '$full_address', TXN_ID = '$txn_id' WHERE ORDER_NUM = '$order_number'" );
            /* 3a. if payment_status equals Completed, return Completed, else return Not */
            if( strcmp( $payment_status, "Completed" ) == 0 ){
                return "Completed";
            }else{
                return "Not";
            }
        }
    }

}
