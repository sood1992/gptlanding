<?php
declare(strict_types=1);

header('Content-Type: application/json');
header('Cache-Control: no-store, no-cache, must-revalidate, max-age=0');

$dataFile = dirname(__DIR__) . '/data/content.json';

if (!file_exists($dataFile)) {
    http_response_code(500);
    echo json_encode(['error' => 'Content store is missing.']);
    exit;
}

$method = $_SERVER['REQUEST_METHOD'] ?? 'GET';

if ($method === 'GET') {
    $json = file_get_contents($dataFile);
    if ($json === false) {
        http_response_code(500);
        echo json_encode(['error' => 'Unable to read content.']);
        exit;
    }
    echo $json;
    exit;
}

if (in_array($method, ['POST', 'PUT'], true)) {
    $body = file_get_contents('php://input') ?: '';
    $decoded = json_decode($body, true);

    if ($decoded === null && json_last_error() !== JSON_ERROR_NONE) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid JSON payload.']);
        exit;
    }

    $encoded = json_encode($decoded, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    if ($encoded === false) {
        http_response_code(500);
        echo json_encode(['error' => 'Unable to encode content.']);
        exit;
    }

    $result = file_put_contents($dataFile, $encoded, LOCK_EX);
    if ($result === false) {
        http_response_code(500);
        echo json_encode(['error' => 'Unable to save content.']);
        exit;
    }

    echo json_encode(['status' => 'ok']);
    exit;
}

http_response_code(405);
header('Allow: GET, POST, PUT');
echo json_encode(['error' => 'Method not allowed.']);
