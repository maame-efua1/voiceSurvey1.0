// Sample survey data (replace with actual data from backend)
const surveyData = {
    topic: "Employee Satisfaction Survey",
    description: "This survey aims to gather feedback from employees about their work environment and satisfaction levels.",
    questions: [
        { text: "How satisfied are you with your current role?", type: "multiple-choice", options: ["Very Satisfied", "Satisfied", "Neutral", "Dissatisfied"] },
        { text: "What do you think could be improved in the workplace?", type: "open-ended", options: [] }
    ]
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Populate intro section
    document.getElementById('survey-title').textContent = surveyData.topic;
    document.getElementById('survey-title-questions').textContent = surveyData.topic;
    document.getElementById('survey-description').textContent = surveyData.description || "No description provided.";

    // Populate survey questions
    const questionsContainer = document.getElementById('questions-container');
    surveyData.questions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-card';
        questionDiv.innerHTML = `
            <label>${index + 1}. ${question.text}</label>
            ${question.type === 'open-ended' 
                ? `<textarea placeholder="Your response" required></textarea>` 
                : `<div class="radio-group">${question.options.map(option => `
                    <div class="radio-option">
                        <input type="radio" name="question-${index}" value="${option}" required>
                        <span>${option}</span>
                    </div>`).join('')}</div>`}
        `;
        questionsContainer.appendChild(questionDiv);
    });
});

// Show survey questions section
function showSurvey() {
    document.getElementById('intro-section').classList.remove('active');
    document.getElementById('survey-section').classList.add('active');
    showToaster('Starting survey...');
}

// Go back to survey list (placeholder)
function goBack() {
    showToaster('Returning to survey list...');
    // Replace with actual navigation logic, e.g., window.location.href = '/surveys';
}

// Submit the survey response
function submitResponse(event) {
    event.preventDefault();

    const responses = [];
    document.querySelectorAll('.question-card').forEach((card, index) => {
        const questionText = card.querySelector('label').textContent.split('. ')[1];
        const type = surveyData.questions[index].type;
        let answer;
        if (type === 'open-ended') {
            answer = card.querySelector('textarea').value;
        } else {
            answer = card.querySelector('input[type="radio"]:checked')?.value || '';
        }
        responses.push({ question: questionText, answer });
    });

    const responseData = {
        surveyId: 'sample-id', // Replace with actual survey ID
        responses
    };

    console.log('Response Data:', responseData); // For debugging
    showToaster('Responses submitted successfully!');
    // Here you would typically send `responseData` to your backend via an API call
}

// Toaster Function
function showToaster(message, isError = false) {
    const container = document.getElementById('toaster-container');
    const toaster = document.createElement('div');
    toaster.className = 'toaster' + (isError ? ' error' : '');
    toaster.textContent = message;
    container.appendChild(toaster);

    setTimeout(() => {
        toaster.classList.add('show');
    }, 10);

    setTimeout(() => {
        toaster.classList.remove('show');
        setTimeout(() => {
            container.removeChild(toaster);
        }, 300);
    }, 3000);
}