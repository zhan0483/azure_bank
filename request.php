<?php

$apikey = "y3bSf4/LtR2xS26rheKIHxSTJeUfzjrLZi3OAbCJbxE37yCItFYaTNKIAJIz4xK/PUtvCfEsSHJ7k/tYjKYPSg=="; 
$url = "https://ussouthcentral.services.azureml.net/workspaces/16884a9040774c54b34f60da483b32a9/services/e22ef84c1a4b408ca89a7dfa973d32d1/execute?api-version=2.0&details=true";

//$data = file_get_contents('php://input');
$data = trim($_REQUEST['data']);

$headers = array( 
            "Content-type:application/json", 
            "Accept:application/json", 
            "Content-length:".strlen($data), 
            "Authorization:Bearer " . $apikey 
        );

header('Content-type: application/json');
//echo strlen($data).",".$data;

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);

curl_setopt($ch, CURLOPT_HTTPHEADER, $headers); 

curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $data);

curl_exec($ch);

curl_close($ch);

?>