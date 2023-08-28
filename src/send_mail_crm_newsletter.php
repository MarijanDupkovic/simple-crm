<?php

########### CONFIG ###############

$recipient = 'your@email.com';
$redirect = '';

########### CONFIG END ###########



########### Intruction ###########   
#
#   This script has been created to send an email to the $recipient
#   
#  1) Upload this file to your FTP Server
#  2) Send a POST rewquest to this file, including
#     [name] The name of the sender (Absender)
#     [message] Message that should be send to you
#
##################################



###############################
#
#        DON'T CHANGE ANYTHING FROM HERE!
#
#        Ab hier nichts mehr ändern!
#
###############################

switch ($_SERVER['REQUEST_METHOD']) {
    case ("OPTIONS"): //Allow preflighting to take place.
        header("Access-Control-Allow-Origin: *");
        header("Access-Control-Allow-Methods: POST");
        header("Access-Control-Allow-Headers: content-type");
        header("Content-Type: application/json; charset=UTF-8");
        header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
        exit;
    case ("POST"): //Send the email;
        header("Access-Control-Allow-Origin: *");
        $data = json_decode(file_get_contents("php://input"));
        $name = $data->name;

        $email = $data->mail;
        $message = $data->message; 
        $recipient = $email;
        $subject = $data->subject;
        // $headers = "From: noreply@https://gruppe-527.developerakademie.net";

        $result = mail($recipient, $subject, $message);
        // print($result);
        header("Location: " . $redirect);
        break;
    default: //Reject any non POST or OPTIONS requests.
        header("Allow: POST", true, 405);
        exit;
}
