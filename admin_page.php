<?php
    session_start();

    $is_authorized = false;

    // 1. 세션에 챌린지 값이 있고, 사용자가 보낸 response 값이 있는지 확인
    if (isset($_SESSION['challenge']) && isset($_GET['response'])) {
        $challenge = $_SESSION['challenge'];
        $response_from_user = $_GET['response'];

        // 2. 서버에서도 동일한 규칙(문자열 뒤집기 -> Base64 인코딩)으로 정답을 계산
        $expected_response = base64_encode(strrev($challenge));

        // 3. 사용자가 보낸 값과 서버가 계산한 정답이 일치하는지 확인
        if ($response_from_user === $expected_response) {
            $is_authorized = true;
        }
    }

    // (보안 강화) 한 번 사용한 챌린지 값은 세션에서 삭제하여 재사용 방지
    unset($_SESSION['challenge']);

    // 최종적으로 인가되지 않았다면 접근 거부
    if (!$is_authorized) {
        die("<h1>[접근 거부]</h1><p>유효하지 않은 토큰입니다.</p>");
    }

    // 모든 검사를 통과한 경우
    header("X-Flag: FLAG{My_F1rst_H34d3r_Fl4g}");
?>
<!DOCTYPE html>
<html lang="ko">
<head>
    <title>비밀 관리자 패널</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <h1>Access Granted</h1>
        <p>관리자 패널에 성공적으로 접근했습니다. 하지만 플래그는 어디에 있을까요?</p>
        </div>
</body>
</html>