export const initialState = {
    category: 'All',
    difficulty: 'All',
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    selectedAnswer: null,
    isComplete: false,
    loading: false,
    error: null,
    time: 30, // 30 seconds per question
    isActive: false,
    history: []
};

export const quizReducer = (state, action) => {
    switch (action.type) {
        case 'SET_CATEGORY':
            return { ...state, category: action.payload };
        case 'SET_DIFFICULTY':
            return { ...state, difficulty: action.payload };
        case 'SET_QUESTIONS':
            return { 
                ...state, 
                questions: action.payload, 
                loading: false,
                time: 30, // Reset timer when questions are loaded
                isActive: true // Start timer when questions are loaded
            };
        case 'SELECT_ANSWER':
            const isCorrect = state.questions[state.currentQuestionIndex].correctAnswer === action.payload;
            return {
                ...state,
                selectedAnswer: action.payload,
                score: isCorrect ? state.score + 1 : state.score,
                isActive: false // Stop timer when answer is selected
            };
        case 'NEXT_QUESTION':
            if (state.currentQuestionIndex < state.questions.length - 1) {
                return {
                    ...state,
                    currentQuestionIndex: state.currentQuestionIndex + 1,
                    selectedAnswer: null,
                    time: 30, // Reset timer for next question
                    isActive: true // Start timer for next question
                };
            } else {
                // Add to history when quiz is complete
                const historyEntry = {
                    quizName: `${state.category} - ${state.difficulty}`,
                    score: state.score,
                    totalQuestions: state.questions.length,
                    date: new Date().toISOString()
                };
                return {
                    ...state,
                    isComplete: true,
                    isActive: false, // Stop timer when quiz is complete
                    history: [...state.history, historyEntry]
                };
            }
        case 'RESET_QUIZ':
            return {
                ...initialState,
                history: state.history // Preserve history
            };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload, loading: false };
        case 'TICK':
            if (state.time > 0) {
                return { ...state, time: state.time - 1 };
            }
            return state;
        case 'SET_ACTIVE':
            return { ...state, isActive: action.payload };
        default:
            return state;
    }
}; 