<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: application/json");

echo json_encode(["status" => "success", "message" => "Backend is connected!"]);
?> 