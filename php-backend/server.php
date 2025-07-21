<?php
// Simple PHP development server script
// Run this with: php server.php

$host = 'localhost';
$port = 80;

echo "Starting PHP server on http://{$host}:{$port}\n";
echo "Press Ctrl+C to stop the server\n";

// Start the PHP development server
$command = "php -S {$host}:{$port}";
exec($command);
?> 