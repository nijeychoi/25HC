<?php
    $student_name_php = isset($_GET['student_name']) ? htmlspecialchars($_GET['student_name']) : '방문자';
?>
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Web 과정 강의실</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

    <div class="container welcome-container">
        <div id="welcome-message"></div>
        </div>

    <div class="container">
        <h1>Web Q&A (Secure)</h1>
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

    <script src="js/web_script.js"></script>
</body>
</html>