// --- 공통 변수 ---
let currentStudentName = '익명'; // 기본값 설정

// --- 함수 정의 ---

// (보안 수정 1) 환영 메시지를 안전하게 표시하는 함수
function displayWelcome() {
    const welcomeBox = document.getElementById('welcome-message');
    const params = new URLSearchParams(window.location.search);
    const studentName = params.get('student_name');

    if (studentName && welcomeBox) {
        currentStudentName = studentName;
        
        // innerHTML 대신 DOM 요소를 직접 생성하여 텍스트 삽입
        const header = document.createElement('h2');
        header.innerText = `환영합니다, ${studentName} 님!`; // innerText 사용

        const paragraph = document.createElement('p');
        paragraph.innerText = 'Web 과정에 오신 것을 환영합니다.'; // innerText 사용

        welcomeBox.innerHTML = ''; // 기존 내용 비우기
        welcomeBox.appendChild(header);
        welcomeBox.appendChild(paragraph);
    }
}

// 질문을 안전하게 등록하는 함수
function handleQuestionSubmit() {
    const commentInput = document.getElementById('comment-input');
    const commentsSection = document.getElementById('comments-section');

    // 미리보기 영역의 내용이 아닌, 항상 원본 입력값(commentInput.value)을 사용
    const content = commentInput.value;
    if (!content) {
        alert('등록할 질문이 없습니다.');
        return;
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
    contentDiv.innerText = content; // (보안 수정 3) 최종 등록 시에도 innerText 사용

    questionEntry.appendChild(metaDiv);
    questionEntry.appendChild(contentDiv);
    commentsSection.appendChild(questionEntry);
    
    commentInput.value = '';
    document.getElementById('preview-area').innerHTML = ''; // 미리보기만 비움
    alert('질문이 등록되었습니다!');
}

// (보안 수정 2) 미리보기를 안전하게 처리하는 함수
function handlePreview() {
    const commentInput = document.getElementById('comment-input');
    const previewArea = document.getElementById('preview-area');
    // innerHTML 대신 innerText를 사용하여 텍스트로만 표시
    previewArea.innerText = commentInput.value;
}


// --- 이벤트 리스너 설정 ---
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