// 전역 변수로 현재 학생 이름을 저장합니다.
let currentStudentName = '익명';

function accessAdminPanel() {
    console.log("관리자 패널 접근 시도...");

    const challenge = document.body.dataset.challenge;
    if (!challenge) {
        console.error("챌린지 토큰을 찾을 수 없습니다.");
        return;
    }

    const response = btoa(challenge.split('').reverse().join(''));

    window.location.href = `admin_page.php?response=${response}`;
}


function displayWelcome() {
    const welcomeBox = document.getElementById('welcome-message');
    const params = new URLSearchParams(window.location.search);
    const studentName = params.get('student_name');

    if (studentName && welcomeBox) {
        currentStudentName = studentName;
        
        const header = document.createElement('h2');
        const paragraph = document.createElement('p');

        header.innerText = `환영합니다, ${studentName} 님!`;
        paragraph.innerText = 'Basic 과정에 오신 것을 환영합니다.';

        welcomeBox.innerHTML = '';
        welcomeBox.appendChild(header);
        welcomeBox.appendChild(paragraph);
    }
}


function handlePreview() {
    const commentInput = document.getElementById('comment-input');
    const previewArea = document.getElementById('preview-area');
    let userComment = commentInput.value;
    let isBlocked = false;

    // 1단계: 허용되지 않은 태그 검사
    const withoutATags = userComment.replace(/<\/?a[^>]*>/gi, '');
    if (/<[^>]+>/.test(withoutATags)) {
        isBlocked = true;
    }

    // 2단계: 금지된 속성 검사
    if (!isBlocked) {
        const attributeBlacklist = [/onerror/gi, /onload/gi, /script/gi, /src/gi, /href/gi];
        attributeBlacklist.forEach(pattern => {
            if (pattern.test(userComment)) {
                isBlocked = true;
            }
        });
    }

    // 최종 차단 여부 처리
    if (isBlocked) {
        previewArea.innerText = "미리보기 실패: 허용되지 않는 태그나 속성이 포함되어 있습니다.";
    } else {
        // 필터링 통과 시 innerHTML 사용
        previewArea.innerHTML = userComment; 
    }
}


function handleQuestionSubmit() {
    const commentInput = document.getElementById('comment-input');
    const previewArea = document.getElementById('preview-area');
    const commentsSection = document.getElementById('comments-section');

    let content = previewArea.innerHTML || commentInput.value;
    if (!content || previewArea.innerText.startsWith("미리보기 실패")) {
        if (commentInput.value) {
            content = commentInput.value;
        } else {
            alert('등록할 질문이 없습니다.');
            return;
        }
    }

    const questionEntry = document.createElement('div');
    questionEntry.className = 'question-entry';

    const metaDiv = document.createElement('div');
    metaDiv.className = 'question-meta';
    const authorSpan = document.createElement('span');
    authorSpan.className = 'author';
    authorSpan.innerText = currentStudentName;
    const timeSpan = document.createElement('span');
    timeSpan.className = 'timestamp';
    timeSpan.innerText = new Date().toLocaleString();
    
    metaDiv.appendChild(authorSpan);
    metaDiv.appendChild(timeSpan);

    const contentDiv = document.createElement('div');
    contentDiv.className = 'question-content';
    if (previewArea.innerHTML && !previewArea.innerText.startsWith("미리보기 실패")) {
        contentDiv.innerHTML = previewArea.innerHTML;
    } else {
        contentDiv.innerText = commentInput.value;
    }
    
    questionEntry.appendChild(metaDiv);
    questionEntry.appendChild(contentDiv);
    commentsSection.appendChild(questionEntry);
    
    commentInput.value = '';
    previewArea.innerHTML = '';
    alert('질문이 등록되었습니다!');
}

// HTML 문서가 완전히 로드된 후 스크립트를 실행
document.addEventListener('DOMContentLoaded', () => {
    displayWelcome();

    const previewBtn = document.getElementById('preview-btn');
    const submitBtn = document.getElementById('submit-btn');

    if (previewBtn) {
        previewBtn.addEventListener('click', handlePreview);
    }
    if (submitBtn) {
        submitBtn.addEventListener('click', handleQuestionSubmit);
    }
});