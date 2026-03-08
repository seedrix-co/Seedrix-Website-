<?php
/**
 * Contact form handler — sends inquiry to info@seedrix.co
 * Place this file in the same directory as index.html (e.g. public_html) on your server.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

$to = 'info@seedrix.co';
$subject = 'Website inquiry from ' . (isset($_POST['name']) ? trim($_POST['name']) : 'Contact form');

$name    = isset($_POST['name'])    ? trim(htmlspecialchars($_POST['name'], ENT_QUOTES, 'UTF-8'))    : '';
$email   = isset($_POST['email'])   ? trim(filter_var($_POST['email'], FILTER_SANITIZE_EMAIL))      : '';
$company = isset($_POST['company']) ? trim(htmlspecialchars($_POST['company'], ENT_QUOTES, 'UTF-8')) : '';
$service = isset($_POST['service']) ? trim(htmlspecialchars($_POST['service'], ENT_QUOTES, 'UTF-8')) : '';
$message = isset($_POST['message']) ? trim(htmlspecialchars($_POST['message'], ENT_QUOTES, 'UTF-8')) : '';

if ($name === '' || $email === '' || $service === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Required fields are missing']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Invalid email address']);
    exit;
}

$body = "New inquiry from the website\n\n";
$body .= "Name: " . $name . "\n";
$body .= "Email: " . $email . "\n";
$body .= "Company: " . $company . "\n";
$body .= "Service of interest: " . $service . "\n\n";
$body .= "Message:\n" . $message . "\n";

$headers = [];
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: ' . $email;
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'X-Mailer: PHP/' . phpversion();

$sent = @mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to send email']);
}
