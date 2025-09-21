<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>ClassSiss</title>
    <link rel="stylesheet" href="css/welcome_style.css">
</head>
<body>

    <div class="welcome-container">
        <form id="welcome-form" method="GET">

            <div id="step1">
                <h2>온라인 강의실 입장</h2>
                <div class="input-group">
                    <label for="student-name">수강생 이름을 입력해 주세요.</label>
                    <input type="text" id="student-name" name="student_name" required>
                </div>
                <button type="button" onclick="goToStep2()">다음</button>
            </div>

            <div id="step2" style="display: none;">
                <h2>수강 과목 선택</h2>
                <div class="input-group">
                    <label for="subject">수강할 과목을 선택해 주세요.</label>
                    <select id="subject" name="subject" required>
                        <option value="basic">Basic</option>
                        <option value="web">Web</option>
                    </select>
                </div>
                <button type="submit">강의실 입장하기</button>
            </div>

        </form>
    </div>

    <script>
        function goToStep2() {
            const studentNameInput = document.getElementById('student-name');
            if (studentNameInput.value.trim() === '') {
                alert('이름을 입력해주세요.');
                return;
            }
            document.getElementById('step1').style.display = 'none';
            document.getElementById('step2').style.display = 'block';
        }

        // --- form 제출 로직 수정 ---
        const welcomeForm = document.getElementById('welcome-form');
        
        welcomeForm.addEventListener('submit', function(event) {
            // 1. form의 기본 제출 동작을 막습니다.
            event.preventDefault(); 
            
            const subject = document.getElementById('subject').value;
            
            // 2. 선택한 과목에 따라 action 속성을 변경합니다.
            if (subject === 'basic') {
                welcomeForm.action = 'basic.php';
            } else if (subject === 'web') {
                welcomeForm.action = 'web.php';
            }
            
            // 3. 변경된 action 주소로 form을 제출합니다.
            welcomeForm.submit();
        });
    </script>

</body>
</html>