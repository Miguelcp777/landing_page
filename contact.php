<?php
declare(strict_types=1);

// PHP 8.2+ with OpenSSL. Configuration and dependencies stay outside the web root.
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, string $code): void {
    http_response_code($status);
    echo json_encode(['ok' => $status === 200, 'code' => $code]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    respond(405, 'method');
}
if (strtolower(trim(explode(';', $_SERVER['CONTENT_TYPE'] ?? '')[0])) !== 'application/json') {
    respond(415, 'content_type');
}
// Bound the actual read as well as any advertised body size.
$raw = file_get_contents('php://input', false, null, 0, 20001);
if ($raw === false || strlen($raw) > 20000) respond(413, 'size');
$input = json_decode($raw, true);
if (!is_array($input)) respond(400, 'input');
foreach (['name', 'email', 'message', 'website'] as $key) {
    if (!isset($input[$key]) || !is_string($input[$key])) respond(400, 'input');
}
$name = trim($input['name']);
$email = trim($input['email']);
$message = trim($input['message']);
if ($input['website'] !== '' || $name === '' || strlen($name) > 200 ||
    preg_match('/[\r\n\x00]/', $name) || strlen($email) > 254 ||
    !filter_var($email, FILTER_VALIDATE_EMAIL) || $message === '' ||
    strlen($message) > 10000 || strpos($message, "\0") !== false) respond(422, 'validation');

try {
    $configPath = getenv('LANDING_CONTACT_CONFIG') ?: '/volume1/landing-private/contact-config.php';
    $resolved = realpath($configPath);
    $webRoot = realpath($_SERVER['DOCUMENT_ROOT'] ?? __DIR__) ?: __DIR__;
    if (!$resolved || strpos($resolved, rtrim($webRoot, DIRECTORY_SEPARATOR) . DIRECTORY_SEPARATOR) === 0) {
        throw new RuntimeException('Configuration unavailable');
    }
    $config = require $resolved;
    foreach (['gmail', 'app_password', 'rate_secret', 'autoload', 'rate_file', 'origins'] as $key) {
        if (empty($config[$key])) throw new RuntimeException('Incomplete configuration');
    }
    if (!in_array($_SERVER['HTTP_ORIGIN'] ?? '', $config['origins'], true)) respond(403, 'origin');
    // Origin checks are supplemental; they do not replace server-side rate limits.
    $ipKey = hash_hmac('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown', $config['rate_secret']);
    $handle = fopen($config['rate_file'], 'c+');
    if (!$handle || !flock($handle, LOCK_EX)) throw new RuntimeException('Rate store unavailable');
    try {
        $state = json_decode(stream_get_contents($handle), true) ?: [];
        $now = time();
        $state = array_filter($state, static function ($v) use ($now) { return $v['until'] > $now; });
        $global = $state['global'] ?? ['count' => 0, 'until' => $now + 3600];
        $visitor = $state[$ipKey] ?? ['count' => 0, 'until' => $now + 3600];
        $limited = $global['count'] >= 30 || $visitor['count'] >= 5;
        if (!$limited) {
            $global['count']++;
            $visitor['count']++;
            $state['global'] = $global;
            $state[$ipKey] = $visitor;
            rewind($handle);
            if (!ftruncate($handle, 0) || fwrite($handle, json_encode($state)) === false || !fflush($handle)) {
                throw new RuntimeException('Rate store write failed');
            }
        }
    } finally {
        flock($handle, LOCK_UN);
        fclose($handle);
    }
    if ($limited) {
        header('Retry-After: 3600');
        respond(429, 'rate_limit');
    }
    require $config['autoload'];
    $mail = new \PHPMailer\PHPMailer\PHPMailer(true);
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = $config['gmail'];
    $mail->Password = $config['app_password'];
    $mail->SMTPSecure = \PHPMailer\PHPMailer\PHPMailer::ENCRYPTION_SMTPS;
    $mail->Port = 465;
    $mail->Timeout = 15;
    $mail->Timelimit = 20;
    $mail->CharSet = 'UTF-8';
    $mail->setFrom($config['gmail'], 'Portfolio Miguel Castillo');
    $mail->addAddress($config['gmail']);
    $mail->addReplyTo($email, $name);
    $mail->Subject = 'Nuevo mensaje del portfolio';
    $mail->isHTML(false);
    $mail->Body = "Nombre: {$name}\nEmail: {$email}\n\n{$message}";
    $mail->send();
    respond(200, 'sent');
} catch (\Throwable $error) {
    // Do not log message contents, addresses, credentials or SMTP diagnostics.
    error_log('Portfolio contact: delivery unavailable');
    respond(503, 'unavailable');
}
