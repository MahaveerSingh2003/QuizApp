<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Essential CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: *");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Sample questions data (you can replace this with your questions.json)
    $questions = [
        "questions" => [
            [
                "id" => 1,
                "question" => "What is the capital of France?",
                "options" => ["London", "Berlin", "Paris", "Madrid"],
                "correctAnswer" => "Paris"
            ],
            [
                "id" => 2,
                "question" => "Which planet is known as the Red Planet?",
                "options" => ["Venus", "Mars", "Jupiter", "Saturn"],
                "correctAnswer" => "Mars"
            ],
            [
                "id" => 3,
                "question" => "What is 2 + 2?",
                "options" => ["3", "4", "5", "6"],
                "correctAnswer" => "4"
            ]
        ]
    ];

// Get the request path
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);
$path = trim($path, '/');

// Simple routing
switch ($path) {
    case 'api/test':
        echo json_encode(['message' => 'PHP Backend is connected successfully!']);
        break;
    case 'api/questions':
        getQuestions();
        break;
    case 'api/submit-score':
        submitScore();
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Not found']);
        break;
}

// Function to get questions
function getQuestions() {
        global $questions;
    echo json_encode($questions);
}

// Function to submit score
function submitScore() {
    // Get POST data
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid data']);
        return;
    }
    
    // In a real application, you would save this to a database
    // For now, we'll just return a success message
    echo json_encode([
        'success' => true,
        'message' => 'Score submitted successfully',
        'data' => $data
    ]);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?> 