let questionCount = 0;

// Add a new question
function addQuestion() {
    questionCount++;
    const questionsContainer = document.getElementById('questions-container');
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-card';
    questionDiv.id = `question-${questionCount}`;
    questionDiv.innerHTML = `
        <input type="text" placeholder="Enter your question" required>
        <select onchange="toggleQuestionType(this, 'question-${questionCount}')">
            <option value="open-ended">Open-Ended</option>
            <option value="multiple-choice">Multiple Choice</option>
        </select>
        <div class="options-container" id="options-${questionCount}" style="display: none;"></div>
        <button type="button" class="add-option-btn" onclick="addOption('question-${questionCount}')" style="display: none;">Add Option</button>
        <button type="button" class="remove-question-btn" onclick="removeQuestion('question-${questionCount}')"><i class="fas fa-times"></i></button>
    `;
    questionsContainer.appendChild(questionDiv);
    showToaster('Question added!');
}

// Toggle between open-ended and multiple-choice
function toggleQuestionType(select, questionId) {
    const optionsContainer = document.getElementById(`options-${questionId.split('-')[1]}`);
    const addOptionBtn = select.parentElement.querySelector('.add-option-btn');
    if (select.value === 'multiple-choice') {
        optionsContainer.style.display = 'block';
        addOptionBtn.style.display = 'inline-block';
        if (optionsContainer.children.length === 0) {
            addOption(questionId); // Add at least one option by default
        }
    } else {
        optionsContainer.style.display = 'none';
        addOptionBtn.style.display = 'none';
    }
}

// Add an option for multiple-choice questions
function addOption(questionId) {
    const optionsContainer = document.getElementById(`options-${questionId.split('-')[1]}`);
    const optionId = `option-${questionId}-${optionsContainer.children.length + 1}`;
    const optionDiv = document.createElement('div');
    optionDiv.className = 'option-input';
    optionDiv.innerHTML = `
        <input type="text" placeholder="Enter option" required>
        <button type="button" class="remove-option-btn" onclick="removeOption('${optionId}')"><i class="fas fa-times"></i></button>
    `;
    optionDiv.id = optionId;
    optionsContainer.appendChild(optionDiv);
}

// Remove an option
function removeOption(optionId) {
    const optionDiv = document.getElementById(optionId);
    optionDiv.remove();
    showToaster('Option removed!');
}

// Remove a question
function removeQuestion(questionId) {
    const questionDiv = document.getElementById(questionId);
    questionDiv.remove();
    showToaster('Question removed!');
}

// Go back to dashboard (placeholder)
function goBack() {
    showToaster('Returning to dashboard...');
    // Replace with actual navigation logic, e.g., window.location.href = '/dashboard';
}

// Submit the survey
function submitSurvey(event) {
    event.preventDefault();

    const topic = document.getElementById('survey-topic').value;
    const description = document.getElementById('survey-description').value;
    const ageMin = document.getElementById('age-min').value;
    const ageMax = document.getElementById('age-max').value;
    const locations = Array.from(document.getElementById('location').selectedOptions).map(opt => opt.value);

    const questions = [];
    document.querySelectorAll('.question-card').forEach(card => {
        const questionText = card.querySelector('input[type="text"]').value;
        const type = card.querySelector('select').value;
        let options = [];
        if (type === 'multiple-choice') {
            options = Array.from(card.querySelectorAll('.option-input input')).map(input => input.value);
        }
        questions.push({ text: questionText, type, options });
    });

    const surveyData = {
        topic,
        description,
        questions,
        targetAudience: {
            ageRange: { min: ageMin, max: ageMax },
            locations
        }
    };

    console.log('Survey Data:', surveyData); // For debugging
    showToaster('Survey created successfully!');
    // Here you would typically send `surveyData` to your backend via an API call
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