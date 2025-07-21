<?php
/**
 * Quiz App Backend
 * Copyright © 2025 MAHAVEER SINGH
 * All rights reserved.
 */

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$jsonFile = 'questions.json';

if (file_exists($jsonFile)) {
    $jsonData = file_get_contents($jsonFile);
    echo $jsonData;
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Questions file not found']);
}
?> 