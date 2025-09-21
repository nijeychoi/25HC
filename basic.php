<?php
    session_start();

    // 16바이트의 랜덤한 값을 생성하고, 16진수 문자열로 변환
    $challenge = bin2hex(random_bytes(16));
    // 생성된 챌린지 값을 세션에 저장
    $_SESSION['challenge'] = $challenge;

    $student_name_php = isset($_GET['student_name']) ? htmlspecialchars($_GET['student_name']) : '방문자';
?>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Basic 과정 강의실</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body data-challenge="<?php echo $challenge; ?>">

<body>
    <div class="container welcome-container">
        <div id="welcome-message"></div>
        <div id="flag-container"></div>
    </div>

    <div class="container">
        <h1>Basic Q&A</h1>
        <div id="comments-section">
            <h3>질문 목록</h3>
        </div>
        <div id="comment-form">
            <h3>질문 작성</h3>
            <textarea id="comment-input" placeholder="질문을 입력하세요..."></textarea>
            <button id="preview-btn">미리보기</button>
            <button id="submit-btn">질문 등록</button>
            <h4>미리보기</h4>
            <div id="preview-area"></div>
        </div>
    </div>

    <script src="js/basic_script.js"></script>
</body>
</html>